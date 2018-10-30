var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require("mysql");

var hello = "hello world";

router.get('/', (req, res) => {
    if (hello === undefined) res.status(500).send("Could not read DATA");
    else {
        res.status(200).send(hello);
    }
});

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'krankenpfleger'
});
connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});
// Error Messages
var errorMsgDB = "Could not write to Database";





//Erstellen eines neuen Mitarbeiters
router.post('/', bodyParser.json(), (req, res) => {

    const schwester = {

        vorname: req.body.vorname,
        name: req.body.name,
        email: req.body.email,
        telefon: req.body.telefon,
        beschaeftigungsArt: req.body.beschaeftigungsArt,
        start: req.body.start

    };
    //Falls keine Email angegeben wurde, darf nicht in die DB geschrieben werden.
    console.log(schwester.email);
    if (schwester.email != undefined) {
        var sql = "INSERT INTO pfleger (vorname, name, email, telefon, beschaeftigungsArt, start) VALUES ( \"" + schwester.vorname + "\",\"" + schwester.name + "\",\"" + schwester.email + "\",\"" + schwester.telefon + "\",\"" + schwester.beschaeftigungsArt + "\",\"" + schwester.start + "\")";


        connection.query(sql, function (err, result) {
            if (err) res.status(400).send(errorMsgDB);
            res.status(200).send(schwester);
            console.log("1 Neuer Mitarbeiter");
        });
    } else {
        res.status(400).send(errorMsgDB);
    }


});











module.exports = router;