var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var sqlHandler = require("../helper/sqlHandler.js");
var tagZaehler = require("../helper/tagberechnung.js").getDaysInMonth;
var counter = require("../helper/overgiveAsync.js");



/* // Get auf alle Dienstpläne
router.get('/', (req, res) => {

    if (dienstplanListe === undefined) res.status(500).send("Could not read DATA");
    else {
        res.status(200).send(dienstplanListe);
    }
}); */ // Nicht benötigt!

// Get auf einen einzelnen Dienstplan
router.get('/:id', (req, res) => {
    sqlHandler.getDienstplan(req.params.id)
        .then(function(dienstplan) {
            res.status(200).send(dienstplan);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
});



// Get auf einen einzelnen Tag eines Dienstplans
/*
router.get('/:id/:date', (req, res) => {
    sqlHandler.getTag(req.params.date)
    .then(function(tag){
        res.status(200).send(tag);
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
});

*/







// Erstellen eines neuen Dienstplan
router.post('/', bodyParser.json(), (req, res) => {



    var mitarbeiterListe;
    var anzahlSchichten = 4;
    var anzahlMitarbeiterSchicht = 4;
    var fruehschicht = "Fruehschicht";
    var spaetschicht = "Spaetschicht";
    var zwischenschicht = "Zwischenschicht";
    var nachtschicht = "Nachtschicht";

    const dienstplan = {
        stationID: req.body.stationID,
        monat: req.body.monat,
        jahr: req.body.jahr,
        monatsTage: new Array()
    };


    var schichtzuweisung = {
        datum: "",
        schichtArt: "",
        mitarbeiterID1: "",
        mitarbeiterID2: "",
        mitarbeiterID3: "",
        mitarbeiterID4: ""
    }

    var tag = {
        schichtzuweisungID1: "",
        schichtzuweisungID2: "",
        schichtzuweisungID3: "",
        schichtzuweisungID4: "",
        datum: ""
    }
    sqlHandler.getDienstplanByMonat(req.body.monat,req.body.jahr)
    .then(function(){

    sqlHandler.getMitarbeiter()
        .then(function(maListe) { // <- So ist es richtig! Noch bei den anderen Funktionen ändern!!!!
            if (maListe === undefined) console.log("Keine Mitarbeiter vorhanden!");
            else {

                mitarbeiterListe = maListe;

            }
        })
        .catch(function(error) {
            console.log(error);
        }).then(function() {

            var anzahlTage = tagZaehler(req.body.monat, req.body.jahr, 0); // Berechnung Tage im Monat x

            console.log("TAGE:\n" + anzahlTage);

            for (let i = 1; i <= anzahlTage; i++) {
                var promiseTage = new Promise(function(resolve, reject) {

                    for (let j = 0; j <= anzahlSchichten; j++) {

                        if (j == 0) {
                            let datum = i + "-" + req.body.monat + "-"+ req.body.jahr;
                            if (i < 10) { datum = "0" + i + "-" + req.body.monat + "-"+ req.body.jahr; }




                            schichtzuweisung.datum = datum;
                            schichtzuweisung.schichtArt = "Fruehschicht";
                            schichtzuweisung.mitarbeiterID1 = mitarbeiterListe[0].id;
                            schichtzuweisung.mitarbeiterID2 = mitarbeiterListe[1].id;
                            schichtzuweisung.mitarbeiterID3 = mitarbeiterListe[2].id;
                            schichtzuweisung.mitarbeiterID4 = mitarbeiterListe[3].id;
                            sqlHandler.neueSchichtzuweisung(schichtzuweisung)
                                .then(function(schichtzuweisung) {
                                    if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht erstellt werden");
                                })
                                .catch(function(err) {
                                    console.log(err);
                                }).then(function() {
                                    sqlHandler.getSchichtzuweisung(datum, fruehschicht)
                                        .then(function(schicht) {
                                            tag.schichtzuweisungID1 = schicht[0].id;

                                        })
                                })
                        }


                        if (j == 1) {
                            let datum = i + "-" + req.body.monat + "-"+ req.body.jahr;
                            if (i < 10) { datum = "0" + i + "-" + req.body.monat + "-"+ req.body.jahr; }
                            schichtzuweisung.datum = datum;
                            schichtzuweisung.schichtArt = "Zwischenschicht";
                            schichtzuweisung.mitarbeiterID1 = mitarbeiterListe[4].id;
                            schichtzuweisung.mitarbeiterID2 = mitarbeiterListe[5].id;
                            schichtzuweisung.mitarbeiterID3 = mitarbeiterListe[6].id;
                            schichtzuweisung.mitarbeiterID4 = mitarbeiterListe[7].id;
                            sqlHandler.neueSchichtzuweisung(schichtzuweisung)
                                .then(function(schichtzuweisung) {
                                    if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht erstellt werden");
                                })
                                .catch(function(err) {
                                    console.log(err);
                                }).then(function() {
                                    sqlHandler.getSchichtzuweisung(datum, zwischenschicht)
                                        .then(function(schicht) {

                                            tag.schichtzuweisungID2 = schicht[0].id;

                                        }).catch(function(err) {
                                            console.log(err);
                                        })
                                })
                        }


                        if (j == 2) {
                            let datum = i + "-" + req.body.monat + "-"+ req.body.jahr;
                            if (i < 10) { datum = "0" + i + "-" + req.body.monat + "-"+ req.body.jahr; }
                            schichtzuweisung.datum = datum;
                            schichtzuweisung.schichtArt = "Spaetschicht";
                            schichtzuweisung.mitarbeiterID1 = mitarbeiterListe[8].id;
                            schichtzuweisung.mitarbeiterID2 = mitarbeiterListe[9].id;
                            schichtzuweisung.mitarbeiterID3 = mitarbeiterListe[10].id;
                            schichtzuweisung.mitarbeiterID4 = mitarbeiterListe[11].id;
                            sqlHandler.neueSchichtzuweisung(schichtzuweisung)
                                .then(function(schichtzuweisung) {
                                    if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht erstellt werden");
                                })
                                .catch(function(err) {
                                    console.log(err);
                                }).then(function() {
                                    sqlHandler.getSchichtzuweisung(datum, spaetschicht)
                                        .then(function(schicht) {
                                            tag.schichtzuweisungID3 = schicht[0].id;

                                        })
                                })
                        }


                        if (j == 3) {
                            let datum = i + "-" + req.body.monat + "-"+ req.body.jahr;
                            if (i < 10) { datum = "0" + i + "-" + req.body.monat + "-"+ req.body.jahr; }
                            
                            schichtzuweisung.datum = datum;
                            schichtzuweisung.schichtArt = "Nachtschicht";
                            schichtzuweisung.mitarbeiterID1 = mitarbeiterListe[12].id;
                            schichtzuweisung.mitarbeiterID2 = mitarbeiterListe[13].id;
                            schichtzuweisung.mitarbeiterID3 = mitarbeiterListe[14].id;
                            schichtzuweisung.mitarbeiterID4 = mitarbeiterListe[15].id;
                            sqlHandler.neueSchichtzuweisung(schichtzuweisung)
                                .then(function(schichtzuweisung) {
                                    if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht erstellt werden");
                                })
                                .catch(function(err) {
                                    console.log(err);
                                }).then(function() {
                                    sqlHandler.getSchichtzuweisung(datum, nachtschicht)
                                        .then(function(schicht) {
                                            tag.schichtzuweisungID4 = schicht[0].id;

                                            tag.datum = datum;

                                            resolve(tag)
                                        })

                                })
                        }



                    }
                })


                var promiseDienstplan = new Promise(function(resolve, reject) {

                promiseTage.then(function(tag) {

                   // console.log(tag) // -> loggt die richtigen Tage

                    sqlHandler.neuerTag(tag)
                        .then(function() {
                            
                                let datum = i + "-" + req.body.monat + "-"+ req.body.jahr;
                            if (i < 10) { datum = "0" + i + "-" + req.body.monat + "-"+ req.body.jahr; }
                                
                            sqlHandler.getTag(datum)
                                .then(function(tag) {
                                   
                                    if (tag === undefined) console.log("Tag konnte nicht erstellt werden");
                                    else {
                                        dienstplan.monatsTage.push(tag);
                                        if(i==anzahlTage){
                                            
                                                resolve(dienstplan)
                                        
                                    }
                                }

                                })
                                .catch(function(err) {
                                    console.log(err);
                                });
                            
                        })

                        .catch(function(err) {
                            console.log(err);
                        });
                })
                    .catch(function(err) {
                        console.log(err);
                    });
                
                // .then...



            });
                

            } // For Schleife i
            promiseDienstplan.then(function(dienstplan){

                
                

                sqlHandler.neuerDienstplan(dienstplan)
                    .then(function(dienstplan) {
                        if (dienstplan === undefined) res.status(400).send("Dienstplan konnte nicht erstellt werden");
                        else {
                            res.status(201).send(dienstplan);
                        }
            
                    })
                    .catch(function(err) {
                        res.status(400).send(err);
                    });
                });
        }).catch(function(err) { //
            console.log(err); //
        })
    }).catch(function(msg) { 
        res.status(404).send(msg); 
    })
        
    
       



});






// PUT Schichtzuweisung
router.put('/:id/:date/:schicht', (req, res) => {
    //sqlHandler


});




// Aktuallisieren eines Dienstplans
router.put('/:id', (req, res) => {
    //  DB req
    if (dienstplanListe === undefined) res.status(500).send("Could not read DATA");
    else { // Kann auch mit der ID direkt in der DB gesucht werden.
        const dienst = dienstplanListe.find(c => c.id === parseInt(req.params.id)); // Datenbank anbindung fehlt noch
        if (!dienst) { res.status(404).send("Kein Dienstplan mit der angebenen ID vorhanden!"); }

        else {
            const dienstplanUpdate = {
                stationID: req.body.stationID, // noch in Datenbank hinzufügen
                datumBeginn: req.body.datumBeginn,
                datumEnde: req.body.datumEnde,
            };
            // insert into DB (dienstplanUpdate)

            res.status(200).send(dienstplanUpdate);
        }
    }
});

// Löschen eines Dienstplans
router.delete('/:id', (req, res) => {
    if (dienstplanListe === undefined) res.status(500).send("Could not read DATA");
    else { // Kann auch direkt aus der DB gelöscht werden.
        const dienstplanLoeschen = dienstplanListe.find(c => c.id === parseInt(req.params.id));

        if (!dienstplanLoeschen) res.status(404).send("Kein Dienstplan mit der angebenen ID vorhanden!");

        else {
            // DELETE from DB
            res.status(200).send("Dienstplan geloescht");
        }
    }

});



module.exports = router;
