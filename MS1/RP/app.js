//dependecies
const express = require('express');
const app = express();
app.use(express.json());




app.use((req, res, next) => {
    console.log("Time: "+ new Date() + " Request-Pfad: " + req.path);
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