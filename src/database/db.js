const mongoose = require("mongoose");

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("MongoDB database connected successfully");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectToDB;