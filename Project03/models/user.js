const mongoose = require('mongoose');

// User DB Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
});

// Mongoose model
const user = mongoose.model("user", userSchema); 

module.exports = user;