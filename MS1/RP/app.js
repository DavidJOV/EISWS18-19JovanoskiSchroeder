//dependecies
const express = require('express');
const app = express();
app.use(express.json());
var cronJob = require("./helper/checkAbwesenheiten")
// Alle 30 min Prüfen ob es noch offene Meldungen gibt.
cronJob.prüfeMeldungen();


// Phantom console.log finden - helper code
['log', 'warn'].forEach(function(method) {
    var old = console[method];
    console[method] = function() {
      var stack = (new Error()).stack.split(/\n/);
      // Chrome includes a single "Error" line, FF doesn't.
      if (stack[0].indexOf('Error') === 0) {
        stack = stack.slice(1);
      }
      var args = [].slice.apply(arguments).concat([stack[1].trim()]);
      return old.apply(console, args);
    };
  });



app.use((req, res, next) => {
  console.log("Time: " + new Date() + " Request-Pfad: " + req.path);
  next();
})

const settings = {
  port: process.env.PORT || 3000
};


const krankenpfleger = require('./ressourcen/krankenpfleger/index.js');
app.use('/krankenpfleger', krankenpfleger);

const abwesenheiten = require('./ressourcen/abwesenheiten/index.js');
app.use('/abwesenheiten', abwesenheiten);


app.listen(settings.port, () => console.log("Express app listening on port: " + settings.port + "!"))