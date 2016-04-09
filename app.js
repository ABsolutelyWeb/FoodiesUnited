// Set up the express framework and make
// it accessible via the "app" variable.
var express = require("express");
var app = express();

// Set up mongoDB to be used via Mongoose
// in JavaScript.
var mongoose = require("mongoose");

// Connect Mongoose.
mongoose.connect("mongodb://localhost/foodies_united");

// This Node.js body parsing middleware is
// used to utilize the URL-encoded parser
// and req.body.
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// Set up the view engine so we don't have
// to constantly type ".ejs" extensions.
app.set("view engine", "ejs");

// Set up Schema. A restaurant consists of
// a name, image, and description.
var restaurantSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

// Compile above schema into a model to be used.
var Restaurant = mongoose.model("Restaurant", restaurantSchema);



// Set up the homepage. The root path "/"
// will be rendered as the landing.ejs
// located in the views directory.
app.get("/", function(req, res){
    res.render("landing");
});



// INDEX route - Show all restaurants.
// Render the restaurants.ejs file when 
// a user visits site/restaurants.
// The second argument in res.render is to 
// pass the object of all the data we want
// to pass through. In this case, we want to
// pass through the "restaurants" var (right)
// through the name "restaurants" (left).
app.get("/restaurants", function(req, res) {
    // Get every restaurant from database, then
    // render the file. Empty object signifies
    // that we're looking for everything.
    Restaurant.find({}, function(err, allRestaurants){
        if (err) {
            console.log("An ERROR OCCURRED:");
            console.log(err);
        } else {
            // Render the restaurants.ejs file,
            // grab data from passed in restaurants
            // argument.
            res.render("index", {restaurants: allRestaurants});
        }
    });
});



// CREATE route - add new restaurant to DB
// Post route for new.ejs to push form data into
// restaurants objects array.
app.post("/restaurants", function(req, res) {
    // Get data from form body and add to restaurants 
    // database.
    var name = req.body.name;    // Request name data from form body.
    var image = req.body.image;  // Request image data from form body.
    var description = req.body.description;  // Request description data from form body.
    
    // Define a newRestaurant object array of
    // what a restaurant consists of.
    var newRestaurant = {name: name, image: image, description: description};
    // Create new restaurant and save to database.
    Restaurant.create(newRestaurant, function(err, newlyAdded){
        if (err) {
            console.log(err);
        } else {
            // Once form is submitted and processed, redirect
            // back to the restaurants page.
            res.redirect("/restaurants");
        }
    });
});



// NEW route - show form to create new restaurant
// Form URL for adding restaurants.
app.get("/restaurants/new", function(req, res) {
    res.render("new");
});



// SHOW route - show individual restaurants. Place
// AFTER /new *IMPORTANT
app.get("/restaurants/:id", function(req, res) {
    // Find restaurant with the ID
    Restaurant.findById(req.params.id, function(err, foundRestaurant) {
        if (err) {
            console.log(err);
        } else {
            // Render SHOW template with that restaurant.
            res.render("show", {restaurant: foundRestaurant});
        }
    }); 
});



// Set up the server port in Cloud9. When Cloud9 
// IDE runs servers, you set and retrieve the IP 
// address and port number with the process.env.
// IP and process.env.PORT variables.
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Foodies United Server Online");
});