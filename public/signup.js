function signupfunction() {
    let request = new XMLHttpRequest();
    request.onload = () => {
        if (request.status === 200) {
            let responseData = request.responseText;
            document.getElementById("fakeid").innerHTML = responseData;
        } else {
            alert("Error: " + request.status);
        }
    }
    request.open("POST", "signupSQL.js");
    request, setRequestHeader("Content-type", "applicatio/x-www-form-urlencoded");

    let email = document.getElementById("email").value;
    let username = document.getElementById("signupusername").value;
    let password = document.getElementById("signuppassword").value;

    request.send("email" + email + "username=" + username + "password=" + password);
}

/*
Send an AJAX POST to server with input
Server creates a SELECT and INSERT query with input
Use SELECT query to confirm no one uses that email
if unused, use INSERT to add the account to users
if used, warn user
*/