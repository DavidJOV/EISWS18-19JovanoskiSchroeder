var request = require('request');
const express = require('express');
const app = express();
app.use(express.json());;
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var ersatzAnfrage = require("./helper/abwesenheitenController.js");
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

// CORS ERLAUBEN NUR FÜR TEST ZWECKE
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('/', function(req, res, next) {
    // Handle the get for this route
  });

  app.post('/', function(req, res, next) {
   // Handle the post for this route
  });
  //_________________________________________

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
router.get('/mitarbeiter', (req, res) => { // <- Durch dieses GET wir kein POST ausgelöst!

        res.status(200).render("mitarbeiterPOST");

    });



// GET auf das Dienstplan anlegen Formular
router.get('/dienstplaene', (req, res) => { // <- Durch dieses GET wir kein POST ausgelöst!

        res.status(200).render("dienstplanPOST");
        //res.status(200).send(JSON.parse(body))


    });

// GET auf das Wunsch einreichen Formular
router.get('/wuensche', (req, res) => {  // <- Durch dieses GET wir kein POST ausgelöst!

    res.status(200).render("wuenschePOST");



});

// GET auf das Abwesenheit einreichen Formular
router.get('/abwesenheiten', (req, res) => {  // <- Durch dieses GET wir kein POST ausgelöst!

    res.status(200).render("abwesenheitenPOST");
    //res.status(200).send(JSON.parse(body))


});

router.get('/abwesenheiten/bestaetigung', (req, res) => {  // <- Durch dieses GET wir kein POST ausgelöst!

    res.status(200).render("bestaetigung");
    //res.status(200).send(JSON.parse(body))


});

router.get('/abwesenheiten/entschuldigung', (req, res) => {  // <- Durch dieses GET wir kein POST ausgelöst!

    res.status(404).render("entschuldigung");
    //res.status(200).send(JSON.parse(body))


});





// GET auf das Abwesenheit einreichen Formular
router.post('/abwesenheiten', (req, res) => {

  const abwesenheit = {
      stationID: req.body.stationID,
      mitarbeiterID: req.body.MitarbeiterID,
      datumBeginn: req.body.datumBeginn,
      datumEnde: req.body.datumEnde
  };


var getMitarbeiter = new Promise (function (resolve,reject){

// GET auf alle Mitarbeiter
  let resourceURI = serviceURL + '/Mitarbeiter';

  console.log(resourceURI);

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

      var mitarbeiterListe = body;
      resolve (mitarbeiterListe);

});


}) // end of Promise getMitarbeiter


getMitarbeiter.then(function (mitarbeiterListe){

      var getDienstplan = new Promise (function (resolve, reject){



  var informationen = {
    dienstplan: "",
    mitarbeiterListe: mitarbeiterListe
  };

  // GET auf den aktuellen Dienstplan
  let resourceURI2 = serviceURL + '/Dienstplaene/4';    //HARDCODE

  var options = {
      uri: resourceURI2,
      method: 'GET',
      headers: {
          'Accept': 'application/json'
      }
  }

  request(options, (err, res3, body) => {

      if (err) {
          console.log(err);
          return;
      }
      body = JSON.parse(body);

      informationen.dienstplan = body;

      resolve (informationen);
  });

  }) // end of Promise getDienstplan

  getDienstplan.then(function (informationen){

    ersatzAnfrage.ersatzAnfrage(informationen, abwesenheit).then(function(result){
      console.log (result);
    });


  }).catch(function (error) {
    console.log(error);
  });

}).catch(function (error) {
  console.log(error);
});



res.status(201).send("Abwesenheit eingereicht!");

}) // end of POST Abwesenheiten

    // GET auf einen Dienstplan
router.get('/dienstplaene/:id', (req, res) => {

    if(!req.query.mitarbeiter){
        console.log(req.query)
    res.status(200).render("DienstplanGET");}
    else{ console.log("x")
        res.status(200).render("DienstplanSingleGET");
    }
    //res.status(200).send(JSON.parse(body))


});


app.use(router)
app.listen(settings.port, () => console.log("Express app listening on port: " + settings.port + "!"))
