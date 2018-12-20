var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
//var dbConnection = require("../../DB/dbConnector"); // importieren der DB Verbindung
//var sqlHandler = require("../../helper/sqlHandler");

var hello = "hello world";

//var connection = dbConnection.connection; // DB Verbindung

router.get('/', (req, res) => {
    if (hello === undefined) res.status(500).send("Could not read DATA");
    else {
        res.status(200).send(hello);
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
        dienstplanRating:0,
        wunschRating: 0
    };
    res.status(200).send(mitarbeiter);
/*
    sqlHandler.neuerPfleger(krankenpfleger)
        .then(function (pfleger) {
            res.status(200).send(pfleger);
        }).catch(function () {
            res.status(400).send("Error");
        });*/
});











module.exports = router;