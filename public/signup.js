function signupfunction() {
    let email = document.getElementById("email").value;
    let username = document.getElementById("signupusername").value;
    let password = document.getElementById("signuppassword").value;
}

/*
Send an AJAX POST to server with input
Server creates a SELECT and INSERT query with input
Use SELECT query to confirm no one uses that email
if unused, use INSERT to add the account to users
if used, warn user
*/