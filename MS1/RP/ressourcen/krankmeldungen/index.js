var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var hello = "hello world";

router.get('/', (req, res) => {
    if (hello === undefined) res.status(500).send("Could not read DATA");
    else {
                res.status(200).send(hello);
            }
        });
        module.exports = router;