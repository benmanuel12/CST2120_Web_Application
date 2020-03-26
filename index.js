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

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function findUserID() {
    //Build query
    let sql = "SELECT id FROM users WHERE active = 'Yes';";
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, (err, result) => {
            if (err) { //Check for errors
                reject("Error executing query: " + JSON.stringify(err));
            } else { //Output results in JSON format - a web service would return this string.
                resolve(result);
            }
        });
    })
}

async function findCardIDs(userid) {
    //Build query
    let sql = "SELECT multiverseID FROM ownedCards WHERE ownedBy = " + userid + ";";
    //console.log("FindCardsID SQL: " + sql);
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, (err, result) => {
            if (err) {
                reject("Error executing query: " + JSON.stringify(err));
            } else {
                resolve(result);
            }
        });
    })
}

async function getCardData(ids) {
    //Build query
    let sql = "SELECT * FROM cards WHERE ";
    for (let i = 0; i < ids.length; i++) {
        sql = sql + "multiverseID = " + ids[i];
        if (i + 1 != ids.length) {
            sql = sql + " OR ";
        } else {
            sql = sql + ";";
        }
    }
    //console.log("getCardData SQL: " + sql);
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, (err, result) => {
            if (err) { //Check for errors
                reject("Error executing query: " + JSON.stringify(err));
            } else {
                resolve(result);
            }
        });
    })
}

function GETupdate(request, response) {
    findUserID().then(result => {
        //console.log("FindUserIDResult: " + JSON.stringify(result));
        let idObject = result;
        let id = idObject[0].id; //Assume that there is only one object

        //console.log("ID " + id);
        findCardIDs(id).then(result => {
            //console.log("FindCardsID: " + JSON.stringify(result));
            let cardIDsAsObject = result;
            let cardIDs = [];
            for (let i = 0; i < cardIDsAsObject.length; i++) {
                cardIDs.push(cardIDsAsObject[i].multiverseID);
            }
            //console.log("Final ID Array: " + cardIDs.toString());

            getCardData(cardIDs).then(result => {
                //console.log("getCardData: " + JSON.stringify(result));
                response.send(result);

            }).catch(err => {
                console.error(JSON.stringify(err));
            })

        }).catch(err => {
            console.error(JSON.stringify(err));
        })
    }).catch(err => {
        console.error(JSON.stringify(err));
    })
}

async function checkAvailable(username) {
    //Build query
    let sql = "SELECT username FROM users where username = '" + username + "';";
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, (err, result) => {
            if (err) {
                reject("Error executing query: " + JSON.stringify(err));
            } else {
                resolve(result);
            }
        });
    })
}

async function insertUser(username, email, password) {
    //Build query
    let sql = "INSERT INTO users VALUES ('" + username + "', '" + email + "', '" + password + "', 'No');";
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, (err, result) => {
            if (err) {
                reject("Error executing query: " + JSON.stringify(err));
            } else {
                resolve(result);
            }
        });
    })
}

function POSTsignup(request, response) {
    let givenUsername = request.param.username;
    let givenEmail = request.param.email;
    let givenPassword = request.param.password;
    console.log(givenUsername);
    console.log(givenEmail);
    console.log(givenPassword);

    checkAvailable(givenUsername).then(result => {
        if (result.length == 0) {
            // username is availible
            insertUser(givenUsername, givenEmail, givenPassword).then(result => {
                alert("Account created");
                response.send("Account created");

            }).catch(err => {
                console.error(JSON.stringify(err));
            })
        } else {
            // username is in use
            alert("Username is taken");
            response.send("Account created");
        }

    }).catch(err => {
        console.error(JSON.stringify(err));
    })
}

app.get("/update", GETupdate);

app.post("/signup", POSTsignup)



app.listen(8080);