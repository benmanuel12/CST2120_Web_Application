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
        idObject = JSON.parse(result);
        id = idObject.id;

        findCardIDs(id).then(result => {
            cardIDJSON = JSON.parse(result);
            let cardIDs = [];
            for (let i = 0; i < cardIDJSON.length; i++) {
                cardIDs.push(i.multiverseID);
            }
            getCardData(cardIDs).then(result => {
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

app.get("/update", GETupdate);

app.use(express.static('public'))

app.listen(8080);