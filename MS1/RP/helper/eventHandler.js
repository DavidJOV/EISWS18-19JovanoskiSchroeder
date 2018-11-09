var sqlHandler = require("./sqlHandler");
var mailHandler = require("./mailHandler");
var dateHelper = require("./dateHelper");

const sleep = function (ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
};

// Allen Personen außer der Kranken Person eine Ersatz Anfrage senden

var messageCrew = function messageCrew(abwesenheitsMeldung, host) {
    var abwesenheitsMeldungID;

    sqlHandler.getAbwesenheitsMeldungID(abwesenheitsMeldung)
        .then(function setID(id) { abwesenheitsMeldungID = id[0].id; });
        

    sqlHandler.getCrew(abwesenheitsMeldung)
        .then(function sendMSG(crew) {
            
            // Ersatz Anfrage Mail an alle Kollegen schicken.

            mailHandler.ersatzAnfrage(crew, abwesenheitsMeldung, abwesenheitsMeldungID, host);
        })
}

// Bestaetigun der Ersatz Mail an ausgewählte Person schicken.

var sendConfirm = function sendConfirm(data) {

    sqlHandler.getPfleger(data)
        .then(function send(pfleger) {
            mailHandler.bestaetigungsMail(pfleger);
        })

}
/*Der Code liest sich synchron, wird intern aber asynchron ausgeführt. 
  Das await wartet also nicht in dem Sinne, dass der ausführende Thread blockiert.
  Stattdessen wird der Aufruf vom Compiler in eine Koroutine zerlegt,
  sodass während des Wartens anderer asynchroner Code laufen kann.
  "Golo Roden https://www.heise.de/developer/artikel/async-und-await-fuer-Node-js-3633105.html 08.11.2018*/ 
// Warten blockiert nicht! #async #await

var warteAufBestaetigung = async function warteAufBestaetigung(abwesenheitsMeldung) {

    // 48H in Millisekunden

    var achtUndVierzig = 48 * 60 * 60 * 1000;

    // 36H in Millisekunden

    var sechsUndDreißig = 36 * 60 * 60 * 1000;

    // 30H in Millisekunden

    var dreißig = 30 * 60 * 60 * 1000;

    // 24H in Millisekunden

    var vierUndZwanzig = 24 * 60 * 60 * 1000;

    // 18H in Millisekunden

    var achtZehn = 18 * 60 * 60 * 1000;

    dateHelper.getZeitInMs(abwesenheitsMeldung.start, abwesenheitsMeldung.dienstBeginn)
        .then(async function (zeit) {




            if (zeit <= achtZehn) {
                console.log("Die Zeit ist zu Kurz um eine Zeitarbeitsfirma zu Informieren");
            }
            // Kurzfristig muss Ersatz gefunden werden. Zeit muss zwischen 18H und 24H sein.
            else if (zeit <= vierUndZwanzig) {
                // Zeit  2H 
                let wait = 2 * 60 * 60 * 1000;
                try {

                    await sleep(wait)
                    mailHandler.alternativeInformieren(); // -> überprüft ob informiert werden muss.
                } catch (ex) {
                    console.log(ex)
                }
            }
            // Mittelkurzfristig muss Ersatz gefunden werden. Zeit muss zwischen 24H und 30H sein.
            else if (zeit <= dreißig) {
                // Zeit 8H 
                wait = 8 * 60 * 60 * 1000;
                try {
                    await sleep(wait)
                    mailHandler.alternativeInformieren(); // -> überprüft ob informiert werden muss.
                } catch (ex) {
                    console.log(ex)
                }
            }
            // Mittelfristig muss Ersatz gefunden werden. Zeit muss zwischen 30H und 36H sein.
            else if (zeit <= sechsUndDreißig) {
                // Zeit 14H 
                wait = 14 * 60 * 60 * 1000;
                try {
                    await sleep(wait)
                    mailHandler.alternativeInformieren(); // -> überprüft ob informiert werden muss.
                } catch (ex) {
                    console.log(ex)
                }
            }
            // Langfristig muss Ersatz gefunden werden. Zeit muss zwischen 36H und 48H sein.
            else if (zeit <= achtUndVierzig) {
                // Zeit 20H 
                wait = 20 * 60 * 60 * 1000;
                try {
                    await sleep(wait)
                    mailHandler.alternativeInformieren(); // -> überprüft ob informiert werden muss.
                } catch (ex) {
                    console.log(ex)
                }
            }
            // Mehr als 48H Vorlauf
            else if (zeit > achtUndVierzig) {
                // Zeit 32H 
                wait = 32 * 60 * 60 * 1000;
                try {
                    await sleep(wait)
                    mailHandler.alternativeInformieren(); // -> überprüft ob informiert werden muss.
                } catch (ex) {
                    console.log(ex)
                }

            }

        })
        .catch(function (fehler) {
            console.log(fehler);
        })
}

exports.warteAufBestaetigung = warteAufBestaetigung;
exports.messageCrew = messageCrew;
exports.sendConfirm = sendConfirm;
