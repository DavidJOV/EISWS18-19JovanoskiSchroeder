var sqlHandler = require("./sqlHandler");
var mailHandler = require("./mailHandler"); // wird noch genutzt
var dateHelper = require("./dateHelper");

var x =0;
// Alle 30 min
var prüfeMeldungen = function prüfeMeldungen() {

    setInterval(function () {
        getAbwesenheitenOhneErsatz()
        
       
    }, dateHelper.stundenInMS(0.5))
}
// Alle Meldungen für die es noch keinen Ersatz gibt.
var getAbwesenheitenOhneErsatz = function getAbwesenheitenOhneErsatz() {
    sqlHandler.getAbwesenheitenOhneErsatz()
        .then(function (data) {
            //mit let klappt es mit var nicht...
            for (let i = 0; i < data.length; i++) {
                // Wenn es nur noch 24H zum eigentlichen Dienstantritt sind, dann prüfen ob eine Zeitarbeitsfirma informiert werden muss bzw. kann
                dateHelper.getZeitInMs(data[i].start, data[i].dienstBeginn)
                    .then(function (zeitBisStart) {
                        console.log(i);
                        if (zeitBisStart < dateHelper.stundenInMS(24)) {

                            if (zeitBisStart < dateHelper.stundenInMS(18)) {
                              
                                console.log("Die Zeit ist zu Kurz um eine Zeitarbeitsfirma zu Informieren \nInformiere Stationsleitung...");
                                // Mail verschicken().then(.... wenn erfolgreich dann eintragen, also...
                                sqlHandler.benachrichtigungVermerken(data[i].id,data[i].stationID)
                                .then(function(){
                                    console.log("Stationsleitung wurde beanchrichtigt und dies wurde in der DB vermerkt.")
                                })
                                .catch(function(msg){
                                    console.log(msg)
                                })
                            }
                            else if (zeitBisStart < dateHelper.stundenInMS(19)) {
                                console.log("Zeitarbeitsfirma wurde Informiert...\n nächster Schritt - > set ersatzGefunden auf 1")
                                // Mail verschicken
                            }

                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })

            }

        })
}

exports.prüfeMeldungen = prüfeMeldungen;