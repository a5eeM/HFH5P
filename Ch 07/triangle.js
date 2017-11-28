window.onload = () => {
    var canvas = document.getElementById("triangle");
    var context = canvas.getContext("2d");
    createPath(canvas, context);
}

function createPath(canvas, context) {
    // begin the path
    context.beginPath()
    // move the pencil to a starting point
    context.moveTo(100, 150);
    // trace the path from current location to another point
    context.lineTo(250, 75);
    context.lineTo(125, 30);
    // trace the last line using closePath
    context.closePath();
    
    // line width
    context.lineWidth = 5;
    // stroke
    context.stroke();
    // fill style
    context.fillStyle = "red";
    // fill
    context.fill();
}