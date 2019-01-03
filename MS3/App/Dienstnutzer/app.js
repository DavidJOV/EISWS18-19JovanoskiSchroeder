var request = require('request');
const express = require('express');
const app = express();
app.use(express.json());;
var bodyParser = require('body-parser');

app.use((req, res, next) => {
    console.log("Time: " + new Date() + " Request-Pfad: " + req.path);
    next();
  })
  
  const settings = {
    port: process.env.PORT || 8080
  };

var serviceURL = 'http://localhost:3000';

// GET auf Alle Mitarbeiter
router.get('/', (req, res) => {
    let resourceURI = serviceURL + '/mitarbeiter';

    var options = {
        uri: resourceURI,
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }

    request(options, (err, res, body) => {

        if (err) {
            console.log(err);
            return;
        }
        
        console.log(JSON.parse(body));

    });
});
app.listen(settings.port, () => console.log("Express app listening on port: " + settings.port + "!"))