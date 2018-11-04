var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var dbConnection = require("../../DB/dbConnector");// importieren der DB Verbindung
var eventListener = require("../../helper/eventListener"); // importieren des Eventlisteners
var base64 = require('js-base64'); // zum decoden
var decoder = base64.Base64;
var hello = "hello world";

var connection = dbConnection.connection; // DB Verbindung

router.get('/', (req, res) => {
    if (hello === undefined) res.status(500).send("Could not read DATA");
    else {
        console.log(req.headers.host)
        res.status(200).send(hello);
    }
});

// Erstellen einer neuen Krankmeldung

router.post('/', bodyParser.json(), (req, res) => {

    const krankmeldung = {

        pflegerID: req.body.pflegerID,
        stationID: req.body.stationID,
        ende: req.body.ende,
        start: req.body.start,
        dienstArt: req.body.dienstArt

    };

    console.log(krankmeldung);
    // Nur wenn ein Integer als PflegerID übermittelt wurde, darf in die DB geschrieben werden.
    if (krankmeldung.pflegerID != undefined || Number.isInteger(krankmeldung.pflegerID) === false) {
        var sql = "INSERT INTO krankmeldungen (pflegerID, stationID, start, ende, dienstArt) VALUES ( \"" + krankmeldung.pflegerID + "\",\"" + krankmeldung.stationID + "\",\"" + krankmeldung.start + "\",\"" + krankmeldung.ende + "\",\"" + krankmeldung.dienstArt + "\")";
        console.log(sql)
        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                res.status(400).send(dbConnection.errorMsgDB);
            }
            else {
                res.status(200).send(krankmeldung);

                // Event auslösen

                eventListener.eventEmitter.emit("Krankmeldung-eingereicht", krankmeldung,req.headers.host);
                console.log("1 neue Krankmeldung");
            }
        });
    } else {
        res.status(400).send(dbConnection.errorMsgDB);
    }


});

router.post('/ersatz/:id', bodyParser.json(), (req, res) => {
    var id = req.params.id;
    let pflegerID = decoder.decode(req.query.mitarbeiter);
    let stationID = decoder.decode(req.query.station);
    let sql = "UPDATE krankmeldungen SET ersatzPfleger = "+pflegerID+", ersatzGefunden = 1 WHERE id = " + id + " AND stationID = " + stationID + " AND ersatzGefunden = 0";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            res.status(400).send(dbConnection.errorMsgDB);
        }
        else {
            let sql2  = "SELECT start,dienstArt,ersatzPfleger,stationID FROM krankmeldungen WHERE stationID = " + stationID + " AND id = " + id;
            connection.query(sql2, function (err, result) {
                if (err) {
                    console.log(err)
                    console.log("Ersatz wurde eingetragen aber konnte nicht darüber Informiert werden.")
                    res.status(400).send(dbConnection.errorMsgDB);
                }
                else {
                    eventListener.eventEmitter.emit("Ersatzeintragung-erfolgt",JSON.stringify(result));
                    console.log(JSON.stringify(result)+"Ersatz Benachrichtigt")
                    res.status(200).send("Created Confirm");

                }
            })
        }
    });

});

module.exports = router;    