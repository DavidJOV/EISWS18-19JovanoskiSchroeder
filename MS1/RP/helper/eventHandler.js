var nodemailer = require('nodemailer');
var dbConnection = require("../DB/dbConnector");// importieren der DB Verbindung

var connection = dbConnection.connection;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'eisws1819@gmail.com',
        pass: 'nodeJS18'
    }
});

var mailOptions = {
    from: 'eisws1819@gmail.com',
    to: '',
    subject: 'Ersatz Anfrage',
    text: ''
};

var mitarbeiter;

function getCrew() {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT email,name FROM pfleger"
        connection.query(sql, function (err, result) {
            if (err) reject(err);
            else {
                let mitarbeiterString = JSON.stringify(result);
                mitarbeiter = JSON.parse(mitarbeiterString);
                resolve(mitarbeiter);

            }
        });
    });
}

var messageCrew = function messageCrew(datum, dienst) {
    getCrew()
        .then(function sendMSG(crewMailAdressen) {
            for (var i = 0; i < crewMailAdressen.length; i++) {
                mailOptions.to = crewMailAdressen[i].email;
                mailOptions.text = "Hallo Frau/Herr " + crewMailAdressen[i].name + ",\nfalls es für Sie möglich ist am " + datum + " in einem " + dienst + " zu arbeiten. \nBitten wir Sie auf Folgenden Link zu klicken : <PersonalizedLink> \nBeachten Sie, dass Sie erst zur Schicht antreten müssen wenn Sie eine Bestätigung erhalten.\n\nVielen Dank \nIhre Stationsleitung"
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

