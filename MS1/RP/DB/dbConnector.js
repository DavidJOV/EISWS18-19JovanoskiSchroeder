var mysql = require("mysql");
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'krankenpfleger',
    multipleStatements : false // Sicherheits Aspekt - keine Sql injections.
});
connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});
// Error Messages
var errorMsgDB = "Could not write to Database";

// exportieren der DB Verbindung
exports.connection = connection;
exports.errorMsgDB = errorMsgDB;