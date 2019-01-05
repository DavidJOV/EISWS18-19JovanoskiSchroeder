var dbConnection = require("../DB/dbConnector"); // importieren der DB Verbindung
//var semaphore = require("../helper/semaphoreHelper").semaphore;
var connection = dbConnection.connection;
var tagZaehler = require("../helper/tagberechnung.js").getDaysInMonth;

//Mitarbeiter Funktionen

//********************************************************************************************************************

var getMitarbeiter = function getMitarbeiter() {

    return new Promise(function(resolve, reject) {

        // Alle Mitarbeiter die auf der Station arbeiten

        let sql = "SELECT * FROM Mitarbeiter"
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

var neuerMitarbeiter = function neuerMitarbeiter(mitarbeiter) {
    return new Promise(function(resolve, reject) {

        // Neuen Mitarbeiter der Datenbank hinzufügen

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

var updateMitarbeiter = function updateMitarbeiter(mitarbeiter) {
    return new Promise(function(resolve, reject) {

        // Informationen eines Mitarbeiters aktuallisieren

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

var loescheMitarbeiter = function loescheMitarbeiter(id) {
    return new Promise(function(resolve, reject) {

        //Loeschen eines Mitarbeiters

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

var updateUeberstunden = function updateUeberstunden(id, ueberstunden) {
    return new Promise(function(resolve, reject) {

        // Überstunden eines Mitarbeiters aktuallisieren

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

var updateWunschRating = function updateWunschRating(id, rating) {
    return new Promise(function(resolve, reject) {

        // WunschRating eines Mitarbeiters aktuallisieren

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


var updateDienstplanRating = function updateDienstplanRating(id, rating) {
    return new Promise(function(resolve, reject) {

        // dienstplanRating eines Mitarbeiters aktuallisieren

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

        // Alle Abwesenheiten derd Station

        let sql = "SELECT id, stationID, mitarbeiterID, DATE_FORMAT(datumBeginn, \"%W %M %e %Y\"),DATE_FORMAT(datumEnde, \"%W %M %e %Y\") FROM  abwesenheitsmeldung";
        connection.query(sql, function(err, result) {
            if (err) reject(err);
            else {

                // Datenbank Daten aufbereiten.

                //let mitarbeiterString = JSON.stringify(result);
                // var mitarbeiter = JSON.parse(mitarbeiterString);
                resolve(result);

            }
        });
    });
}


var neueAbwesenheit = function neueAbwesenheit(abwesenheitsmeldung) {
    return new Promise(function(resolve, reject) {

        // Neuen Mitarbeiter der Datenbank hinzufügen

        var sql = "INSERT INTO abwesenheitsmeldung (stationID, MitarbeiterID, datumBeginn, datumEnde) VALUES ( \"" + abwesenheitsmeldung.stationID + "\",\"" + abwesenheitsmeldung.MitarbeiterID + "\",\"" + abwesenheitsmeldung.datumBeginn + "\",\"" + abwesenheitsmeldung.datumEnde + "\")";


        connection.query(sql, function(err, result) {
            if (err) {
                console.log(err)
                reject(err);

            } else {
                resolve(abwesenheitsmeldung);
                console.log("1 neue Abwesenheitsmeldung");
            }
        });


    });
}

var updateAbwesenheit = function updateAbwesenheit(id, abwesenheitUpdate) {
    return new Promise(function(resolve, reject) {

        // Abwesenheitsmeldung aktuallisieren

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

var loescheAbwesenheit = function loescheAbwesenheit(id) {
    return new Promise(function(resolve, reject) {

        //Loeschen eines Mitarbeiters

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

// Lesen aller Tauschanfragen der DB
var getTauschanfragen = function getTauschanfragen() {

    return new Promise(function(resolve, reject) {

        // Alle Tauschanfragen

        let sql = "SELECT id, stationID, mitarbeiterID, DATE_FORMAT(datumTausch, \"%W %M %e %Y\"),tauschStatus FROM  schichttausch";
        connection.query(sql, function(err, result) {
            if (err) reject(err);
            else {

                resolve(result);

            }
        });
    });
}



// Erstellen neuer Tauschanfrage
var neueTauschanfrage = function neueTauschanfrage(schichttausch) {
    return new Promise(function(resolve, reject) {

        //In der Datenbank hinzufügen

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

        // Tauschanfrage aktuallisieren

        var sql = "UPDATE schichttausch SET tauschStatus = \"" + tauschUpdate.tauschStatus + "\" WHERE id =" + id;


        connection.query(sql, function(err, result) {
            if (err) {
                console.log(err)
                reject(err);

            } else {
                resolve(result);
                //console.log("Tauschanfrage wurde aktuallisiert");
            }
        });


    });
}


// Löschen einer Tauschanfragen
var loescheTauschanfrage = function loescheTauschanfrage(id) {
    return new Promise(function(resolve, reject) {

        //Loeschen einer Tauschanfrage

        var sql = "DELETE FROM schichttausch WHERE id = " + id;


        connection.query(sql, function(err, result) {
            if (err) {
                console.log(err)
                reject(err);

            } else {
                resolve(result);
                //  console.log("Tauschanfrage wurde gelöscht");
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

        //In der Datenbank hinzufügen

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


// Lesen einer Schichtzuweisungen eines Datums aus der DB
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

        // Schichtzuweisung aktuallisieren

        var sql = "UPDATE schichtzuweisung SET mitarbeiterID1 = \"" + schichtUpdate.miarbeiterID1 + "\",mitarbeiterID2 = \"" + schichtUpdate.miarbeiterID2 + "\",mitarbeiterID3 = \"" + schichtUpdate.miarbeiterID3 + "\",mitarbeiterID4 = \"" + schichtUpdate.miarbeiterID4 + "\" WHERE datum =" + date + "AND schichtArt = " + schicht;


        connection.query(sql, function(err, result) {
            if (err) {
                console.log(err)
                reject(err);

            } else {
                resolve(result);
                //console.log("Schicht wurde aktuallisiert");
            }
        });


    });
}


// Löschen einer Schichtzuweisung
var loescheSchichtzuweisung = function loescheSchichtzuweisung(date, schicht) {
    return new Promise(function(resolve, reject) {

        //Loeschen einer Schichtzuweisung

        var sql = "DELETE FROM schichttausch WHERE date = " + date + "AND schichtArt = " + schicht;


        connection.query(sql, function(err, result) {
            if (err) {
                console.log(err)
                reject(err);

            } else {
                resolve(result);
                //  console.log("Schicht wurde gelöscht");
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
        
        //In der Datenbank hinzufügen
       // console.log(tag)
        var sql = "INSERT INTO tag (schichtzuweisungID1, schichtzuweisungID2, schichtzuweisungID3, schichtzuweisungID4, datum) VALUES ( \"" + tag.schichtzuweisungID1 + "\",\"" + tag.schichtzuweisungID2 + "\",\"" + tag.schichtzuweisungID3 + "\",\"" + tag.schichtzuweisungID4 + "\",\"" + tag.datum + "\")";


        connection.query(sql, function(err, result) {
         
          
            if (err) {
                console.log(err)
                reject(err);

            } else {
              
                //console.log(neuerTag) // Loggt immer den Letzen Tag schreibt aber den richtigen in die DB wieso???
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
        let sql = "SELECT * FROM tag WHERE datum = " + "\""+date+"\"";

        connection.query(sql, function(err, result) {
            if (err) reject(err);
            else {
              neuerTag= {
                tag : result
              }
                
                resolve(neuerTag);

            }
        });
    });
}


// Löschen eines Tages
var loescheTag = function loescheTag(date) {
    return new Promise(function(resolve, reject) {

        //Loeschen eines Tags

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

// Lesen eines Dienstplans aus der DB
var getDienstplan = function getDienstplan(id) {


    return new Promise(function(resolve, reject) {

        //  Dienstplan mit gennanter ID

        var tage = {
            schichtzuweisung: []
        }


        var dienstplan = {
            stationID: "",
            monat: "",
            tage: [],
        }

        var maxAnzahlTage = 31;
        var maxSchichten = 4;

        let sql = "SELECT * FROM dienstplan WHERE id = " + id;

        connection.query(sql, function(err, result) {
            if (err) reject(err);

            else if (result[0] != undefined) {

                dienstplan.stationID = result[0].stationID;
                dienstplan.monat = result[0].monat;
                dienstplan.tage = [result[0].tag1, result[0].tag2, result[0].tag3, result[0].tag4, result[0].tag5,
                result[0].tag6, result[0].tag7, result[0].tag8, result[0].tag9, result[0].tag10, result[0].tag11,
                result[0].tag12, result[0].tag13, result[0].tag14, result[0].tag15, result[0].tag16, result[0].tag17,
                result[0].tag18, result[0].tag19, result[0].tag20, result[0].tag21, result[0].tag22, result[0].tag23,
                result[0].tag24, result[0].tag25, result[0].tag26, result[0].tag27, result[0].tag28, result[0].tag29,
                result[0].tag30, result[0].tag31];



                for (let i = 0; i < 1; i++) {

                    let sql2 = "SELECT * FROM tag WHERE id = " + dienstplan.tage[i]; // WORKAROUND -> NICHT HARDCODEN!!!


                    connection.query(sql2, function(err, result2) {
                        if (err) reject(err);
                        else {

                            tage.schichtzuweisung[i] = {
                                fruehschicht: result2[0].schichtzuweisungID1,
                                zwischenschicht: result2[0].schichtzuweisungID2,
                                spaetschicht: result2[0].schichtzuweisungID3,
                                nachtschicht: result2[0].schichtzuweisungID4
                            }

                            let sql3 = "SELECT * FROM schichtzuweisung WHERE id = " + tage.schichtzuweisung[i].fruehschicht + " OR " + tage.schichtzuweisung[i].zwischenschicht + " OR " + tage.schichtzuweisung[i].spaetschicht + " OR " + tage.schichtzuweisung[i].nachtschicht;

                            connection.query(sql3, function(err, result3) {
                                if (err) reject(err);
                                else {

                                    var dienstplanErgebnis = {
                                        metadaten: result,
                                        tage: result2,
                                        schichten: result3
                                    }

                                    resolve(dienstplanErgebnis);

                                }
                            });

                        }

                    });

                }
            }
            else { resolve("Kein Dienstplan mit dieser ID vorhanden!") }
        });


    });
}


// Anlegen eines Dienstplans

// Erstellen eines neuen Dienstplans
var neuerDienstplan = function neuerDienstplan(dp) {
    return new Promise(function(resolve, reject) {
      var tag29;
      var tag30;
      var tag31;
        //In der Datenbank hinzufügen
      
     var anzahlTage = tagZaehler(dp.monat,"2019");
     // Februar
     if(anzahlTage < 29){
       tag29 = -1;
       tag30 = -1;
       tag31 = -1;
     }
     // Schaltjahr
     else if(anzahlTage < 30){
      tag29 = dp.monatsTage[28].tag[0].id;
      tag30 = -1;
      tag31 = -1;
    }// Monate mit 30 Tagen
     else if(anzahlTage < 31){
      tag29 = dp.monatsTage[28].tag[0].id;
      tag30 = dp.monatsTage[29].tag[0].id; 
      tag31 = -1;
     }//Monate mit 31 Tagen
     else{
       tag29 = dp.monatsTage[28].tag[0].id;
       tag30 = dp.monatsTage[29].tag[0].id;
       tag31 = dp.monatsTage[30].tag[0].id;
     }
      
      
      
      
        var sql = "INSERT INTO dienstplan (stationID, monat, tag1, tag2,tag3,tag4,tag5,tag6,tag7,tag8,tag9,tag10,tag11,tag12,tag13,tag14,tag15,tag16,tag17,tag18,tag19,tag20,tag21,tag22,tag23,tag24,tag25,tag26,tag27,tag28,tag29,tag30,tag31) VALUES ( \"" + dp.stationID + "\",\"" + dp.monat + "\",\"" + dp.monatsTage[0].tag[0].id + "\",\"" + dp.monatsTage[1].tag[0].id + "\",\"" + dp.monatsTage[2].tag[0].id + "\",\"" + dp.monatsTage[3].tag[0].id + "\",\"" + dp.monatsTage[4].tag[0].id + "\",\"" + dp.monatsTage[5].tag[0].id + "\",\"" + dp.monatsTage[6].tag[0].id + "\",\"" + dp.monatsTage[7].tag[0].id + "\",\"" + dp.monatsTage[8].tag[0].id + "\",\"" + dp.monatsTage[9].tag[0].id + "\",\"" + dp.monatsTage[10].tag[0].id + "\",\"" + dp.monatsTage[11].tag[0].id + "\",\"" + dp.monatsTage[12].tag[0].id + "\",\"" + dp.monatsTage[13].tag[0].id + "\",\"" + dp.monatsTage[14].tag[0].id + "\",\"" + dp.monatsTage[15].tag[0].id + "\",\"" + dp.monatsTage[16].tag[0].id + "\",\"" + dp.monatsTage[17].tag[0].id + "\",\"" + dp.monatsTage[18].tag[0].id + "\",\"" + dp.monatsTage[19].tag[0].id + "\",\"" + dp.monatsTage[20].tag[0].id + "\",\"" + dp.monatsTage[21].tag[0].id + "\",\"" + dp.monatsTage[22].tag[0].id + "\",\"" + dp.monatsTage[23].tag[0].id + "\",\"" + dp.monatsTage[24].tag[0].id + "\",\"" + dp.monatsTage[25].tag[0].id + "\",\"" + dp.monatsTage[26].tag[0].id + "\",\"" + dp.monatsTage[27].tag[0].id + "\",\"" + tag29 + "\",\"" + tag30 + "\",\"" + tag31 + "\")";
        
        connection.query(sql, function(err, result) {
            if (err) {
                console.log(err)
                reject(err);

            } else {
                resolve(dp);
                //  console.log("neuer Dienstplan");
            }
        });


    });
}






//ALT SQL HANDLER RP CODE

var neuerPfleger = function neuerPfleger(pfleger) {
    return new Promise(function(resolve, reject) {

        // Falls keine Email angegeben wurde, darf nicht in die DB geschrieben werden.

        if (pfleger.email != undefined) {
            var sql = "INSERT INTO pfleger (stationID, anrede, vorname, name, email, telefon, beschaeftigungsArt, start) VALUES ( \"" + pfleger.stationID + "\",\"" + pfleger.anrede + "\",\"" + pfleger.vorname + "\",\"" + pfleger.name + "\",\"" + pfleger.email + "\",\"" + pfleger.telefon + "\",\"" + pfleger.beschaeftigungsArt + "\",\"" + pfleger.start + "\")";


            connection.query(sql, function(err, result) {
                if (err) {
                    console.log(err)
                    reject(err);

                } else {
                    resolve(pfleger);
                    console.log("1 neuer Pfleger");
                }
            });

        }
    });
}



var neueAbwesenheitsMeldung = function neueAbwesenheitsMeldung(abwesenheitsMeldung) {
    return new Promise(function(resolve, reject) {

        // Nur wenn ein Integer als PflegerID übermittelt wurde, darf in die DB geschrieben werden.
        if (abwesenheitsMeldung.pflegerID != undefined || Number.isInteger(abwesenheitsMeldung.pflegerID) === false) {
            var sql = "INSERT INTO krankmeldungen (pflegerID, stationID, start, ende, dienstArt,dienstBeginn) VALUES ( \"" + abwesenheitsMeldung.pflegerID + "\",\"" + abwesenheitsMeldung.stationID + "\",\"" + abwesenheitsMeldung.start + "\",\"" + abwesenheitsMeldung.ende + "\",\"" + abwesenheitsMeldung.dienstArt + "\",\"" + abwesenheitsMeldung.dienstBeginn + "\")";
            console.log(sql)
            connection.query(sql, function(err, result) {
                if (err) {
                    console.log(err)
                    reject(err);
                } else {
                    resolve(abwesenheitsMeldung);
                }
            })
        }


    });
}








var getCrew = function getCrew(abwesenheitsMeldung) {
    var mitarbeiter;
    return new Promise(function(resolve, reject) {

        // Alle Mitarbeiter die auf der selben Station arbeiten, und nicht die kranke Person sind. -> im späteren Verlauf noch zu dezimieren auf Mitarbeiter die an Tag X nicht im Dienst sind.

        let sql = "SELECT id,stationID,email,name,anrede FROM pfleger WHERE stationID = " + abwesenheitsMeldung.stationID + " AND id != " + abwesenheitsMeldung.pflegerID;

        connection.query(sql, function(err, result) {
            if (err) reject(err);
            else {

                // Datenbank Daten aufbereiten.

                let mitarbeiterString = JSON.stringify(result);
                mitarbeiter = JSON.parse(mitarbeiterString);
                resolve(mitarbeiter);

            }
        });
    });
}

var getAbwesenheitsMeldungID = function getAbwesenheitsMeldungID(abwesenheitsMeldung) {
    return new Promise(function(resolve, reject) {

        // ID der Krankmeldung, die als Parameter übergeben wird. Warum haben wir die ID nicht schon? -> Weil die ID über AUTO_INCREMENT von der DB vergeben wird.

        let sql = "SELECT id FROM krankmeldungen WHERE stationID = " + abwesenheitsMeldung.stationID + " AND pflegerID = " + abwesenheitsMeldung.pflegerID + " AND start= \"" + abwesenheitsMeldung.start + "\" AND ende= \"" + abwesenheitsMeldung.ende + "\"";
        connection.query(sql, function(err, result) {
            if (err) reject(err);
            else {

                // Datenbank Daten aufbereiten.

                let abwesenheitsMeldungIDString = JSON.stringify(result);
                var abwesenheitsMeldungID = JSON.parse(abwesenheitsMeldungIDString);

                resolve(abwesenheitsMeldungID);
            }
        });
    });
}


var getPfleger = function getPfleger(data) {
    return new Promise(function(resolve, reject) {
        dataArray = new Array();
        dataArray = JSON.parse(data);

        // Es soll der Pfleger gefunden werden der als Ersatzpfleger für die übergebene Krankmeldung eingetragen wurde.

        let sql = "SELECT email,name,anrede FROM pfleger WHERE stationID = " + dataArray[0].stationID + " AND id = " + dataArray[0].ersatzPfleger;

        connection.query(sql, function(err, result) {
            if (err) reject(err);
            else {
                resolve(result);

            }
        });
    });

}



var ersatzEintragen = function ersatzEintragen(id, pflegerID, stationID) {
    return new Promise(function(resolve, reject) {

        let sql = "UPDATE krankmeldungen SET ersatzPfleger = " + pflegerID + ", ersatzGefunden = 1 WHERE id = " + id + " AND stationID = " + stationID + " AND ersatzGefunden = 0";

        connection.query(sql, function(err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } //Falls Ersatz bereits gefunden wurde soll der Promise erfolglos sein
            else if (result.affectedRows === 0) {
                reject(result);
            } else {

                resolve(result);
            }

        });

    });
}

var benachrichtigungVermerken = function benachrichtigungVermerken(id, stationID) {
    return new Promise(function(resolve, reject) {

        let sql = "UPDATE krankmeldungen SET ersatzGefunden = 2 WHERE id = " + id + " AND stationID = " + stationID + " AND ersatzGefunden = 0";

        connection.query(sql, function(err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } //Falls Ersatz bereits gefunden wurde soll der Promise erfolglos sein
            else if (result.affectedRows === 0) {
                reject(result);
            } else {

                resolve(result);
            }

        });

    });
}



var getAbwesenheitsErsatzInfo = function getAbwesenheitsErsatzInfo(id, stationID) {
    return new Promise(function(resolve, reject) {
        let sql = "SELECT start,dienstArt,ersatzPfleger,stationID FROM krankmeldungen WHERE stationID = " + stationID + " AND id = " + id;
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

var getAbwesenheitenOhneErsatz = function getAbwesenheitenOhneErsatz() {
    return new Promise(function(resolve, reject) {
        let sql = "SELECT id,start,dienstArt,dienstBeginn,stationID,zeitStempel FROM krankmeldungen WHERE ersatzGefunden = 0 AND start >= SYSDATE()";
        semaphore.take(function() {
            connection.query(sql, function(err, result) {
                if (err) {
                    console.log(err)
                    console.log("Fehler bei der Datenbank Anfrage")
                    reject(err);

                } else {
                    resolve(result);


                };
            });
        });
        semaphore.leave();
    });
}
//NEU
//Mitarbeiter
exports.getMitarbeiter = getMitarbeiter;
exports.neuerMitarbeiter = neuerMitarbeiter;
exports.updateMitarbeiter = updateMitarbeiter;
exports.updateUeberstunden = updateUeberstunden;
exports.loescheMitarbeiter = loescheMitarbeiter;
exports.updateWunschRating = updateWunschRating;
exports.updateDienstplanRating = updateDienstplanRating;
//Abwesenheitsmeldung
exports.getAbwesenheiten = getAbwesenheiten;
exports.neueAbwesenheit = neueAbwesenheit;
exports.updateAbwesenheit = updateAbwesenheit;
exports.loescheAbwesenheit = loescheAbwesenheit;

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

//Tag
exports.getTage = getTage;
exports.getTag = getTag;
exports.neuerTag = neuerTag;
exports.loescheTag = loescheTag;

//Dienstplans
exports.getDienstplan = getDienstplan;
exports.neuerDienstplan = neuerDienstplan;



//ALT

exports.benachrichtigungVermerken = benachrichtigungVermerken;
exports.getAbwesenheitenOhneErsatz = getAbwesenheitenOhneErsatz;
exports.ersatzEintragen = ersatzEintragen;
exports.getAbwesenheitsErsatzInfo = getAbwesenheitsErsatzInfo;
exports.neueAbwesenheitsMeldung = neueAbwesenheitsMeldung;
exports.neuerPfleger = neuerPfleger;
exports.getPfleger = getPfleger;
exports.getCrew = getCrew;
exports.getAbwesenheitsMeldungID = getAbwesenheitsMeldungID;
