function logout() {
    let request = new XMLHttpRequest();
    request.onload = function() {
        if (request.status === 200) {
            alert("Logged out");
        } else {
            alert("Error: " + request.status);
        }
    }
    request.open("GET", "/logout");
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.send();
}