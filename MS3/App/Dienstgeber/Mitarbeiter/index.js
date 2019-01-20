var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var sqlHandler = require("../helper/sqlHandler");



// GET auf die Liste aller Mitarbeiter
router.get('/', (req, res) => {
  sqlHandler.getMitarbeiter()
    .then(function(mitarbeiterListe) {
      if (mitarbeiterListe === undefined) res.status(500).send("Could not read DATA");
      else {

        res.status(200).send(mitarbeiterListe);
      }
    })
    .catch(function(error) {
      res.status(400).send(error);
    });

});

// GET auf einen einzelnen Mitarbeiter
router.get('/:id', (req, res) => {
  sqlHandler.getMitarbeiter()
    .then(function(mitarbeiterListe) {
      if (mitarbeiterListe === undefined) res.status(500).send("Could not read DATA");
      else {
        const mitarbeiter = mitarbeiterListe.find(c => c.id === parseInt(req.params.id));
        if (!mitarbeiter) {
          res.status(404).send("Diese ID gehört keinem Mitarbeiter!");
        } else {
          res.status(200).send(mitarbeiter);
        }
      }
    })
    .catch(function(error) {
      res.status(400).send(error);
    });

});


// Update eines einzelnen Mitarbeiters
router.put('/:id', (req, res) => {
  sqlHandler.getMitarbeiter()
    .then(function(mitarbeiterListe) {

      if (mitarbeiterListe === undefined) res.status(500).send("Could not read DATA");
      else {
        const mitarbeiter = mitarbeiterListe.find(c => c.id === parseInt(req.params.id));
        if (!mitarbeiter) {
          res.status(404).send("Diese ID gehört keinem Mitarbeiter!");
        } else {
          const mitarbeiterUpdate = {
            id: mitarbeiter.id,
            anrede: req.body.anrede,
            vorname: req.body.vorname,
            name: req.body.name,
            rolle: req.body.rolle,
            beschaeftigungsArt: req.body.beschaeftigungsArt
          };

          // Update into DB (mitarbeiterUpdate)
          sqlHandler.updateMitarbeiter(mitarbeiterUpdate)
            .then(function(mitarbeiterUpdate) {
              res.status(200).send(mitarbeiterUpdate);

            })
            .catch(function(err) {
              res.status(400).send(err);
            })
        }
      }

    })
    .catch(function(error) {
      res.status(400).send(error);
    });

})


// Erstellen eines neuen Mitarbeiters
router.post('/', bodyParser.json(), (req, res) => {
  console.log(req.body)
  const mitarbeiter = {
    stationID: req.body.stationID,
    anrede: req.body.anrede,
    vorname: req.body.vorname,
    name: req.body.name,
    rolle: req.body.rolle,
    beschaeftigungsArt: req.body.beschaeftigungsArt,
    beschaeftigungsBeginn: req.body.beschaeftigungsBeginn,
    dienstplanRating: 0,
    wunschRating: 0,
    ueberstunden: 0
  };

  sqlHandler.neuerMitarbeiter(mitarbeiter)
    .then(function(mitarbeiter) {
      if (mitarbeiter === undefined) res.status(400).send("Mitarbeiter konnte nicht erstellt werden");
      else {
        res.status(201).send(mitarbeiter);
      }

    })
    .catch(function(err) {
      res.status(400).send(err);
    });

});


// Löschen eines Mitarbeiters
router.delete('/:id', (req, res) => {
  sqlHandler.loescheMitarbeiter(req.params.id)
    .then(function(result) {
      // Prüfen ob in der DB etwas verändert wurde
      if (result.affectedRows < 1) res.status(404).send("Die ID gehoert zu keinem Mitarbeiter! Oder es Bestehen noch Verbindungen die das Löschen verhindern!");

      else {
        res.status(200).send("Mitarbeiter geloescht");
      }
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
});


// Übertragen des WunschRatings eines einzelenen Mitarbeiters
router.get('/:id/wunschRating', (req, res) => {
  sqlHandler.getMitarbeiter()
    .then(function(mitarbeiterListe) {
      if (mitarbeiterListe === undefined) res.status(500).send("Could not read DATA");
      else {
        const mitarbeiter = mitarbeiterListe.find(c => c.id === parseInt(req.params.id));
        if (!mitarbeiter) {
          res.status(404).send("Diese ID gehört keinem Mitarbeiter!");
        } else {
          res.status(200).send(mitarbeiter.wunschRating.toString());
        }
      }
    })
    .catch(function(err) {
      res.status(400).send(err);
    });

});


// Übertragen des DienstplanRatings eines einzelenen Mitarbeiters
router.get('/:id/dienstplanRating', (req, res) => {
  sqlHandler.getMitarbeiter()
    .then(function(mitarbeiterListe) {
      if (mitarbeiterListe === undefined) res.status(500).send("Could not read DATA");
      else {
        const mitarbeiter = mitarbeiterListe.find(c => c.id === parseInt(req.params.id));
        if (!mitarbeiter) {
          res.status(404).send("Diese ID gehört keinem Mitarbeiter!");
        } else {
          res.status(200).send(mitarbeiter.dienstplanRating.toString());
        }
      }
    })
    .catch(function(err) {
      res.status(400).send(err);
    });

});


// Übertragen der Überstunden eines einzelenen Mitarbeiters
router.get('/:id/ueberstunden', (req, res) => {
  sqlHandler.getMitarbeiter()
    .then(function(mitarbeiterListe) {
      if (mitarbeiterListe === undefined) res.status(500).send("Could not read DATA");
      else {
        const mitarbeiter = mitarbeiterListe.find(c => c.id === parseInt(req.params.id));
        if (!mitarbeiter) {
          res.status(404).send("Diese ID gehört keinem Mitarbeiter!");
        } else {
          res.status(200).send(mitarbeiter.ueberstunden.toString());
        }
      }
    })
    .catch(function(err) {
      res.status(400).send(err);
    });

});


//Post Wunsch eines Mitarbeiters
router.post('/wuensche', (req, res) => {

  var wunsch = {
    stationID: req.body.stationID,
    mitarbeiterID: req.body.mitarbeiterID,
    datumWunsch: req.body.datumWunsch,
    wunschBeschreibung: req.body.wunschBeschreibung,
    schichtArt: req.body.schichtArt
  };

  sqlHandler.neuerWunsch(wunsch)
    .then(function(wunsch) {
      if (wunsch === undefined) res.status(400).send("Wunsch konnte nicht erstellt werden");
      else {
        res.status(201).send(wunsch);
      }

    })
    .catch(function(err) {
      res.status(400).send(err);
    });

});


// Aktuallisieren des Wunsch Ratings
router.put('/:id/wunschRating', (req, res) => {
  sqlHandler.updateWunschRating(req.params.id, req.body.wunschRating)
    .then(function(wunschRatingUpdate) {
      if (wunschRatingUpdate.affectedRows < 1) res.status(500).send("Could not change DATA");
      else {
        res.status(200).send(wunschRatingUpdate);
      }
    })
    .catch(function(err) {
      res.status(400).send(err);
    });

});


// Aktuallisieren des Dienstplan Ratings
router.put('/:id/dienstplanRating', (req, res) => {
  sqlHandler.updateDienstplanRating(req.params.id, req.body.dienstplanRating)
    .then(function(dienstplanRatingUpdate) {
      if (dienstplanRatingUpdate.affectedRows < 1) res.status(500).send("Could not change DATA");
      else {
        res.status(200).send(dienstplanRatingUpdate);
      }
    })
    .catch(function(err) {
      res.status(400).send(err);
    });

});


// Aktuallisieren der Überstunden eines einzelenen Mitarbeiters
router.put('/:id/ueberstunden', (req, res) => {
  sqlHandler.updateUeberstunden(req.params.id, req.body.ueberstunden)
    .then(function(ueberstundenUpdate) {
      if (ueberstundenUpdate.affectedRows < 1) res.status(500).send("Could not change DATA");
      else {
        res.status(200).send(ueberstundenUpdate);
      }
    })
    .catch(function(err) {
      res.status(400).send(err);
    });

});


// GET auf die Ersatzanfragen des Mitarbeiters
router.get('/:id/ersatzanfragen', (req, res) => {
  sqlHandler.getErsatzanfragen(req.params.id)
    .then(function(ersatzanfragen) {
      if (ersatzanfragen === undefined) res.status(404).send("Keine Ersatzanfragen vorhanden!");
      else {
        res.status(200).send(ersatzanfragen);

      }
    })
    .catch(function(error) {
      res.status(400).send(error);
    });

});

// GET auf die Ersatzeintragungen des Mitarbeiters
router.get('/:id/ersatzeintragungen', (req, res) => {
  sqlHandler.getErsatzeintragung(req.params.id)
    .then(function(ersatzeintragung) {
      if (ersatzeintragung === undefined) res.status(404).send("Keine Ersatzeintragungen vorhanden!");
      else {
        res.status(200).send(ersatzeintragung);

      }
    })
    .catch(function(error) {
      res.status(400).send(error);
    });

});


// POST auf Ersatzeintragung (Nach Annahme einer Ersatzanfrage)
router.post('/:mitarbeiterID/ersatzeintragungen', (req, res) => {

  var ersatzAnfrage = {
    stationID: "",
    mitarbeiterID: req.params.mitarbeiterID,
    abwesenheitsmeldungID: req.body.abwesenheitsmeldungID,
    datumUebernahme: req.body.datumUebernahme,
    schichtArt: req.body.schichtArt,
    zuErsetzenderMitarbeiter: ""
  }
  sqlHandler.getAbwesenheitenByID(ersatzAnfrage.abwesenheitsmeldungID)
    .then(function(abwesenheit) {
      //console.log(abwesenheit)
      var ersatzAnfragePromise = new Promise(function(resolve, reject) {


        ersatzAnfrage.zuErsetzenderMitarbeiter = abwesenheit[0].MitarbeiterID;
        ersatzAnfrage.stationID = abwesenheit[0].stationID;

        if (ersatzAnfrage.stationID != undefined && ersatzAnfrage.zuErsetzenderMitarbeiter != undefined) {
          resolve(ersatzAnfrage)

        } else {
          reject(err)
          console.log(err)
        }

      }) // Promise ersatzAnfragePromise
      ersatzAnfragePromise.then(function(ersatzAnfrage) {
        console.log(0)
        sqlHandler.neueErsatzeintragung(ersatzAnfrage)
          .then(function(ersatzeintragung) {
            console.log(1)
            sqlHandler.updateSchichtzuweisungErsatz(ersatzeintragung.datumUebernahme, ersatzeintragung.schichtArt, ersatzAnfrage.zuErsetzenderMitarbeiter, ersatzeintragung.mitarbeiterID)
              .then(function() {
                console.log(2)

                sqlHandler.updateUeberstunden(ersatzeintragung.mitarbeiterID, 8)
                  .then(function() {
                     console.log(ersatzAnfrage)
                    sqlHandler.loescheErsatzanfrage(ersatzAnfrage.abwesenheitsmeldungID, ersatzAnfrage.datumUebernahme)
                      .then(function() {
                        res.status(201).send("Ersatzanfrage angenommen und Diensplan erfolgreich aktualisiert")

                      }).catch(function(error) {
                        res.status(400).send(error);
                      });


                  }).catch(function(error) {
                    res.status(400).send(error);
                  });

              }).catch(function(error) {
                res.status(400).send(error);
              });


          }).catch(function(error) {
            res.status(400).send(error);
          });
      }) // then ersatzAnfragePromise
    }).catch(function(error) {
      res.status(400).send(error);
    });

});


// Löschen einer Ersatzanfrage von Mitarbeiter x
router.delete('/:mitarbeiterID/ersatzeintragungen', (req, res) => {

  var ersatzAnfrage = {
    mitarbeiterID: req.params.mitarbeiterID,
    abwesenheitsmeldungID: req.body.abwesenheitsmeldungID,
    datumUebernahme: req.body.datumUebernahme,
  }

  sqlHandler.loescheErsatzanfrageEinzeln(ersatzAnfrage.abwesenheitsmeldungID, ersatzAnfrage.datumUebernahme, ersatzAnfrage.mitarbeiterID)
    .then(function() {

      res.status(204).send("Ersatzanfrage abgelehnt");

    }).catch(function(error) {
      res.status(400).send(error);
    });

});


module.exports = router;
