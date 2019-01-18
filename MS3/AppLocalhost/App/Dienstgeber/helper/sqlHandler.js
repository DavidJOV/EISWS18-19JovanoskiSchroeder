var dbConnection = require("../DB/dbConnector"); // importieren der DB Verbindung
var connection = dbConnection.connection;
var tagZaehler = require("../helper/tagberechnung.js").getDaysInMonth;

//Mitarbeiter Funktionen

//********************************************************************************************************************

// Lesen aller Mitarbeiter aus der Datenbank
var getMitarbeiter = function getMitarbeiter() {

  return new Promise(function(resolve, reject) {

    let sql = "SELECT * FROM mitarbeiter"
    connection.query(sql, function(err, result) {
      if (err) reject(err);
      else {

        // Datenbank Daten aufbereiten.

        let mitarbeiterString = JSON.stringify(result);
        var mitarbeiter = JSON.parse(mitarbeiterString);
        resolve(mitarbeiter);

      }
    });
  });
}


// Lesen eines einzelnen Mitarbeiter mit id x aus der DB
var getMitarbeiterById = function getMitarbeiterById(id) {

  return new Promise(function(resolve, reject) {


    let sql = "SELECT * FROM Mitarbeiter WHERE id = " + id;
    connection.query(sql, function(err, result) {
      if (err) reject(err);
      else {

        // Datenbank Daten aufbereiten.

        let mitarbeiterString = JSON.stringify(result);
        var mitarbeiter = JSON.parse(mitarbeiterString);
        resolve(mitarbeiter);

      }
    });
  });
}


// Neuen Mitarbeiter der Datenbank hinzufügen
var neuerMitarbeiter = function neuerMitarbeiter(mitarbeiter) {
  return new Promise(function(resolve, reject) {

    var sql = "INSERT INTO Mitarbeiter (stationID, anrede, vorname, name, beschaeftigungsBeginn, beschaeftigungsArt, rolle, wunschRating, dienstplanRating, ueberstunden) VALUES ( \"" + mitarbeiter.stationID + "\",\"" + mitarbeiter.anrede + "\",\"" + mitarbeiter.vorname + "\",\"" + mitarbeiter.name + "\",\"" + mitarbeiter.beschaeftigungsBeginn + "\",\"" + mitarbeiter.beschaeftigungsArt + "\",\"" + mitarbeiter.rolle + "\",\"" + mitarbeiter.wunschRating + "\",\"" + mitarbeiter.dienstplanRating + "\",\"" + mitarbeiter.ueberstunden + "\")";

    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        reject(err);

      } else {
        resolve(mitarbeiter);
        console.log("1 neuer Mitarbeiter");
      }
    });

  });
}


// Informationen eines Mitarbeiters aktuallisieren
var updateMitarbeiter = function updateMitarbeiter(mitarbeiter) {
  return new Promise(function(resolve, reject) {


    var sql = "UPDATE Mitarbeiter SET anrede = \"" + mitarbeiter.anrede + "\" , vorname = \"" + mitarbeiter.vorname + "\", name = \"" + mitarbeiter.name + "\", beschaeftigungsArt = \"" + mitarbeiter.beschaeftigungsArt + "\", rolle =\"" + mitarbeiter.rolle + "\" WHERE id =" + mitarbeiter.id;


    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        reject(err);

      } else {
        resolve(mitarbeiter);
        console.log("Mitarbeiter wurde aktuallisiert");
      }
    });


  });
}

//Loeschen eines Mitarbeiters
var loescheMitarbeiter = function loescheMitarbeiter(id) {
  return new Promise(function(resolve, reject) {

    var sql = "DELETE FROM Mitarbeiter WHERE id = " + id;


    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        reject(err);

      } else {
        resolve(result);
        console.log("Mitarbeiter wurde gelöscht");
      }
    });


  });
}


// Überstunden eines Mitarbeiters aktuallisieren
var updateUeberstunden = function updateUeberstunden(id, ueberstunden) {
  return new Promise(function(resolve, reject) {

    var sql = "UPDATE Mitarbeiter SET ueberstunden = ueberstunden + " + ueberstunden + " WHERE id =" + id;


    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        reject(err);

      } else {
        resolve(result);
        console.log("Überstunden wurden aktuallisiert");
      }
    });


  });
}


// WunschRating eines Mitarbeiters aktuallisieren
var updateWunschRating = function updateWunschRating(id, rating) {
  return new Promise(function(resolve, reject) {


    var sql = "UPDATE Mitarbeiter SET wunschRating = wunschRating + " + rating + " WHERE id =" + id;


    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        reject(err);

      } else {
        resolve(result);
        console.log("Wunsch Rating wurde aktuallisiert");
      }
    });


  });
}


