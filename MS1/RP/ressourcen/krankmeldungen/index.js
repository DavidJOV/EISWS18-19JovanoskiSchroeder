var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
//var dbConnection = require("../../DB/dbConnector");// importieren der DB Verbindung
var eventListener = require("../../helper/eventListener"); // importieren des Eventlisteners
var sqlHandler = require("../..//helper/sqlHandler");
var base64 = require('js-base64'); // zum decoden
var semaphore = require("semaphore")(1); // Semaphore die mit 1 initiiert wird.
var decoder = base64.Base64;
var hello = "hello world";


//var connection = dbConnection.connection; // DB Verbindung

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

    sqlHandler.neueKrankmeldung(krankmeldung)
        .then(function () {

            // Event auslösen

            eventListener.eventEmitter.emit("Krankmeldung-eingereicht", krankmeldung, req.headers.host);
            res.status(200).send(krankmeldung);
            console.log("1 neue Krankmeldung");
        })
        .catch(function () {
            res.status(400).send("Error");
        });
});





router.get('/ersatz/:id', bodyParser.json(), (req, res) => {
    // Exklusiv zugriff nehmen count--
    semaphore.take(function () {
        var id = req.params.id;
        let pflegerID = decoder.decode(req.query.mitarbeiter);
        let stationID = decoder.decode(req.query.station);

        sqlHandler.ersatzEintragen(id, pflegerID, stationID)
            .then(function () {

                sqlHandler.getKrankmeldungErsatzInfo(id, stationID)
                    .then(function (result) {
                        eventListener.eventEmitter.emit("Ersatzeintragung-erfolgt", JSON.stringify(result));
                        console.log(JSON.stringify(result) + "Ersatz Benachrichtigt")
                        res.status(200).send("Created Confirm");

                    })  // Catch falls nicht Benachrichtigt werden konnte aber in die DB geschrieben wurde.
                    .catch(function (err) {
                        console.log(err)
                        console.log("Ersatz wurde eingetragen aber konnte nicht darüber Benachrichtigt werden.")
                        res.status(400).send("Error");

                    })

            }) // Catch Falls der Ersatz nicht eingetragen werden konnte.
            .catch(function (err) {
                console.log(err);
                res.status(400).send("Error");
            });
        // Exklusiv Zugriff wieder freigeben count++
        semaphore.leave();
    })

});

module.exports = router;    