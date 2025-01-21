const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Fullname is required to create an user"],
        lowercase: true,
    },
    username: {
        type: String,
        required: true,
        maxLength: [20, "Username couldn't be longer than 20 character"],
        minLength: [7, "Username couldn't be smaller than 5 charecter"],
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, "Email is required to create an user"],
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required to create an user"],
    },
    profileImage: {
        type: String,
        trim: true
    },
});

module.exports = mongoose.model("User", userSchema);