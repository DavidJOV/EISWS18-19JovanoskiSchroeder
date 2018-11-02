var sqlHandler = require("./sqlHandler");
var mailHandler = require("./mailHandler");

// Allen Personen außer der Kranken Person eine Ersatz Anfrage senden

var messageCrew = function messageCrew(krankmeldung) {
    var krankmeldungID;
    sqlHandler.getKrankmeldungID(krankmeldung)
        .then(function setID(id) { krankmeldungID = id[0].id; });


    sqlHandler.getCrew(krankmeldung)
        .then(function sendMSG(crew) {

            // Ersatz Anfrage Mail an alle Kollegen schicken.

            mailHandler.ersatzAnfrage(crew, krankmeldung, krankmeldungID);
        })
}

// Bestaetigun der Ersatz Mail an ausgewählte Person schicken.

var sendConfirm = function sendConfirm(data) {

   sqlHandler.getPfleger(data)
   .then(function send(pfleger){
       mailHandler.bestaetigungsMail(pfleger);
   })

}

exports.messageCrew = messageCrew;
exports.sendConfirm = sendConfirm;
