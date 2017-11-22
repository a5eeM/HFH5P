window.onload = init;

function init() {
    var button = document.getElementById("amilucky");
    button.onclick = () => { // fat arrow function
        // url of the service
        //var url = "http://wickedlysmart.com/ifeelluckytoday/";
        var url = "luckyornot.txt"
        // create a new XHR object
        var request = new XMLHttpRequest();
        // set the request
        request.open("GET", url);
        request.onload = () => {
            if (request.status == 200) {
                displayLuck(request.responseText);
            }
        }
        // send the request
        request.send(null);
    };
}

function displayLuck(luck) {
    var p = document.getElementById("luck");
    p.innerHTML = "Today you are " + luck;
}