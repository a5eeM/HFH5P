// event handler when the window loads the page
window.onload = addSongs;

function addSongs() {
    var song1 = document.getElementById("song1");
    var song2 = document.getElementById("song2");
    var song3 = document.getElementById("song3");
    
    song1.innerHTML = "Blue Suede Strings, by Elvis Pagely";
    song2.innerHTML = "Great Objects on Fire, by Jerry JSON Lewis"
    song3.innerHTML = "I code the Line, by Johnny Javascript";
}