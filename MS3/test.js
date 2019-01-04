router.post('/', bodyParser.json(), (req, res) => {
    var mitarbeiterListe;
    var anzahlSchichten = 4;
    var anzahlMitarbeiterSchicht = 4;
    const dienstplan = {
        stationID: req.body.stationID,
        monat: req.body.monat,
        monatsTage: []
    };
  
    var schichtzuweisung = {
        datum: "",
        schichtArt: "",
        mitarbeiterID1: "",
        mitarbeiterID2: "",
        mitarbeiterID3: "",
        mitarbeiterID4: ""
    }
    var tag = {
      schichtzuweisungID1: "",
      schichtzuweisungID2: "",
      schichtzuweisungID3: "",
      schichtzuweisungID4: "",
      datum: ""
    }
  
    sqlHandler.getMitarbeiter()
         .then(function (maListe) { // <- So ist es richtig! Noch bei den anderen Funktionen ändern!!!!
             if (maListe === undefined) console.log("Keine Mitarbeiter vorhanden!");
             else {
               mitarbeiterListe = maListe;
             }
         })
         .catch(function (error) {
             res.status(400).send(error);
         });
   });
    var anzahlTage = tagZaehler(req.body.monat,2019,0); // Berechnung Tage im Monat x
    for (let i = 1 ; i <= anzahlTage ; i++) {
      for (let j = 0 ; j< anzahlSchichten ; j++){
         if (j == 0) {
           let datum = i+"-"+req.body.monat+"-2019";
              if(i<10){datum="0"+i+"-"+req.body.monat+"-2019";}
          schichtzuweisung.datum=datum;
          schichtzuweisung.schichtArt="Frueschicht";
          schichtzuweisung.mitarbeiterID1=mitarbeiterListe[0].id;
          schichtzuweisung.mitarbeiterID2=mitarbeiterListe[1].id;
          schichtzuweisung.mitarbeiterID3=mitarbeiterListe[2].id;
          schichtzuweisung.mitarbeiterID4=mitarbeiterListe[3].id;
          sqlHandler.neueSchichtzuweisung(schichtzuweisung)
          .then(function (schichtzuweisung) {
              if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht erstellt werden");
          })
          .catch(function (err) {
              console.log(err);
          }).then(function(schichtzuweisung){
            sqlHandler.getSchichtzuweisung(schichtzuweisung.datum, schichtzuweisung.schichtArt)
            .then(function(schicht){
              tag.schichtzuweisungID1=schicht.id;
            })
          })
         }
  
         if (j == 1) {
           let datum = i+"-"+req.body.monat+"-2019";
              if(i<10){datum="0"+i+"-"+req.body.monat+"-2019";}
          schichtzuweisung.datum=datum;
          schichtzuweisung.schichtArt="Zwischenschicht";
          schichtzuweisung.mitarbeiterID1=mitarbeiterListe[4].id;
          schichtzuweisung.mitarbeiterID2=mitarbeiterListe[5].id;
          schichtzuweisung.mitarbeiterID3=mitarbeiterListe[6].id;
          schichtzuweisung.mitarbeiterID4=mitarbeiterListe[7].id;
          sqlHandler.neueSchichtzuweisung(schichtzuweisung)
          .then(function (schichtzuweisung) {
              if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht erstellt werden");
          })
          .catch(function (err) {
              console.log(err);
          }).then(function(schichtzuweisung){
            sqlHandler.getSchichtzuweisung(schichtzuweisung.datum, schichtzuweisung.schichtArt)
            .then(function(schicht){
              tag.schichtzuweisungID2=schicht.id;
            })
          })
         }
  
         if (j == 3) {
           let datum = i+"-"+req.body.monat+"-2019";
              if(i<10){datum="0"+i+"-"+req.body.monat+"-2019";}
          schichtzuweisung.datum=datum;
          schichtzuweisung.schichtArt="Spaetschicht";
          schichtzuweisung.mitarbeiterID1=mitarbeiterListe[8].id;
          schichtzuweisung.mitarbeiterID2=mitarbeiterListe[9].id;
          schichtzuweisung.mitarbeiterID3=mitarbeiterListe[10].id;
          schichtzuweisung.mitarbeiterID4=mitarbeiterListe[11].id;
          sqlHandler.neueSchichtzuweisung(schichtzuweisung)
          .then(function (schichtzuweisung) {
              if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht erstellt werden");
          })
          .catch(function (err) {
              console.log(err);
          }).then(function(schichtzuweisung){
            sqlHandler.getSchichtzuweisung(schichtzuweisung.datum, schichtzuweisung.schichtArt)
            .then(function(schicht){
              tag.schichtzuweisungID3=schicht.id;
            })
          })
         }
  
         if (j == 4) {
           let datum = i+"-"+req.body.monat+"-2019";
              if(i<10){datum="0"+i+"-"+req.body.monat+"-2019";}
          schichtzuweisung.datum=datum;
          schichtzuweisung.schichtArt="Nachtschiht";
          schichtzuweisung.mitarbeiterID1=mitarbeiterListe[12].id;
          schichtzuweisung.mitarbeiterID2=mitarbeiterListe[13].id;
          schichtzuweisung.mitarbeiterID3=mitarbeiterListe[14].id;
          schichtzuweisung.mitarbeiterID4=mitarbeiterListe[15].id;
          sqlHandler.neueSchichtzuweisung(schichtzuweisung)
          .then(function (schichtzuweisung) {
              if (schichtzuweisung === undefined) console.log("Schichtzuweisung konnte nicht erstellt werden");
          })
          .catch(function (err) {
              console.log(err);
          }).then(function(schichtzuweisung){
            sqlHandler.getSchichtzuweisung(schichtzuweisung.datum, schichtzuweisung.schichtArt)
            .then(function(schicht){
              tag.schichtzuweisungID4=schicht.id;
            })
          })
         }
      }
      sqlHandler.neuerTag(tag)
      .then(function (tag) {
          if (tag === undefined) console.log("Tag konnte nicht erstellt werden");
          else {
              dienstplan.monatsTage[i-1] = tag;
          }
      })
      .catch(function (err) {
          console.log(err);
      });
  }
  sqlHandler.neuerDienstplan(dienstplan)
  .then(function (dienstplan) {
      if (dienstplan === undefined) res.status(400).send("Dienstplan konnte nicht erstellt werden");
      else {
          res.status(201).send(dienstplan);
      }
  })
  .catch(function (err) {
      res.status(400).send(err);
  });
  
  