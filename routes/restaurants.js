///////////////////////////// RESTful ROUTES ///////////////////////////// 
// This file contains all 7 RESTful routes: 
// (1. Index, 2. Create, 3. Show, 4. Update, 5. New, 6. Destroy, 7. Edit)

var express = require("express");
var router = express.Router();
var Restaurant = require("../models/restaurant");


// INDEX route - Show all restaurants.
// Render the restaurants.ejs file when 
// a user visits site/restaurants.
// The second argument in res.render is to 
// pass the object of all the data we want
// to pass through. In this case, we want to
// pass through the "restaurants" var (right)
// through the name "restaurants" (left).
router.get("/", function(req, res) {
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
            res.render("restaurants/index", {restaurants: allRestaurants});
        }
    });
});



// CREATE route - add new restaurant to DB
// Post route for new.ejs to push form data into
// restaurants objects array.
router.post("/", function(req, res) {
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
router.get("/new", function(req, res) {
    res.render("restaurants/new");
});



// SHOW route - show individual restaurants. Place
// AFTER /new *IMPORTANT
router.get("/:id", function(req, res) {
    // Find restaurant with the ID
    Restaurant.findById(req.params.id).populate("comments").exec(function(err, foundRestaurant) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundRestaurant);
            // Render SHOW template with that restaurant.
            res.render("restaurants/show", {restaurant: foundRestaurant});
        }
    }); 
});

module.exports = router;