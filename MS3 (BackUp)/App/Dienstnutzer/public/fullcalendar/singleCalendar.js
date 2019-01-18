// Darauf warten das das document geladen ist.
$(document).ready(function() {
  var url = "sistershift.ddns.net/Dienstplaene/" + getIndexVonDienstplan();
  // Dienstplan Informationen von Dienstgeber holen
  $.get(url, function(dienstplan) {
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

    var mitarbeiterID = getQueryParamMitarbeiter();
    arrayOfSchichten.forEach(function(element) {

      //Fruehschicht
      if (mitarbeiterID == element.art[0].mitarbeiterID1 || mitarbeiterID == element.art[0].mitarbeiterID2 || mitarbeiterID == element.art[0].mitarbeiterID3 || mitarbeiterID == element.art[0].mitarbeiterID4) {
        var schicht1 = new schicht(element.art[0].schichtArt + " " + element.art[0].mitarbeiterID1 + " " + element.art[0].mitarbeiterID2 + " " + element.art[0].mitarbeiterID3 + " " + element.art[0].mitarbeiterID4, datumZuIsoFormat(element.art[0].datum), "green", "white")

        einzelSchichten.push(schicht1)
      }
      if (mitarbeiterID == element.art[1].mitarbeiterID1 || mitarbeiterID == element.art[1].mitarbeiterID2 || mitarbeiterID == element.art[1].mitarbeiterID3 || mitarbeiterID == element.art[1].mitarbeiterID4) {
        //Spaetschicht
        var schicht2 = new schicht(element.art[1].schichtArt + " " + element.art[1].mitarbeiterID1 + " " + element.art[1].mitarbeiterID2 + " " + element.art[1].mitarbeiterID3 + " " + element.art[1].mitarbeiterID4, datumZuIsoFormat(element.art[1].datum), "brown", "white")
        einzelSchichten.push(schicht2)
      }
      if (mitarbeiterID == element.art[2].mitarbeiterID1 || mitarbeiterID == element.art[2].mitarbeiterID2 || mitarbeiterID == element.art[2].mitarbeiterID3 || mitarbeiterID == element.art[2].mitarbeiterID4) {
        //Nachtschicht
        var schicht3 = new schicht(element.art[2].schichtArt + " " + element.art[2].mitarbeiterID1 + " " + element.art[2].mitarbeiterID2 + " " + element.art[2].mitarbeiterID3 + " " + element.art[2].mitarbeiterID4, datumZuIsoFormat(element.art[2].datum), "black", "white")
        einzelSchichten.push(schicht3)
      }


    })


    // page is now ready, initialize the calendar..
    $('#calendar').fullCalendar({

      eventSources: [

        // your event source
        {
          // das events Array übergeben und die enthaltenen Informationen rendern
          events: einzelSchichten
          // an option!
        }

        // any other event sources...

      ]

    });
    // Springe zu dem Monat in dem Der Dienstplan beginnt.
    $('#calendar').fullCalendar('gotoDate', einzelSchichten[0].start)

  });
})
// Dienstplan id aus Browser-URL ziehen
function getIndexVonDienstplan() {
  var query = window.location.href
  var vars = query.split("/");
  var index;
  var value;
  for (var i = 0; i < vars.length; i++) {
    if (i + 1 == vars.length) {
      index = vars[i].split("?");

      return index[0]

    }

  }

}
//Query Paramter aus Browser URL ziehen
function getQueryParamMitarbeiter() {
  var query = window.location.href
  var vars = query.split("?");
  var value;
  for (var i = 0; i < vars.length; i++) {
    if (i + 1 == vars.length) {
      value = vars[i].split("=");
      return value[1];

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
