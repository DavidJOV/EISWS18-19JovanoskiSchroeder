
var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", "http://localhost:3000/mitarbeiter");
xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.send(JSON.stringify({
    stationID: 1,
    anrede: "Herr",
    vorname: "Test",
    name: "Mustermann",
    beschaeftigungsArt: "VOLL",
    beschaeftigungsBeginn: "2018-12-13",
    rolle: "Krankenpfleger"
}));