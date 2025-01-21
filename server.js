require("dotenv").config();
const express = require("express");
const connectToDB = require("./src/database/db");

const authRoutes = require("./src/routes/auth.routes.js");
const imageRoutes = require("./src/routes/image.routes.js");

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app endpoints
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/images", imageRoutes);

// start nodejs server 
(async function () {
    try {
        await connectToDB();
        app.listen(PORT, () => {
            console.log("Server is running on port:", PORT);
        })
    } catch (error) {
        console.log(error);
    }
})();