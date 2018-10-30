//dependecies
const express = require('express');
const app = express();
app.use(express.json());
var date = new Date();



app.use((req, res, next) => {
    console.log("Time: %d" + " Request-Pfad: " + req.path, date);
    next();
})

const settings = {
    port: process.env.PORT || 3000
};


const schwestern = require('./ressourcen/schwestern/index.js');
app.use('/schwestern', schwestern);

const krankmeldungen = require('./ressourcen/krankmeldungen/index.js');
app.use('/krankmeldungen', krankmeldungen);


app.listen(settings.port, () => console.log("Express app listening on port: " + settings.port + "!"))