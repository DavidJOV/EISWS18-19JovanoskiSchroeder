
function checkDifference(startDatum, schichtStart) {
    return new Promise(function (resolve, reject) {
        var krankAb = new Date(startDatum + "T" + schichtStart);
        var heute = new Date()
        console.log(heute)
        console.log(krankAb)
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

checkDifference("2017-12-01", "21:20:10.995Z").catch(function (fehler) {
    console.log(fehler);
});