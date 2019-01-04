var request = require('request');
const express = require('express');
const app = express();
app.use(express.json());;
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
//PUG
const pug = require('pug');
app.set('view engine', 'pug');

app.set("views", path.join(__dirname, "views"));
// Statische Dateien Laden über.... (CSS unsw. / inline Css vermieden :)) <- Wichtig! REFERENZ -> https://gist.github.com/joepie91/c0069ab0e0da40cc7b54b8c2203befe1 ( Sehr guter Guide zu PUG)
app.use("/static", express.static(path.join(__dirname, "public")));


app.use((req, res, next) => {
    console.log("Time: " + new Date() + " Request-Pfad: " + req.path);
    next();
  })
 
  const settings = {
    port: process.env.PORT || 8080
  };

var serviceURL = 'http://localhost:3000';

// GET auf einen Mitarbeiter
router.get('/mitarbeiter/:id', (req, res) => {
    let resourceURI = serviceURL + '/mitarbeiter/'+req.params.id;

    var options = {
        uri: resourceURI,
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }

    request(options, (err, res2, body) => {

        if (err) {
            console.log(err);
            return;
        }
        body = JSON.parse(body);
        console.log(body)
        res.status(200).render("mitarbeiterGet" , { title: 'MitarbeiterInfos', vorname:body.vorname, name:body.name, rolle:body.rolle, beschaeftigungsArt:body.beschaeftigungsArt,beschaeftigungsBeginn:body.beschaeftigungsBeginn, ueberstunden:body.ueberstunden});
        //res.status(200).send(JSON.parse(body))
        

    });
});

// GET auf das Mitarbeiter anlegen Formular
router.get('/mitarbeiter', (req, res) => {
    let resourceURI = serviceURL + '/mitarbeiter';

    var options = {
        uri: resourceURI,
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    }

    request(options, (err, res2, body) => {

        if (err) {
            console.log(err);
            return;
        }
        body = JSON.parse(body);
        console.log(body)
        res.status(200).render("mitarbeiterPOST");
        //res.status(200).send(JSON.parse(body))
        

    });
});

app.use(router)
app.listen(settings.port, () => console.log("Express app listening on port: " + settings.port + "!"))