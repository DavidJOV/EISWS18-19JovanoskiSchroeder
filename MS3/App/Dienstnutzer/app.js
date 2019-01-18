/*Mit dieser Datei wird der Dienstnutzer der einem Webserver entspricht gestartet*/
var request = require('request');
const express = require('express');
const app = express();
app.use(express.json());;
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var ersatzAnfrage = require("./helper/abwesenheitenController.js"); //-> Ursprung von Funktion ersatzAnfrage(informationen, abwesenheit) Zeile 233
const pug = require('pug'); //PUG wird als View-Engine genutzt
app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views")); // in /views liegen die einzelnen .pug Dateien

// Statische Dateien Laden über.... (CSS unsw. / inline Css vermieden :)) <- Wichtig! REFERENZ -> https://gist.github.com/joepie91/c0069ab0e0da40cc7b54b8c2203befe1 ( Sehr guter Guide zu PUG)
app.use("/static", express.static(path.join(__dirname, "public")));

// Loggen der Requestpfade
app.use((req, res, next) => {
  console.log("Time: " + new Date() + " Request-Pfad: " + req.path);
  next();
})



// CORS erlauben
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  next();
});

const settings = {
  port: process.env.PORT || 8080
};

// Dienstgeber Hostadresse
var serviceURL = 'http://sistershift.ddns.net';


// GET auf einen Mitarbeiter
router.get('/mitarbeiter/:id', (req, res) => {
  let resourceURI = serviceURL + '/mitarbeiter/' + req.params.id;

  var options = {
    uri: resourceURI,
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  }
  // Mitarbeiter Infos von Dienstgeber holen und in mitarbeiterGet.pug rendern
  request(options, (err, res2, body) => {

    if (err) {
      console.log(err);
      return;
    }
    body = JSON.parse(body);
    console.log(body)
    res.status(200).render("mitarbeiterGet", {
      title: 'MitarbeiterInfos',
      vorname: body.vorname,
      name: body.name,
      rolle: body.rolle,
      beschaeftigungsArt: body.beschaeftigungsArt,
      beschaeftigungsBeginn: body.beschaeftigungsBeginn,
      ueberstunden: body.ueberstunden
    });

  });
});


// GET auf die Ersatzanfragen eines Mitarbeiters
router.get('/mitarbeiter/:id/ersatzanfragen', (req, res) => {
  let resourceURI = serviceURL + '/mitarbeiter/' + req.params.id + "/ersatzanfragen";

  var options = {
    uri: resourceURI,
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  }
  // Alle Ersatzanfragen eines Mitarbeiters holen und diese dynamisch rendern
  request(options, (err, res2, body) => {

    if (err) {
      console.log(err);
      return;
    }
    body = JSON.parse(body);

    res.status(200).render("mitarbeiterErsatzanfragenGet", {
      ersatzanfragen: body
    });

  });
});


// GET auf die Ersatzeintragungen eines Mitarbeiters
router.get('/mitarbeiter/:id/ersatzeintragungen', (req, res) => {
  let resourceURI = serviceURL + '/mitarbeiter/' + req.params.id + "/ersatzeintragungen";

  var options = {
    uri: resourceURI,
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  }

  // Alle Ersatzeintragungen eines Mitarbeiters holen und diese dynamisch rendern
  request(options, (err, res2, body) => {

    if (err) {
      console.log(err);
      return;
    }
    body = JSON.parse(body);

    res.status(200).render("mitarbeiterErsatzaneintragungenGet", {
      ersatzeintragungen: body
    });

  });
});


// GET auf das Mitarbeiter anlegen Formular
router.get('/mitarbeiter', (req, res) => { // <- Durch dieses GET wir kein POST ausgelöst!
  let resourceURI = serviceURL + '/mitarbeiter'

  var options = {
    uri: resourceURI,
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  }
  // Alle Mitarbeiter holen und diese dynamisch rendern
  request(options, (err, res2, body) => {

    if (err) {
      console.log(err);
      return;
    }
    body = JSON.parse(body);
    res.status(200).render("mitarbeiterListeGet", {
      mitarbeiterListe: body
    });
  });
});


// GET auf ersatzanfragen
router.get('/ersatzanfragen', (req, res) => { // <- Durch dieses GET wir kein POST ausgelöst!

  res.status(200).render("mitarbeiterErsatzanfragenInput");

});


// GET auf ersatzeintragungen
router.get('/ersatzeintragungen', (req, res) => { // <- Durch dieses GET wir kein POST ausgelöst!

  res.status(200).render("mitarbeiterErsatzeintragungenInput");

});


