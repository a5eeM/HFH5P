window.onload = getMyLocation;

function getMyLocation() {
    // if the device supports geolocation
    if (navigator.geolocation) {
        // get the locstion and set up the handler, if not able to get the location set up the error handler
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
    } else {
        alert("Oops, no geolocation support"); // device does not support gelocation
    }
}

// if location found, geolocation calls the handler and passes a position object
function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    var div = document.getElementById("location");
    div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;
}


// if location not found, geolocation calls the error handles and passes an error object
function displayError(error) {
    var errorType = {
        0: "Unknown Error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    
    var errorMessage = errorType[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + " " + error.message;
    }
    
    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}