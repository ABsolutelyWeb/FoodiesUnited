/////////////////////////////// COMMENTS ROUTES /////////////////////////////// 


var express = require("express");
var router = express.Router({mergeParams: true}); // Merges params from restaurants and comments so we can access the comments id.
var Restaurant = require("../models/restaurant");
var Comment = require("../models/comment");


// NEW route for comments
router.get("/new", isLoggedIn, function(req, res) {
    // Find restaurant by id and then also render the comments form.
    Restaurant.findById(req.params.id, function(err, restaurant){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {restaurant: restaurant});
        }
    });
});



// CREATE route for comments
router.post("/", isLoggedIn, function(req, res) {
    // Find restaurant by id.
    Restaurant.findById(req.params.id, function(err, restaurant){
        if (err) {
            console.log(err);
            res.redirect("/restaurants");
        } else {
            // Create new comment.
            Comment.create(req.body.comment, function(err, comment){
                if (err) {
                    console.log(err);
                } else {
                    // Add username and id to comment.
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // Save comment.
                    comment.save();
                    // Connect the new comment to the relevant retaurant.
                    restaurant.comments.push(comment);
                    // Save the restaurant's data.
                    restaurant.save();
                    // Redirect to the restaurants show route.
                    res.redirect("/restaurants/" + restaurant._id);
                }
            });
        }
    });
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


module.exports = router;