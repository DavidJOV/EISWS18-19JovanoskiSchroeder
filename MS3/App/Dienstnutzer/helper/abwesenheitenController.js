var ersatzAnfrage = function ersatzAnfrage(informationen, abwesenheit) {

  var
  return new Promise(function(resolve, reject) {


  //  var ersatzBeduerftigeSchichten = new Array();
    //var schichtDaten = new Array();
    var substringDatum;
    var ersatzBeduerftigeSchichtInfos ={
      mitarbeiter: informationen.mitarbeiterliste,
      schichten: [],
      tagDatum: []
    }




    var ersatzBeduerftigeSchichtenErmittlung = new Promise(function(resovle, reject) {

      // Filtern der Schichten, welche Ersatz benötigen:
      for (let i = 0; i < informationen.dienstplan.schichten.length; i++) {
        var j = i;
        if (informationen.dienstplan.schichten[i].datum == abwesenheit.datumBeginn) {
          do {
            ersatzBeduerftigeSchichtInfos.schichten.push(informationen.dienstplan.schichten[j]);
            j++;
          } while (informationen.dienstplan.schichten[j].datum != abwesenheit.datumEnde)
        }
        (
          if (i + 1 == informationen.dienstplan.schichten.length) {
            for (let d = 0; d < ersatzBeduerftigeSchichtInfos.schichten.length; d++){
              substringDatum = ersatzBeduerftigeSchichtInfos.schichten[d].datum.substring(0,1);
              ersatzBeduerftigeSchichtInfos.tagDatum.push(parseInt(substringDatum));
              if (d+1 == ersatzBeduerftigeSchichtInfos.schichten.length ) {
                resolve(ersatzBeduerftigeSchichtInfos);
              }
            }
        }
      } // for i - Schleife

    }) // End of Promise ersatzBeduerftigeSchichtenErmittlung

    // Ermittlung Mitarbeiter, welche an diesen Tagen frei haben
    ersatzBeduerftigeTageErmittlung.then(function(ersatzBeduerftigeSchichtInfos) {

      var ermittlungNichtVerfuegbarerMitarbeiter = new Promise(function(resolve, reject) {

// for schleife für jeden TAG !

        var erforderlicheInfos = {
          schichten : ersatzBeduerftigeSchichtInfos.schichten,
          tagDatum :  ersatzBeduerftigeSchichtInfos.tagDatum,
          verfuegbareMitarbeiter: []
        }

        var alleMitarbeiter = new Array();
        for (let i = 0; i < ersatzBeduerftigeSchichtInfos.mitarbeiter[i]; i++) {
          alleMitarbeiter.push(ersatzBeduerftigeSchichtInfos.mitarbeiter[i]);
        }

        for (let i = 0; i < ersatzBeduerftigeSchichtInfos.schichten.length; i++) {
          for (let j = 0; j < alleMitarbeiter.length; j++) {

            if (alleMitarbeiter[j].id != ersatzBeduerftigeSchichtInfos.schichten[i].mitarbeiterID1 || alleMitarbeiter[j].id != ersatzBeduerftigeSchichtInfos.schichten[i].mitarbeiterID2 || alleMitarbeiter[j].id != ersatzBeduerftigeSchichtInfos.schichten[i].mitarbeiterID3 || alleMitarbeiter[j].id != ersatzBeduerftigeSchichtInfos.schichten[i].mitarbeiterID4) {
              erforderlicheInfos.verfuegbareMitarbeiter.push(alleMitarbeiter[j]);
            }
            if (j + 1 == alleMitarbeiter.length) {
                        resolve(erforderlicheInfos);
            }
          } // end of j-Schleife
        } // end of i- Schleife

      }) // end of Promise ermittlungNichtVerfuegbarerMitarbeiter

      ermittlungNichtVerfuegbarerMitarbeiter.then(function(nichtVerfuegbareMitarbeiter) {

        var ermittlungFreierMitarbeiter = new Promise(function(resolve, reject) {

          var freieMitarbeiterNachDatum = new Array();

          for (let j = 0; j < nichtVerfuegbareMitarbeiter.length; j++) {
            for (let i = 0; i < informationen.mitarbeiterListe.length; i++) {


              if (informationen.mitarbeiterListe[i].id != nichtVerfuegbareMitarbeiter[j].id) {
                freieMitarbeiter.push(informationen.mitarbeiterListe[i]);
              }
              if (i + 1 == informationen.mitarbeiterListe.length) {
                resolve(freieMitarbeiter);
              }

            } //end of i-Schleife

          } // end of j-Schleife

        }) // end of Promise ermittlungFreierMitarbeiter

        ermittlungFreierMitarbeiter.then(function(freieMitarbeiterNachDatum) {






        }).catch(function(error) {
          console.log(error);
        });





        var ersatz = {
          datum: "",
          schicht: "",
          ErsatzMitarbeiterID: []
        }



      }).catch(function(error) {
        console.log(error);
      });


    }).catch(function(error) {
      console.log(error);
    });




  }) // end of return new Promise

} // end of function




// array -> mitarbeiter die da arbeiten ermitteln.

// -> alle mitarbeiter id -> in array -> cutten von mitarbeiter die arbeiten.

// -> ermittle Ma (NUR NACH DATUM) -> cutten nach schichten...

// dieses Array ErsatzMitarbeiterID filtern nach höchsten Überstunden -> Auswahl niedrigste!

// resolve diese Mitarbeiter ID -> putten der dazugehörigen Schichtenzuweisungen

// NACH JEDEM TAG WIEDERHOLEN!





exports.ersatzAnfrage = ersatzAnfrage;
