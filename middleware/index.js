//////////////////////////// Middleware Modules ////////////////////////////

var middlewareObj = {};
var Restaurant = require("../models/restaurant");
var Comment = require("../models/comment");

middlewareObj.checkAuth = function(req, res, next) {
    // Check if user is logged in. Then check if
    // owner is the author of the post.
    if (req.isAuthenticated()) {
        Restaurant.findById(req.params.id, function(err, foundRestaurant) {
            if (err) {
                res.redirect("back");
                
            } else if (foundRestaurant.author.id.equals(req.user._id)) {
               next();
                
            } else{
                res.redirect("back");
            }   
        });
    
    } else {
        res.redirect("back");
    }
}

middlewareObj.commentAuth = function(req, res, next) {
    // Check if user is logged in. Then check if
    // owner is the author of the post.
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                res.redirect("back");
                
            } else if (foundComment.author.id.equals(req.user._id)) {
               next();
                
            } else{
                res.redirect("back");
            }   
        });
    
    } else {
        res.redirect("back");
    }
}


middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You must be logged in.");
    res.redirect("/login");
}

module.exports = middlewareObj;