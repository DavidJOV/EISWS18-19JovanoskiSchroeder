var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var dbConnection = require("../DB/dbConnector"); // importieren der DB Verbindung
var sqlHandler = require("../helper/sqlHandler");


//var connection = dbConnection.connection; // DB Verbindung
// GET auf die Liste aller Mitarbeiter
router.get('/', (req, res) => {
    sqlHandler.getMitarbeiter()
        .then(function (mitarbeiterListe) { // <- So ist es richtig! Noch bei den anderen Funktionen ändern!!!!
            if (mitarbeiterListe === undefined) res.status(500).send("Could not read DATA");
            else {
                
                res.status(200).send(mitarbeiterListe);
            }
        })
        .catch(function (error) {
            res.status(400).send(error);
        });

});

// GET auf einen einzelnen Mitarbeiter 
router.get('/:id', (req, res) => {
   sqlHandler.getMitarbeiter()
        .then(function (mitarbeiterListe) {
            if (mitarbeiterListe === undefined) res.status(500).send("Could not read DATA");
            else {// Kann auch mit der ID direkt in der DB gesucht werden.
                const mitarbeiter = mitarbeiterListe.find(c => c.id === parseInt(req.params.id)); // Datenbank anbindung fehlt noch. MitarbeiterListe muss aus DB gelesen werden.
                if (!mitarbeiter) { res.status(404).send("Diese ID gehört keinem Mitarbeiter!"); }

                else {
                    res.status(200).send(mitarbeiter);
                }
            }
        })
        .catch(function (error) {
            res.status(400).send(error);
        });

});
// Update eines einzelnen Mitarbeiters
router.put('/:id', (req, res) => {
    sqlHandler.getMitarbeiter()
        .then(function (mitarbeiterListe) {

            if (mitarbeiterListe === undefined) res.status(500).send("Could not read DATA");
            else {
                const mitarbeiter = mitarbeiterListe.find(c => c.id === parseInt(req.params.id));
                if (!mitarbeiter) { res.status(404).send("Diese ID gehört keinem Mitarbeiter!"); }

                else {
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
                        .then(function (mitarbeiterUpdate) {
                            res.status(200).send(mitarbeiterUpdate);

                        })
                        .catch(function (err) {
                            res.status(400).send(err);
                        })
                }
            }

        })
        .catch(function (error) {
            res.status(400).send(error);
        });

})


// Erstellen eines neuen Mitarbeiters
router.post('/', bodyParser.json(), (req, res) => {

    const mitarbeiter = {
        stationID: req.body.stationID, // noch in Datenbank hinzufügen
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
        .then(function (mitarbeiter) {
            if (mitarbeiter === undefined) res.status(400).send("Mitarbeiter konnte nicht erstellt werden");
            else {
                res.status(201).send(mitarbeiter);
            }

        })
        .catch(function (err) {
            res.status(400).send(err);
        });

});
// Löschen eines Mitarbeiters
router.delete('/:id', (req, res) => {
   sqlHandler.loeschenMitarbeiter(req.params.id)
        .then(function (result) {
            // Prüfen ob in der DB etwas verändert wurde
            if (result.affectedRows < 1) res.status(404).send("Die ID gehoert zu keinem Mitarbeiter! Oder es Bestehen noch Verbindungen die das Löschen verhindern!");

            else {
                res.status(200).send("Mitarbeiter geloescht");
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
});


// Übertragen der Überstunden eines einzelenen Mitarbeiters
router.get('/:id/ueberstunden', (req, res) => {
    sqlHandler.getMitarbeiter()
        .then(function (mitarbeiterListe) {
            if (mitarbeiterListe === undefined) res.status(500).send("Could not read DATA");
            else {// Kann auch mit der ID direkt in der DB gesucht werden.
                const mitarbeiter = mitarbeiterListe.find(c => c.id === parseInt(req.params.id));
                if (!mitarbeiter) { res.status(404).send("Diese ID gehört keinem Mitarbeiter!"); }

                else { // Übertragen der Überstunden -> toString() da sonst die Übertragung nicht funktioniert, aber warum ist die Frage?
                   res.status(200).send( mitarbeiter.ueberstunden.toString());
                }
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });

});

// Aktuallisieren des Wunsch Ratings
router.put('/:id/wunschRating', (req, res) => {
    sqlHandler.updateWunschRating(req.params.id, req.body.wunschRating)
        .then(function (wunschRatingUpdate) {
            if (wunschRatingUpdate.affectedRows < 1) res.status(500).send("Could not change DATA");
            else {
                res.status(200).send(wunschRatingUpdate);
            }
        }
        )
        .catch(function (err) {
            res.status(400).send(err);
        });

});

// Aktuallisieren des Dienstplan Ratings
router.put('/:id/dienstplanRating', (req, res) => {
    sqlHandler.updateDienstplanRating(req.params.id, req.body.dienstplanRating)
        .then(function (dienstplanRatingUpdate) {
            if (dienstplanRatingUpdate.affectedRows < 1) res.status(500).send("Could not change DATA");
            else {
                res.status(200).send(dienstplanRatingUpdate);
            }
        }
        )
        .catch(function (err) {
            res.status(400).send(err);
        });

});

// Aktuallisieren der Überstunden eines einzelenen Mitarbeiters
router.put('/:id/ueberstunden', (req, res) => {
    sqlHandler.updateUeberstunden(req.params.id, req.body.ueberstunden)
        .then(function (ueberstundenUpdate) {
            if (ueberstundenUpdate.affectedRows < 1) res.status(500).send("Could not change DATA");
            else {
                res.status(200).send(ueberstundenUpdate);
            }
        }
        )
        .catch(function (err) {
            res.status(400).send(err);
        });

});












module.exports = router;