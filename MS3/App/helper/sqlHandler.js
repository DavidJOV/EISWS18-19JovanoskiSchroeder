var dbConnection = require("../DB/dbConnector");// importieren der DB Verbindung
//var semaphore = require("../helper/semaphoreHelper").semaphore;
var connection = dbConnection.connection;



var getMitarbeiter = function getMitarbeiter() {
    
    return new Promise(function (resolve, reject) {

        // Alle Mitarbeiter die auf der Station arbeiten

        let sql = "SELECT * FROM Mitarbeiter"
        connection.query(sql, function (err, result) {
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
    return new Promise(function (resolve, reject) {

        // Neuen Mitarbeiter der Datenbank hinzufügen

        var sql = "INSERT INTO Mitarbeiter (stationID, anrede, vorname, name, beschaeftigungsBeginn, beschaeftigungsArt, rolle, wunschRating, dienstplanRating, ueberstunden) VALUES ( \"" + mitarbeiter.stationID + "\",\"" + mitarbeiter.anrede + "\",\"" + mitarbeiter.vorname + "\",\"" + mitarbeiter.name + "\",\"" + mitarbeiter.beschaeftigungsBeginn + "\",\"" + mitarbeiter.beschaeftigungsArt + "\",\"" + mitarbeiter.rolle + "\",\"" + mitarbeiter.wunschRating + "\",\"" + mitarbeiter.dienstplanRating +"\",\"" + mitarbeiter.ueberstunden + "\")";


        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                reject(err);

            }
            else {
                resolve(mitarbeiter);
                console.log("1 neuer Mitarbeiter");
            }
        });


    });
}

var updateMitarbeiter = function updateMitarbeiter(mitarbeiter) {
    return new Promise(function (resolve, reject) {

        // Informationen eines Mitarbeiters aktuallisieren

        var sql = "UPDATE Mitarbeiter SET anrede = \"" + mitarbeiter.anrede + "\" , vorname = \"" + mitarbeiter.vorname + "\", name = \"" + mitarbeiter.name + "\", beschaeftigungsArt = \"" + mitarbeiter.beschaeftigungsArt + "\", rolle =\"" + mitarbeiter.rolle + "\" WHERE id =" + mitarbeiter.id;


        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                reject(err);

            }
            else {
                resolve(mitarbeiter);
                console.log("Mitarbeiter wurde aktuallisiert");
            }
        });


    });
}

var loeschenMitarbeiter = function loeschenMitarbeiter(id) {
    return new Promise(function (resolve, reject) {

        //Loeschen eines Mitarbeiters

        var sql = "DELETE FROM Mitarbeiter WHERE id = " +id;


        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                reject(err);

            }
            else {
                resolve(result);
                console.log("Mitarbeiter wurde gelöscht");
            }
        });


    });
}

var updateUeberstunden = function updateUeberstunden(id, ueberstunden) {
    return new Promise(function (resolve, reject) {

        // Überstunden eines Mitarbeiters aktuallisieren

        var sql = "UPDATE Mitarbeiter SET ueberstunden = ueberstunden + " + ueberstunden+" WHERE id ="+id;


        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                reject(err);

            }
            else {
                resolve(result);
                console.log("Überstunden wurden aktuallisiert");
            }
        });


    });
}

var updateWunschRating = function updateWunschRating(id, rating) {
    return new Promise(function (resolve, reject) {

        // WunschRating eines Mitarbeiters aktuallisieren

        var sql = "UPDATE Mitarbeiter SET wunschRating = wunschRating + " + rating+" WHERE id ="+id;


        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                reject(err);

            }
            else {
                resolve(result);
                console.log("Wunsch Rating wurde aktuallisiert");
            }
        });


    });
}


var updateDienstplanRating = function updateDienstplanRating(id, rating) {
    return new Promise(function (resolve, reject) {

        // dienstplanRating eines Mitarbeiters aktuallisieren

        var sql = "UPDATE Mitarbeiter SET dienstplanRating = dienstplanRating + " + rating+" WHERE id ="+id;


        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                reject(err);

            }
            else {
                resolve(result);
                console.log("Dienstplan Rating wurde aktuallisiert");
            }
        });


    });
}



//ALT SQL HANDLER RP CODE 

var neuerPfleger = function neuerPfleger(pfleger) {
    return new Promise(function (resolve, reject) {

        // Falls keine Email angegeben wurde, darf nicht in die DB geschrieben werden.

        if (pfleger.email != undefined) {
            var sql = "INSERT INTO pfleger (stationID, anrede, vorname, name, email, telefon, beschaeftigungsArt, start) VALUES ( \"" + pfleger.stationID + "\",\"" + pfleger.anrede + "\",\"" + pfleger.vorname + "\",\"" + pfleger.name + "\",\"" + pfleger.email + "\",\"" + pfleger.telefon + "\",\"" + pfleger.beschaeftigungsArt + "\",\"" + pfleger.start + "\")";


            connection.query(sql, function (err, result) {
                if (err) {
                    console.log(err)
                    reject(err);

                }
                else {
                    resolve(pfleger);
                    console.log("1 neuer Pfleger");
                }
            });

        }
    });
}



