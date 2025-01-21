const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const fileMiddleware = require("../middlewares/fileMiddleware.js");
const {uploadImageToGallery} = require("../controllers/imageControllers.js");

const router = express.Router();

router.post("/upload", 
    authMiddleware, 
    fileMiddleware.single("image"), 
    uploadImageToGallery
);

module.exports = router;