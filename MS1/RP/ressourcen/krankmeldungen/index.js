var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var dbConnection = require("../../DB/dbConnector");// importieren der DB Verbindung
var eventListener = require("../../helper/eventListener"); // importieren des Eventlisteners
var base64 = require('js-base64');

var hello = "hello world";

var connection = dbConnection.connection; // DB Verbindung

router.get('/', (req, res) => {
    if (hello === undefined) res.status(500).send("Could not read DATA");
    else {
        
        res.status(200).send(hello);
    }
});

// Erstellen einer neuen Krankmeldung

router.post('/', bodyParser.json(), (req, res) => {

    const krankmeldung = {

        pflegerID: req.body.pflegerID,
        stationID : req.body.stationID,
        ende: req.body.ende,
        start: req.body.start,
        dienstArt : req.body.dienstArt

    };
    
    console.log(krankmeldung);
    // Nur wenn ein Integer als PflegerID übermittelt wurde, darf in die DB geschrieben werden.
    if (krankmeldung.pflegerID != undefined || Number.isInteger(krankmeldung.pflegerID) === false) {
        var sql = "INSERT INTO krankmeldungen (pflegerID, stationID, start, ende, dienstArt) VALUES ( \"" + krankmeldung.pflegerID + "\",\"" + krankmeldung.stationID + "\",\"" + krankmeldung.start + "\",\"" + krankmeldung.ende + "\",\"" + krankmeldung.dienstArt + "\")";
        console.log(sql)
        connection.query(sql, function (err, result) {
            if (err) {console.log(err)
                res.status(400).send(dbConnection.errorMsgDB);}
            else {
                res.status(200).send(krankmeldung);
                eventListener.eventEmitter.emit("Krankmeldung-eingereicht",krankmeldung);
                console.log("1 neue Krankmeldung");
            }
        });
    } else {
        res.status(400).send(dbConnection.errorMsgDB);
    }


});

router.post('/ersatz/:id', bodyParser.json(), (req, res) => {





})

module.exports = router;    