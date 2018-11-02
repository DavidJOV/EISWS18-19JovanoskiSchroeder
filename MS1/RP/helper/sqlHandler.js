
var dbConnection = require("../DB/dbConnector");// importieren der DB Verbindung
var connection = dbConnection.connection;


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

exports.getPfleger = getPfleger;
exports.getCrew = getCrew;
exports.getKrankmeldungID = getKrankmeldungID;
