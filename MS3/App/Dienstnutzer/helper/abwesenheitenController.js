var ersatzAnfrage = function ersatzAnfrage(informationen, abwesenheit) {


  return new Promise(function(resolve, reject) {


var ersatzBeduerftigeSchichtenErmittlung = new Promise(function(resolve, reject) {
    // nested Array auflösen
    var elements = new Array();

    for (var p = 0; p < informationen.dienstplan.schichten.length; p++) {
      informationen.dienstplan.schichten[p].forEach(function (element) {
        elements.push(element)
      })


      if (p +1 == informationen.dienstplan.schichten.length ){
    var substringDatum;
    var ersatzBeduerftigeSchichtInfos = {
      alleSchichten: elements,
      mitarbeiter: informationen.mitarbeiterListe,
      schichten: [],
      abwesenderID: abwesenheit.mitarbeiterID
    }





      // Filtern der Schichten, welche Ersatz benötigen:
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].datum == abwesenheit.datumBeginn) {
          var tmp = i;
          while (elements[i].datum != abwesenheit.datumEnde) {
            ersatzBeduerftigeSchichtInfos.schichten.push(elements[i]);
            i++;

            if (i == elements.length ) {
              i=tmp;
              break;
            }

          }
        }
      //  console.log(elements)
        if (i + 1 == elements.length) {
          resolve(ersatzBeduerftigeSchichtInfos);
        }
      } // for i - Schleife


  }
}
}) // End of Promise ersatzBeduerftigeSchichtenErmittlung

    // Ermittlung Mitarbeiter, welche an diesen Tagen frei haben
    ersatzBeduerftigeSchichtenErmittlung.then(function(ersatzBeduerftigeSchichtInfos) {

      var ermittlungVerfuegbarerMitarbeiter = new Promise(function(resolve, reject) {

        console.log(ersatzBeduerftigeSchichtInfos)

        var verfuegbareMitarbeiter = new Array();
        var alleMitarbeiter = ersatzBeduerftigeSchichtInfos.mitarbeiter;

        var erforderlicheInfos = {
          alleSchichten: ersatzBeduerftigeSchichtInfos.alleSchichten,
          schichten: [],
          abwesenderID: ersatzBeduerftigeSchichtInfos.abwesenderID
        }



        for (let i = 0; i < ersatzBeduerftigeSchichtInfos.schichten.length; i++) {
          for (let j = 0; j < alleMitarbeiter.length; j++) {

            if (alleMitarbeiter[j].id != ersatzBeduerftigeSchichtInfos.schichten[i].mitarbeiterID1 && alleMitarbeiter[j].id != ersatzBeduerftigeSchichtInfos.schichten[i].mitarbeiterID2 && alleMitarbeiter[j].id != ersatzBeduerftigeSchichtInfos.schichten[i].mitarbeiterID3 && alleMitarbeiter[j].id != ersatzBeduerftigeSchichtInfos.schichten[i].mitarbeiterID4) {
              verfuegbareMitarbeiter.push(alleMitarbeiter[j]);

            }
            if (j + 1 == alleMitarbeiter.length) {
              erforderlicheInfos.schichten.push(new schicht(ersatzBeduerftigeSchichtInfos.schichten[i].schichtArt, ersatzBeduerftigeSchichtInfos.schichten[i].datum, verfuegbareMitarbeiter));
              verfuegbareMitarbeiter = [];
            }
          } // end of j-Schleife
          if (i + 1 == ersatzBeduerftigeSchichtInfos.schichten.length) {
            resolve(erforderlicheInfos);
          }
        } // end of i- Schleife

      }) // end of Promise ermittlungNichtVerfuegbarerMitarbeiter

      ermittlungVerfuegbarerMitarbeiter.then(function(erforderlicheInfos) {

        // Filtern der verfuegbaren Mitarbeitern nach den gesetzlichen Vorgaben
        var filternGesetzlicheBedingungen = new Promise(function(resolve, reject) {


          for (let i = 0; i < erforderlicheInfos.schichten.length; i++) {
            var vars = erforderlicheInfos.schichten[i].datum.split("-");
            var tagVorher = parseInt(vars[0]) - 1;
            var tagNachher = parseInt(vars[0]) + 1;
            var monat = vars[1];
            var jahr = vars[2];

            var datumVorher = tagVorher + "-" + monat + "-" + jahr;
            var datumNachher = tagNachher + "-" + monat + "-" + jahr;


            // Ableich mit Schichten davor
            if (erforderlicheInfos.alleSchichten[i].datum == datumVorher) {
              for (let z = 0; z < erforderlicheInfos.schichten.length; z++) {
                for (let y = 0; y < erforderlicheInfos.schichten.verfuegbareMitarbeiter.length; y++) {

                  if (erforderlicheInfos.schichten[z].verfuegbareMitarbeiter[y].id == erforderlicheInfos.alleSchichten[i].mitarbeiterID1 || erforderlicheInfos.schicht.verfuegbareMitarbeiter[y].id == erforderlicheInfos.alleSchichten[i].mitarbeiterID2 || erforderlicheInfos.schicht.verfuegbareMitarbeiter[y].id == erforderlicheInfos.alleSchichten[i].mitarbeiterID3 || erforderlicheInfos.schicht.verfuegbareMitarbeiter[y].id == erforderlicheInfos.alleSchichten[i].mitarbeiterID4) {

                    // Vor einer Fruehschicht nur Fruehschicht!
                    if (erforderlicheInfos.schichten[z].schichtArt == "Fruehschicht") {
                      if (erforderlicheInfos.alleSchichten[i].schichtArt != "Fruehschicht") {
                        erforderlicheInfos.schichten[z].verfuegbareMitarbeiter[y].splice(y, 1);
                      }
                    }
                    // Vor Spaetschicht darf nur Frueh oder Spaet gearbeitet werden
                    if (erforderlicheInfos.schichten[z].schichtArt == "Spaetschicht") {
                      if (erforderlicheInfos.alleSchichten[i].schichtArt == "Nachtschicht") {
                        erforderlicheInfos.schichten[z].verfuegbareMitarbeiter[y].splice(y, 1);
                      }
                    }
                    // Vor einer Nachtschicht darf Frueh oder Spaet gearbeitet werden
                    if (erforderlicheInfos.schichten[z].schichtArt == "Nachtschicht") {
                      if (erforderlicheInfos.alleSchichten[i].schichtArt == "Nachtschicht") {
                        erforderlicheInfos.schichten[z].verfuegbareMitarbeiter[y].splice(y, 1);
                      }
                    }

                  }
                }
              }
            }

            // Abgleich mit Schichten danach
            if (erforderlicheInfos.alleSchichten[i].datum == datumNachher) {
              for (let z = 0; z < erforderlicheInfos.schichten.length; z++) {
                for (let y = 0; y < erforderlicheInfos.schichten.verfuegbareMitarbeiter.length; y++) {

                  if (erforderlicheInfos.schichten[z].verfuegbareMitarbeiter[y].id == erforderlicheInfos.alleSchichten[i].mitarbeiterID1 || erforderlicheInfos.schicht.verfuegbareMitarbeiter[y].id == erforderlicheInfos.alleSchichten[i].mitarbeiterID2 || erforderlicheInfos.schicht.verfuegbareMitarbeiter[y].id == erforderlicheInfos.alleSchichten[i].mitarbeiterID3 || erforderlicheInfos.schicht.verfuegbareMitarbeiter[y].id == erforderlicheInfos.alleSchichten[i].mitarbeiterID4) {

                    // Vor Spaetschicht darf nur Frueh oder Spaet gearbeitet werden
                    if (erforderlicheInfos.schichten[z].schichtArt == "Spaetschicht") {
                      if (erforderlicheInfos.alleSchichten[i].schichtArt == "Fruehschicht") {
                        erforderlicheInfos.schichten[z].verfuegbareMitarbeiter[y].splice(y, 1);
                      }
                    }
                    // Vor einer Nachtschicht darf Frueh oder Spaet gearbeitet werden
                    if (erforderlicheInfos.schichten[z].schichtArt == "Nachtschicht") {
                      if (erforderlicheInfos.alleSchichten[i].schichtArt != "Nachtschicht") {
                        erforderlicheInfos.schichten[z].verfuegbareMitarbeiter[y].splice(y, 1);
                      }
                    }

                  }
                }
              }
            }

            if (i + 1 == erforderlicheInfos.schichten.length) {
              resolve(erforderlicheInfos);
            }
          } // ende i - Schleife

        }) // end of Promise

        filternGesetzlicheBedingungen.then(function(erforderlicheInfos) {

          resolve(erforderlicheInfos);


        }).catch(function(error) {
          console.log(error);
        })


      }).catch(function(error) {
        console.log(error);
      })


    }).catch(function(error) {
      console.log(error);
    })




  }) // end of return new Promise

} // end of function



function schicht(schichtArt, datum, mitarbeiter) {
  this.schichtArt = schichtArt;
  this.datum = datum;
  this.mitarbeiter = mitarbeiter;
}




exports.ersatzAnfrage = ersatzAnfrage;
