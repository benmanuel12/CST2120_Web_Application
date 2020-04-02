function addcardfunction() {
    let request = new XMLHttpRequest();
    request.onload = function() {
        if (request.status === 200) {
            let responseData = request.responseText;
            alert("response: " + responseData);
            let objectArray = JSON.parse(responseData);
            let finalHTMLString = "";
            for (let i = 0; i < objectArray.length; i++) {

                let name = objectArray[i].name;
                let manaCost = objectArray[i].manaCost;
                let cmc = objectArray[i].cmc;
                let colors = objectArray[i].colors;
                let colorIdentity = objectArray[i].colorIdentity;
                let type = objectArray[i].type;
                let supertypes = objectArray[i].supertypes;
                let types = objectArray[i].types;
                let subtypes = objectArray[i].subtypes;
                let rarity = objectArray[i].rarity;
                let set = objectArray[i].set;
                let setname = objectArray[i].setname;
                let text = objectArray[i].text;
                let flavor = objectArray[i].flavor;
                let artist = objectArray[i].artist;
                let number = objectArray[i].number;
                let power = objectArray[i].power;
                let toughness = objectArray[i].toughness;
                let loyalty = objectArray[i].loyalty;
                let layout = objectArray[i].layout;
                let multiverseID = objectArray[i].multiverseID;
                let imageUrl = objectArray[i].imageUrl;
                let printings = objectArray[i].printings;
                let legalities = objectArray[i].legalities;
                let id = objectArray[i].id;

                let dataArray = [name, manaCost, cmc, colors, colorIdentity, type, supertypes, types, subtypes, rarity, set, setname, text, flavor, artist, number, power, toughness, loyalty, layout, multiverseID, imageUrl, printings, legalities, id];

                let htmlString = "<tr>";
                console.log(dataArray.length);
                for (let j = 0; j < dataArray.length; j++) {
                    htmlString += "<td>" + dataArray[j] + "</td>";
                    console.log("got here");
                }
                htmlString += "</tr>";
                finalHTMLString += htmlString;
            }
            console.log("Final HTML: " + finalHTMLString);
            document.getElementById("rowstart").innerHTML = finalHTMLString;
        } else {
            alert("Error: " + request.status);
        }
    }

    request.open("POST", "/addcard");
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    let cardname = document.getElementById("cardname").value;
    let quantity = document.getElementById("quantity").value;

    request.send("cardname=" + cardname + "&quantity=" + quantity);
}
/*
User writes input into form
Extract contents of form and send to server code
*/