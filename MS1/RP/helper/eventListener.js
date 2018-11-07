/*In dieser Datei nutzen wir das Modul 'events'.
 Mit Hilfe des eventEmitters hören wir auf das Event 'Krankmeldung-eingereicht'.
 Dieses Event wird beim erfolgreichen Einreichen einer Krankmeldung vom eventEmitter in 
 /ressourcen/krankmeldungen/index.js ausgelöst. Daraufhin wird der eventHandler ausgeführt.
*/
var events = require('events');
var eventHandler = require("./eventHandler");
var eventEmitter = new events.EventEmitter();

eventEmitter.on("Krankmeldung-eingereicht", function (krankmeldung, host) {
    eventHandler.messageCrew(krankmeldung, host);
});
eventEmitter.on("WarteAufRueckmeldung", function (krankmeldung) {
    eventHandler.warteAufBestaetigung(krankmeldung);
});

eventEmitter.on("Ersatzeintragung-erfolgt", function (data) {
    eventHandler.sendConfirm(data);
})

exports.eventEmitter = eventEmitter; 