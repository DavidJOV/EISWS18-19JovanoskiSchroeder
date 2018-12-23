var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
//var dbConnection = require("../../DB/dbConnector"); // importieren der DB Verbindung
//var sqlHandler = require("../../helper/sqlHandler");

var hello = "hello world";

//var connection = dbConnection.connection; // DB Verbindung
// GET auf die Liste aller Mitarbeiter
router.get('/', (req, res) => {
    if (mitarbeiterListe === undefined) res.status(500).send("Could not read DATA");
    else {
        res.status(200).send(mitarbeiterListe);
    }
});

// GET auf einen einzelnen Mitarbeiter // DB anbindung fehlt noch
router.get('/:id', (req, res) => {
    if (mitarbeiterListe === undefined) res.status(500).send("Could not read DATA");
    else {// Kann auch mit der ID direkt in der DB gesucht werden.
        const mitarbeiter = mitarbeiterListe.find(c => c.id === parseInt(req.params.id)); // Datenbank anbindung fehlt noch. MitarbeiterListe muss aus DB gelesen werden.
        if (!mitarbeiter) { res.status(404).send("Diese ID gehört keinem Mitarbeiter!"); }

        else {
            res.status(200).send(mitarbeiter);
        }
    }
});
// Update eines einzelnen Mitarbeiters
router.put('/:id', (req, res) => {
    if (mitarbeiterListe === undefined) res.status(500).send("Could not read DATA");
    else { // Kann auch mit der ID direkt in der DB gesucht werden.
        const mitarbeiter = mitarbeiterListe.find(c => c.id === parseInt(req.params.id)); // Datenbank anbindung fehlt noch. MitarbeiterListe muss aus DB gelesen werden.
        if (!mitarbeiter) { res.status(404).send("Diese ID gehört keinem Mitarbeiter!"); }

        else {
            const mitarbeiterUpdate = {
                stationID: req.body.stationID, // noch in Datenbank hinzufügen
                anrede: req.body.anrede,
                vorname: req.body.vorname,
                name: req.body.name,
                rolle: req.body.rolle,
                beschaeftigungsArt: req.body.beschaeftigungsArt,
                beschaeftigungsBeginn: req.body.beschaeftigungsBeginn,
                dienstplanRating: req.body.dienstplanRating,
                wunschRating: req.body.wunschRating
            };

            // Insert into DB (mitarbeiterUpdate)

            res.status(200).send(mitarbeiterUpdate);
        }
    }
});

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
        wunschRating: 0
    };
    res.status(201).send(mitarbeiter);
    /*
        sqlHandler.neuerPfleger(krankenpfleger)
            .then(function (pfleger) {
                res.status(200).send(pfleger);
            }).catch(function () {
                res.status(400).send("Error");
            });*/
});
// Löschen eines Mitarbeiters
router.delete('/:id', (req, res) => {
    if (mitarbeiterListe === undefined) res.status(500).send("Could not read DATA");
    else { // Kann auch direkt aus der DB gelöscht werden.
        const mitarbeiterLoeschen = mitarbeiterListe.find(c => c.id === parseInt(req.params.id));

        if (!mitarbeiterLoeschen) res.status(404).send("Die ID gehoert zu keinem Mitarbeiter!");

        else {
            // DELETE from DB
            res.status(200).send("Mitarbeiter geloescht");
        }
    }
});
// Übertragen der Überstunden eines einzelenen Mitarbeiters
router.get('/:id/ueberstunden', (req, res) => {
    // hier müsste ein DB req überstunenden erfolgen
    if (mitarbeiterUeberstunden === undefined) res.status(404).send("Diese ID gehört keinem Mitarbeiter!");
    else {
        res.status(200).send(mitarbeiterUeberstunden);
    }

});

// Erstellen der Überstunden eines einzelenen Mitarbeiters
router.post('/:id/ueberstunden', (req, res) => {
    // hier müsste ein DB req mitarbeiter Erfolgen
    if (mitarbeiterListe === undefined) res.status(500).send("Could not read DATA");
    else { // Kann auch mit der ID direkt in der DB gesucht werden.
        const mitarbeiter = mitarbeiterListe.find(c => c.id === parseInt(req.params.id)); // Datenbank anbindung fehlt noch. MitarbeiterListe muss aus DB gelesen werden.
        if (!mitarbeiter) { res.status(404).send("Diese ID gehört keinem Mitarbeiter!"); }

        else {
            if (mitarbeiter.ueberstunden === undefined) {
            mitarbeiter.ueberstunden = req.body.ueberstunden;
                res.status(200).send(mitarbeiter.ueberstunden);
            }
            else {
                res.status(409).send("Der Mitarbeiter hat bereits einen Überstunden Feld");
            }
        }
    }
});

// Aktuallisieren der Überstunden eines einzelenen Mitarbeiters
router.put('/:id/ueberstunden', (req, res) => {
    // hier müsste ein DB req mitarbeiter Erfolgen
    if (mitarbeiterListe === undefined) res.status(500).send("Could not read DATA");
    else { // Kann auch mit der ID direkt in der DB gesucht werden.
        const mitarbeiter = mitarbeiterListe.find(c => c.id === parseInt(req.params.id)); // Datenbank anbindung fehlt noch. MitarbeiterListe muss aus DB gelesen werden.
        if (!mitarbeiter) { res.status(404).send("Diese ID gehört keinem Mitarbeiter!"); }

        else {
            if (mitarbeiter.ueberstunden != undefined) {
            mitarbeiter.ueberstunden += req.body.ueberstunden;
                res.status(200).send(mitarbeiter.ueberstunden);
            }
            else {
                res.status(409).send("Der Mitarbeiter hat noch kein Überstunden Feld");
            }
        }
    }
});











module.exports = router;