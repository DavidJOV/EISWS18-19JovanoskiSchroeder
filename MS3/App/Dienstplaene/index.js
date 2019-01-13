var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var sqlHandler = require("../helper/sqlHandler.js");
var controller = require("../helper/controller.js");



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
        .then(function (dienstplan) {
            res.status(200).send(dienstplan);
        })
        .catch(function (err) {
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






/*
// Function -> Verändert Grunddienstplan aus POST nach Erstellung und Speicherung in der DB, sodass Wuensche (evtl. alle anderen Aspekte der fainiss [später]) berücksichtigt werden
var korrigiereSchichtzuweisungen = function korrigiereSchichtzuweisungen(dienstplan) { //"dienstplan" ist ein Objekt, mit dem auch ein Dienstplan erstellt werden kann -> Bei POST verwendet, um den DP in die Datenbank zu schreiben.
  return new Promise(function (resolve, reject) {
    if (dienstplan.monat < 10) {
      var monat = "-0" + dienstplan.monat + "-";
    }
    var monat = "-" + dienstplan.monat + "-";


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


    sqlHandler.getWuenscheStation(dienstplan.stationID, monat)
      .then(function (wunschListe) {
        if (wunschListe.length == 0) {

          console.log("Keine Wuensche auf dieser Station vorhanden!");
          resolve(-1);
        }
        else {
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


                  for (var j = 0; j < mitarbeiterWuenscheListe.length; j++) {
                    for (var i = 0; i < elements.length; i++) {


                      if ((mitarbeiterWuenscheListe[j].datumWunsch == elements[i].datum) && (mitarbeiterWuenscheListe[j].mitarbeiterID == elements[i].mitarbeiterID1)) {
                        schichtzuweisungUpdate.mitarbeiterID1 = 0; // ID +1 ??? Welcher MA soll die Schicht dann übernehmen?
                        schichtzuweisungUpdate.mitarbeiterID2 = elements[i].mitarbeiterID2;
                        schichtzuweisungUpdate.mitarbeiterID3 = elements[i].mitarbeiterID3;
                        schichtzuweisungUpdate.mitarbeiterID4 = elements[i].mitarbeiterID4;

                        sqlHandler.updateSchichtzuweisung(elements[i].datum, elements[i].schichtArt, schichtzuweisungUpdate)
                          .then(function (schichtzuweisung) {
                            if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht aktualisiert werden");
                          })
                          .catch(function (err) {
                            console.log(err);
                          })
                      } else if ((mitarbeiterWuenscheListe[j].datumWunsch == elements[i].datum) && (mitarbeiterWuenscheListe[j].mitarbeiterID == elements[i].mitarbeiterID2)) {
                        schichtzuweisungUpdate.mitarbeiterID1 = elements[i].mitarbeiterID1;
                        schichtzuweisungUpdate.mitarbeiterID2 = 0; // ID +1 ??? Welcher MA soll die Schicht dann übernehmen?
                        schichtzuweisungUpdate.mitarbeiterID3 = elements[i].mitarbeiterID3;
                        schichtzuweisungUpdate.mitarbeiterID4 = elements[i].mitarbeiterID4;

                        sqlHandler.updateSchichtzuweisung(elements[i].datum, elements[i].schichtArt, schichtzuweisungUpdate)
                          .then(function (schichtzuweisung) {
                            if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht aktualisiert werden");
                          })
                          .catch(function (err) {
                            console.log(err);
                          })
                      } else if ((mitarbeiterWuenscheListe[j].datumWunsch == elements[i].datum) && (mitarbeiterWuenscheListe[j].mitarbeiterID == elements[i].mitarbeiterID3)) {
                        schichtzuweisungUpdate.mitarbeiterID1 = elements[i].mitarbeiterID1;
                        schichtzuweisungUpdate.mitarbeiterID2 = elements[i].mitarbeiterID2;
                        schichtzuweisungUpdate.mitarbeiterID3 = 0; // ID +1 ??? Welcher MA soll die Schicht dann übernehmen?
                        schichtzuweisungUpdate.mitarbeiterID4 = elements[i].mitarbeiterID4;

                        sqlHandler.updateSchichtzuweisung(elements[i].datum, elements[i].schichtArt, schichtzuweisungUpdate)
                          .then(function (schichtzuweisung) {
                            if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht aktualisiert werden");
                          })
                          .catch(function (err) {
                            console.log(err);
                          })
                      } else if ((mitarbeiterWuenscheListe[j].datumWunsch == elements[i].datum) && (mitarbeiterWuenscheListe[j].mitarbeiterID == elements[i].mitarbeiterID4)) {
                        schichtzuweisungUpdate.mitarbeiterID1 = elements[i].mitarbeiterID1;
                        schichtzuweisungUpdate.mitarbeiterID2 = elements[i].mitarbeiterID2;
                        schichtzuweisungUpdate.mitarbeiterID3 = elements[i].mitarbeiterID3;
                        schichtzuweisungUpdate.mitarbeiterID4 = 0; // ID +1 ??? Welcher MA soll die Schicht dann übernehmen?

                        sqlHandler.updateSchichtzuweisung(elements[i].datum, elements[i].schichtArt, schichtzuweisungUpdate)
                          .then(function (schichtzuweisung) {
                            if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht aktualisiert werden");
                          })
                          .catch(function (err) {
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



  });// end of return new Promise ...

} // end of function
*/
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





    controller.erstelleDienstplan(req.body.monat, req.body.jahr, req.body.stationID)
        .then(function (dienstplan) {
            res.status(201).send(dienstplan)



        }).catch(function (err) { //
            res.status(400).send(err); //
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
        .then(function (wunschListe) {
            if (wunschListe === undefined) res.status(500).send("Could not read DATA");
            else {
                var test = wunschListe;
                res.status(200).send(test);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });

});









module.exports = router;