// GET auf das Dienstplan anlegen Formular
router.get('/dienstplaene', (req, res) => { // <- Durch dieses GET wir kein POST ausgelöst!

  res.status(200).render("dienstplanPOST");

});


// GET auf das Dienstplan anlegen Formular
router.get('/dienstplan', (req, res) => { // <- Durch dieses GET wir kein POST ausgelöst!
  if (!req.query.monat) {
    res.status(200).render("dienstplanByMonatGet");
  } else {
    res.status(200).render("DienstplanByDateGet")
  }
});


// GET auf das Wunsch einreichen Formular
router.get('/wuensche', (req, res) => { // <- Durch dieses GET wir kein POST ausgelöst!

  res.status(200).render("wuenschePOST");

});


// GET auf das Abwesenheit einreichen Formular
router.get('/abwesenheiten', (req, res) => { // <- Durch dieses GET wir kein POST ausgelöst!

  res.status(200).render("abwesenheitenPOST");

});


// GET auf "Bestätigung-Screen"
router.get('/bestaetigung', (req, res) => { // <- Durch dieses GET wir kein POST ausgelöst!

  res.status(200).render("bestaetigung");

});

// GET auf "Fehler-Screen"
router.get('/entschuldigung', (req, res) => { // <- Durch dieses GET wir kein POST ausgelöst!

  res.status(404).render("entschuldigung");

});


// POST auf eine Abwesenheit -> Damit verbunden: Ermittlung und Erstellung entsprechender Ersatzanfragen an die Mitarbeiter
router.post('/abwesenheiten', (req, res) => {

  var abwesenheitsErstellung = new Promise(function(resolve, reject) {

    const abwesenheit = {
      stationID: req.body.stationID,
      mitarbeiterID: req.body.MitarbeiterID,
      datumBeginn: req.body.datumBeginn,
      datumEnde: req.body.datumEnde
    };

    // POST Request an Dienstgeber -> Anlegen einer Abwesenheit in der Datenbank
    let resourceURI = serviceURL + '/Abwesenheiten';

    console.log(resourceURI);

    var options = {
      uri: resourceURI,
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      json: abwesenheit
    }

    request(options, (err, res, body) => {

      if (err) {
        console.log(err);
        return;
      } else {
        var abwx2 = {
          abwesenheitDB: body[0],
          abwesenheit: abwesenheit
        }
        resolve(abwx2);
      }

    });


  }) // end of Promise abwesenheitsErstellung

  abwesenheitsErstellung.then(function(abwx2) {

    var getMitarbeiter = new Promise(function(resolve, reject) {

      // GET auf alle Mitarbeiter
      let resourceURI = serviceURL + '/Mitarbeiter';

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
        resolve(mitarbeiterListe);

      });


    }) // end of Promise getMitarbeiter


    getMitarbeiter.then(function(mitarbeiterListe) {
      var datumAufgeteilt = req.body.datumBeginn.split("-");

      var getDienstplan = new Promise(function(resolve, reject) {

        var informationen = {
          dienstplan: "",
          mitarbeiterListe: mitarbeiterListe
        };

        // GET auf den aktuellen Dienstplan
        let resourceURI2 = serviceURL + '/Dienstplaene?monat=' + datumAufgeteilt[1] + '&jahr=' + datumAufgeteilt[2];

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

          resolve(informationen);
        });

      }) // end of Promise getDienstplan

      getDienstplan.then(function(informationen) {

        // Funktionsaufrufe löst Kette von Ereignissen aus -> Ziel der Funktionen ist es Ersatzanfragen, für die in Frage kommenden Mitarbeiter zu erstellen

        ersatzAnfrage.ersatzAnfrage(informationen, abwx2.abwesenheit).then(function(ersatzAnfrageInfos) {
          ersatzAnfrage.erstelleErsatzanfragen(ersatzAnfrageInfos, abwx2.abwesenheitDB);

        }).catch(function(error) {
          console.log(error);
        });


      }).catch(function(error) {
        console.log(error);
      });

    }).catch(function(error) {
      console.log(error);
    });

  }).catch(function(error) {
    console.log(error);
  });

  res.status(201).send("Abwesenheit eingereicht!");

}) // end of POST Abwesenheiten



// GET auf einen einzelnen Dienstplan
router.get('/dienstplaene/:id', (req, res) => {

  if (!req.query.mitarbeiter) {
    console.log(req.query)
    res.status(200).render("DienstplanGET");
  } else {
    res.status(200).render("DienstplanSingleGET");
  }

});


app.use(router)
app.listen(settings.port, () => console.log("Express app listening on port: " + settings.port + "!"))
