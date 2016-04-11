/////////////////////////////// COMMENTS ROUTES /////////////////////////////// 


var express = require("express");
var router = express.Router({mergeParams: true}); // Merges params from restaurants and comments so we can access the comments id.
var Restaurant = require("../models/restaurant");
var Comment = require("../models/comment");
var middleware = require("../middleware/");


// NEW route for comments
router.get("/new", middleware.isLoggedIn, function(req, res) {
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
router.post("/", middleware.isLoggedIn, function(req, res) {
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


// EDIT ROUTE for comments which takes us to a form.
router.get("/:comment_id/edit", middleware.commentAuth, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {restaurant_id: req.params.id, comment: foundComment});
        }
    });
});


// UPDATE ROUTE for comments which takes our form input
// and updates the comment text.
router.put("/:comment_id", middleware.commentAuth, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/restaurants/" + req.params.id);
        }
    });
});


// DESTROY route for comments.
router.delete("/:comment_id", middleware.commentAuth, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/restaurants/" + req.params.id);
        }
    });
});


module.exports = router;