// dienstplanRating eines Mitarbeiters aktuallisieren
var updateDienstplanRating = function updateDienstplanRating(id, rating) {
  return new Promise(function(resolve, reject) {


    var sql = "UPDATE Mitarbeiter SET dienstplanRating = dienstplanRating + " + rating + " WHERE id =" + id;


    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        reject(err);

      } else {
        resolve(result);
        console.log("Dienstplan Rating wurde aktuallisiert");
      }
    });


  });
}

//********************************************************************************************************************


// Abwesenheiten Funktionen
//********************************************************************************************************************

// Lesen aller Abwesenheiten der DB
var getAbwesenheiten = function getAbwesenheiten() {

  return new Promise(function(resolve, reject) {

    // Alle Abwesenheiten der Station

    let sql = "SELECT * FROM abwesenheitsmeldung";
    connection.query(sql, function(err, result) {
      if (err) reject(err);
      else {


        resolve(result);

      }
    });
  });
}


// Lesen einer Abwesenheit mit id x
var getAbwesenheitenByID = function getAbwesenheitenByID(abwesenheitsMeldungID) {

  return new Promise(function(resolve, reject) {



    let sql = "SELECT * FROM abwesenheitsmeldung WHERE id = " + abwesenheitsMeldungID;
    connection.query(sql, function(err, result) {
      if (err) {
        reject(err);
        console.log(err)
      } else {


        resolve(result);

      }
    });
  });
}

// Neue Abwesenheit der Datenbank hinzufügen
var neueAbwesenheit = function neueAbwesenheit(abwesenheitsmeldung) {
  return new Promise(function(resolve, reject) {

    var sql = "INSERT INTO abwesenheitsmeldung (stationID, MitarbeiterID, datumBeginn, datumEnde) VALUES ( \"" + abwesenheitsmeldung.stationID + "\",\"" + abwesenheitsmeldung.mitarbeiterID + "\",\"" + abwesenheitsmeldung.datumBeginn + "\",\"" + abwesenheitsmeldung.datumEnde + "\")";


    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        reject(err);

      } else {

        var sql2 = "SELECT * FROM abwesenheitsmeldung WHERE stationID = " + abwesenheitsmeldung.stationID + " AND MitarbeiterID = " + abwesenheitsmeldung.mitarbeiterID + " AND datumBeginn = \"" + abwesenheitsmeldung.datumBeginn + "\" AND datumEnde = \"" + abwesenheitsmeldung.datumEnde + "\"";

        connection.query(sql2, function(err, result2) {
          if (err) {
            console.log(err)
            reject(err);

          } else {
            resolve(result2);
          }


        });
      }
    });


  });
}


// Abwesenheitsmeldung aktuallisieren
var updateAbwesenheit = function updateAbwesenheit(id, abwesenheitUpdate) {
  return new Promise(function(resolve, reject) {

    var sql = "UPDATE abwesenheitsmeldung SET datumBeginn = \"" + abwesenheitUpdate.datumBeginn + "\", datumEnde= \"" + abwesenheitUpdate.datumEnde + "\" WHERE id =" + id;


    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        reject(err);

      } else {
        resolve(result);
        console.log("Abwesenheit wurde aktuallisiert");
      }
    });


  });
}


//Loeschen einer Abwesenheit
var loescheAbwesenheit = function loescheAbwesenheit(id) {
  return new Promise(function(resolve, reject) {

    var sql = "DELETE FROM abwesenheitsmeldung WHERE id = " + id;


    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        reject(err);

      } else {
        resolve(result);
        console.log("Abwesenheitsmeldung wurde gelöscht");
      }
    });


  });
}

//********************************************************************************************************************

// Tauschanfragen-Funktionen
//********************************************************************************************************************

// Lesen aller Tauschanfragen aus der DB
var getTauschanfragen = function getTauschanfragen() {

  return new Promise(function(resolve, reject) {

    let sql = "SELECT * FROM  schichttausch";
    connection.query(sql, function(err, result) {
      if (err) reject(err);
      else {

        resolve(result);

      }
    });
  });
}



// Erstellen einer neuen Tauschanfrage
var neueTauschanfrage = function neueTauschanfrage(schichttausch) {
  return new Promise(function(resolve, reject) {

    var sql = "INSERT INTO schichttausch (stationID, mitarbeiterID, datumTausch, tauschStatus) VALUES ( \"" + schichttausch.stationID + "\",\"" + schichttausch.mitarbeiterID + "\",\"" + schichttausch.datumTausch + "\",\"" + schichttausch.tauschStatus + "\")";

    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        reject(err);

      } else {
        resolve(schichttausch);
        //  console.log("1 neue Tauschanfrage");
      }
    });


  });
}


