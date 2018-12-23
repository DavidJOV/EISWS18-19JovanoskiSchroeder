var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// Get auf die Liste der Abwesenheiten
router.get('/', (req, res) => {
    //DB req auf alle Abwesenheiten
    if (abwesenheitenListe === undefined) res.status(500).send("Could not read DATA");
    else {
        res.status(200).send(abwesenheitenListe);
    }
});

// Get auf eine einzelne Abwesenheit
router.get('/:id', (req, res) => {
    //DB req auf alle Abwesenheiten
    if (abwesenheitenListe === undefined) res.status(500).send("Could not read DATA");
    else {// Kann auch mit der ID direkt in der DB gesucht werden.
        const abwesenheit = abwesenheitenListe.find(c => c.id === parseInt(req.params.id)); // Datenbank anbindung fehlt noch. AbwesenheitenListe muss aus DB gelesen werden.
        if (!abwesenheit) { res.status(404).send("Diese ID gehört keiner Abwesenheit!"); }

        else {
            res.status(200).send(abwesenheit);
        }
    }
});

// Erstellen einer neuen Abwesenheit
router.post('/', bodyParser.json(), (req, res) => {

    const abwesenheit = {
        stationID: req.body.stationID, // noch in Datenbank hinzufügen
        MitarbeiterID: req.body.MitarbeiterID,
        datumBeginn: req.body.datumBeginn,
        datumEnde: req.body.datumEnde
    };
    // Neue Abwesenheit in DB schreiben
    res.status(201).send(abwesenheit);
});

// Aktuallisieren einer Abwesenheit 
router.put('/:id', (req, res) => {
    // hier müsste ein DB req abwesenheiten Erfolgen
    if (abwesenheitenListe === undefined) res.status(500).send("Could not read DATA");
    else { // Kann auch mit der ID direkt in der DB gesucht werden.
        const abwesenheit = abwesenheitenListe.find(c => c.id === parseInt(req.params.id)); // Datenbank anbindung fehlt noch. MitarbeiterListe muss aus DB gelesen werden.
        if (!abwesenheit) { res.status(404).send("Diese ID gehört keiner Abwesenheit!"); }

        else {
            const abwesenheitUpdate = {
                stationID: req.body.stationID, // noch in Datenbank hinzufügen
                MitarbeiterID: req.body.MitarbeiterID,
                datumBeginn: req.body.datumBeginn,
                datumEnde: req.body.datumEnde
            };
            // insert into DB (abwesenheitUpdate)

            res.status(200).send(abwesenheitUpdate);
        }
    }
});

// Löschen einer Abwesenheit
router.delete('/:id', (req, res) => {
    if (abwesenheitenListe === undefined) res.status(500).send("Could not read DATA");
    else { // Kann auch direkt aus der DB gelöscht werden.
        const abwesenheitLoeschen = abwesenheitenListe.find(c => c.id === parseInt(req.params.id));

        if (!abwesenheitLoeschen) res.status(404).send("Diese ID gehoert zu keiner Abwesenheit!");

        else {
            // DELETE from DB
            res.status(200).send("Abwesenheit geloescht");
        }
    }
});
module.exports = router;