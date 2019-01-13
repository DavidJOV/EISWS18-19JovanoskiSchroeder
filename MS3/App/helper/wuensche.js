var sqlHandler = require("../helper/sqlHandler.js");


// Function -> Verändert Grunddienstplan aus POST nach Erstellung und Speicherung in der DB, sodass Wuensche (evtl. alle anderen Aspekte der fainiss [später]) berücksichtigt werden
var korrigiereSchichtzuweisungen = function korrigiereSchichtzuweisungen(dienstplan) { //"dienstplan" ist ein Objekt, mit dem auch ein Dienstplan erstellt werden kann -> Bei POST verwendet, um den DP in die Datenbank zu schreiben.
  return new Promise(function (resolve, reject) {
    var monat = dienstplan.monat;


    var mitarbeiterWunsch = {
      mitarbeiterID: "",
      datum: "",
      schichtArt: ""
    }
    var mitarbeiterWuenscheListe;



    sqlHandler.getWuenscheStation(dienstplan.stationID, monat)
      .then(function (wunschListe) {
        if (wunschListe.length == 0) {

          console.log("Keine Wuensche auf dieser Station vorhanden!");
          resolve(-1);
        } else {
          mitarbeiterWuenscheListe = wunschListe;




          var wunschSuche = new Promise(function (resolve, reject) {

            for (let j = 0; j < mitarbeiterWuenscheListe.length; j++) {
              for (let z = j + 1; z < mitarbeiterWuenscheListe.length; z++) {


                if (mitarbeiterWuenscheListe[j].datumWunsch == mitarbeiterWuenscheListe[z].datumWunsch) {
                  sqlHandler.getMitarbeiterById(mitarbeiterWuenscheListe[j].mitarbeiterID)
                    .then(function (mitarbeiterJ) {
                      sqlHandler.getMitarbeiterById(mitarbeiterWuenscheListe[z].mitarbeiterID)
                        .then(function (mitarbeiterZ) {



                          if (mitarbeiterJ[0].wunschRating >= mitarbeiterZ[0].wunschRating) {

                            mitarbeiterWuenscheListe.splice(z, 1);
                            sqlHandler.updateWunschRating(mitarbeiterJ[0].id, -1);
                            sqlHandler.updateWunschRating(mitarbeiterZ[0].id, 1);

                          } else {

                            mitarbeiterWuenscheListe.splice(j, 1);
                            sqlHandler.updateWunschRating(mitarbeiterJ[0].id, 1);
                            sqlHandler.updateWunschRating(mitarbeiterZ[0].id, -1);

                          }


                        }).catch(function (err) {
                          console.log(err);
                        }) // zweiter get MA
                    }).catch(function (err) {
                      console.log(err);
                    }) // erster get MA
                } // if - Bedingung

              } // for z - schleife
            } // for j -schleife

            setTimeout(function () {
              resolve(mitarbeiterWuenscheListe)
            }, 300);
          })

          wunschSuche.then(function (mitarbeiterWuenscheListe) {



            var promiseUpdate = new Promise(function (resolve, reject) {

              sqlHandler.getDienstplanByDate(dienstplan.monat, dienstplan.jahr)
                .then(function (dp) {

                  var elements = new Array();

                  for (var p = 0; p < dp.schichten.length; p++) {
                    dp.schichten[p].forEach(function (element) {
                      elements.push(element)
                    })
                  }


                  //  var promiseLoop = new Promise(function(resolve, reject) {


                  for (let j = 0; j < mitarbeiterWuenscheListe.length; j++) {
                    for (let i = 0; i < elements.length; i++) {


                      if ((mitarbeiterWuenscheListe[j].datumWunsch == elements[i].datum) && (mitarbeiterWuenscheListe[j].mitarbeiterID == elements[i].mitarbeiterID1)) {
                        let schichtzuweisungUpdate = new schichtzuweisungUpdateObject(-1, elements[i].mitarbeiterID2, elements[i].mitarbeiterID3, elements[i].mitarbeiterID4)


                        tauscheSchicht(elements[i], elements, mitarbeiterWuenscheListe[j].mitarbeiterID).then(function (resolveObject) {
                          return new Promise(function (resolve, reject) {

                            resolve(resolveObject);

                          }).then(function (resolveObject) {

                            schichtzuweisungUpdate.mitarbeiterID1 = resolveObject.tauschId;

                            sqlHandler.updateSchichtzuweisung(resolveObject.elements[i].datum, resolveObject.elements[i].schichtArt, schichtzuweisungUpdate)
                              .then(function (schichtzuweisung) {
                                if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht aktualisiert werden");
                              })
                              .catch(function (err) {
                                console.log(err);
                              })

                          })

                        })




                      } else if ((mitarbeiterWuenscheListe[j].datumWunsch == elements[i].datum) && (mitarbeiterWuenscheListe[j].mitarbeiterID == elements[i].mitarbeiterID2)) {
                        let schichtzuweisungUpdate = new schichtzuweisungUpdateObject(elements[i].mitarbeiterID1, -1, elements[i].mitarbeiterID3, elements[i].mitarbeiterID4);

                        tauscheSchicht(elements[i], elements, mitarbeiterWuenscheListe[j].mitarbeiterID).then(function (resolveObject) {
                          return new Promise(function (resolve, reject) {

                            resolve(resolveObject);

                          }).then(function (resolveObject) {

                            schichtzuweisungUpdate.mitarbeiterID2 = resolveObject.tauschId;

                            sqlHandler.updateSchichtzuweisung(resolveObject.elements[i].datum, resolveObject.elements[i].schichtArt, schichtzuweisungUpdate)
                              .then(function (schichtzuweisung) {
                                if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht aktualisiert werden");
                              })
                              .catch(function (err) {
                                console.log(err);
                              })

                          })

                        })
                      } else if ((mitarbeiterWuenscheListe[j].datumWunsch == elements[i].datum) && (mitarbeiterWuenscheListe[j].mitarbeiterID == elements[i].mitarbeiterID3)) {
                        let schichtzuweisungUpdate = new schichtzuweisungUpdateObject(elements[i].mitarbeiterID1, elements[i].mitarbeiterID2, -1, elements[i].mitarbeiterID4);

                        tauscheSchicht(elements[i], elements, mitarbeiterWuenscheListe[j].mitarbeiterID).then(function (resolveObject) {
                          return new Promise(function (resolve, reject) {

                            resolve(resolveObject);

                          }).then(function (resolveObject) {

                            schichtzuweisungUpdate.mitarbeiterID3 = resolveObject.tauschId;

                            sqlHandler.updateSchichtzuweisung(resolveObject.elements[i].datum, resolveObject.elements[i].schichtArt, schichtzuweisungUpdate)
                              .then(function (schichtzuweisung) {
                                if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht aktualisiert werden");
                              })
                              .catch(function (err) {
                                console.log(err);
                              })

                          })

                        })
                      } else if ((mitarbeiterWuenscheListe[j].datumWunsch == elements[i].datum) && (mitarbeiterWuenscheListe[j].mitarbeiterID == elements[i].mitarbeiterID4)) {
                        let schichtzuweisungUpdate = new schichtzuweisungUpdateObject(elements[i].mitarbeiterID1, elements[i].mitarbeiterID2, elements[i].mitarbeiterID3, -1);


                        tauscheSchicht(elements[i], elements, mitarbeiterWuenscheListe[j].mitarbeiterID).then(function (resolveObject) {
                          return new Promise(function (resolve, reject) {

                            resolve(resolveObject);

                          }).then(function (resolveObject) {

                            schichtzuweisungUpdate.mitarbeiterID4 = resolveObject.tauschId;
                            sqlHandler.updateSchichtzuweisung(resolveObject.elements[i].datum, resolveObject.elements[i].schichtArt, schichtzuweisungUpdate)
                              .then(function (schichtzuweisung) {
                                if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht aktualisiert werden");
                              })
                              .catch(function (err) {
                                console.log(err);
                              })

                          })

                        })
                      }

                    } // for i - Schleife
                    if (j + 1 == mitarbeiterWuenscheListe.length) {
                      resolve("Dienstplan aktualisiert");
                    }
                  } // for j -Schleife

                  //  if(j)

                  //  }) //promise loop

                }).catch(function (err) {
                  console.log(err);
                }) // 2. then....

            }) //PromiseUpdate

            promiseUpdate.then(function () {


              sqlHandler.getDienstplanByDate(dienstplan.monat, dienstplan.jahr)
                .then(function (finalerDienstplan) {

                  var promiseConnect = new Promise(function (resolve, reject) {
                    resolve(finalerDienstplan);

                  })

                  promiseConnect.then(function (finalerDienstplan) {
                    resolve(finalerDienstplan);
                  })
                }).catch(function (err) {
                  console.log(err);
                })

            }).catch(function (err) {
              console.log(err);
            })

          })
            .catch(function (err) {
              console.log(err);
            }) // Promise wunschSuche

        }
      }) // 1.then
      .catch(function (err) {
        console.log(err);
      })



  }); // end of return new Promise ...

} // end of function



