// Set up the express framework and make
// it accessible via the "app" variable.
var express = require("express");
var app = express();

// Set up Passport for authentication.
var passport = require("passport");
var localStrategy = require("passport-local");
var User = require("./models/user");

var Restaurant = require("./models/restaurant");
var seedDB = require("./seeds");
var Comment = require("./models/comment");

// All ROUTES files
var commRoutes = require("./routes/comments");
var restRoutes = require("./routes/restaurants");
var authRoutes = require("./routes/index");

var flash = require("connect-flash");
app.use(flash());

//seedDB();

var methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Set up mongoDB to be used via Mongoose
// in JavaScript.
var mongoose = require("mongoose");

// Connect Mongoose.
// mongoose.connect("mongodb://localhost/foodies_united");
mongoose.connect("mongodb://Edgehead179:Wilsonb1345@ds023490.mlab.com:23490/foodiesunited");

// This Node.js body parsing middleware is
// used to utilize the URL-encoded parser
// and req.body.
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// Set up the view engine so we don't have
// to constantly type ".ejs" extensions.
app.set("view engine", "ejs");

// Look at the current directory and then find
// public.
app.use(express.static(__dirname + "/public"));

///////////////////////////// PASSPORT CONFIG ///////////////////////////// 

app.use(require("express-session")({
    secret: "Secret message",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// Allows currentUser to be a part of every route.
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


// Route declarations used to avoid retyping
// redundant route paths.
app.use("/", authRoutes);
app.use("/restaurants", restRoutes);
app.use("/restaurants/:id/comments", commRoutes);



/////////////////////////////// SERVER /////////////////////////////// 

// Set up the server port in Cloud9. When Cloud9 
// IDE runs servers, you set and retrieve the IP 
// address and port number with the process.env.
// IP and process.env.PORT variables.
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Foodies United Server Online");
});