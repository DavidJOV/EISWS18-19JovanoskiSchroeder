
var getZeitInMs = function getZeitInMs(startDatum, schichtStart) {
    return new Promise(function (resolve, reject) {
        // Datum ohne Zeit extrahieren
        startDatum = JSON.stringify(startDatum).slice(1, 11)

        var abwesendAb = new Date(startDatum + "T" + schichtStart);
        

        var heute = new Date()
        // Unterschied zwischen datum der Krankmeldung und Heute
        var msTimeDiff = abwesendAb.getTime() - heute.getTime();

        if (isNaN(msTimeDiff) === true) {
            reject("Erro Datum muss wie folgt aussehen: JJJJ-MM-TT ");

        } else if (msTimeDiff <= 0) {
            reject("Error Datum muss in der Zukunft liegen!");
        }
        else {
            resolve(msTimeDiff)
            console.log("Millisekunden Unterschied: " + msTimeDiff);
        }

    });
}

var stundenInMS = function stundenInMS(stunden){
    return stunden * 60 * 60 * 1000;
}


/*
var getZeitInMsZwischenErstellungUndStart = function getZeitInMsZwischenErstellungUndStart(startDatum, schichtStart, zeitStempel) {
    return new Promise(function (resolve, reject) {
        // Datum ohne Zeit extrahieren


        var abwesendAb = new Date(startDatum + "T" + schichtStart);
        var erstelltAm = new Date(zeitStempel)
        // Unterschied zwischen datum der Krankmeldung und Heute
        var msTimeDiff = abwesendAb.getTime() - zeitStempel.getTime();

        if (isNaN(msTimeDiff) === true) {
            reject("Erro Datum muss wie folgt aussehen: JJJJ-MM-TT ");

        } else if (msTimeDiff <= 0) {
            reject("Error Datum muss in der Zukunft liegen!");
        }
        else {
            resolve(msTimeDiff)
            console.log("Millisekunden Unterschied: " + msTimeDiff);
        }

    });
}*/


exports.stundenInMS = stundenInMS;
//exports.getZeitInMsZwischenErstellungUndStart = getZeitInMsZwischenErstellungUndStart;
exports.getZeitInMs = getZeitInMs;