// Aktualisieren einer Tauschanfragen
var updateTauschanfrage = function updateTauschanfrage(id, tauschUpdate) {
  return new Promise(function(resolve, reject) {

    var sql = "UPDATE schichttausch SET tauschStatus = \"" + tauschUpdate.tauschStatus + "\" WHERE id =" + id;


    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        reject(err);

      } else {
        resolve(result);

      }
    });


  });
}


// Löschen einer Tauschanfragen
var loescheTauschanfrage = function loescheTauschanfrage(id) {
  return new Promise(function(resolve, reject) {

    var sql = "DELETE FROM schichttausch WHERE id = " + id;


    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        reject(err);

      } else {
        resolve(result);

      }
    });


  });
}

//****************************************************************************************************************************

// Schichtzuweisung-Funktionen
//****************************************************************************************************************************

// Erstellen neuer Schichtzuweisung
var neueSchichtzuweisung = function neueSchichtzuweisung(zuweisung) {
  return new Promise(function(resolve, reject) {

    var sql = "INSERT INTO schichtzuweisung (datum, schichtArt, mitarbeiterID1, mitarbeiterID2, mitarbeiterID3,mitarbeiterID4) VALUES ( \"" + zuweisung.datum + "\",\"" + zuweisung.schichtArt + "\",\"" + zuweisung.mitarbeiterID1 + "\",\"" + zuweisung.mitarbeiterID2 + "\",\"" + zuweisung.mitarbeiterID3 + "\",\"" + zuweisung.mitarbeiterID4 + "\")";


    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        reject(err);

      } else {
        resolve(zuweisung);
      }
    });


  });
}


// Lesen einer Schichtzuweisungen mit Datum x und Schichtart y aus der DB
var getSchichtzuweisung = function getSchichtzuweisung(date, schicht) {

  return new Promise(function(resolve, reject) {

    let sql = "SELECT * FROM schichtzuweisung WHERE datum = \"" + date + "\" AND schichtArt = \"" + schicht + "\"";

    connection.query(sql, function(err, result) {
      if (err) reject(err);
      else {

        resolve(result);


      }
    });
  });
}

// Lesen aller Schichtzuweisungen eines Datums aus der DB
var getSchichtzuweisungen = function getSchichtzuweisungen(date) {

  return new Promise(function(resolve, reject) {

    let sql = "SELECT * FROM schichtzuweisung WHERE datum = " + date;

    connection.query(sql, function(err, result) {
      if (err) reject(err);
      else {

        resolve(result);

      }
    });
  });
}

// Aktualisieren einer Schichtzuweisung
var updateSchichtzuweisung = function updateSchichtzuweisung(date, schicht, schichtUpdate) {
  return new Promise(function(resolve, reject) {

    var sql = "UPDATE schichtzuweisung SET mitarbeiterID1 = \"" + schichtUpdate.mitarbeiterID1 + "\",mitarbeiterID2 = \"" + schichtUpdate.mitarbeiterID2 + "\",mitarbeiterID3 = \"" + schichtUpdate.mitarbeiterID3 + "\",mitarbeiterID4 = \"" + schichtUpdate.mitarbeiterID4 + "\" WHERE datum = \"" + date + "\" AND schichtArt = \"" + schicht + "\"";


    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        reject(err);

      } else {
        resolve(result);

      }
    });


  });
}


// Aktualisieren einer Schichtzuwesung mit ID, des Mitarbeiters, welcher ersetzt werden soll + Id, welche alte ID ersetzt
var updateSchichtzuweisungErsatz = function updateSchichtzuweisungErsatz(date, schicht, alteMaID, neueMaID) {
  return new Promise(function(resolve, reject) {

    let sql = "SELECT * FROM schichtzuweisung WHERE datum = \"" + date + "\" AND schichtArt = \"" + schicht + "\"";

    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        reject(err);
      } else {

        // Ersetzen an der richtigen Stelle
        if (alteMaID == result[0].mitarbeiterID1) {
          var sql2 = "UPDATE schichtzuweisung SET mitarbeiterID1 = \"" + neueMaID + "\" WHERE datum = \"" + date + "\" AND schichtArt = \"" + schicht + "\"";
        } else if (alteMaID == result[0].mitarbeiterID2) {
          var sql2 = "UPDATE schichtzuweisung SET mitarbeiterID2 = \"" + neueMaID + "\" WHERE datum = \"" + date + "\" AND schichtArt = \"" + schicht + "\"";
        } else if (alteMaID == result[0].mitarbeiterID3) {
          var sql2 = "UPDATE schichtzuweisung SET mitarbeiterID3 = \"" + neueMaID + "\" WHERE datum = \"" + date + "\" AND schichtArt = \"" + schicht + "\"";
        } else if (alteMaID == result[0].mitarbeiterID4) {
          var sql2 = "UPDATE schichtzuweisung SET mitarbeiterID4 = \"" + neueMaID + "\" WHERE datum = \"" + date + "\" AND schichtArt = \"" + schicht + "\"";
        }
        if (sql2 != undefined) {
          connection.query(sql2, function(err, result2) {
            if (err) {
              console.log(err)
              reject(err);

            } else {
              resolve(result2);

            }
          });
        }

      }
    });

  });
}






