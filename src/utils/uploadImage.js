const cloudinary = require("../config/cloudinary.js");
const fs = require("fs");
const uploadImage = async (filePath) => {
    if (!filePath) {
        throw new Error("There no image to upload");
    }
    try {
        const result = await cloudinary.uploader.upload(filePath);

        if (result) {
            fs.unlinkSync(filePath);
            return result;
        } else {
            return null;
        }
    } catch (error) {
        fs.unlinkSync(filePath);
        console.log(error.message);
        return null;
    }
} 

module.exports = uploadImage;