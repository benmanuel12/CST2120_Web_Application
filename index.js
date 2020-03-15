const mtg = require('mtgsdk')
const express = require('express');
//Import the mysql module
const mysql = require('mysql');

//Create a connection pool with the user details
const connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    user: "ben",
    password: "sql",
    database: "mydatabase",
    debug: false
});


const app = express();

function GETupdate(request, response) {
    //Build query
    let sql = "SELECT multiverseID FROM ownedcards";

    //Execute query and output results
    connectionPool.query(sql, (err, result) => {
        if (err) { //Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
        } else { //Output results in JSON format - a web service would return this string.
            response.send(JSON.stringify(result));
        }
    });

}

app.get("/update", GETupdate);

app.use(express.static('public'))

app.listen(8080);