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

/* Outputs all of the employees */
function getOwnedCards() {
    //Build query
    let sql = "SELECT multiverseID FROM ownedcards";

    //Execute query and output results
    connectionPool.query(sql, (err, result) => {
        if (err) { //Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
        } else { //Output results in JSON format - a web service would return this string.
            return JSON.stringify(result);
        }
    });
}

//Call function to output employees
getEmployees();