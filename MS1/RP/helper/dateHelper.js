
var getZeitInMs = function getZeitInMs(startDatum, schichtStart) {
    return new Promise(function (resolve, reject) {
        var krankAb = new Date(startDatum + "T" + schichtStart);
        var heute = new Date()
        // Unterschied zwischen datum der Krankmeldung und Heute
        var msTimeDiff = krankAb.getTime() - heute.getTime();

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



exports.getZeitInMs = getZeitInMs;

