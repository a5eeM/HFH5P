var watchId;
var map = null;
var prevCoords = null;
var ourCoords = {
    latitude: 47.624851,
    longitude: -122.52099
};

window.onload = getMyLocation;

function getMyLocation() {
    if (navigator.geolocation) {
        var watchButton = document.getElementById("watch");
        watchButton.onclick = watchLocation;
        var clearWatchButton = document.getElementById("clearWatch");
        clearWatchButton.onclick = clearWatch;
    } else {
        alert("Oops, no geolocation support");
    }
}

// handler watchLocation
function watchLocation() {
    // check if location found, call the handlers accordingly, return a watchId value
    watchId = navigator.geolocation.watchPosition(displayLocation, displayError);
}

// handler clearWatch
function clearWatch() {
    if (watchId != undefined) {
        navigator.geolocation.clearWatch(watchId);
        watchId = undefined;
    }
}

// if location found, call the success handler which is passed a position object by geo api
function displayLocation(positon) {
    var latitude = positon.coords.latitude;
    var longitude = positon.coords.longitude;
    
    var div =  document.getElementById("location");
    div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;
    div.innerHTML += " (with " + positon.coords.accuracy + " meters accuracy)";
    
    // distance
    var km = computeDistance(positon.coords, ourCoords);
    var distance = document.getElementById("distance");
    distance.innerHTML = "You are " + km + " km from WickedlySmart HQ";
    
    // if statement so that map gets drawn only once & not with each call by watchPosition
    if (map == null) {
        showMap(positon.coords);
        prevCoords = positon.coords;
    } else {
        var meters = computeDistance(positon.coords, prevCoords) * 1000;
        if (meters > 20) {
            scrollMapToPosition(positon.coords);
            prevCoords = positon.coords;
        }
    }
}

// if location not found, call the error handler which is passed an error object by the api
function displayError(error) {
    var errorTypes = {
        0: "Unknown Error",
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
    // google object for lat and long using the constructor LatLng
    var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude);
    
    // map options
    var mapOptions = {
        zoom: 18,
        center: googleLatAndLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    var mapDiv = document.getElementById("map");
    // use another constructor - google.maps.Map which returns a Map object
    map = new google.maps.Map(mapDiv, mapOptions);
    
    var title = "Your location";
    var content = "You are here: " + coords.latitude + ", " + coords.longitude;
    addMarker(map, googleLatAndLong, title, content);
}

// add the marker(pin) to the map
function addMarker(map, latlong, title, content) {
    // markerOptions
    var markerOptions = {
        position: latlong, // google style lat and long[passed to the funtion]
        map: map, // map object[passed]
        title: title, // title for the marker
        clickable: true // is the marker clickable to open infoindow 
    };
    
    // create the marker using google.maps.Marker constructor
    var marker = new google.maps.Marker(markerOptions);
    
    // info window options
    var infoWindowOptions = {
        content: content, // content for the window
        position: latlong // lat and long
    };
    
    // create the info window using google.maps.InfoWindow constructor
    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    
    // add a listener for the click event using Google Maps addListener method
    google.maps.event.addListener(marker, "click", function() {
        infoWindow.open(map);
    });
}

// constant update to position
function scrollMapToPosition(coords) {
    var latitude = coords.latitude;
    var longitude = coords.longitude;
    var latlong = new google.maps.LatLng(latitude, longitude);
    
    // panTo method takes LatLng object and scrolls the map so new location is at center of the map
    map.panTo(latlong);
    
    addMarker(map, latlong, "Your new location", "You moved to: " +
             latitude + ", " + longitude);
}