var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var sqlHandler = require("../helper/sqlHandler");

// Get auf die Liste der Tauschanfragen
router.get('/', (req, res) => {
  sqlHandler.getTauschanfragen()
    .then(function(tauschListe) {
      if (tauschListe === undefined) res.status(500).send("Could not read DATA");
      else {
        res.status(200).send(tauschListe);
      }
    })
    .catch(function(error) {
      res.status(400).send(error);
    });
});

// Get auf eine einzelne Tauschanfrage
router.get('/:id', (req, res) => {
  sqlHandler.getTauschanfragen()
    .then(function(tauschListe) {
      if (tauschListe === undefined) res.status(500).send("Could not read DATA");
      else {
        const tausch = tauschListe.find(c => c.id === parseInt(req.params.id)); //Filtern nach der ID
        if (!tausch) {
          res.status(404).send("Diese ID gehört keiner Tauschanfrage!");
        } else {
          res.status(200).send(tausch);
        }
      }
    })
    .catch(function(error) {
      res.status(400).send(error);
    });

});

// Erstellen einer neuen Tauschanfrage
router.post('/', bodyParser.json(), (req, res) => {

  const schichttausch = {
    stationID: req.body.stationID,
    mitarbeiterID: req.body.mitarbeiterID,
    datumTausch: req.body.datumTausch,
    tauschStatus: 0
  };
  sqlHandler.neueTauschanfrage(schichttausch)
    .then(function(schichttausch) {
      if (schichttausch === undefined) res.status(400).send("Tauschanfrage konnte nicht erstellt werden");
      else {
        res.status(201).send(schichttausch);
      }

    })
    .catch(function(err) {
      res.status(400).send(err);
    });

});

// Aktuallisieren einer Tauschanfrage
router.put('/:id', (req, res) => {
  sqlHandler.getTauschanfragen()
    .then(function(tauschListe) {
      if (tauschListe === undefined) res.status(500).send("Could not read DATA");
      else {
        const tausch = tauschListe.find(c => c.id === parseInt(req.params.id));
        if (!tausch) {
          res.status(404).send("Diese ID gehört keiner Tauschanfrage!");
        } else {
          const tauschUpdate = {
            tauschStatus: req.body.tauschStatus
          };
          let id = req.params.id;

          sqlHandler.updateTauschanfrage(id, tauschUpdate)
            .then(function(tauschUpdate) {
              res.status(200).send(tauschUpdate);

            })
            .catch(function(err) {
              res.status(400).send(err);
            })
        }
      }

    })
    .catch(function(err) {
      res.status(400).send(err);
    });

});

// Löschen einer Tauschanfrage
router.delete('/:id', (req, res) => {
  sqlHandler.loescheTauschanfrage(req.params.id)
    .then(function(result) {
      // Prüfen ob in der DB etwas verändert wurde
      if (result.affectedRows < 1) res.status(404).send("Die ID gehoert zu keiner Tauschanfrage, oder es bestehen noch Verbindungen die das Löschen verhindern!");

      else {
        res.status(200).send("Tauschanfrage geloescht");
      }
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
});

module.exports = router;