// Eintragung eines Tauschs auf Grund eines Wunsches für einen Dienstplan
var updateSchichtzuweisungWunsch = function updateSchichtzuweisungWunsch(mitarbeiterID, tauschenderMitarbeiter) {
  return new Promise(function(resolve, reject) {

    var sql = "UPDATE schichtzuweisung SET mitarbeiterID" + tauschenderMitarbeiter.idNummer + " = \"" + mitarbeiterID + "\" WHERE datum = \"" + tauschenderMitarbeiter.datum + "\" AND schichtArt = \"" + tauschenderMitarbeiter.schichtArt + "\"";

    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        reject(err);

      } else {
        resolve(result);

      }
    });


  });
}




// Löschen einer Schichtzuweisung
var loescheSchichtzuweisung = function loescheSchichtzuweisung(date, schicht) {
  return new Promise(function(resolve, reject) {

    var sql = "DELETE FROM schichttausch WHERE date = " + date + "AND schichtArt = " + schicht;


    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        reject(err);

      } else {
        resolve(result);

      }
    });


  });
}


//****************************************************************************************************************************

//Tag - Funktionen
//****************************************************************************************************************************

// Erstellen eines neuen Tags
var neuerTag = function neuerTag(tag) {
  return new Promise(function(resolve, reject) {

    var sql = "INSERT INTO tag (schichtzuweisungID1, schichtzuweisungID2, schichtzuweisungID3, datum) VALUES ( \"" + tag.schichtzuweisungID1 + "\",\"" + tag.schichtzuweisungID2 + "\",\"" + tag.schichtzuweisungID3 + "\",\"" + tag.datum + "\")";


    connection.query(sql, function(err, result) {


      if (err) {
        console.log(err)
        reject(err);

      } else {

        resolve(tag)

      }
    })
  });
}


// Lesen aller Tage aus der DB
var getTage = function getTage() {

  return new Promise(function(resolve, reject) {

    let sql = "SELECT * FROM tag";
    connection.query(sql, function(err, result) {
      if (err) reject(err);
      else {

        resolve(result);

      }
    });
  });
}





// Lesen eines Tages mit Datum aus der DB
var getTag = function getTag(date) {

  return new Promise(function(resolve, reject) {
    var neuerTag;
    let sql = "SELECT * FROM tag WHERE datum = " + "\"" + date + "\"";

    connection.query(sql, function(err, result) {
      if (err) reject(err);
      else {
        neuerTag = {
          tag: result
        }

        resolve(neuerTag);

      }
    });
  });
}


// Löschen eines Tages
var loescheTag = function loescheTag(date) {
  return new Promise(function(resolve, reject) {

    var sql = "DELETE FROM tag WHERE date = " + date;


    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        reject(err);

      } else {
        resolve(result);
        //  console.log("Tag wurde gelöscht");
      }
    });


  });
}



// Dienstplan-Funktionen
//****************************************************************************************************************************

