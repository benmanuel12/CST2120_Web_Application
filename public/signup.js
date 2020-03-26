function signupfunction() {
    let request = new XMLHttpRequest();
    request.onload = function() {
        if (request.status === 200) {
            let responseData = request.responseText;
            alert("Success" + responseData);
        } else {
            alert("Error: " + request.status);
        }
    }
    request.open("POST", "/signup");
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    let email = document.getElementById("email").value;
    let username = document.getElementById("signupusername").value;
    let password = document.getElementById("signuppassword").value;

    request.send("username=" + username + "&email=" + email + "&password=" + password);
}

/*
Send an AJAX POST to server with input
Server creates a SELECT and INSERT query with input
Use SELECT query to confirm no one uses that email
if unused, use INSERT to add the account to users
if used, warn user
*/