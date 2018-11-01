var nodemailer = require('nodemailer');
var dbConnection = require("../DB/dbConnector");// importieren der DB Verbindung
var base64 = require('js-base64');
encoder = base64.Base64;
var connection = dbConnection.connection;
// Absender der Mail
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'eisws1819@gmail.com',
        pass: 'nodeJS18'
    }
});
// Absender und Betreff, Text und Empfänger werden spezifisch generiert.
var mailOptions = {
    from: 'eisws1819@gmail.com',
    to: '',
    subject: 'Ersatz Anfrage',
    text: ''
};

var mitarbeiter;

function getCrew(krankmeldung) {
    return new Promise(function (resolve, reject) {

        // Alle Mitarbeiter die auf der selben Station arbeiten, und nicht die kranke Person sind. -> im späteren Verlauf noch zu dezimieren auf Mitarbeiter die an Tag X nicht im Dienst sind.

        let sql = "SELECT id,stationID,email,name,anrede FROM pfleger WHERE stationID = " + krankmeldung.stationID + " AND id != " + krankmeldung.pflegerID;
        console.log(sql);
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

var messageCrew = function messageCrew(krankmeldung) {
    let sql = "SELECT id FROM krankmeldungen WHERE stationID = " + krankmeldung.stationID + " AND pflegerID = " + krankmeldung.pflegerID + " AND start= \"" + krankmeldung.start + "\" AND ende= \"" +  krankmeldung.ende+"\"";
    console.log(sql)
    connection.query(sql, function (err, result) {
        if (err) reject(err);
        else {

            // Datenbank Daten aufbereiten.
            
            let krankmeldungIDString = JSON.stringify(result);
            var krankmeldungID = JSON.parse(krankmeldungIDString);
            

            getCrew(krankmeldung)
                .then(function sendMSG(crew) {

                    // Allen Kollegen eine Mail schicken.

                    for (var i = 0; i < crew.length; i++) {

                        // Personalisierten Link erstellen und kritische Informationen mit base64 kodieren

                        var personalLink = "localhost:3000/krankmeldungen/ersatz/"+krankmeldungID[0].id+"/?mitarbeiter="+ encoder.encode(crew[i].id.toString())+"&station="+ encoder.encode(crew[i].stationID.toString());
                        mailOptions.to = crew[i].email;
                        mailOptions.text = "Hallo " + crew[i].anrede + " " + crew[i].name + ",\nfalls es für Sie möglich ist am " + krankmeldung.start + " in einem " + krankmeldung.dienstArt + " zu arbeiten. \nBitten wir Sie auf Folgenden Link zu klicken : " + personalLink + " \nBeachten Sie, dass Sie erst zur Schicht antreten müssen wenn Sie eine Bestätigung erhalten.\n\nVielen Dank \nIhre Stationsleitung"
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                    }
                })
        }
    })
}


exports.messageCrew = messageCrew;

