var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


// ROOT ROUTE
// Set up the homepage. The root path "/"
// will be rendered as the landing.ejs
// located in the views directory.
router.get("/", function(req, res){
    res.render("landing");
});

/////////////////////////////// AUTH ROUTES /////////////////////////////// 


// Show register form
router.get("/register", function(req, res) {
    res.render("register");
});


// Handle Sign-Up
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
           req.flash("error", err.message);
           return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome, " + user.username);
           res.redirect("/restaurants");
        });
    });
});


// Login Form
router.get("/login", function(req, res) {
    res.render("login");
});


// Login Logic
router.post("/login", passport.authenticate("local", 
{
    successRedirect: "/restaurants", 
    failureRedirect: "/login"
    
}), function(req, res) {
    
});


// Route for logging out.
// Logout Logic
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You are logged out.");
    res.redirect("/restaurants");
});


module.exports = router;