// Lesen eines Dienstplans aus der DB mit ID
var getDienstplan = function getDienstplan(id) {

  return new Promise(function(resolve, reject) {

    var arrayTage = new Array();
    var arraySchichten = new Array();
    var tage = {
      schichtzuweisung: []
    }


    var dienstplan = {
      stationID: "",
      monat: "",
      jahr: "",
      tage: []
    }

    var maxAnzahlTage;

    // 1. Lesen der Dienstplan-Daten aus der DB -> Zuweisung dienstplan-Objekt aus Funktion
    let sql = "SELECT * FROM dienstplan WHERE id = " + id;

    connection.query(sql, function(err, result) {
      if (err) reject(err);

      else if (result[0] != undefined) {

        dienstplan.stationID = result[0].stationID;
        dienstplan.monat = result[0].monat;
        dienstplan.jahr = result[0].jahr;
        dienstplan.tage = [result[0].tag1, result[0].tag2, result[0].tag3, result[0].tag4, result[0].tag5,
          result[0].tag6, result[0].tag7, result[0].tag8, result[0].tag9, result[0].tag10, result[0].tag11,
          result[0].tag12, result[0].tag13, result[0].tag14, result[0].tag15, result[0].tag16, result[0].tag17,
          result[0].tag18, result[0].tag19, result[0].tag20, result[0].tag21, result[0].tag22, result[0].tag23,
          result[0].tag24, result[0].tag25, result[0].tag26, result[0].tag27, result[0].tag28, result[0].tag29,
          result[0].tag30, result[0].tag31
        ];

        maxAnzahlTage = tagZaehler(dienstplan.monat, dienstplan.jahr);

        for (let i = 0; i < maxAnzahlTage; i++) {

          // 2. Lesen der Tag-Daten aus der DB -> Zuweisung dienstplan-Objekt aus Funktion
          let sql2 = "SELECT * FROM tag WHERE id = " + dienstplan.tage[i];


          connection.query(sql2, function(err, result2) {
            if (err) reject(err);
            else {
              tage.schichtzuweisung[i] = {
                fruehschicht: result2[0].schichtzuweisungID1,
                spaetschicht: result2[0].schichtzuweisungID2,
                nachtschicht: result2[0].schichtzuweisungID3
              }

              arrayTage.push(result2)
            }

            // 3. Lesen der Schichtzuweisung-Daten aus der DB -> Zuweisung dienstplan-Objekt aus Funktion
            let sql3 = "SELECT * FROM schichtzuweisung WHERE id = " + tage.schichtzuweisung[i].fruehschicht + " OR id= " + tage.schichtzuweisung[i].spaetschicht + " OR id= " + tage.schichtzuweisung[i].nachtschicht;

            connection.query(sql3, function(err, result3) {
              if (err) reject(err);
              else {
                arraySchichten.push(result3)
                var dienstplanErgebnis = { // Dienstplan Objekt mit allen Zuweisungen und Daten aus der DB -> Wird resolvt
                  metadaten: result,
                  tage: arrayTage,
                  schichten: arraySchichten
                }
                if (i + 1 == maxAnzahlTage) resolve(dienstplanErgebnis);


              }
            });



          });

        }
      } else {
        resolve("Kein Dienstplan mit dieser ID vorhanden!")
      }
    });


  });
}


// Lesen eines Dienstplans aus der DB mit monat + Jahr
var getDienstplanByDate = function getDienstplanByDate(monat, jahr) {

  return new Promise(function(resolve, reject) {

    var arrayTage = new Array();
    var arraySchichten = new Array();
    var tage = {
      schichtzuweisung: []
    }

    var dienstplan = {
      stationID: "",
      monat: "",
      jahr: "",
      tage: []
    }

    var maxAnzahlTage;

    // 1. Lesen der Dienstplan-Daten aus der DB -> Zuweisung dienstplan-Objekt aus Funktion
    let sql = "SELECT * FROM dienstplan WHERE monat = " + monat + " AND jahr = " + jahr;

    connection.query(sql, function(err, result) {
      if (err) reject(err);

      else if (result[0] != undefined) {

        dienstplan.stationID = result[0].stationID;
        dienstplan.monat = result[0].monat;
        dienstplan.jahr = result[0].jahr;
        dienstplan.tage = [result[0].tag1, result[0].tag2, result[0].tag3, result[0].tag4, result[0].tag5,
          result[0].tag6, result[0].tag7, result[0].tag8, result[0].tag9, result[0].tag10, result[0].tag11,
          result[0].tag12, result[0].tag13, result[0].tag14, result[0].tag15, result[0].tag16, result[0].tag17,
          result[0].tag18, result[0].tag19, result[0].tag20, result[0].tag21, result[0].tag22, result[0].tag23,
          result[0].tag24, result[0].tag25, result[0].tag26, result[0].tag27, result[0].tag28, result[0].tag29,
          result[0].tag30, result[0].tag31
        ];

        maxAnzahlTage = tagZaehler(dienstplan.monat, dienstplan.jahr);

        for (let i = 0; i < maxAnzahlTage; i++) {

          // 2. Lesen der Tag-Daten aus der DB -> Zuweisung dienstplan-Objekt aus Funktion
          let sql2 = "SELECT * FROM tag WHERE id = " + dienstplan.tage[i];


          connection.query(sql2, function(err, result2) {
            if (err) reject(err);
            else {
              tage.schichtzuweisung[i] = {
                fruehschicht: result2[0].schichtzuweisungID1,
                spaetschicht: result2[0].schichtzuweisungID2,
                nachtschicht: result2[0].schichtzuweisungID3
              }

              arrayTage.push(result2)
            }

            // 3. Lesen der Schichtzuweisung-Daten aus der DB -> Zuweisung dienstplan-Objekt aus Funktion
            let sql3 = "SELECT * FROM schichtzuweisung WHERE id = " + tage.schichtzuweisung[i].fruehschicht + " OR id= " + tage.schichtzuweisung[i].spaetschicht + " OR id= " + tage.schichtzuweisung[i].nachtschicht;

            connection.query(sql3, function(err, result3) {
              if (err) reject(err);
              else {
                arraySchichten.push(result3)
                var dienstplanErgebnis = { // Dienstplan Objekt mit allen Zuweisungen und Daten aus der DB -> Wird resolvt
                  metadaten: result,
                  tage: arrayTage,
                  schichten: arraySchichten
                }
                if (i + 1 == maxAnzahlTage) resolve(dienstplanErgebnis);


              }
            });



          });

        }
      } else {
        resolve("Kein Dienstplan mit dieser ID vorhanden!")
      }
    });


  });
}




