window.onload = () => {
    var canvas = document.getElementById("tshirtCanvas");
    // get context
    var context = canvas.getContext("2d");
    // draw using the context
    context.fillRect(10, 10, 100, 100);
}