// This file is for manually creating a few sample posts and comments
// which occur each time we start the server. This gives us sample 
// data to work with.

// Set up mongoDB to be used via Mongoose
// in JavaScript.
var mongoose = require("mongoose");
var Restaurant = require("./models/restaurant");
var Comment = require("./models/comment");

var data = [
    {name: "Organic Garden", 
     image: "https://images.unsplash.com/photo-1446034730750-a0b64d06ad13?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=cfec14f7b7a5269458ce76d08cb7696d", 
     description: "Come on over and enjoy fresh sandwiches!"},
     
    {name: "House of Grind", 
     image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=d1a1a681f3e9c92256678e3d2abbc7b0", 
     description: "Start your morning right at Grind."},
     
    {name: "Wine Time", 
     image: "https://images.unsplash.com/photo-1417353783325-14cb8f9ba1dd?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=42734fb16139f1c8ba236412be723f9c", 
     description: "The best wine in town."}
    
];

function seedDB(){
    // Remove all restaurants
    Restaurant.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("REMOVED RESTAURANTS");
        // Add some restaurants
        data.forEach(function(seed){
            Restaurant.create(seed, function(err, restaurant){
                if (err) {
                    console.log(err);
                } else {
                    console.log("RESTAURANT ADDED!");
                    // Create a comment for each restaurant
                    Comment.create(
                        {
                            text: "This place is great.",
                            author: "Homer"
                        }, function(err, comment){
                            if (err) {
                                console.log(err);
                            } else {
                                restaurant.comments.push(comment);
                                restaurant.save();
                                console.log("CREATED NEW COMMENT");
                            }    
                        });
                }
            });
        });
    });
}

module.exports = seedDB;