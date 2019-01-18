var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var sqlHandler = require("../helper/sqlHandler.js");
var controller = require("../helper/controller.js");


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


// Get auf einen einzelnen Dienstplan mit Hilfe von Query-Parametern
router.get('/', (req, res) => {
  sqlHandler.getDienstplanByDate(req.query.monat, req.query.jahr)
    .then(function(dienstplan) {
      res.status(200).send(dienstplan);
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
});


// Erstellen eines neuen Dienstplan
router.post('/', bodyParser.json(), (req, res) => {

  controller.erstelleDienstplan(req.body.monat, req.body.jahr, req.body.stationID)
    .then(function(dienstplan) {
      res.status(201).send(dienstplan)

    }).catch(function(err) { //
      res.status(400).send(err); //
    })

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


// TEST FUNKTION! ( Nicht benutzt )
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
