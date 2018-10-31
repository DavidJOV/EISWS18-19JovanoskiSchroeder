var events = require('events');
var eventEmitter = new events.EventEmitter();

var eventhandler = function(){
    console.log("Krankmeldung wurde eingereicht");
}
eventEmitter.on("Krankmeldung-eingereicht",eventhandler);

exports.eventEmitter = eventEmitter; 