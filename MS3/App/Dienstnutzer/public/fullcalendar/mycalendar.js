$(document).ready(function () {
  var url = "http://localhost:3000/Dienstplaene/" +getIndexVonDienstplan();
  $.get(url, function (dienstplan) {
    var schichten;
    var arrayOfSchichten = new Array();
    for (let i = 0; i < dienstplan.schichten.length; i++) {

      schichten = {
        art: dienstplan.schichten[i]
      };
      arrayOfSchichten.push(schichten)
    }

    var einzelSchichten = new Array();


    arrayOfSchichten.forEach(function (element) {


      //Fruehschicht
      var schicht1 = new schicht(element.art[0].schichtArt +" "+element.art[0].mitarbeiterID1 +" "+element.art[0].mitarbeiterID2 +" "+element.art[0].mitarbeiterID3 +" "+element.art[0].mitarbeiterID4 , datumZuIsoFormat(element.art[0].datum), "green", "white")

      //Spaetschicht
      var schicht2 = new schicht(element.art[1].schichtArt +" "+element.art[1].mitarbeiterID1 +" "+element.art[1].mitarbeiterID2 +" "+element.art[1].mitarbeiterID3 +" "+element.art[1].mitarbeiterID4, datumZuIsoFormat(element.art[1].datum), "brown", "white")

      //Nachtschicht
      var schicht3 = new schicht(element.art[2].schichtArt +" "+element.art[2].mitarbeiterID1 +" "+element.art[2].mitarbeiterID2 +" "+element.art[2].mitarbeiterID3 +" "+element.art[2].mitarbeiterID4, datumZuIsoFormat(element.art[2].datum), "black", "white")
      einzelSchichten.push({ schicht1, schicht2, schicht3 })



    })


    var events = new Array();
    console.log(einzelSchichten)
    einzelSchichten.forEach(function (element) {

      events.push(element.schicht1, element.schicht2, element.schicht3)

    })
    console.log(events)






    // page is now ready, initialize the calendar..
    $('#calendar').fullCalendar({

      

      eventSources: [

        // your event source
        {

          events: events
          // an option!
        }

        // any other event sources...

      ]




    });
    // Springe zu dem Monat in dem Der Dienstplan beginnt.
    $('#calendar').fullCalendar( 'gotoDate', einzelSchichten[0].schicht1.start )


  });
})

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

function datumZuIsoFormat(datum) {
  //console.log(datum)
  var isoDatum;
  var datumSplitted = datum.split("-");


  if (datumSplitted[0] < 10 && datumSplitted[1] < 10) {
    isoDatum = datumSplitted[2] + "-0" + datumSplitted[1] + "-" + datumSplitted[0];
  }
  else if (datumSplitted[0] < 10) {
    isoDatum = datumSplitted[2] + "-" + datumSplitted[1] + "-" + datumSplitted[0];
  }
  else if (datumSplitted[1] < 10) {
    isoDatum = datumSplitted[2] + "-0" + datumSplitted[1] + "-" + datumSplitted[0];
  }
  else {

    isoDatum = datumSplitted[2] + "-" + datumSplitted[1] + "-" + datumSplitted[0];
  }
  //console.log(isoDatum)
  return isoDatum;
}
// Konstruktor für eine schicht
function schicht(title, start, color, textColor) {
  this.title = title;
  this.start = start;
  this.color = color;
  this.textColor = textColor;
}
