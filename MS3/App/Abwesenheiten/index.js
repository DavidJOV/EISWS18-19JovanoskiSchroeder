var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var sqlHandler = require("../helper/sqlHandler");

// Get auf die Liste der Abwesenheiten
router.get('/', (req, res) => {
    sqlHandler.getAbwesenheiten()
        .then(function (abwesenheitenListe) {
            if (abwesenheitenListe === undefined) res.status(500).send("Could not read DATA");
            else {
                res.status(200).send(abwesenheitenListe);
            }
        })
        .catch(function (error) {
            res.status(400).send(error);
        });
});

// Get auf eine einzelne Abwesenheit
router.get('/:id', (req, res) => {
    sqlHandler.getAbwesenheiten()
        .then(function (abwesenheitenListe) {
            if (abwesenheitenListe === undefined) res.status(500).send("Could not read DATA");
            else {// Kann auch mit der ID direkt in der DB gesucht werden.
                const abwesenheit = abwesenheitenListe.find(c => c.id === parseInt(req.params.id)); // Datenbank anbindung fehlt noch. AbwesenheitenListe muss aus DB gelesen werden.
                if (!abwesenheit) { res.status(404).send("Diese ID gehört keiner Abwesenheit!"); }

                else {
                    res.status(200).send(abwesenheit);
                }
            }
        })
        .catch(function (error) {
            res.status(400).send(error);
        });

});

// Erstellen einer neuen Abwesenheit
router.post('/', bodyParser.json(), (req, res) => {

    const abwesenheit = {
        stationID: req.body.stationID,
        mitarbeiterID: req.body.mitarbeiterID,
        datumBeginn: req.body.datumBeginn,
        datumEnde: req.body.datumEnde
    };
    sqlHandler.neueAbwesenheit(abwesenheit)
        .then(function (abwesenheit) {
            if (abwesenheit === undefined) res.status(400).send("Abwesenheitsmeldung konnte nicht erstellt werden");
            else {
                res.status(201).send(abwesenheit);
            }

        })
        .catch(function (err) {
            res.status(400).send(err);
        });

});


router.post('/Ersatzanfragen', bodyParser.json(), (req, res) => {

    console.log(req.body);

    const ersatzAnfrageInfos = req.body.ersatzAnfrageInfos;
    const abwesenheit = req.body.abwesenheit;

    console.log(ersatzAnfrageInfos.length);
    console.log(ersatzAnfrageInfos[0].mitarbeiter.length);

    for (let q = 0 ; q<(ersatzAnfrageInfos.length/3);q++){
      for ( let j = 0 ; j < ersatzAnfrageInfos[q].mitarbeiter.length ; j++){
    sqlHandler.neueErsatzanfrage(ersatzAnfrageInfos[q],abwesenheit,j)
    .then (function (){
      console.log("Ersatzanfrage erstellt");
    }).catch(function (err) {
       res.status(400).send(err);
    });

    if (q+1 == (ersatzAnfrageInfos.length/3) && j+1 == ersatzAnfrageInfos[q].mitarbeiter.length){

      res.status(201).send("Ersatzanfragen erfolgreich erstellt")
}

}
}



});







// Aktuallisieren einer Abwesenheit
router.put('/:id', (req, res) => {

    sqlHandler.getAbwesenheiten()
        .then(function (abwesenheitenListe) {

            if (abwesenheitenListe === undefined) res.status(500).send("Could not read DATA");
            else {
                const abwesenheit = abwesenheitenListe.find(c => c.id === parseInt(req.params.id));
                if (!abwesenheit) { res.status(404).send("Diese ID gehört keiner Abwesenheit!"); }

                else {
                    const abwesenheitUpdate = {
                        datumBeginn: req.body.datumBeginn,
                        datumEnde: req.body.datumEnde
                    };
                    let id = req.params.id;

                    sqlHandler.updateAbwesenheit(id,abwesenheitUpdate)
                        .then(function (abwesenheitUpdate) {
                            res.status(200).send(abwesenheitUpdate);

                        })
                        .catch(function (err) {
                            res.status(400).send(err);
                        })
                }
            }

        })
        .catch(function (err) {
            res.status(400).send(err);
        });

})

// Löschen einer Abwesenheit
router.delete('/:id', (req, res) => {
    sqlHandler.loescheAbwesenheit(req.params.id)
    .then(function (result) {
        // Prüfen ob in der DB etwas verändert wurde
        if (result.affectedRows < 1) res.status(404).send("Die ID gehoert zu keiner Abwesenheit! Oder es Bestehen noch Verbindungen die das Löschen verhindern!");

        else {
            res.status(200).send("Abwesenheitsmeldung geloescht");
        }
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
});
module.exports = router;
