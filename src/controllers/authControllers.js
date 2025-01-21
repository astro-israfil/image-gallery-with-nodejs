const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const uploadImage = require("../utils/uploadImage.js");

const registerUser = async (req, res) => {
    try {
        const {username, fullname, email, password} = req.body;
        const profileImagePath = req.file?.path;
        let profileImageUrl;
        if ([username, fullname, email, password].some((field) => !field)) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }
        const existedUser = await User.findOne({
            $or: [
                {username},
                {email}
            ]
        });

        if (existedUser) {
            return res.status(409).json({
                success: false,
                message: "User with the email or username is already exist."
            });
        }

        if (profileImagePath) {
            // upload files
            const result = await uploadImage(profileImagePath);
            profileImageUrl = result?.url;
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const newlyCreatedUser = await User.create({
            username, 
            fullname, 
            email, 
            password: encryptedPassword, 
            profileImage: profileImageUrl
        });

        if (!newlyCreatedUser) {
            return res.status(500).json({
                success: false,
                message: "There is somthing went wrong when creating user"
            });
        }

        res.status(201).json({
            success: true,
            message: "User is created successfully",
            data: {
                userId: newlyCreatedUser._id,
                username: newlyCreatedUser.username,
            },
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`,
        });
    }
}

const loginUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        if (!username && !email) {
            return res.status(400).json({
                success: false,
                message: "Username or email is required",
            });
        }

        const existedUser = await User.findOne({
            $or: [
                {email},
                {username}
            ]
        });

        if (!existedUser) {
            return res.status(404).json({
                success: false,
                message: "User with the email or username is not exist"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, existedUser.password);
        
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid user credentials",
            });
        }

        const accessToken = jwt.sign({
            userId: existedUser._id,
            username: existedUser.username,
        }, process.env.JWT_ACCESS_TOKEN_SECRET, {expiresIn: "1h"});

        res.status(200).json({
            success: true, 
            message: "User logged in successfully",
            accessToken,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`,
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
};