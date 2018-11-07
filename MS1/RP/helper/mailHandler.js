var nodemailer = require('nodemailer');
var base64 = require('js-base64');
var encoder = base64.Base64;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: encoder.decode('ZWlzd3MxODE5QGdtYWlsLmNvbQ=='),
        pass: encoder.decode('bm9kZUpTMTg=')
    }
});

var mailOptions = {
    from: 'eisws1819@gmail.com',
    to: '',
    subject: 'Ersatz Anfrage',
    text: ''
};

var ersatzAnfrage = function ersatzAnfrage(crew, krankmeldung, krankmeldungID,host) {

    for (var i = 0; i < crew.length; i++) {

        // Personalisierten Link erstellen und kritische Informationen mit base64 kodieren

        let personalLink = host+"/krankmeldungen/ersatz/" + krankmeldungID + "/?mitarbeiter=" + encoder.encode(crew[i].id.toString()) + "&station=" + encoder.encode(crew[i].stationID.toString());
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


}

var bestaetigungsMail = function bestaetigungsMail(result) {
    let confirmMailOptions = mailOptions;
    confirmMailOptions.subject = "Schichtübernahme Bestätigung"
    confirmMailOptions.to = result[0].email;
    confirmMailOptions.text = "Hallo " + result[0].anrede + " " + result[0].name + ",\nhiermit Bestätigen wir ihre verbindliche Übernahme des " + dataArray[0].dienstArt + " am " + dataArray[0].start + ".\n\nMit freundlichen Grueßen \nIhre Stationsleitung"
    transporter.sendMail(confirmMailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
// noch zu erweitern
var alternativeInformieren = function alternativeInformieren(){console.log("mail an Zeitarbeitsfirma"+ new Date())}
exports.alternativeInformieren = alternativeInformieren;
exports.bestaetigungsMail = bestaetigungsMail;
exports.ersatzAnfrage = ersatzAnfrage;