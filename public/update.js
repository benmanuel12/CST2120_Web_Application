function update() {
    let request = new XMLHttpRequest();

    request.onload = function() {
        if (request.status === 200) {
            let responseData = request.responseText;
            let objectArray = JSON.parse(responseData);
            let largerHTMLString = "";
            for (let i = 0; i < objectArray.length; i++) {

                let name = i.name;
                let manaCost = i.manaCost;
                let cmc = i.cmc;
                let colors = i.colors;
                let colorIdentity = i.colorIdentity;
                let type = i.type;
                let supertypes = i.supertypes;
                let types = i.types;
                let subtypes = i.subtypes;
                let rarity = i.rarity;
                let set = i.set;
                let setname = i.setname;
                let text = i.text;
                let flavor = i.flavor;
                let artist = i.artist;
                let number = i.number;
                let power = i.power;
                let toughness = i.toughness;
                let loyalty = i.loyalty;
                let layout = i.layout;
                let multiverseID = i.multiverseID;
                let imageUrl = i.imageUrl;
                let printings = i.printings;
                let legalities = i.legalities;
                let id = i.id;

                let dataArray = { name, manaCost, cmc, colors, colorIdentity, type, supertypes, types, subtypes, rarity, set, setname, text, flavor, artist, number, power, toughness, loyalty, layout, multiverseID, imageUrl, printings, legalities, id };

                let htmlString = "<tr>";
                for (let j = 0; j < dataArray.length; j++) {
                    let newString = "<td>" + dataArray[j] + "</td>";
                    htmlString += newString;
                }
                htmlString += "</tr>";
                largerHTMLString += htmlString;
            }
            document.getElementById("rowstart").innerHTML = largerHTMLString;

        } else
            alert("error: " + request.status);

    };

    request.open("GET", "/update");
    request.send();
}
/*
fetch the username of the only user with active: Yes via SELECT
for each row in the results from SELECT multiverseID from ownedcards WHERE username = username
    append id to array

SELECT * FROM cards where multiverseID = any value in array
For each item in results, convert to JS object and insert into table

also need to get quantity from owned card table somehow