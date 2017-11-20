var map;

var ourCoords = {
    latitude: 47.624851,
    longitude: -122.52099
};

window.onload = getMyLocation;

function getMyLocation() {
    // check if geolocation exists
    if (navigator.geolocation) {
        // get the location and call the success and error handlers
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
    } else {
        alert("Oops, geolocation not found");
    }
}

// if location found call the success handler, passing the position object
function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    var div = document.getElementById("location");
    div.innerHTML = "Your are at Latitude: " + latitude + ", Longitude: " + longitude;
    
    // distance
    var km = computeDistance(position.coords, ourCoords);
    var distance = document.getElementById("distance");
    distance.innerHTML = "You are " + km + " km from the WickedlySmart HQ";
    
    // map
    showMap(position.coords);
}

// if location not found call the error handler, passing the error object
function displayError(error) {
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    
    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + " " + error.message;
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

// map
function showMap(coords) {
    // Google API bundles lat and long in its own object
    // we use the LatLng constructor which takes lat and long and returns an object

    var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude);
    
    // mapOptions object to set the options we want to set for our map
    var mapOptions = {
        zoom: 17,
        center: googleLatAndLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    var mapDiv = document.getElementById("map");
    /* we use another constructor - Map, which takes an element
       and out options object and returns a map object */
    
    map = new google.maps.Map(mapDiv, mapOptions);
    
}