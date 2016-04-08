// Set up the express framework and make
// it accessible via the "app" variable.
var express = require("express");
var app = express();


// Set up the view engine so we don't have
// to constantly type ".ejs" extensions.
app.set("view engine", "ejs");


// Set up the homepage. The root path "/"
// will be rendered as the landing.ejs
// located in the views directory.
app.get("/", function(req, res){
    res.render("landing");
});


app.get("/restaurants", function(req, res) {
    var restaurants = [
        {name: "House of Grind", image: "https://images.unsplash.com/uploads/1412198485051133af17f/5049dacb?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=4f3f429080e45ad42b5c6885ffc9343e"},
        {name: "Organic Garden", image: "https://images.unsplash.com/photo-1446034730750-a0b64d06ad13?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=cfec14f7b7a5269458ce76d08cb7696d"},
        {name: "B&F", image: "https://images.unsplash.com/photo-1458677677220-000ddaa037e3?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=bd14952b6d2cc15b7321bcd4d04ed87e"}
        ]
    res.render("restaurants", {restaurants:restaurants});
});

// Set up the server port in Cloud9. When Cloud9 
// IDE runs servers, you set and retrieve the IP 
// address and port number with the process.env.
// IP and process.env.PORT variables.
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Foodies United Server Online");
});