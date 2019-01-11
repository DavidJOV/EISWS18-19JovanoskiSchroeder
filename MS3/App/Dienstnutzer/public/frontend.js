



function speichereMitarbeiter(mitarbeiter) {

    var input = mitarbeiter

    var neuerMitarbeiter = {
        stationID: input.elements[0].value,
        anrede: input.elements[1].value,
        vorname: input.elements[2].value,
        name: input.elements[3].value,
        beschaeftigungsArt: input.elements[4].value,
        beschaeftigungsBeginn: input.elements[5].value,
        rolle: input.elements[6].value
    };

    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    xmlhttp.open("POST", "http://localhost:3000/mitarbeiter");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(neuerMitarbeiter));
    console.log(neuerMitarbeiter)
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
    xmlhttp.onload  = function() {
        var jsonResponse = JSON.parse(xmlhttp.responseText);
        window.location.href = "http://localhost:8080/dienstplaene/"+jsonResponse.metadaten[0].id;
     };
}