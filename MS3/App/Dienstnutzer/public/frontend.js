



function speichereMitarbeiter(mitarbeiter) {

    var input = mitarbeiter;

    var neuerMitarbeiter = {
        stationID: input.elements[0].value,
        anrede: input.elements[1].value,
        vorname: input.elements[2].value,
        name: input.elements[3].value,
        beschaeftigungsArt: input.elements[4].value,
        beschaeftigungsBeginn: input.elements[5].value,
        rolle: input.elements[6].value
    };
    // HTTP Request an Dienstnutzer
    var xmlhttp = new XMLHttpRequest();   
    xmlhttp.open("POST", "http://localhost:3000/mitarbeiter");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(neuerMitarbeiter));
    // User Feedback Erfolg/nichtErfolg
    xmlhttp.onload  = function() {
        var jsonResponse = JSON.parse(xmlhttp.status)
        console.log(jsonResponse)
        if(jsonResponse == 201){
        window.location.href = "http://localhost:8080/abwesenheiten/bestaetigung"
    }
    else{
        window.location.href = "http://localhost:8080/abwesenheiten/entschuldigung"
    }
    }
}

function speichereWunsch(wunsch) {

    var input = wunsch;

    var neuerWunsch = {
        stationID: input.elements[0].value,
        mitarbeiterID: input.elements[1].value,
        datumWunsch: input.elements[2].value,
        wunschBeschreibung: input.elements[3].value,
        schichtArt: input.elements[4].value
    };

    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    xmlhttp.open("POST", "http://localhost:3000/mitarbeiter/wuensche");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(neuerWunsch));
    // User Feedback Erfolg/nichtErfolg
    xmlhttp.onload  = function() {
        var jsonResponse = JSON.parse(xmlhttp.status)
        console.log(jsonResponse)
        if(jsonResponse == 201){
        window.location.href = "http://localhost:8080/abwesenheiten/bestaetigung"
    }
    else{
        window.location.href = "http://localhost:8080/abwesenheiten/entschuldigung"
    }
    }
}

function erstelleDienstplan(dienstplan) {

    var input = dienstplan

    var neuerDienstplan = {
        stationID: input.elements[0].value,
        monat: input.elements[1].value,
        jahr: input.elements[2].value
    }
 
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    xmlhttp.open("POST", "http://localhost:3000/dienstplaene");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(neuerDienstplan));
    // User Feedback Erfolg/nichtErfolg + Redirect auf den erstellten Dienstplan
    xmlhttp.onload  = function() {
        var jsonResponse = JSON.parse(xmlhttp.responseText);
        var jsonResponseStatusCode = JSON.parse(xmlhttp.status);
        if(jsonResponseStatusCode == 201){
        window.location.href = "http://localhost:8080/dienstplaene/"+jsonResponse.metadaten[0].id;
        }
        else{
            window.location.href = "http://localhost:8080/abwesenheiten/entschuldigung"
        }
     };
}

// Schießt Req an Dienstnutzer der darauf hin die Daten mit Hilfe seiner Anwendungslogik aufbereitet
function speichereAbwesenheit(abwesenheit) {

    var input = abwesenheit;

    var neueAbwesenheit = {
        stationID: input.elements[0].value,
        MitarbeiterID: input.elements[1].value,
        datumBeginn: input.elements[2].value,
        datumEnde: input.elements[3].value
    };

    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    xmlhttp.open("POST", "http://localhost:8080/abwesenheiten");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(neueAbwesenheit));
    // User Feedback Erfolg/nichtErfolg
    xmlhttp.onload  = function() {
        var jsonResponse = JSON.parse(xmlhttp.status)
        console.log(jsonResponse)
        if(jsonResponse == 201){
        window.location.href = "http://localhost:8080/abwesenheiten/bestaetigung"
    }
    else{
        window.location.href = "http://localhost:8080/abwesenheiten/entschuldigung"
    }
    }
}

function trageErsatzEin(ersatzanfrage){
    var mitarbeiterID = getIndexVonMitarbeiter();

    console.log(ersatzanfrage)
    console.log(mitarbeiterID)
}

function loescheErsatzAnfrage(ersatzanfrage){

     var mitarbeiterID = getIndexVonMitarbeiter();

    console.log(ersatzanfrage)
    console.log(mitarbeiterID)
}

function getIndexVonMitarbeiter() {
    var query = window.location.href
    console.log(query)
    var vars = query.split("/");

            return vars[4]

}