// Get Dienstplan mit Datum als Parameter -> Nur für das Abfangen, ob ein Dienstplan bereits vorhanden ist

var getDienstplanByMonat = function getDienstplanByMonat(monat, jahr) {

  return new Promise(function(resolve, reject) {

    let sql = "SELECT * FROM dienstplan WHERE monat = " + monat + " AND jahr = " + jahr;

    connection.query(sql, function(err, result) {

      if (result[0] == undefined) resolve();

      else {
        reject("Diesen Dienstplan gibt es schon!");
      }
    })
  })
}



// Erstellen eines neuen Dienstplans
var neuerDienstplan = function neuerDienstplan(dp) {
  return new Promise(function(resolve, reject) {
    var tag29;
    var tag30;
    var tag31;
    //In der Datenbank hinzufügen

    var anzahlTage = tagZaehler(dp.monat, dp.jahr);
    // Februar
    if (anzahlTage < 29) {
      tag29 = -1;
      tag30 = -1;
      tag31 = -1;
    }
    // Schaltjahr
    else if (anzahlTage < 30) {
      tag29 = dp.monatsTage[28].tag[0].id;
      tag30 = -1;
      tag31 = -1;
    } // Monate mit 30 Tagen
    else if (anzahlTage < 31) {
      tag29 = dp.monatsTage[28].tag[0].id;
      tag30 = dp.monatsTage[29].tag[0].id;
      tag31 = -1;
    } //Monate mit 31 Tagen
    else {
      tag29 = dp.monatsTage[28].tag[0].id;
      tag30 = dp.monatsTage[29].tag[0].id;
      tag31 = dp.monatsTage[30].tag[0].id;
    }


    var sql = "INSERT INTO dienstplan (stationID, monat, jahr, tag1, tag2,tag3,tag4,tag5,tag6,tag7,tag8,tag9,tag10,tag11,tag12,tag13,tag14,tag15,tag16,tag17,tag18,tag19,tag20,tag21,tag22,tag23,tag24,tag25,tag26,tag27,tag28,tag29,tag30,tag31) VALUES ( \"" + dp.stationID + "\",\"" + dp.monat + "\",\"" + dp.jahr + "\",\"" + dp.monatsTage[0].tag[0].id + "\",\"" + dp.monatsTage[1].tag[0].id + "\",\"" + dp.monatsTage[2].tag[0].id + "\",\"" + dp.monatsTage[3].tag[0].id + "\",\"" + dp.monatsTage[4].tag[0].id + "\",\"" + dp.monatsTage[5].tag[0].id + "\",\"" + dp.monatsTage[6].tag[0].id + "\",\"" + dp.monatsTage[7].tag[0].id + "\",\"" + dp.monatsTage[8].tag[0].id + "\",\"" + dp.monatsTage[9].tag[0].id + "\",\"" + dp.monatsTage[10].tag[0].id + "\",\"" + dp.monatsTage[11].tag[0].id + "\",\"" + dp.monatsTage[12].tag[0].id + "\",\"" + dp.monatsTage[13].tag[0].id + "\",\"" + dp.monatsTage[14].tag[0].id + "\",\"" + dp.monatsTage[15].tag[0].id + "\",\"" + dp.monatsTage[16].tag[0].id + "\",\"" + dp.monatsTage[17].tag[0].id + "\",\"" + dp.monatsTage[18].tag[0].id + "\",\"" + dp.monatsTage[19].tag[0].id + "\",\"" + dp.monatsTage[20].tag[0].id + "\",\"" + dp.monatsTage[21].tag[0].id + "\",\"" + dp.monatsTage[22].tag[0].id + "\",\"" + dp.monatsTage[23].tag[0].id + "\",\"" + dp.monatsTage[24].tag[0].id + "\",\"" + dp.monatsTage[25].tag[0].id + "\",\"" + dp.monatsTage[26].tag[0].id + "\",\"" + dp.monatsTage[27].tag[0].id + "\",\"" + tag29 + "\",\"" + tag30 + "\",\"" + tag31 + "\")";

    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        reject(err);

      } else {
        resolve(dp);

      }
    });


  });
}

