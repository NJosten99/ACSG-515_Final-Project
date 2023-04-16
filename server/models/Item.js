const mongoose = require("mongoose");

//This is my schema for my item objects
const schema = mongoose.Schema({
    name: String,
    expiration: String,
    total: Number,
});

module.exports = mongoose.model("Item", schema);