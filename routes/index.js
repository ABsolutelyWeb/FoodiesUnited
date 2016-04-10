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
           console.log(err);
           return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
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
    res.redirect("/restaurants");
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;