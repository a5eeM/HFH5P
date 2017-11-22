var lastReportTime = 0;

window.onload = function() {
    setInterval(handleRefresh, 3000);
}

// refresh handler
function handleRefresh() {
    //var url = "http://gumball.wickedlysmart.com?callback=updateSales";
    var url = "http://gumball.wickedlysmart.com" +
        "?callback=updateSales" +
        "&lastreporttime=" + lastReportTime +
        "&random=" + (new Date()).getTime();
            
    // create new script element
    var newScriptElement = document.createElement("script");
    newScriptElement.setAttribute("src", url);
    newScriptElement.setAttribute("id", "jsonp");
    
    // replace the oldScriptElement
    var oldScriptElement = document.getElementById("jsonp");
    var head = document.getElementsByTagName("head")[0];
    if (oldScriptElement == null) {
        head.appendChild(newScriptElement);
    } else {
        head.replaceChild(newScriptElement, oldScriptElement);
    }
}

// modified updateSales to be used with JSONP, will get a JSON object not string
function updateSales(sales) {
    var salesDiv = document.getElementById("sales");
    for (var i = 0; i < sales.length; i++) {
        var sale = sales[i];
        var div = document.createElement("div");
        div.setAttribute("class", "saleItem");
        div.innerHTML = sale.name + " sold " + sale.sales + " gumballs";
        salesDiv.appendChild(div);
    }
    if (sales.length > 0) {
        lastReportTime = sales[sales.length - 1].time;
    }
}