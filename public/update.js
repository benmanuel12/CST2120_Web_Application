function update() {
    let request = new XMLHttpRequest();

    request.onload = function() {
        if (request.status === 200) {
            let responseData = request.responseText;
            console.log(responseData);
            dataAsObject = JSON.parse(responseData);
            console.log(dataAsObject);
        } else
            alert("error: " + request.status);

    };

    request.open("GET", "SQLpullCardsFromDB.js");
    request.send();
}
/*
fetch the username of the only user with active: Yes via SELECT
for each row in the results from SELECT multiverseID from ownedcards WHERE username = username
    append id to array

SELECT * FROM cards where multiverseID = any value in array
For each item in results, convert to JS object and insert into table
*/