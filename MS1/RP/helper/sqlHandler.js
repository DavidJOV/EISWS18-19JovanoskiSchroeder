
var dbConnection = require("../DB/dbConnector");// importieren der DB Verbindung
var connection = dbConnection.connection;



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



var neueKrankmeldung = function neueKrankmeldung(krankmeldung) {
    return new Promise(function (resolve, reject) {

        // Nur wenn ein Integer als PflegerID übermittelt wurde, darf in die DB geschrieben werden.
        if (krankmeldung.pflegerID != undefined || Number.isInteger(krankmeldung.pflegerID) === false) {
            var sql = "INSERT INTO krankmeldungen (pflegerID, stationID, start, ende, dienstArt) VALUES ( \"" + krankmeldung.pflegerID + "\",\"" + krankmeldung.stationID + "\",\"" + krankmeldung.start + "\",\"" + krankmeldung.ende + "\",\"" + krankmeldung.dienstArt + "\")";
            console.log(sql)
            connection.query(sql, function (err, result) {
                if (err) {
                    console.log(err)
                    reject(err);
                }
                else {
                    resolve(krankmeldung);
                }
            })
        }


    });
}








var getCrew = function getCrew(krankmeldung) {
    var mitarbeiter;
    return new Promise(function (resolve, reject) {

        // Alle Mitarbeiter die auf der selben Station arbeiten, und nicht die kranke Person sind. -> im späteren Verlauf noch zu dezimieren auf Mitarbeiter die an Tag X nicht im Dienst sind.

        let sql = "SELECT id,stationID,email,name,anrede FROM pfleger WHERE stationID = " + krankmeldung.stationID + " AND id != " + krankmeldung.pflegerID;

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

var getKrankmeldungID = function getKrankmeldungID(krankmeldung) {
    return new Promise(function (resolve, reject) {

        // ID der Krankmeldung, die als Parameter übergeben wird. Warum haben wir die ID nicht schon? -> Weil die ID über AUTO_INCREMENT von der DB vergeben wird.

        let sql = "SELECT id FROM krankmeldungen WHERE stationID = " + krankmeldung.stationID + " AND pflegerID = " + krankmeldung.pflegerID + " AND start= \"" + krankmeldung.start + "\" AND ende= \"" + krankmeldung.ende + "\"";
        connection.query(sql, function (err, result) {
            if (err) reject(err);
            else {

                // Datenbank Daten aufbereiten.

                let krankmeldungIDString = JSON.stringify(result);
                var krankmeldungID = JSON.parse(krankmeldungIDString);

                resolve(krankmeldungID);
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
            }
            else {
                resolve(result);
            }

        });

    });
}


var getKrankmeldungErsatzInfo = function getKrankmeldungErsatzInfo(id, stationID) {
    return new Promise(function (resolve, reject) {
        let sql2 = "SELECT start,dienstArt,ersatzPfleger,stationID FROM krankmeldungen WHERE stationID = " + stationID + " AND id = " + id;
        connection.query(sql2, function (err, result) {
            if (err) {
                console.log(err)
                console.log("Ersatz wurde eingetragen aber konnte nicht darüber Informiert werden.")
                reject(err);
            }
            else {
                resolve(result);
            }

        });

    });
}





exports.ersatzEintragen=ersatzEintragen;
exports.getKrankmeldungErsatzInfo=getKrankmeldungErsatzInfo;
exports.neueKrankmeldung = neueKrankmeldung;
exports.neuerPfleger = neuerPfleger;
exports.getPfleger = getPfleger;
exports.getCrew = getCrew;
exports.getKrankmeldungID = getKrankmeldungID;
