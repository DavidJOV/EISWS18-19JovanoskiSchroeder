var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var dbConnection = require("../../DB/dbConnector"); // importieren der DB Verbindung

var hello = "hello world";

var connection = dbConnection.connection; // DB Verbindung

router.get('/', (req, res) => {
    if (hello === undefined) res.status(500).send("Could not read DATA");
    else {
        res.status(200).send(hello);
    }
});
// Erstellen eines neuen Mitarbeiters
router.post('/', bodyParser.json(), (req, res) => {

    const schwester = {

        vorname: req.body.vorname,
        name: req.body.name,
        email: req.body.email,
        telefon: req.body.telefon,
        beschaeftigungsArt: req.body.beschaeftigungsArt,
        start: req.body.start

    };
    console.log(schwester)
    // Falls keine Email angegeben wurde, darf nicht in die DB geschrieben werden.
    if (schwester.email != undefined) {
        var sql = "INSERT INTO pfleger (vorname, name, email, telefon, beschaeftigungsArt, start) VALUES ( \"" + schwester.vorname + "\",\"" + schwester.name + "\",\"" + schwester.email + "\",\"" + schwester.telefon + "\",\"" + schwester.beschaeftigungsArt + "\",\"" + schwester.start + "\")";


        connection.query(sql, function (err, result) {
            if (err) res.status(400).send(dbConnection.errorMsgDB);
            else {
                res.status(200).send(schwester);
                console.log("1 neue schwester");
            }
        });
    } else {
        res.status(400).send(dbConnection.errorMsgDB);
    }


});











module.exports = router;