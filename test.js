const mtg = require('mtgsdk')
let givenCardname = "Opt";

function requoting(theString) {
    newString = '""';
    for (let i = 0; i < theString.length; i++) {
        newString = newString.substring(0, newString.length - 1) + theString.charAt(i) + newString.substring(newString.length - 1, newString.length)
    }
    return newString;
}

function escapeQuotes(stringText) {
    let newString = "";
    for (let i = 0; i < stringText.length; i++) {
        if (stringText.charAt(i) === "'") {
            newString += "\'"
        } else {
            newString += stringText.charAt(i);
        }
    }
    return newString;
}

function addFromAPI(card) {
    console.log("inside addFromAPI");
    //Build query
    let sql = "INSERT INTO cards VALUES(";
    sql = sql + "'" + card.name + "', '";
    sql = sql + card.manaCost + "', ";
    sql = sql + card.cmc + ", '";
    sql = sql + escapeQuotes(card.colors.toString()) + "', '";
    sql = sql + escapeQuotes(card.colorIdentity.toString()) + "', '";
    sql = sql + card.type + "', '";
    sql = sql + escapeQuotes(card.supertypes.toString()) + "', '";
    sql = sql + escapeQuotes(card.types.toString()) + "', '";
    sql = sql + escapeQuotes(card.subtypes.toString()) + "', '";
    sql = sql + card.rarity + "', '";
    sql = sql + card.set + "', '";
    sql = sql + card.setname + "', '";
    sql = sql + escapeQuotes(card.text.toString()) + "', '";
    sql = sql + escapeQuotes(card.flavor.toString()) + "', '";
    sql = sql + card.artist + "', '";
    sql = sql + card.number + "', '";
    sql = sql + card.power + "', '";
    sql = sql + card.toughness + "', '";
    sql = sql + card.loyalty + "', '";
    sql = sql + card.layout + "', ";
    sql = sql + card.multiverseID + ", '";
    sql = sql + card.imageUrl + "', '";
    sql = sql + escapeQuotes(card.printings.toString()) + "', '";
    sql = sql + escapeQuotes(card.legalities.toString()) + "', '";
    sql = sql + card.id;


    sql += "');";
    console.log("addFromAPI SQL: " + sql);
}

mtg.card.where({ name: requoting(givenCardname) }).then(cards => {
    cardDetails = cards[0];
    console.log(cardDetails);
    addFromAPI(cardDetails);
})