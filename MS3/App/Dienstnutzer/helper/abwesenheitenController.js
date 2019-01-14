



var ersatzAnfrage = function ersatzAnfrage (mitarbeiter, dienstplan, abwesenheit){

var abwesenheitsTage = new Array();

var ersatzBeduerftigeTageErmittlung = new Promise (function (result,reject){

// Filtern der Tage, welche Ersatz benötigen:
for ( let i=0; i<dienstplan.tage.length; i++){
  if (dienstplan.tage[i].datum == abwesenheit.datumBeginn){
    do {
      abwesenheitsTage.push(dienstplan.tage[i]);
    }while(dienstplan.tage[i].datum != abwesenheit.datumEnde)
  }
} // for i - Schleife

resolve (abwesenheitsTage);
}) // End of Promise

// Ermittlung Mitarbeiter, welche an diesen Tagen frei haben
ersatzBeduerftigeTageErmittlung.then(function (abwesenheitsTage){

for (let i=0 ; i<)




}).catch(function (error) {
  console.log(error);
});






} // end of function
