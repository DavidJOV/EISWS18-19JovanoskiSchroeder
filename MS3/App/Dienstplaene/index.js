var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var sqlHandler = require("../helper/sqlHandler");




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
    .then(function(dienstplan){
            res.status(200).send(dienstplan);
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
});

// Get auf einen einzelnen Tag eines Dienstplans
router.get('/:id/:tagId', (req, res) => {
    //DB req auf alle Dienstpläne
    if (dienstplanListe === undefined) res.status(500).send("Could not read DATA");
    else {// Kann auch mit der ID direkt in der DB gesucht werden.
        const dienst = dienstplanListe.find(c => c.id === parseInt(req.params.id)); // Datenbank anbindung fehlt noch
        if (!dienst) { res.status(404).send("Kein Dienstplan mit der angebenen ID vorhanden!"); }

        else {
          const tag = dienst.monatsTage.find(c => c.id === parseInt(req.params.tagId));
          if (!tag) { res.status(404).send("Kein Tag mit der angebenen ID vorhanden!"); }
            else {res.status(200).send(tag);}
        }
    }
});

// Erstellen eines neuen Dienstplan
router.post('/', bodyParser.json(), (req, res) => {


  //var schichtzuweisung = new Object();

  //var tag = new Object();

  // Schichtzuweiseungen -> Mitarbeiter eingeteilt (fair) -> Schichten Tagen zuordnen (Fair, Wünsche, Konrtolle Gesetze) -> Tage ins Array

    const dienstplan = {
        stationID: req.body.stationID, // noch in Datenbank hinzufügen
        datumBeginn: req.body.datumBeginn,
        datumEnde: req.body.datumEnde,
        monatsTage: []
    };
    // Neuen Dienstplan in DB schreiben
    res.status(201).send(dienstplan);
});






// PUT Schichtzuweisung
router.put('/:id/:tagId/:schichtzuweisungId', (req, res) => {
//sqlHandler


  });




// Aktuallisieren eines Dienstplans
router.put('/:id', (req, res) => {
    //  DB req
    if (dienstplanListe === undefined) res.status(500).send("Could not read DATA");
    else { // Kann auch mit der ID direkt in der DB gesucht werden.
        const dienst = dienstplanListe.find(c => c.id === parseInt(req.params.id)); // Datenbank anbindung fehlt noch
        if (!dienst) { res.status(404).send("Kein Dienstplan mit der angebenen ID vorhanden!"); }

        else {
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
module.exports = router;
