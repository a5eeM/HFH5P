window.onload = () => {
    drawSmileyFace()
};

function drawSmileyFace() {
    var canvas = document.getElementById("cookie");
    var context = canvas.getContext("2d");
    
    context.beginPath();
    context.arc(300, 300, 200, 0, degreesToRadians(360), true);
    context.fillStyle = "#ffffcc";
    context.fill();
    context.stroke();
    
    // eye left
    context.beginPath();
    context.arc(200, 250, 25, 0, degreesToRadians(360), true);
    context.stroke();
    
    // eye right
    context.beginPath();
    context.arc(400, 250, 25, 0, degreesToRadians(360), true);
    context.stroke();
    
    // nose
    context.beginPath();
    context.moveTo(300, 300);
    context.lineTo(300, 350);
    context.stroke();
    
    // mouth
    context.beginPath();
    context.arc(300, 350, 75, degreesToRadians(20), degreesToRadians(160), false);
    context.stroke();
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}