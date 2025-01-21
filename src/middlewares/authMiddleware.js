const jwt = require("jsonwebtoken"); 
const User = require("../models/user.model.js");

const authMiddleware = async (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token is provided",
        });
    }
    const accessToken = token.split(" ")[1];

    try {
        const userInfo = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET);
        if (!userInfo) {
            return res.status(401).json({
                success: false,
                message: "Your token may expaired, please login",
            });
        }

        const loggedInUser = await User.findById(userInfo?.userId);
        
        if (!loggedInUser) {
            return res.status(404).json({
                message: "No user is found",
            });
        }

        req.userInfo = userInfo;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Your token may invalid or spam"
        });
    }
}

module.exports = authMiddleware;