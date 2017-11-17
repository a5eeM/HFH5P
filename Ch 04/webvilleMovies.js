var movie1 = {
    title: "Plan 9 from Outer Space",
    genre: "Cult Classis",
    rating: 2,
    showtimes: ["3:00pm", "7:00pm", "11:00pm"]
};

var movie2 = {
    title: "Forbidden Planet",
    genre: "Classic Sci-fi",
    rating: 5,
    showtimes: ["5:00pm", "9:00pm"]
};

var banzaiMovie = {
    title: "Buckaroo Banzai",
    genre: "Cult Classic",
    rating: 5,
    showtimes: ["1:00pm", "5:00pm", "7:00pm"]
};

// show when is the next show based on your current time
function getNextShowing(movie) {
    var now = new Date().getTime();
    
    for (var i = 0; i < movie.showtimes.length; i++) {
        var showtime = getTimeFromString(movie.showtimes[i]);
        if ((showtime - now) > 0) {
            return "Next showing of " + movie.title + " is " + movie.showtimes[i];
        }
    }
    return null;
}

// takes a string argument and converts it to miliseconds
function getTimeFromString(timeString) {
    var theTime = new Date();
    var time = timeString.match(/(\d+)(?::(\d\d))?\s*(p?)/);
    theTime.setHours(parseInt(time[1]) + (time[3] ? 12 : 0));
    theTime.setMinutes(parseInt(time[2]) || 0);
    return theTime.getTime();
}

var nextShowing = getNextShowing(movie1);
alert(nextShowing);
nextShowing = getNextShowing(movie2);
alert(nextShowing);
nextShowing = getNextShowing(banzaiMovie);
alert(nextShowing);