//##################################################################################################################

// Wunsch-Funktionen
//##################################################################################################################

// Erstellen eines Wunsches
var neuerWunsch = function neuerWunsch(wunsch) {
  return new Promise(function(resolve, reject) {

    var sql = "INSERT INTO wunsch (stationID, mitarbeiterID, datumWunsch, wunschBeschreibung, schichtArt) VALUES ( \"" + wunsch.stationID + "\",\"" + wunsch.mitarbeiterID + "\",\"" + wunsch.datumWunsch + "\",\"" + wunsch.wunschBeschreibung + "\",\"" + wunsch.schichtArt + "\")";


    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        reject(err);

      } else {
        resolve(wunsch);
      }
    });


  });
}


// Lesen aller Wünsche der Mitarbeiter einers Station
var getWuenscheStation = function getWuenscheStation(stationID, monat) {

  return new Promise(function(resolve, reject) {

    let sql = "SELECT * FROM wunsch WHERE stationID = " + stationID + " AND  datumWunsch LIKE \"%" + monat + "%\"";

    connection.query(sql, function(err, result) {
      if (err) reject(err);
      else {

        resolve(result);

      }

    });
  });
}





// Lesen aller Wünsche eines Mitarbeiters aus der DB
var getWuensche = function getWuensche(stationID, mitarbeiterID) {

  return new Promise(function(resolve, reject) {

    let sql = "SELECT * FROM wunsch WHERE stationID = " + stationID + "AND mitarbeiterID = " + mitarbeiterID;

    connection.query(sql, function(err, result) {
      if (err) reject(err);
      else {

        resolve(result);

      }
    });
  });
}



// Löschen eines Wunsches
var loescheWunsch = function leoscheWunsch(stationID, mitarbeiterID, date) {
  return new Promise(function(resolve, reject) {


    var sql = "DELETE FROM wunsch WHERE stationID =" + stationID + "AND mitarbeiterID = " + mitarbeiterID + "AND datumWunsch = " + date;


    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        reject(err);

      } else {
        resolve(result);

      }
    });


  });
}


//************************************************************************************************
// Ersatzanfragen /- Eintragung - Funktionen

// Lesen aller Ersatzanfragen eines Mitarbeiters aus der DB
var getErsatzanfragen = function getErsatzanfragen(mitarbeiterID) {

  return new Promise(function(resolve, reject) {

    let sql = "SELECT * FROM ersatzanfrage WHERE mitarbeiterID = " + mitarbeiterID;

    connection.query(sql, function(err, result) {
      if (err) reject(err);
      else {

        resolve(result);

      }
    });
  });
}


// Erstellen einer neuen Ersatzanfrage in der DB | Nur für die verfügbaren Mitarbeiter
var neueErsatzanfrage = function neueErsatzanfrage(informationen, abwesenheit, index) {
  return new Promise(function(resolve, reject) {

    // Lesen der Schichtart der zu ersetzenden Schicht
    var sql = "SELECT schichtArt FROM schichtzuweisung WHERE datum = \"" + abwesenheit.datumBeginn + "\" AND (mitarbeiterID1 = " + abwesenheit.MitarbeiterID + " OR mitarbeiterID2 = " + abwesenheit.MitarbeiterID + " OR mitarbeiterID3 = " + abwesenheit.MitarbeiterID + " OR mitarbeiterID4 = " + abwesenheit.MitarbeiterID + ")";

    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        reject(err);

      } else {

        console.log(result);

        // Erstellung der Ersatzanfrage
        var sql2 = "INSERT INTO ersatzanfrage (stationID, mitarbeiterID, abwesenheitsmeldungID, datumUebernahme, schichtArt) VALUES ( \"" + abwesenheit.stationID + "\",\"" + informationen.mitarbeiter[index].id + "\",\"" + abwesenheit.id + "\",\"" + informationen.datum + "\",\"" + result[0].schichtArt + "\")";

        connection.query(sql2, function(err, result2) {
          if (err) {
            console.log(err)
            reject(err);

          } else {
            resolve("Ersatzanfrage erstellt");
          }
        });

      }
    });


  });

}


// löschen der Ersatzanfragen einer bestimmten Abwesenheitsmeldung
var loescheErsatzanfrage = function loescheErsatzanfrage(abwesenheitsmeldungID, datumUebernahme) {
  return new Promise(function(resolve, reject) {

    var sql = "DELETE FROM ersatzanfrage WHERE abwesenheitsMeldungID = " + abwesenheitsmeldungID + " AND datumUebernahme = \"" + datumUebernahme + "\"";

    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        reject(err);

      } else {
        resolve(result);

      }
    });


  });
}


