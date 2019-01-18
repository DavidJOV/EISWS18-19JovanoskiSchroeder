// Darauf warten das das document geladen ist.
$(document).ready(function() {
  var datum = getQueryParamDatum();
  var url = "http://sistershift.ddns.net/Dienstplaene?monat=" + datum.monat + "&jahr=" + datum.jahr;
  // Dienstplan Informationen von Dienstgeber holen
  $.get(url, function(dienstplan) {
    if (dienstplan != "Kein Dienstplan mit dieser ID vorhanden!") {
      var schichten;
      var arrayOfSchichten = new Array();
      // Daten aufbereiten -> da im Response eine nested Array steht Arry[[],[],[],[]]
      for (let i = 0; i < dienstplan.schichten.length; i++) {

        schichten = {
          art: dienstplan.schichten[i]
        };
        arrayOfSchichten.push(schichten)
      }

      var einzelSchichten = new Array();

      arrayOfSchichten.forEach(function(element) {

        //Fruehschicht
        var schicht1 = new schicht(element.art[0].schichtArt + " " + element.art[0].mitarbeiterID1 + " " + element.art[0].mitarbeiterID2 + " " + element.art[0].mitarbeiterID3 + " " + element.art[0].mitarbeiterID4, datumZuIsoFormat(element.art[0].datum), "green", "white")

        //Spaetschicht
        var schicht2 = new schicht(element.art[1].schichtArt + " " + element.art[1].mitarbeiterID1 + " " + element.art[1].mitarbeiterID2 + " " + element.art[1].mitarbeiterID3 + " " + element.art[1].mitarbeiterID4, datumZuIsoFormat(element.art[1].datum), "brown", "white")

        //Nachtschicht
        var schicht3 = new schicht(element.art[2].schichtArt + " " + element.art[2].mitarbeiterID1 + " " + element.art[2].mitarbeiterID2 + " " + element.art[2].mitarbeiterID3 + " " + element.art[2].mitarbeiterID4, datumZuIsoFormat(element.art[2].datum), "black", "white")
        einzelSchichten.push({
          schicht1,
          schicht2,
          schicht3
        })

      })

      var events = new Array();
      console.log(einzelSchichten)
      einzelSchichten.forEach(function(element) {

        events.push(element.schicht1, element.schicht2, element.schicht3)

      })


      // page is now ready, initialize the calendar..
      $('#calendar').fullCalendar({

        eventSources: [

          // your event source
          {
            // das events Array übergeben und die enthaltenen Informationen rendern
            events: events
            // an option!
          }

          // any other event sources...

        ]

      });
      // Springe zu dem Monat in dem Der Dienstplan beginnt.
      $('#calendar').fullCalendar('gotoDate', einzelSchichten[0].schicht1.start)


    } else {
      window.location.href = "http://dienstplanung.herokuapp.com/entschuldigung";
    }
  })
})
// Dienstplan id aus Browser-URL ziehen
function getIndexVonDienstplan() {
  var query = window.location.href
  var vars = query.split("/");
  for (var i = 0; i < vars.length; i++) {
    if (i + 1 == vars.length) {
      return vars[i];
      console.log(vars[i]);
    }


  }

}
// Datum Formatieren
function datumZuIsoFormat(datum) {

  var isoDatum;
  var datumSplitted = datum.split("-");


  if (datumSplitted[0] < 10 && datumSplitted[1] < 10) {
    isoDatum = datumSplitted[2] + "-0" + datumSplitted[1] + "-" + datumSplitted[0];
  } else if (datumSplitted[0] < 10) {
    isoDatum = datumSplitted[2] + "-" + datumSplitted[1] + "-" + datumSplitted[0];
  } else if (datumSplitted[1] < 10) {
    isoDatum = datumSplitted[2] + "-0" + datumSplitted[1] + "-" + datumSplitted[0];
  } else {

    isoDatum = datumSplitted[2] + "-" + datumSplitted[1] + "-" + datumSplitted[0];
  }

  return isoDatum;
}
// Konstruktor für eine schicht
function schicht(title, start, color, textColor) {
  this.title = title;
  this.start = start;
  this.color = color;
  this.textColor = textColor;
}
// Wertermittlung der query Parameter 
function getQueryParamDatum() {
  var query = window.location.href
  var vars = query.split("?");
  var value;
  var params = new Array();
  for (var i = 0; i < vars.length; i++) {
    if (i + 1 == vars.length) {
      value = vars[i].split("&");
      for (var j = 0; j < value.length; j++) {
        params.push(value[j].split("="))

        if (j + 1 == value.length) {

          var monat = params[0].splice(1, 1)
          var jahr = params[1].splice(1, 1)
          var datum = {
            monat: monat[0],
            jahr: jahr[0]
          }
          return datum
        }

      }

    }


  }

}
