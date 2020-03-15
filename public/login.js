function loginfunction() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
}

/*
Make AJAX POST request to send details to server code
Server code converts it to SQL SELECT query and UPDATE query
Use SELECT query to confirm user exists
If yes, update every user to active: No and current user to active: Yes
if no, alert user
*/