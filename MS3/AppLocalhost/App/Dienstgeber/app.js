//dependecies
const express = require('express');
const app = express();
app.use(express.json());

// Phantom console.log finden - helper code:

/*['log', 'warn'].forEach(function(method) {
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
  });*/

app.use((req, res, next) => {
  console.log("Time: " + new Date() + " Request-Pfad: " + req.path);
  next();
})

// CORS erlauben
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  next();
});

app.get('/', function(req, res, next) {
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
  // Handle the post for this route
});
//___________________________________________________

const settings = {
  port: process.env.PORT || 3000
};


const mitarbeiter = require('./Mitarbeiter/index.js');
app.use('/Mitarbeiter', mitarbeiter);

const dienstplaene = require('./Dienstplaene/index.js');
app.use('/Dienstplaene', dienstplaene);

const abwesenheiten = require('./Abwesenheiten/index.js');
app.use('/Abwesenheiten', abwesenheiten);

const tauschanfragen = require('./Tauschanfragen/index.js');
app.use('/tauschanfragen', tauschanfragen);


app.listen(settings.port, () => console.log("Express app listening on port: " + settings.port + "!"))
