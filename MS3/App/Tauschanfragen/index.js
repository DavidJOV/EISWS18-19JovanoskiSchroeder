var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// Get auf die Liste der Tauschanfragen
router.get('/', (req, res) => {
    //DB req auf alle Abwesenheiten
    if (tauschListe === undefined) res.status(500).send("Could not read DATA");
    else {
        res.status(200).send(tauschListe);
    }
});

// Get auf eine einzelne Tauschanfrage
router.get('/:id', (req, res) => {
    //DB req auf alle Tauschanfrage
    if (tauschListe === undefined) res.status(500).send("Could not read DATA");
    else {// Kann auch mit der ID direkt in der DB gesucht werden.
        const tausch = tauschListe.find(c => c.id === parseInt(req.params.id)); // Datenbank anbindung fehlt noch. Tauschanfrage muss aus DB gelesen werden.
        if (!tausch) { res.status(404).send("Diese ID gehört zu keiner Tauschanfrage!"); }

        else {
            res.status(200).send(tausch);
        }
    }
});

// Erstellen einer neuen Tauschanfrage
router.post('/', bodyParser.json(), (req, res) => {

    const schichttausch = {
        stationID: req.body.stationID, // noch in Datenbank hinzufügen
        MitarbeiterID: req.body.MitarbeiterID,
        datumTausch: req.body.datumTausch,
        tauschStatus: 0
    };
    // Neue Tauschanfrage in DB schreiben
    res.status(201).send(schichttausch);
});

// Aktuallisieren einer Tauschanfrage
router.put('/:id', (req, res) => {
    // hier müsste ein DB req Tauschanfrage Erfolgen
    if (tauschListe === undefined) res.status(500).send("Could not read DATA");
    else { // Kann auch mit der ID direkt in der DB gesucht werden.
        const tausch = tauschListe.find(c => c.id === parseInt(req.params.id)); // Datenbank anbindung fehlt noch. TauschListe muss aus DB gelesen werden.
        if (!tausch) { res.status(404).send("Diese ID gehört keiner Tauschanfrage!"); }

        else {
            const tauschUpdate = {
                stationID: req.body.stationID, // noch in Datenbank hinzufügen
                MitarbeiterID: req.body.MitarbeiterID,
                datumTausch: req.body.datumTausch,
                tauschStatus: req.body.tauschStatus
            };
            // insert into DB (tauschUpdate)

            res.status(200).send(tauschUpdate);
        }
    }
});

// Löschen einer Tauschanfrage
router.delete('/:id', (req, res) => {
    if (tauschListe === undefined) res.status(500).send("Could not read DATA");
    else { // Kann auch direkt aus der DB gelöscht werden.
        const tauschLoeschen = tauschListe.find(c => c.id === parseInt(req.params.id));

        if (!tauschLoeschen) res.status(404).send("Diese ID gehoert zu keiner Tauschanfrage!");

        else {
            // DELETE from DB
            res.status(200).send("Tauschanfrage geloescht");
        }
    }
});
module.exports = router;
