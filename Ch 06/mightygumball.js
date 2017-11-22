window.onload = init;

function init() {
    getSales();
}

// for IE8/Opera 10 and browsers which use XHR version 1
function getSales_XHRv1() {
     // create URL
    var url = "http://127.0.0.1:55214/sales.json"
    //var url = "http://gumball.wickedlysmart.com/";
    // careate a new XHR object
    var request = new XMLHttpRequest();
    // set the request
    request.open("GET", url);
    // set the handler, when the data arrives from a service it will be called
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            updateSales(request.responseText);
        }
    }
    // send the request
    request.send(null);
}

function getSales() {
    // create URL
    var url = "http://127.0.0.1:55214/sales.json"
    //var url = "http://gumball.wickedlysmart.com/";
    // create XHR object
    var request = new XMLHttpRequest();
    // set the request
    request.open("GET", url);
    // set the handler, when the data arrives from a service it will be called
    request.onload = () => {
        if (request.status == 200) {
            updateSales(request.responseText);
        }
    };
    // send the request
    request.send(null);
}

function updateSales(responseText) {
    var salesDiv = document.getElementById("sales");
    //salesDiv.innerHTML = responseText;
    var sales = JSON.parse(responseText);
    console.log(sales);
    for (var i = 0; i < sales.length; i++) {
        var sale = sales[i];
        var div = document.createElement("div");
        div.setAttribute("class", "saleItem");
        div.innerHTML = sale.name + " sold " + sale.sales + " gumballs";
        salesDiv.appendChild(div);
    }
}