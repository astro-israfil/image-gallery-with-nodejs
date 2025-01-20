require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());


// start nodejs server 
(async function () {
    try {
        app.listen(PORT, () => {
            console.log("Server is running on port:", PORT);
        })
    } catch (error) {
        console.log(error.message);
    }
})();