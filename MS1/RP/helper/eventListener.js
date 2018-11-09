/*In dieser Datei nutzen wir das Modul 'events'.
 Mit Hilfe des eventEmitters hören wir auf das Event 'Krankmeldung-eingereicht'.
 Dieses Event wird beim erfolgreichen Einreichen einer Krankmeldung vom eventEmitter in 
 /ressourcen/krankmeldungen/index.js ausgelöst. Daraufhin wird der eventHandler ausgeführt.
*/
var events = require('events');
var eventHandler = require("./eventHandler");
var eventEmitter = new events.EventEmitter();

eventEmitter.on("abwesenheitsMeldung-eingereicht", function (abwesenheitsMeldung, host) {
    eventHandler.messageCrew(abwesenheitsMeldung, host);
});
eventEmitter.on("WarteAufRueckmeldung", function (abwesenheitsMeldung) {
    eventHandler.warteAufBestaetigung(abwesenheitsMeldung);
});

eventEmitter.on("Ersatzeintragung-erfolgt", function (data) {
    eventHandler.sendConfirm(data);
})

exports.eventEmitter = eventEmitter; 