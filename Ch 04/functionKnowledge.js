window.onload = outputResults;

// dogsAge function
function dogsAge(age) {
    return age * 7;
}

var myDogsAge = dogsAge(4);

// area function
function rectangleArea(width, height) {
    var area = width * height;
    return area;
}

var rectArea = rectangleArea(3, 4);

// addup function
function addUp(numArray) {
    var total = 0;
    for (var i = 0; i < numArray.length; i++) {
        total += numArray[i];
    }
    return total;
}

var theTotal = addUp([1, 5, 3, 9]);

// getAvatar function
function getAvatar(points) {
    var avatar;
    if (points < 100) {
        avatar = "Mouse";
    } else if (points > 100 && points < 1000) {
        avatar = "Cat";
    } else {
        avatar = "Ape";
    }
    return avatar;
}

var myAvatar = getAvatar(335);

// onload handler
function outputResults() {
    var output = document.getElementById("output");
    output.innerHTML = "Dog's age: " + myDogsAge + "<br>rectArea: " + rectArea +
        "<br>theTotal: " + theTotal + "<br>myAvatar: " + myAvatar;
}