var tauscheSchicht = function tauscheSchicht(schichtzuweisung, schichten, mitarbeiterID) {

  return new Promise(function (resolve, reject) {

    var passendeSchichten = new Array();
    var passendeMitarbeiter = new Array();


    var tausch = new Promise(function (resolve, reject) {


      for (let i = 0; i < schichten.length; i++) {
        if (schichten[i].schichtArt == schichtzuweisung.schichtArt)
          passendeSchichten.push(schichten[i]);

      }

      for (let j = 0; j < passendeSchichten.length; j++) {
        if (passendeSchichten[j].mitarbeiterID1 != schichtzuweisung.mitarbeiterID1 && passendeSchichten[j].mitarbeiterID1 != schichtzuweisung.mitarbeiterID2 && passendeSchichten[j].mitarbeiterID1 != schichtzuweisung.mitarbeiterID3 && passendeSchichten[j].mitarbeiterID1 != schichtzuweisung.mitarbeiterID4) {

          if (passendeSchichten[j].mitarbeiterID1 != mitarbeiterID) {
            var passendeMitarbeiterSchicht1 = new passendeMitarbeiterSchicht(passendeSchichten[j].mitarbeiterID1, passendeSchichten[j].datum, 1, schichtzuweisung.schichtArt);

            passendeMitarbeiter.push(passendeMitarbeiterSchicht1);
          }
        }
        if (passendeSchichten[j].mitarbeiterID2 != schichtzuweisung.mitarbeiterID1 && passendeSchichten[j].mitarbeiterID2 != schichtzuweisung.mitarbeiterID2 && passendeSchichten[j].mitarbeiterID2 != schichtzuweisung.mitarbeiterID3 && passendeSchichten[j].mitarbeiterID2 != schichtzuweisung.mitarbeiterID4) {

          if (passendeSchichten[j].mitarbeiterID2 != mitarbeiterID) {
            var passendeMitarbeiterSchicht2 = new passendeMitarbeiterSchicht(passendeSchichten[j].mitarbeiterID2, passendeSchichten[j].datum, 2, schichtzuweisung.schichtArt);

            passendeMitarbeiter.push(passendeMitarbeiterSchicht2);
          }
        }
        if (passendeSchichten[j].mitarbeiterID3 != schichtzuweisung.mitarbeiterID1 && passendeSchichten[j].mitarbeiterID3 != schichtzuweisung.mitarbeiterID2 && passendeSchichten[j].mitarbeiterID3 != schichtzuweisung.mitarbeiterID3 && passendeSchichten[j].mitarbeiterID3 != schichtzuweisung.mitarbeiterID4) {
          if (passendeSchichten[j].mitarbeiterID3 != mitarbeiterID) {
            var passendeMitarbeiterSchicht3 = new passendeMitarbeiterSchicht(passendeSchichten[j].mitarbeiterID3, passendeSchichten[j].datum, 3, schichtzuweisung.schichtArt);

            passendeMitarbeiter.push(passendeMitarbeiterSchicht3);
          }
        }
        if (passendeSchichten[j].mitarbeiterID4 != schichtzuweisung.mitarbeiterID1 && passendeSchichten[j].mitarbeiterID4 != schichtzuweisung.mitarbeiterID2 && passendeSchichten[j].mitarbeiterID4 != schichtzuweisung.mitarbeiterID3 && passendeSchichten[j].mitarbeiterID4 != schichtzuweisung.mitarbeiterID4) {
          if (passendeSchichten[j].mitarbeiterID4 != mitarbeiterID) {
            var passendeMitarbeiterSchicht4 = new passendeMitarbeiterSchicht(passendeSchichten[j].mitarbeiterID4, passendeSchichten[j].datum, 4, schichtzuweisung.schichtArt);

            passendeMitarbeiter.push(passendeMitarbeiterSchicht4);
          }
        }
        if (j + 1 == passendeSchichten.length) {
          
          var schichtenAmTagX = new Array();
          for (let x=0; x < schichten.length; x++) {
            if (schichtzuweisung.datum == schichten[x].datum) {

              schichtenAmTagX.push(schichten[x]);
              
            }
            if (x + 1 == schichten.length) {
 
              var unpassendeMitarbeiterIDs = [
                schichtenAmTagX[0].mitarbeiterID1, schichtenAmTagX[0].mitarbeiterID2, schichtenAmTagX[0].mitarbeiterID3, schichtenAmTagX[0].mitarbeiterID4,
                schichtenAmTagX[1].mitarbeiterID1, schichtenAmTagX[1].mitarbeiterID2, schichtenAmTagX[1].mitarbeiterID3, schichtenAmTagX[1].mitarbeiterID4,
                schichtenAmTagX[2].mitarbeiterID1, schichtenAmTagX[2].mitarbeiterID2, schichtenAmTagX[2].mitarbeiterID3, schichtenAmTagX[2].mitarbeiterID4
              ]
              
              passendeMitarbeiter.forEach(function(mitarbeiter){

                for (let y=0; y < unpassendeMitarbeiterIDs.length; y++) {
              
                  if (mitarbeiter.mitarbeiterID != unpassendeMitarbeiterIDs[y]) {

                    passendeMitarbeiter.splice(passendeMitarbeiter.indexOf(mitarbeiter),1);
                  }
                  
                }
              })
                
              



            }
          }
          var tauschenderMitarbeiter = passendeMitarbeiter[getRandomInt(passendeMitarbeiter.length)];

          var resolveObject = {
            tauschenderMitarbeiter: tauschenderMitarbeiter,
            elements: schichten
          }

          resolve(resolveObject);
        }

      }

    })

    tausch.then(function (resolveObject) {
      sqlHandler.updateSchichtzuweisungWunsch(mitarbeiterID, resolveObject.tauschenderMitarbeiter);
      //  console.log(tauschenderMitarbeiter.mitarbeiterID)

      var resolveObject2 = {
        tauschId: resolveObject.tauschenderMitarbeiter.mitarbeiterID,
        elements: resolveObject.elements
      }

      resolve(resolveObject2);
    })
      .catch(function (err) {
        console.log(err);
      })
  })

}


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Konstruktor für einen Mitarbeiter
function passendeMitarbeiterSchicht(mitarbeiterID, datum, idNummer, schichtArt) {
  this.mitarbeiterID = mitarbeiterID;
  this.datum = datum;
  this.idNummer = idNummer;
  this.schichtArt = schichtArt;
}
//Konstruktor zum erstellen von SchichtzuweisungsUpdates.
function schichtzuweisungUpdateObject(maID1, maID2, maID3, maID4) {
  this.mitarbeiterID1 = maID1;
  this.mitarbeiterID2 = maID2;
  this.mitarbeiterID3 = maID3;
  this.mitarbeiterID4 = maID4;
}



exports.korrigiereSchichtzuweisungen = korrigiereSchichtzuweisungen;
