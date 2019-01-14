var tagZaehler = require("../helper/tagberechnung.js").getDaysInMonth;
var sqlHandler = require("../helper/sqlHandler.js");
var wuensche = require("../helper/wuensche.js");


var erstelleDienstplan = function (monat, jahr,stationID) {

return new Promise(function(resolve,reject){

    var mitarbeiterListe;
    var anzahlSchichten = 3;
    var anzahlMitarbeiterSchicht = 4;
    var fruehschicht = "Fruehschicht";
    var spaetschicht = "Spaetschicht";
    var nachtschicht = "Nachtschicht";
  
    const dienstplan = {
      stationID: stationID,
      monat: monat,
      jahr: jahr,
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
      datum: ""
    }
    sqlHandler.getDienstplanByMonat(monat, jahr)
      .then(function () {
  
        sqlHandler.getMitarbeiter()
          .then(function (maListe) { // <- So ist es richtig! Noch bei den anderen Funktionen ändern!!!!
            if (maListe === undefined) console.log("Keine Mitarbeiter vorhanden!");
            else {
  
              mitarbeiterListe = maListe;
  
            }
          })
          .catch(function (error) {
            console.log(error);
          }).then(function () {
  
            var anzahlTage = tagZaehler(monat, jahr, 0); // Berechnung Tage im Monat x
  
            console.log("TAGE:\n" + anzahlTage);
  
  
  
           
            //********************************************************ANFANG Kommentarblock***************************************************************************** 
            // Im Folgenden wird die Variation der Schichtzuweisungen gesichtert. Indem verschiedene Zyklen monatlich zugewiesen werden.
            // So haben alle Mitarbeiter auf dauer den selben Pool an Schichten, und keiner muss bspw. mehr Nächte arbeiten als jemand anderes.
            var mitarbeiterZuweisung;
           
            
            
            // Zyklen für Januar,April,Juli,Oktober
             var zyklus1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
             var zyklus2 = [12, 13, 14, 15, 16, 17, 2, 3, 4, 5, 0, 1];
             var zyklus3 = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  
           
            // Zyklen für Februar,Mai,August,November
             var zyklus4 = [12, 13, 14, 15, 16, 17, 2, 3, 4, 5, 0, 1];
             var zyklus5 = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
             var zyklus6 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  
            
           // Zyklen für März,Juni,September,Dezember
            var zyklus7 = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
             var zyklus8 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
             var zyklus9 = [12, 13, 14, 15, 16, 17, 2, 3, 4, 5, 0, 1];
  
            
            // Variable verteilung der Schichten auf die Tage
            for (let i = 1; i <= anzahlTage; i++) {
  
              if (i < 3 || (i >= 7 && i < 9) || (i >= 13 && i < 15) || (i >= 19 && i < 21) || (i >= 25 && i < 27)) {
                if (monat == 1||monat ==4||monat ==7||monat ==10 ) {
                  mitarbeiterZuweisung = zyklus1;
                }
                else  if (monat == monat ==2||monat ==5||monat ==8||monat ==11 ) {
                  mitarbeiterZuweisung = zyklus4;
                }
                else  if (monat == monat ==3||monat ==6||monat ==9||monat ==12 ) {
                  mitarbeiterZuweisung = zyklus7;
                }
               
              } else if (i < 5 || (i >= 9 && i < 11) || (i >= 15 && i < 17) || (i >= 21 && i < 23) || (i >= 27 && i < 29)) {
                if (monat == 1|| monat ==4|| monat ==7|| monat ==10 ) {
                  mitarbeiterZuweisung = zyklus2;
                }
                else  if (monat == 2|| monat ==5||monat ==8||monat ==11 ) {
                  mitarbeiterZuweisung = zyklus5;
                }
                else  if (monat == 3||monat ==6||monat ==9||monat ==12 ) {
                  mitarbeiterZuweisung = zyklus8;
                }
              } else if (i < 7 || (i >= 11 && i < 13) || (i >= 17 && i < 19) || (i >= 23 && i < 25) || (i >= 29 && i <= 31)) {
                if (monat == 1||monat ==4||monat ==7||monat ==10 ) {
                  mitarbeiterZuweisung = zyklus3;
                }
                else  if (monat == 2||monat ==5||monat ==8||monat ==11 ) {
                  mitarbeiterZuweisung = zyklus6;
                }
                else  if (monat == 3||monat ==6||monat ==9||monat ==12 ) {
                  mitarbeiterZuweisung = zyklus9;
                }
              }
  
  
              var promiseTage = new Promise(function (resolve, reject) {
  
  
                for (let j = 0; j < anzahlSchichten; j++) {
  
                  if (j == 0) {
                    let datum = i + "-" + monat + "-" + jahr;
                    if (i < 10) {
                      datum = "0" + i + "-" + monat + "-" + jahr;
                    }
  
  
  
  
                    schichtzuweisung.datum = datum;
                    schichtzuweisung.schichtArt = "Fruehschicht";
                    schichtzuweisung.mitarbeiterID1 = mitarbeiterListe[mitarbeiterZuweisung[0]].id;
                    schichtzuweisung.mitarbeiterID2 = mitarbeiterListe[mitarbeiterZuweisung[1]].id;
                    schichtzuweisung.mitarbeiterID3 = mitarbeiterListe[mitarbeiterZuweisung[2]].id;
                    schichtzuweisung.mitarbeiterID4 = mitarbeiterListe[mitarbeiterZuweisung[3]].id;
                    sqlHandler.neueSchichtzuweisung(schichtzuweisung)
                      .then(function (schichtzuweisung) {
                        if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht erstellt werden");
                      })
                      .catch(function (err) {
                        console.log(err);
                      }).then(function () {
                        sqlHandler.getSchichtzuweisung(datum, fruehschicht)
                          .then(function (schicht) {
                            tag.schichtzuweisungID1 = schicht[0].id;
  
                          })
                      })
                  }
  
  
                  if (j == 1) {
                    let datum = i + "-" + monat + "-" + jahr;
                    if (i < 10) {
                      datum = "0" + i + "-" + monat + "-" + jahr;
                    }
                    schichtzuweisung.datum = datum;
                    schichtzuweisung.schichtArt = "Spaetschicht";
                    schichtzuweisung.mitarbeiterID1 = mitarbeiterListe[mitarbeiterZuweisung[4]].id;
                    schichtzuweisung.mitarbeiterID2 = mitarbeiterListe[mitarbeiterZuweisung[5]].id;
                    schichtzuweisung.mitarbeiterID3 = mitarbeiterListe[mitarbeiterZuweisung[6]].id;
                    schichtzuweisung.mitarbeiterID4 = mitarbeiterListe[mitarbeiterZuweisung[7]].id;
                    sqlHandler.neueSchichtzuweisung(schichtzuweisung)
                      .then(function (schichtzuweisung) {
                        if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht erstellt werden");
                      })
                      .catch(function (err) {
                        console.log(err);
                      }).then(function () {
                        sqlHandler.getSchichtzuweisung(datum, spaetschicht)
                          .then(function (schicht) {
                            tag.schichtzuweisungID2 = schicht[0].id;
  
                          })
                      })
                  }
  
  
                  if (j == 2) {
                    let datum = i + "-" + monat + "-" + jahr;
                    if (i < 10) {
                      datum = "0" + i + "-" + monat + "-" + jahr;
                    }
  
                    schichtzuweisung.datum = datum;
                    schichtzuweisung.schichtArt = "Nachtschicht";
                    schichtzuweisung.mitarbeiterID1 = mitarbeiterListe[mitarbeiterZuweisung[8]].id;
                    schichtzuweisung.mitarbeiterID2 = mitarbeiterListe[mitarbeiterZuweisung[9]].id;
                    schichtzuweisung.mitarbeiterID3 = mitarbeiterListe[mitarbeiterZuweisung[10]].id;
                    schichtzuweisung.mitarbeiterID4 = mitarbeiterListe[mitarbeiterZuweisung[11]].id;
                    sqlHandler.neueSchichtzuweisung(schichtzuweisung)
                      .then(function (schichtzuweisung) {
                        if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht erstellt werden");
                      })
                      .catch(function (err) {
                        console.log(err);
                      }).then(function () {
                        sqlHandler.getSchichtzuweisung(datum, nachtschicht)
                          .then(function (schicht) {
                            tag.schichtzuweisungID3 = schicht[0].id;
  
                            tag.datum = datum;
  
                            resolve(tag)
                          })
  
                      })
                  }
  
  
  
                }
              })
  
  
              var promiseDienstplan = new Promise(function (resolve, reject) {
  
                promiseTage.then(function (tag) {
  
                  // console.log(tag) // -> loggt die richtigen Tage
  
                  sqlHandler.neuerTag(tag)
                    .then(function () {
  
                      let datum = i + "-" + monat + "-" + jahr;
                      if (i < 10) {
                        datum = "0" + i + "-" + monat + "-" + jahr;
                      }
  
                      sqlHandler.getTag(datum)
                        .then(function (tag) {
  
                          if (tag === undefined) console.log("Tag konnte nicht erstellt werden");
                          else {
                            dienstplan.monatsTage.push(tag);
                            if (i == anzahlTage) {
  
                              resolve(dienstplan)
  
                            }
                          }
  
                        })
                        .catch(function (err) {
                          console.log(err);
                        });
  
                    })
  
                    .catch(function (err) {
                      console.log(err);
                    });
                })
                  .catch(function (err) {
                    console.log(err);
                  });
  
  
  
  
  
              });
  
  
            } // For Schleife i
            promiseDienstplan.then(function (dienstplan) {
  
  
  
  
              sqlHandler.neuerDienstplan(dienstplan)
                .then(function (dienstplanDB) {
                  if (dienstplanDB === undefined) reject("Dienstplan konnte nicht erstellt werden");
                  else {
                    //  res.status(201).send(dienstplanDB);
  
                   wuensche.korrigiereSchichtzuweisungen(dienstplan).then(function (finalerDienstplan) {
                      if (finalerDienstplan == -1) {
                        sqlHandler.getDienstplanByDate(dienstplan.monat, dienstplan.jahr)
                          .then(function (dienstplanOhneWuensche) {
                           resolve(dienstplanOhneWuensche);
                          })
  
                      }
                      else {
                        resolve(finalerDienstplan)
                      }
  
                    });
  
  
                  }
  
                })
                .catch(function (err) {
                 reject("Dienstplan konnte nicht Erstellt werden")
                });
            });
          }).catch(function (err) { //
            console.log(err); //
          })
      }).catch(function (err) {
        reject("Dienstplan konnte nicht Erstellt werden")
      })
  
    })

}




exports.erstelleDienstplan = erstelleDienstplan;

