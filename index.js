const mtg = require('mtgsdk')
const express = require('express');

const app = express();

app.use(express.static('public'))

function handleGetRequest(request, response) {
    response.send("hi");
}

app.get('/hi', handleGetRequest);

app.listen(8080);
/*
General Program Flow

User writes input into form
Extract contents of form and convert to JSON
Send to server code
------------Server---------------
Retrieve JSON from client
Perform SQL search for a card of name supplied and same username as logged in user in OwnedCard table
if (entryexists) {
    Increment current entry quantity by new supplied quantity
} else {
    Perform SQL search for a card of name supplied in Card table
    if (entryexists) {
        copy card ID to new entry in OwnedCard table and tag with username
    } else {
        Perform API call for all cards of that name
        Add relevant details to Card table
        Add card id and username to OwnedCard table
    }
}
Perform SQL search for all card entries in OwnedCard table with their username
JSON Stringify results and send to Client
----------------Client----------------------
Retrieve JSON from server
Iterate through JSON and insert HTML based of it into webpage
*/