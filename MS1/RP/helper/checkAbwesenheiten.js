var sqlHandler = require("./sqlHandler");
var mailHandler = require("./mailHandler");
var dateHelper = require("./dateHelper");


// Alle 30 min
var prüfeMeldungen = function prüfeMeldungen() {

    setInterval(function () {
        getAbwesenheitenOhneErsatz()
    }, dateHelper.stundenInMS(0.5))
}

var getAbwesenheitenOhneErsatz = function getAbwesenheitenOhneErsatz() {
    sqlHandler.getAbwesenheitenOhneErsatz()
        .then(function (data) {
            for (var i = 0; i < data.length; i++) {
                // Wenn es nur noch 24H zum eigentlichen Dienstantritt sind, dann prüfen ob eine Zeitarbeitsfirma informiert werden muss bzw. kann
                dateHelper.getZeitInMs(data[i].start, data[i].dienstBeginn)
                    .then(function (zeitBisStart) {
                        if (zeitBisStart < dateHelper.stundenInMS(24)) {
                           
                            if (zeitBisStart < dateHelper.stundenInMS(18)) {
                                console.log("Die Zeit ist zu Kurz um eine Zeitarbeitsfirma zu Informieren \nInformiere Stationsleitung...");
                                // Mail verschicken
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