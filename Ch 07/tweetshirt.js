window.onload = function() {
    // tweets
    var url = "tweet.json"
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = () => {
        if (request.status == 200) {
            updateTweets(request.responseText);
        }
    }
    request.send(null);
    
    // previewHandler
    var button = document.getElementById("previewButton");
    button.onclick = previewHandler;
};

// button handler
function previewHandler() {
    var canvas = document.getElementById("tshirtCanvas");
    // get context
    var context = canvas.getContext("2d");
    // blank slate
    fillBackgroundColor(canvas, context);
    drawText(canvas, context);
    
    // get select object
    var selectObj = document.getElementById("shape");
    // console.log(selectObj);
    var index = selectObj.selectedIndex;
    // console.log(index);
    var shape = selectObj[index].value;
    // console.log(shape);
    console.log(selectObj.options[index].value);
    
    if (shape == "squares") {
        for (var squares = 0; squares < 20; squares++) {
            drawSquare(canvas, context);
        }
    } else if (shape == "circles") {
        for (var circles = 0; circles < 20; circles++) {
            drawCircle(canvas, context);
        }
    }
    drawText(canvas, context);
    drawBird(canvas, context);
}

// draw square
function drawSquare(canvas, context) {
    var width = Math.floor(Math.random() * 41);
    
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);
    
    context.fillStyle = "lightblue";
    // fill rect
    context.fillRect(x, y, width, width);
}

// draw cicrle
function drawCircle(canvas, context) {
    var radius = Math.floor(Math.random() * 41);
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);
    
    // begin path
    context.beginPath();
    // draw arc
    context.arc(x, y, radius, 0, degreesToRadians(360), true);
    // fill style
    context.fillStyle = "lightblue";
    // fill
    context.fill();
}

// drawing text
function drawText(canvas, context) {
    var selectObj = document.getElementById("foregroundColor");
    var index = selectObj.selectedIndex;
    var foregroundColor = selectObj.options[index].value;
    
    // top text
    context.fillStyle = foregroundColor;
    context.font ="bold 1em sans-serif";
    context.textAlign = "left";
    context.fillText("I saw this tweet", 20, 40);
    
    // tweet
    selectObj = document.getElementById("tweets");
    index = selectObj.selectedIndex;
    var tweet = selectObj.options[index].value;
    context.font = "italic 1.2em serif";
    //context.fillText(tweet, 30, 100);
    if (tweet.length > 60) {
        var tweetLines = splitIntoLines(tweet);
        for (var i = 0; i < tweetLines.length; i++) {
            context.fillText(tweetLines[i], 30, 70+(i * 25));
        }
    } else {
        context.fillText(tweet, 30, 100);
    }
    
    
    // bottom text
    context.font = "bold 1em sans-serif";
    context.textAlign = "right";
    context.fillText("and all I got was this lousy t-shirt!", canvas.width - 20, canvas.height - 40);
}

function drawBird(canvas, context) {
    var twitterBird = new Image();
    twitterBird.src = "twitterBird.png";
    twitterBird.onload = () => {
        context.drawImage(twitterBird, 20, 120, 70, 70);
    }
}

// fliing the background with user selected color
function fillBackgroundColor(canvas, context) {
    var selectObj = document.getElementById("backgroundColor");
    var index = selectObj.selectedIndex;
    var backgroundColor = selectObj.options[index].value;
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

// converting degrees to Radians
function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

// update tweets
function updateTweets(responseText) {
    var tweetsOrdered = JSON.parse(responseText);
    tweetsRandom = shuffleTweetsArray(tweetsOrdered);
    
    var tweetsSelection = document.getElementById("tweets");
    
    for (var i = 0; i < tweetsOrdered.length; i++) {
        var tweet = tweetsOrdered[i];
        var option = document.createElement("option");
        option.text = tweet.text;
        option.value = tweet.text.replace("\"", "'");
        
        tweetsSelection.options.add(option);
    }
    tweetsSelection.selectedIndex = 0;
}

// shuffle using Durstenfeld Shuffle
function shuffleTweetsArray(tweetsArray) {
    for (var i = tweetsArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = tweetsArray[i];
        tweetsArray[i] = tweetsArray[j];
        tweetsArray[j] = temp;
    }
    return tweetsArray;
}

// splitting into lines
function splitIntoLines(str) {
    var strs = new Array();
    var space = str.indexOf(" ", 60);
    strs[0] = str.substring(0, space);
    strs[1] = str.substring(space + 1);
    if (strs[1].length > 60) {
        space = strs[1].indexOf(" ", 60);
        strs[2] = strs[1].substring(space + 1);
        strs[1] = strs[1].substring(0, space);
    }
    return strs;
}