// löschen einer einzelnen Ersatzanfrage eines Mitarbeiters
var loescheErsatzanfrageEinzeln = function loescheErsatzanfrageEinzeln(abwesenheitsmeldungID, datumUebernahme, mitarbeiterID) {
  return new Promise(function(resolve, reject) {


    var sql = "DELETE FROM ersatzanfrage WHERE abwesenheitsMeldungID =" + abwesenheitsmeldungID + " AND datumUebernahme = \"" + datumUebernahme + "\" AND mitarbeiterID = " + mitarbeiterID;
    console.log(sql)

    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        reject(err);

      } else {
        resolve(result);

      }
    });


  });
}


// Lesen aller Ersatzeintragungen eines Mitarbeiters aus der DB
var getErsatzeintragung = function getErsatzeintragung(mitarbeiterID) {

  return new Promise(function(resolve, reject) {

    let sql = "SELECT * FROM ersatzeintragung WHERE mitarbeiterID = " + mitarbeiterID;

    connection.query(sql, function(err, result) {
      if (err) reject(err);
      else {

        resolve(result);

      }
    });
  });
}


// Erstellen einer neuen Ersatzeintragung
var neueErsatzeintragung = function neueErsatzeintragung(ersatzAnfrage) {
  return new Promise(function(resolve, reject) {

    var sql = "INSERT INTO ersatzeintragung (stationID, mitarbeiterID, abwesenheitsmeldungID, datumUebernahme, schichtArt) VALUES ( \"" + ersatzAnfrage.stationID + "\",\"" + ersatzAnfrage.mitarbeiterID + "\",\"" + ersatzAnfrage.abwesenheitsmeldungID + "\",\"" + ersatzAnfrage.datumUebernahme + "\",\"" + ersatzAnfrage.schichtArt + "\")";

    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        reject(err);

      } else {
        resolve(ersatzAnfrage);
      }
    });


  });



}




//Mitarbeiter
exports.getMitarbeiter = getMitarbeiter;
exports.neuerMitarbeiter = neuerMitarbeiter;
exports.updateMitarbeiter = updateMitarbeiter;
exports.updateUeberstunden = updateUeberstunden;
exports.loescheMitarbeiter = loescheMitarbeiter;
exports.updateWunschRating = updateWunschRating;
exports.updateDienstplanRating = updateDienstplanRating;
exports.getMitarbeiterById = getMitarbeiterById;
exports.getErsatzanfragen = getErsatzanfragen;
exports.neueErsatzanfrage = neueErsatzanfrage;
exports.neueErsatzeintragung = neueErsatzeintragung;
exports.getErsatzeintragung = getErsatzeintragung;
exports.loescheErsatzanfrage = loescheErsatzanfrage;
exports.loescheErsatzanfrageEinzeln = loescheErsatzanfrageEinzeln;

//Abwesenheitsmeldung
exports.getAbwesenheiten = getAbwesenheiten;
exports.neueAbwesenheit = neueAbwesenheit;
exports.updateAbwesenheit = updateAbwesenheit;
exports.loescheAbwesenheit = loescheAbwesenheit;
exports.getAbwesenheitenByID = getAbwesenheitenByID;

//Tauschanfragen
exports.getTauschanfragen = getTauschanfragen;
exports.neueTauschanfrage = neueTauschanfrage;
exports.updateTauschanfrage = updateTauschanfrage;
exports.loescheTauschanfrage = loescheTauschanfrage;

//Schichtzuweisungen
exports.getSchichtzuweisung = getSchichtzuweisung;
exports.getSchichtzuweisungen = getSchichtzuweisungen;
exports.neueSchichtzuweisung = neueSchichtzuweisung;
exports.updateSchichtzuweisung = updateSchichtzuweisung;
exports.loescheSchichtzuweisung = loescheSchichtzuweisung;
exports.updateSchichtzuweisungWunsch = updateSchichtzuweisungWunsch;
exports.updateSchichtzuweisungErsatz = updateSchichtzuweisungErsatz;

//Tag
exports.getTage = getTage;
exports.getTag = getTag;
exports.neuerTag = neuerTag;
exports.loescheTag = loescheTag;

//Dienstplans
exports.getDienstplan = getDienstplan;
exports.neuerDienstplan = neuerDienstplan;
exports.getDienstplanByMonat = getDienstplanByMonat;
exports.getDienstplanByDate = getDienstplanByDate;

// Wunsch
exports.neuerWunsch = neuerWunsch;
exports.getWuensche = getWuensche;
exports.loescheWunsch = loescheWunsch;
exports.getWuenscheStation = getWuenscheStation;
