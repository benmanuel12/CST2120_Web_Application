function addcardfunction() {
    let request = new XMLHttpRequest();
    request.onload = function() {
        if (request.status === 200) {
            let responseData = request.responseText;
            alert(responseData);
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