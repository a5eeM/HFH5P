window.onload = getMyLocation;

var ourCoords = {
    latitude: 47.624851,
    longitude: -122.52099
};

function getMyLocation() {
    // test if geolocation exists
    if (navigator.geolocation) {
        // call getCurrentPosition and set up the handlers for whether the location is available, or error
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
    } else {
        alert("Oops, geolocation is not supported");
    }
}

// if location found, geelocation calls the success handler and passes a position object
function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    var div = document.getElementById("location");
    div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;
    
    // compute the distance
    var km = computeDistance(position.coords, ourCoords);
    var distanceDiv = document.getElementById("distance");
    distanceDiv.innerHTML = "You are " + km + " km from the WickedlySmart HQ";
 }

// if location not found, geolocation calls the error handler and passes an error object
function displayError(error) {
    var errorTypes = {
        0: "Unknown Error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    
    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage =  errorMessage + " " + error.message;
    }
    
    var div = document.getElementById("location");
    div.innerHTML = errorMessage; 
}

// compute the distance
function computeDistance(startCoords, destCoords) {
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);
    
    var Radius = 6371; // radius of earth in km
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
                            Math.cos(startLatRads) * Math.cos(destLatRads) * 
                            Math.cos(startLongRads - destLongRads)) * Radius;
    
    return distance;
}

// function to convert degrees to radians
function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI) / 180;
    return radians;
}