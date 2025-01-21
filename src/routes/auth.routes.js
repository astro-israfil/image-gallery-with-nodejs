const express = require("express");
const { registerUser, loginUser } = require("../controllers/authControllers.js");
const fileMiddleware = require("../middlewares/fileMiddleware.js");

const router = express.Router();

router.post("/register", fileMiddleware.single("image"), registerUser);
router.post("/login", loginUser);

module.exports = router;