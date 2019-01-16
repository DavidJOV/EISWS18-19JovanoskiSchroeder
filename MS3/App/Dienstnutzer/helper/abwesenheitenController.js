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
         



// ergebnis aus Tagfilterung wird korrekt übergeben.
console.log ("AB HIER WEITER TESTEN");







          for (let i = 0; i < erforderlicheInfos.schichten.length; i++) {
            var vars = erforderlicheInfos.schichten[i].datum.split("-");
            var tagVorher = parseInt(vars[0]) - 1;
            var tagNachher = parseInt(vars[0]) + 1;
            var monat = vars[1];
            var jahr = vars[2];
            if(tagVorher < 10){
              tagVorher = "0"+tagVorher;
            }
            if(tagNachher < 10){
              tagNachher = "0"+tagNachher;
            }
            var datumVorher = tagVorher + "-" + monat + "-" + jahr;
            var datumNachher = tagNachher + "-" + monat + "-" + jahr;
            console.log(datumVorher)
            console.log(datumNachher)


            // Ableich mit Schichten davor
            if (erforderlicheInfos.alleSchichten[i].datum == datumVorher) {
              for (let z = 0; z < erforderlicheInfos.schichten.length; z++) {
                for (let y = 0; y < erforderlicheInfos.schichten[z].mitarbeiter.length; y++) {
               
                  if (erforderlicheInfos.schichten[z].mitarbeiter[y].id == erforderlicheInfos.alleSchichten[i].mitarbeiterID1 || erforderlicheInfos.schichten[z].mitarbeiter[y].id == erforderlicheInfos.alleSchichten[i].mitarbeiterID2 || erforderlicheInfos.schichten[z].mitarbeiter[y].id == erforderlicheInfos.alleSchichten[i].mitarbeiterID3 || erforderlicheInfos.schichten[z].mitarbeiter[y].id == erforderlicheInfos.alleSchichten[i].mitarbeiterID4) {

                    // Vor einer Fruehschicht nur Fruehschicht!
                    if (erforderlicheInfos.schichten[z].schichtArt == "Fruehschicht") {
                      if (erforderlicheInfos.alleSchichten[i].schichtArt != "Fruehschicht") {
                        erforderlicheInfos.schichten[z].mitarbeiter.splice(y, 1);
                      }
                    }
                    // Vor Spaetschicht darf nur Frueh oder Spaet gearbeitet werden
                    if (erforderlicheInfos.schichten[z].schichtArt == "Spaetschicht") {
                      if (erforderlicheInfos.alleSchichten[i].schichtArt == "Nachtschicht") {
                        erforderlicheInfos.schichten[z].mitarbeiter.splice(y, 1);
                      }
                    }
                    // Vor einer Nachtschicht darf Frueh oder Spaet gearbeitet werden
                    if (erforderlicheInfos.schichten[z].schichtArt == "Nachtschicht") {
                      if (erforderlicheInfos.alleSchichten[i].schichtArt == "Nachtschicht") {
                        erforderlicheInfos.schichten[z].mitarbeiter.splice(y, 1);
                      }
                    }

                  }
                }
              }
            }

            // Abgleich mit Schichten danach
            if (erforderlicheInfos.alleSchichten[i].datum == datumNachher) {
              for (let z = 0; z < erforderlicheInfos.schichten.length; z++) {
                for (let y = 0; y < erforderlicheInfos.schichten[z].mitarbeiter.length; y++) {

                  if (erforderlicheInfos.schichten[z].mitarbeiter[y].id == erforderlicheInfos.alleSchichten[i].mitarbeiterID1 || erforderlicheInfos.schichten[z].mitarbeiter[y].id == erforderlicheInfos.alleSchichten[i].mitarbeiterID2 || erforderlicheInfos.schichten[z].mitarbeiter[y].id == erforderlicheInfos.alleSchichten[i].mitarbeiterID3 || erforderlicheInfos.schichten[z].mitarbeiter[y].id == erforderlicheInfos.alleSchichten[i].mitarbeiterID4) {

                    // Vor Spaetschicht darf nur Frueh oder Spaet gearbeitet werden
                    if (erforderlicheInfos.schichten[z].schichtArt == "Spaetschicht") {
                      if (erforderlicheInfos.alleSchichten[i].schichtArt == "Fruehschicht") {
                        erforderlicheInfos.schichten[z].mitarbeiter.splice(y, 1);
                      }
                    }
                    // Vor einer Nachtschicht darf Frueh oder Spaet gearbeitet werden
                    if (erforderlicheInfos.schichten[z].schichtArt == "Nachtschicht") {
                      if (erforderlicheInfos.alleSchichten[i].schichtArt != "Nachtschicht") {
                        erforderlicheInfos.schichten[z].mitarbeiter.splice(y, 1);
                      }
                    }

                  }
                }
              }
            }
            

            if (i + 1 == erforderlicheInfos.schichten.length) {
              //console.log(erforderlicheInfos.schichten[0].mitarbeiter)
              resolve(erforderlicheInfos);
            }
          } // ende i - Schleife

        }) // end of Promise

        filternGesetzlicheBedingungen.then(function(erforderlicheInfos) {
          
          var alleFreienMitarbeiter = new Array();
          for(let i = 0; i < erforderlicheInfos.schichten.length;i++){
            for(let j =0;j < erforderlicheInfos.schichten[i].mitarbeiter.length;j++){
              alleFreienMitarbeiter.push(erforderlicheInfos.schichten[i].mitarbeiter[j])

            }
          if(i+1 == erforderlicheInfos.schichten.length){
            var ersatzMitarbeiter = new Array();
            
          alleFreienMitarbeiter.sort((function(a, b){return a.id - b.id}))
          for(let x = 0; x < alleFreienMitarbeiter.length;x++){
            if(x < alleFreienMitarbeiter.length-2){
            if(alleFreienMitarbeiter[x].id == alleFreienMitarbeiter[x+1].id && alleFreienMitarbeiter[x].id == alleFreienMitarbeiter[x+2].id){
              ersatzMitarbeiter.push(alleFreienMitarbeiter[x])
            }
          }
          if(x+1 == alleFreienMitarbeiter.length){
            resolve(ersatzMitarbeiter);
           }

          }
          
          
          }
            
         
          
          }
          


         


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
