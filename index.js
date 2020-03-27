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

// Signup functions --------------------------------------------------------------

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
    let sql = "INSERT INTO users (username, email, password, active) VALUES ('" + username + "', '" + email + "', '" + password + "', 'No');";
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
    let givenUsername = request.body.username;
    let givenEmail = request.body.email;
    let givenPassword = request.body.password;

    checkAvailable(givenUsername).then(result => {
        if (result.length == 0) {
            // username is availible
            insertUser(givenUsername, givenEmail, givenPassword).then(result => {
                response.send("Account created");

            }).catch(err => {
                console.error(JSON.stringify(err));
            })
        } else {
            // username is in use
            response.send("This username is in use");
        }

    }).catch(err => {
        console.error(JSON.stringify(err));
    })
}

// Login functions---------------------------------------------------------------
async function checkExists(username, password) {
    //Build query
    let sql = "SELECT username, password FROM users where username = '" + username + "' AND password = '" + password + "';";
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

async function logout() {
    //Build query
    let sql = "UPDATE users SET active = 'No'";
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

async function login(username) {
    //Build query
    let sql = "UPDATE users SET active = 'Yes' WHERE username = '" + username + "';";
    console.log(sql);
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

function POSTlogin(request, response) {
    let givenUsername = request.body.username;
    let givenPassword = request.body.password;

    checkExists(givenUsername, givenPassword).then(result => {
        if (result.length == 1) {
            // account exists
            logout().then(result => {
                login(givenUsername).then(result => {
                    console.log(JSON.stringify(result));
                    if (result.affectedRows == 1) {
                        // success
                        response.send("Logged in");
                    } else {
                        // failure
                        response.send("Failed");
                    }

                }).catch(err => {
                    console.error(JSON.stringify(err));
                })

            }).catch(err => {
                console.error(JSON.stringify(err));
            })
        } else {
            // account does not exist
            response.send("account does not exist");
        }

    }).catch(err => {
        console.error(JSON.stringify(err));
    })
}


// Add Card functions ---------------------------------

async function checkUserOwnsCard(id, cardname) {
    //Build query
    let sql = "SELECT * FROM ownedcards WHERE ownedBy = '" + id + "' AND ;";
    console.log(sql);
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


function POSTaddcard(request, response) {
    let givenCardname = request.body.cardname;
    let givenQuantity = request.body.quantity;

    // assuming user has account and is logged in and has supplied a valid card name and quantity
    // SELECT userID FROM users
    findUserID().then(result => {
            if (result.length == 1) {
                // someone is logged in
                let userID = result[0].id;
                // SELECT * FROM cards WHERE cardname = given_cardname
                findMultiverseID().then(result => {
                        if (result.length == 1) {
                            // card requested exists in card table
                            // SELECT * FROM ownedcards WHERE multiverseID = previously_fetched_multiverseID AND id = userID
                            checkUserOwnsCard().then(result => {
                                    if (result.length == 1) {
                                        // user owns at least 1 copy of requested card
                                        // update entry in ownedcards table to reflect that
                                        // UPDATE ownedcards SET quantity = result[0].quantity + new_quantity WHERE multiverseID = previously_fetched_multiverseID AND id = userID
                                        updateRecord().then(result => {
                                            response.send("Collection updated");
                                            update()
                                        }).catch(err => {
                                            console.error(JSON.stringify(err));
                                        })

                                    }).catch(err => {
                                    console.error(JSON.stringify(err));
                                })
                            }
                            else {
                                // card requested does not exits in card table
                                // perform API call for card details
                                card.where({ name: given_cardname })
                                    .then(cards => {
                                        cardDetails = cards[0];
                                    })

                                // insert necessary data from API call into card table
                                //INSERT INTO cards (headings here) VALUES (values here);
                                addFromDatabase().then(result => {
                                    // insert new entry into ownedcards table referring to the new card
                                    //INSERT INTO ownedcards (multiverseID, quantity, ownedBy) VALUES (new_multiverseID, given_quantity, userID);
                                    addNewOwnedCard().then(result => {
                                        response.send("Card added to collection");

                                    }).catch(err => {
                                        console.error(JSON.stringify(err));
                                    })

                                }).catch(err => {
                                    console.error(JSON.stringify(err));
                                })

                            }
                        }).catch(err => {
                        console.error(JSON.stringify(err));
                    })

                }
                else {
                    // no one is logged in
                    response.send("No logged in user");
                }

            }).catch(err => {
            console.error(JSON.stringify(err));
        })


    }

    /*


    if (result.length == 1)
        
        if (result.length == 1) // they have the card
    	    
    	    
    else
    	card.where({name: given_cardname})
    	.then(cards => {
        cardDetails = cards[0];
    	})
        
        INSERT INTO cards (headings here) VALUES (values here);

    INSERT INTO ownedcards (multiverseID, quantity, ownedBy) VALUES (new_multiverseID, given_quantity, userID);
    	
    then call update() from update.js as function responses
    */

    app.get("/update", GETupdate);

    app.post("/signup", POSTsignup)

    app.post("/login", POSTlogin)

    app.post("/addcard", POSTaddcard);

    app.listen(8080);