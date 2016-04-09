// Set up mongoDB to be used via Mongoose
// in JavaScript.
var mongoose = require("mongoose");

// Set up Schema. A restaurant consists of
// a name, image, and description.
var restaurantSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

// Compile above schema into a model to be used.
module.exports = mongoose.model("Restaurant", restaurantSchema);