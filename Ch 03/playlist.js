window.onload = init;

function init() {
    var button = document.getElementById("addButton");
    button.onclick = handleButtonClick;
    loadPlaylist();
}

function handleButtonClick() {
    var textInput = document.getElementById("songTextInput");
    var ul = document.getElementById("playlist");
    var songName = textInput.value;
    if (songName == "") {
        alert("Please enter a song");
    } else {
        //alert("Adding " + songName);
        var li = document.createElement("li");
        li.innerHTML = songName;
        ul.appendChild(li);
        save(songName);
    }
    
    textInput.value = "";
}