var neueAbwesenheitsMeldung = function neueAbwesenheitsMeldung(abwesenheitsMeldung) {
    return new Promise(function (resolve, reject) {

        // Nur wenn ein Integer als PflegerID übermittelt wurde, darf in die DB geschrieben werden.
        if (abwesenheitsMeldung.pflegerID != undefined || Number.isInteger(abwesenheitsMeldung.pflegerID) === false) {
            var sql = "INSERT INTO krankmeldungen (pflegerID, stationID, start, ende, dienstArt,dienstBeginn) VALUES ( \"" + abwesenheitsMeldung.pflegerID + "\",\"" + abwesenheitsMeldung.stationID + "\",\"" + abwesenheitsMeldung.start + "\",\"" + abwesenheitsMeldung.ende + "\",\"" + abwesenheitsMeldung.dienstArt + "\",\"" + abwesenheitsMeldung.dienstBeginn + "\")";
            console.log(sql)
            connection.query(sql, function (err, result) {
                if (err) {
                    console.log(err)
                    reject(err);
                }
                else {
                    resolve(abwesenheitsMeldung);
                }
            })
        }


    });
}








var getCrew = function getCrew(abwesenheitsMeldung) {
    var mitarbeiter;
    return new Promise(function (resolve, reject) {

        // Alle Mitarbeiter die auf der selben Station arbeiten, und nicht die kranke Person sind. -> im späteren Verlauf noch zu dezimieren auf Mitarbeiter die an Tag X nicht im Dienst sind.

        let sql = "SELECT id,stationID,email,name,anrede FROM pfleger WHERE stationID = " + abwesenheitsMeldung.stationID + " AND id != " + abwesenheitsMeldung.pflegerID;

        connection.query(sql, function (err, result) {
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
    return new Promise(function (resolve, reject) {

        // ID der Krankmeldung, die als Parameter übergeben wird. Warum haben wir die ID nicht schon? -> Weil die ID über AUTO_INCREMENT von der DB vergeben wird.

        let sql = "SELECT id FROM krankmeldungen WHERE stationID = " + abwesenheitsMeldung.stationID + " AND pflegerID = " + abwesenheitsMeldung.pflegerID + " AND start= \"" + abwesenheitsMeldung.start + "\" AND ende= \"" + abwesenheitsMeldung.ende + "\"";
        connection.query(sql, function (err, result) {
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
    return new Promise(function (resolve, reject) {
        dataArray = new Array();
        dataArray = JSON.parse(data);

        // Es soll der Pfleger gefunden werden der als Ersatzpfleger für die übergebene Krankmeldung eingetragen wurde.

        let sql = "SELECT email,name,anrede FROM pfleger WHERE stationID = " + dataArray[0].stationID + " AND id = " + dataArray[0].ersatzPfleger;

        connection.query(sql, function (err, result) {
            if (err) reject(err);
            else {
                resolve(result);

            }
        });
    });

}



var ersatzEintragen = function ersatzEintragen(id, pflegerID, stationID) {
    return new Promise(function (resolve, reject) {

        let sql = "UPDATE krankmeldungen SET ersatzPfleger = " + pflegerID + ", ersatzGefunden = 1 WHERE id = " + id + " AND stationID = " + stationID + " AND ersatzGefunden = 0";

        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } //Falls Ersatz bereits gefunden wurde soll der Promise erfolglos sein
            else if (result.affectedRows === 0) {
                reject(result);
            }
            else {

                resolve(result);
            }

        });

    });
}

var benachrichtigungVermerken = function benachrichtigungVermerken(id, stationID) {
    return new Promise(function (resolve, reject) {

        let sql = "UPDATE krankmeldungen SET ersatzGefunden = 2 WHERE id = " + id + " AND stationID = " + stationID + " AND ersatzGefunden = 0";

        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } //Falls Ersatz bereits gefunden wurde soll der Promise erfolglos sein
            else if (result.affectedRows === 0) {
                reject(result);
            }
            else {

                resolve(result);
            }

        });

    });
}



var getAbwesenheitsErsatzInfo = function getAbwesenheitsErsatzInfo(id, stationID) {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT start,dienstArt,ersatzPfleger,stationID FROM krankmeldungen WHERE stationID = " + stationID + " AND id = " + id;
        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                reject(err);
            }
            else {
                resolve(result);
            }

        });

    });
}

var getAbwesenheitenOhneErsatz = function getAbwesenheitenOhneErsatz() {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT id,start,dienstArt,dienstBeginn,stationID,zeitStempel FROM krankmeldungen WHERE ersatzGefunden = 0 AND start >= SYSDATE()";
        semaphore.take(function () {
            connection.query(sql, function (err, result) {
                if (err) {
                    console.log(err)
                    console.log("Fehler bei der Datenbank Anfrage")
                    reject(err);

                }
                else {
                    resolve(result);


                };
            });
        });
        semaphore.leave();
    });
}
//NEU

exports.getMitarbeiter = getMitarbeiter;
exports.neuerMitarbeiter = neuerMitarbeiter;
exports.updateMitarbeiter = updateMitarbeiter;
exports.updateUeberstunden = updateUeberstunden;
exports.loeschenMitarbeiter = loeschenMitarbeiter;
exports.updateWunschRating = updateWunschRating;
exports.updateDienstplanRating = updateDienstplanRating;
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
