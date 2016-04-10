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
            Comment.create(req.body.comment, function(err, comment){
                if (err) {
                    console.log(err);
                } else {
                    restaurant.comments.push(comment);
                    restaurant.save();
                    res.redirect("/restaurants/" + restaurant._id);
                }
            });
        }
    });
    // Create new comment.
    // Connect the new comment to the relevant retaurant.
    // Redirect to the restaurants show route.
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


module.exports = router;