var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var sqlHandler = require("../helper/sqlHandler.js");
var tagZaehler = require("../helper/tagberechnung.js").getDaysInMonth;
var counter = require("../helper/overgiveAsync.js");



/* // Get auf alle Dienstpläne
router.get('/', (req, res) => {

    if (dienstplanListe === undefined) res.status(500).send("Could not read DATA");
    else {
        res.status(200).send(dienstplanListe);
    }
}); */ // Nicht benötigt!



// Get auf einen einzelnen Dienstplan
router.get('/:id', (req, res) => {
  sqlHandler.getDienstplan(req.params.id)
    .then(function(dienstplan) {
      res.status(200).send(dienstplan);
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
});



// Get auf einen einzelnen Tag eines Dienstplans
/*
router.get('/:id/:date', (req, res) => {
    sqlHandler.getTag(req.params.date)
    .then(function(tag){
        res.status(200).send(tag);
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
});

*/







// Function -> Verändert Grunddienstplan aus POST nach Erstellung und Speicherung in der DB, sodass Wuensche (evtl. alle anderen Aspekte der fainiss [später]) berücksichtigt werden
var korrigiereSchichtzuweisungen = function korrigiereSchichtzuweisungen(dienstplan) { //"dienstplan" ist ein Objekt, mit dem auch ein Dienstplan erstellt werden kann -> Bei POST verwendet, um den DP in die Datenbank zu schreiben.
  return new Promise(function(resolve, reject) {


    var mitarbeiterWunsch = {
      mitarbeiterID: "",
      datum: "",
      schichtArt: ""
    }
    var mitarbeiterWuenscheListe;

    var schichtzuweisungUpdate = {
      mitarbeiterID1: "",
      mitarbeiterID2: "",
      mitarbeiterID3: "",
      mitarbeiterID4: ""
    }


    sqlHandler.getWuenscheStation(dienstplan.stationID)
      .then(function(wunschListe) {
        if (wunschListe === undefined) console.log("Keine Wuensche auf dieser Station vorhanden!");
        else {
          mitarbeiterWuenscheListe = wunschListe;
        }
      })
      .catch(function(error) {
        console.log(error);
      }).then(function() {

        console.log("WUNSCHLISTE:\n" + JSON.stringify(mitarbeiterWuenscheListe))

        var wunschSuche = new Promise(function(resolve, reject) {

          for (let j = 0; j < mitarbeiterWuenscheListe.length; j++) {
            for (let z = j + 1; z < mitarbeiterWuenscheListe.length; z++) {


              if (mitarbeiterWuenscheListe[j].datumWunsch == mitarbeiterWuenscheListe[z].datumWunsch) {
                sqlHandler.getMitarbeiterById(mitarbeiterWuenscheListe[j].mitarbeiterID)
                  .then(function(mitarbeiterJ) {
                    sqlHandler.getMitarbeiterById(mitarbeiterWuenscheListe[z].mitarbeiterID)
                      .then(function(mitarbeiterZ) {



                        if (mitarbeiterJ[0].wunschRating >= mitarbeiterZ[0].wunschRating) {

                          mitarbeiterWuenscheListe.splice(z, 1);
                          sqlHandler.updateWunschRating(mitarbeiterJ[0].id, -1);
                          sqlHandler.updateWunschRating(mitarbeiterZ[0].id, 1);

                        } else {

                          mitarbeiterWuenscheListe.splice(j, 1);
                          sqlHandler.updateWunschRating(mitarbeiterJ[0].id, 1);
                          sqlHandler.updateWunschRating(mitarbeiterZ[0].id, -1);

                        }


                      }) // zweiter get MA
                  }) // erster get MA
              } // if - Bedingung

            } // for z - schleife
          } // for j -schleife

          setTimeout(function() {
            resolve(mitarbeiterWuenscheListe)
          }, 300);
        })
        wunschSuche.then(function(mitarbeiterWuenscheListe) {



          var promiseUpdate = new Promise(function(resolve, reject) {

            sqlHandler.getDienstplanByDate(dienstplan.monat, dienstplan.jahr)
              .then(function(dp) {

                var elements = new Array();

                for (var p = 0; p < dp.schichten.length; p++) {
                  dp.schichten[p].forEach(function(element) {
                    elements.push(element)
                  })
                }


                //  var promiseLoop = new Promise(function(resolve, reject) {


                for (var j = 0; j < mitarbeiterWuenscheListe.length; j++) {
                  for (var i = 0; i < elements.length; i++) {


                    if ((mitarbeiterWuenscheListe[j].datumWunsch == elements[i].datum) && (mitarbeiterWuenscheListe[j].mitarbeiterID == elements[i].mitarbeiterID1)) {
                      schichtzuweisungUpdate.mitarbeiterID1 = 0; // ID +1 ??? Welcher MA soll die Schicht dann übernehmen?
                      schichtzuweisungUpdate.mitarbeiterID2 = elements[i].mitarbeiterID2;
                      schichtzuweisungUpdate.mitarbeiterID3 = elements[i].mitarbeiterID3;
                      schichtzuweisungUpdate.mitarbeiterID4 = elements[i].mitarbeiterID4;

                      sqlHandler.updateSchichtzuweisung(elements[i].datum, elements[i].schichtArt, schichtzuweisungUpdate)
                        .then(function(schichtzuweisung) {
                          if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht aktualisiert werden");
                        })
                        .catch(function(err) {
                          console.log(err);
                        })
                    } else if ((mitarbeiterWuenscheListe[j].datumWunsch == elements[i].datum) && (mitarbeiterWuenscheListe[j].mitarbeiterID == elements[i].mitarbeiterID2)) {
                      schichtzuweisungUpdate.mitarbeiterID1 = elements[i].mitarbeiterID1;
                      schichtzuweisungUpdate.mitarbeiterID2 = 0; // ID +1 ??? Welcher MA soll die Schicht dann übernehmen?
                      schichtzuweisungUpdate.mitarbeiterID3 = elements[i].mitarbeiterID3;
                      schichtzuweisungUpdate.mitarbeiterID4 = elements[i].mitarbeiterID4;

                      sqlHandler.updateSchichtzuweisung(elements[i].datum, elements[i].schichtArt, schichtzuweisungUpdate)
                        .then(function(schichtzuweisung) {
                          if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht aktualisiert werden");
                        })
                        .catch(function(err) {
                          console.log(err);
                        })
                    } else if ((mitarbeiterWuenscheListe[j].datumWunsch == elements[i].datum) && (mitarbeiterWuenscheListe[j].mitarbeiterID == elements[i].mitarbeiterID3)) {
                      schichtzuweisungUpdate.mitarbeiterID1 = elements[i].mitarbeiterID1;
                      schichtzuweisungUpdate.mitarbeiterID2 = elements[i].mitarbeiterID2;
                      schichtzuweisungUpdate.mitarbeiterID3 = 0; // ID +1 ??? Welcher MA soll die Schicht dann übernehmen?
                      schichtzuweisungUpdate.mitarbeiterID4 = elements[i].mitarbeiterID4;

                      sqlHandler.updateSchichtzuweisung(elements[i].datum, elements[i].schichtArt, schichtzuweisungUpdate)
                        .then(function(schichtzuweisung) {
                          if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht aktualisiert werden");
                        })
                        .catch(function(err) {
                          console.log(err);
                        })
                    } else if ((mitarbeiterWuenscheListe[j].datumWunsch == elements[i].datum) && (mitarbeiterWuenscheListe[j].mitarbeiterID == elements[i].mitarbeiterID4)) {
                      schichtzuweisungUpdate.mitarbeiterID1 = elements[i].mitarbeiterID1;
                      schichtzuweisungUpdate.mitarbeiterID2 = elements[i].mitarbeiterID2;
                      schichtzuweisungUpdate.mitarbeiterID3 = elements[i].mitarbeiterID3;
                      schichtzuweisungUpdate.mitarbeiterID4 = 0; // ID +1 ??? Welcher MA soll die Schicht dann übernehmen?

                      sqlHandler.updateSchichtzuweisung(elements[i].datum, elements[i].schichtArt, schichtzuweisungUpdate)
                        .then(function(schichtzuweisung) {
                          if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht aktualisiert werden");
                        })
                        .catch(function(err) {
                          console.log(err);
                        })
                    }

                  } // for i - Schleife
                  if (j + 1 == mitarbeiterWuenscheListe.length) {
                    resolve("Dienstplan aktualisiert");
                  }
                } // for j -Schleife

                //  if(j)

                //  }) //promise loop

              }) // 2. then....

          }) //PromiseUpdate

          promiseUpdate.then(function() {


            sqlHandler.getDienstplanByDate(dienstplan.monat, dienstplan.jahr)
              .then(function(finalerDienstplan) {

                var promiseConnect = new Promise(function(resolve, reject) {
                  resolve(finalerDienstplan);

                })

                promiseConnect.then(function(finalerDienstplan) {
                  resolve(finalerDienstplan);
                })
              })

          })

        }) // Promise wunschSuche

      }) // 1.then




  }); // end of return new Promise ...

} // end of function

// continue ... Welcher MA übernimmt dann die Schicht ? -> Evtl Ausbauen, auch auf Fainiss bezogen etc...





//[OK]
// früh -> Spät
// früh -> Nachtschicht (next day)
// Zwischen -> Spät
// Zwischen -> Nacht (next day)
// Spät -> Nachtschicht (next day)
// Nacht -> Tag frei dann beliebige Schicht






/*
// function nach jedem einsetzen eines MA in eine Schicht aufrufen... (Station benötigt dann mehr als 4 Mitarbeiter!)
var wunschKontrolle = function wunschKontroll(stationID ,id, datum){

  sqlHandler.getWuenscheStation(stationID)
      .then(function(wunschListe) {
          if (wunschListe === undefined) console.log("Keine Wuensche auf dieser Station vorhanden!");
          else {
            for (let y = 0 ; y<wunschListe.length ; y++){
              if (id && datum == wunschListe[y].mitarbeiterID && wunschListe.[y].datumWunsch){
              // ändere Schichtzuweisung ...
              }
              else {
                return 0;
              }
            }
          }
      })
      .catch(function(error) {
          console.log(error);
      })

} // end of function

*/




// Erstellen eines neuen Dienstplan
router.post('/', bodyParser.json(), (req, res) => {



  var mitarbeiterListe;
  var anzahlSchichten = 3;
  var anzahlMitarbeiterSchicht = 4;
  var fruehschicht = "Fruehschicht";
  var spaetschicht = "Spaetschicht";
  var nachtschicht = "Nachtschicht";

  const dienstplan = {
    stationID: req.body.stationID,
    monat: req.body.monat,
    jahr: req.body.jahr,
    monatsTage: new Array()
  };


  var schichtzuweisung = {
    datum: "",
    schichtArt: "",
    mitarbeiterID1: "",
    mitarbeiterID2: "",
    mitarbeiterID3: "",
    mitarbeiterID4: ""
  }

  var tag = {
    schichtzuweisungID1: "",
    schichtzuweisungID2: "",
    schichtzuweisungID3: "",
    datum: ""
  }
  sqlHandler.getDienstplanByMonat(req.body.monat, req.body.jahr)
    .then(function() {

      sqlHandler.getMitarbeiter()
        .then(function(maListe) { // <- So ist es richtig! Noch bei den anderen Funktionen ändern!!!!
          if (maListe === undefined) console.log("Keine Mitarbeiter vorhanden!");
          else {

            mitarbeiterListe = maListe;

          }
        })
        .catch(function(error) {
          console.log(error);
        }).then(function() {

          var anzahlTage = tagZaehler(req.body.monat, req.body.jahr, 0); // Berechnung Tage im Monat x

          console.log("TAGE:\n" + anzahlTage);



          var mitarbeiterZuweisung;
          var zyklus1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
          var zyklus2 = [12, 13, 14, 15, 16, 17, 2, 3, 4, 5, 0, 1];
          var zyklus3 = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

          for (let i = 1; i <= anzahlTage; i++) {

            if (i < 3 || (i >= 7 && i < 9) || (i >= 13 && i < 15) || (i >= 19 && i < 21) || (i >= 25 && i < 27)) {
              mitarbeiterZuweisung = zyklus1;
            } else if (i < 5 || (i >= 9 && i < 11) || (i >= 15 && i < 17) || (i >= 21 && i < 23) || (i >= 27 && i < 29)) {
              mitarbeiterZuweisung = zyklus2;
            } else if (i < 7 || (i >= 11 && i < 13) || (i >= 17 && i < 19) || (i >= 23 && i < 25) || (i >= 29 && i <= 31)) {
              mitarbeiterZuweisung = zyklus3;
            }


            var promiseTage = new Promise(function(resolve, reject) {


              for (let j = 0; j < anzahlSchichten; j++) {

                if (j == 0) {
                  let datum = i + "-" + req.body.monat + "-" + req.body.jahr;
                  if (i < 10) {
                    datum = "0" + i + "-" + req.body.monat + "-" + req.body.jahr;
                  }




                  schichtzuweisung.datum = datum;
                  schichtzuweisung.schichtArt = "Fruehschicht";
                  schichtzuweisung.mitarbeiterID1 = mitarbeiterListe[mitarbeiterZuweisung[0]].id;
                  schichtzuweisung.mitarbeiterID2 = mitarbeiterListe[mitarbeiterZuweisung[1]].id;
                  schichtzuweisung.mitarbeiterID3 = mitarbeiterListe[mitarbeiterZuweisung[2]].id;
                  schichtzuweisung.mitarbeiterID4 = mitarbeiterListe[mitarbeiterZuweisung[3]].id;
                  sqlHandler.neueSchichtzuweisung(schichtzuweisung)
                    .then(function(schichtzuweisung) {
                      if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht erstellt werden");
                    })
                    .catch(function(err) {
                      console.log(err);
                    }).then(function() {
                      sqlHandler.getSchichtzuweisung(datum, fruehschicht)
                        .then(function(schicht) {
                          tag.schichtzuweisungID1 = schicht[0].id;

                        })
                    })
                }


                if (j == 1) {
                  let datum = i + "-" + req.body.monat + "-" + req.body.jahr;
                  if (i < 10) {
                    datum = "0" + i + "-" + req.body.monat + "-" + req.body.jahr;
                  }
                  schichtzuweisung.datum = datum;
                  schichtzuweisung.schichtArt = "Spaetschicht";
                  schichtzuweisung.mitarbeiterID1 = mitarbeiterListe[mitarbeiterZuweisung[4]].id;
                  schichtzuweisung.mitarbeiterID2 = mitarbeiterListe[mitarbeiterZuweisung[5]].id;
                  schichtzuweisung.mitarbeiterID3 = mitarbeiterListe[mitarbeiterZuweisung[6]].id;
                  schichtzuweisung.mitarbeiterID4 = mitarbeiterListe[mitarbeiterZuweisung[7]].id;
                  sqlHandler.neueSchichtzuweisung(schichtzuweisung)
                    .then(function(schichtzuweisung) {
                      if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht erstellt werden");
                    })
                    .catch(function(err) {
                      console.log(err);
                    }).then(function() {
                      sqlHandler.getSchichtzuweisung(datum, spaetschicht)
                        .then(function(schicht) {
                          tag.schichtzuweisungID2 = schicht[0].id;

                        })
                    })
                }


                if (j == 2) {
                  let datum = i + "-" + req.body.monat + "-" + req.body.jahr;
                  if (i < 10) {
                    datum = "0" + i + "-" + req.body.monat + "-" + req.body.jahr;
                  }

                  schichtzuweisung.datum = datum;
                  schichtzuweisung.schichtArt = "Nachtschicht";
                  schichtzuweisung.mitarbeiterID1 = mitarbeiterListe[mitarbeiterZuweisung[8]].id;
                  schichtzuweisung.mitarbeiterID2 = mitarbeiterListe[mitarbeiterZuweisung[9]].id;
                  schichtzuweisung.mitarbeiterID3 = mitarbeiterListe[mitarbeiterZuweisung[10]].id;
                  schichtzuweisung.mitarbeiterID4 = mitarbeiterListe[mitarbeiterZuweisung[11]].id;
                  sqlHandler.neueSchichtzuweisung(schichtzuweisung)
                    .then(function(schichtzuweisung) {
                      if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht erstellt werden");
                    })
                    .catch(function(err) {
                      console.log(err);
                    }).then(function() {
                      sqlHandler.getSchichtzuweisung(datum, nachtschicht)
                        .then(function(schicht) {
                          tag.schichtzuweisungID3 = schicht[0].id;

                          tag.datum = datum;

                          resolve(tag)
                        })

                    })
                }



              }
            })


            var promiseDienstplan = new Promise(function(resolve, reject) {

              promiseTage.then(function(tag) {

                  // console.log(tag) // -> loggt die richtigen Tage

                  sqlHandler.neuerTag(tag)
                    .then(function() {

                      let datum = i + "-" + req.body.monat + "-" + req.body.jahr;
                      if (i < 10) {
                        datum = "0" + i + "-" + req.body.monat + "-" + req.body.jahr;
                      }

                      sqlHandler.getTag(datum)
                        .then(function(tag) {

                          if (tag === undefined) console.log("Tag konnte nicht erstellt werden");
                          else {
                            dienstplan.monatsTage.push(tag);
                            if (i == anzahlTage) {

                              resolve(dienstplan)

                            }
                          }

                        })
                        .catch(function(err) {
                          console.log(err);
                        });

                    })

                    .catch(function(err) {
                      console.log(err);
                    });
                })
                .catch(function(err) {
                  console.log(err);
                });





            });


          } // For Schleife i
          promiseDienstplan.then(function(dienstplan) {




            sqlHandler.neuerDienstplan(dienstplan)
              .then(function(dienstplanDB) {
                if (dienstplanDB === undefined) res.status(400).send("Dienstplan konnte nicht erstellt werden");
                else {
                  //  res.status(201).send(dienstplanDB);

                  korrigiereSchichtzuweisungen(dienstplan).then(function(finalerDienstplan) {
                    res.status(201).send(finalerDienstplan);
                  });


                }

              })
              .catch(function(err) {
                res.status(400).send(err);
              });
          });
        }).catch(function(err) { //
          console.log(err); //
        })
    }).catch(function(msg) {
      res.status(404).send(msg);
    })






});






// PUT Schichtzuweisung
router.put('/:id/:date/:schicht', (req, res) => {
  //sqlHandler


});




// Aktuallisieren eines Dienstplans
router.put('/:id', (req, res) => {
  //  DB req
  if (dienstplanListe === undefined) res.status(500).send("Could not read DATA");
  else { // Kann auch mit der ID direkt in der DB gesucht werden.
    const dienst = dienstplanListe.find(c => c.id === parseInt(req.params.id)); // Datenbank anbindung fehlt noch
    if (!dienst) {
      res.status(404).send("Kein Dienstplan mit der angebenen ID vorhanden!");
    } else {
      const dienstplanUpdate = {
        stationID: req.body.stationID, // noch in Datenbank hinzufügen
        datumBeginn: req.body.datumBeginn,
        datumEnde: req.body.datumEnde,
      };
      // insert into DB (dienstplanUpdate)

      res.status(200).send(dienstplanUpdate);
    }
  }
});

// Löschen eines Dienstplans
router.delete('/:id', (req, res) => {
  if (dienstplanListe === undefined) res.status(500).send("Could not read DATA");
  else { // Kann auch direkt aus der DB gelöscht werden.
    const dienstplanLoeschen = dienstplanListe.find(c => c.id === parseInt(req.params.id));

    if (!dienstplanLoeschen) res.status(404).send("Kein Dienstplan mit der angebenen ID vorhanden!");

    else {
      // DELETE from DB
      res.status(200).send("Dienstplan geloescht");
    }
  }

});






// TEST FUNKTION!

router.get('/wuensche/:stationID', (req, res) => {
  sqlHandler.getWuenscheStation(req.params.stationID)
    .then(function(wunschListe) {
      if (wunschListe === undefined) res.status(500).send("Could not read DATA");
      else {
        var test = wunschListe;
        res.status(200).send(test);
      }
    })
    .catch(function(err) {
      res.status(400).send(err);
    });

});









module.exports = router;
