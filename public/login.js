function loginfunction() {
    let request = new XMLHttpRequest();
    request.onload = function() {
        if (request.status === 200) {
            let responseData = request.responseText;
            alert(responseData);
        } else {
            alert("Error: " + request.status);
        }
    }
    request.open("POST", "/login");
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    request.send("username=" + username + "&password=" + password);
}

/*
Make AJAX POST request to send details to server code
Server code converts it to SQL SELECT query and UPDATE query
Use SELECT query to confirm user exists
If yes, update every user to active: No and current user to active: Yes
if no, alert user
*/