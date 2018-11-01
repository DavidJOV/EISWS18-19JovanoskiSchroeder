var nodemailer = require('nodemailer');
var dbConnection = require("../DB/dbConnector");// importieren der DB Verbindung

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

        var sql = "SELECT email,name,anrede FROM pfleger WHERE stationID = "+ krankmeldung.stationID + " AND id != "+krankmeldung.pflegerID; 
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
    getCrew(krankmeldung)
        .then(function sendMSG(crew) {
            
            // Allen Kollegen eine Mail schicken.

            for (var i = 0; i < crew.length; i++) {
                mailOptions.to = crew[i].email;
                mailOptions.text = "Hallo " + crew[i].anrede +" "+crew[i].name+ ",\nfalls es für Sie möglich ist am " + krankmeldung.start + " in einem " + krankmeldung.dienstArt + " zu arbeiten. \nBitten wir Sie auf Folgenden Link zu klicken : <PersonalizedLink> \nBeachten Sie, dass Sie erst zur Schicht antreten müssen wenn Sie eine Bestätigung erhalten.\n\nVielen Dank \nIhre Stationsleitung"
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

exports.messageCrew = messageCrew;

