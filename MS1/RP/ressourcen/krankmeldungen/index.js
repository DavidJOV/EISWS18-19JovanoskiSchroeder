var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var dbConnection = require("../../DB/dbConnector");// importieren der DB Verbindung
var hello = "hello world";
var connection = dbConnection.connection; // DB Verbindung

router.get('/', (req, res) => {
    if (hello === undefined) res.status(500).send("Could not read DATA");
    else {
        res.status(200).send(hello);
    }
});


router.post('/', bodyParser.json(), (req, res) => {

    const krankmeldung = {

        pflegerID: req.body.pflegerID,
        ende: req.body.ende,
        start: req.body.start

    };
    console.log(krankmeldung);
    // Nur wenn ein Integer als PflegerID übermittelt wurde, darf in die DB geschrieben werden.
    if (krankmeldung.pflegerID != undefined || Number.isInteger(krankmeldung.pflegerID) === false) {
        var sql = "INSERT INTO krankmeldungen (pflegerID, start, ende) VALUES ( \"" + krankmeldung.pflegerID + "\",\"" + krankmeldung.start + "\",\"" + krankmeldung.ende + "\")";

        connection.query(sql, function (err, result) {
            if (err) res.status(400).send(dbConnection.errorMsgDB);
            else {
                res.status(200).send(krankmeldung);
                console.log("1 neue Krankmeldung");
            }
        });
    } else {
        res.status(400).send(dbConnection.errorMsgDB);
    }


});

module.exports = router;    