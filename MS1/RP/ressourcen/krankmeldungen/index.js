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
        module.exports = router;