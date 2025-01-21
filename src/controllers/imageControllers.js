const Image = require("../models/image.model.js");
const uploadImage = require("../utils/uploadImage.js");

const uploadImageToGallery = async (req, res) => {
    try {
        const imageFilePath = req.file?.path;
        const uploadedBy = req.userInfo?.userId;

        if (!imageFilePath) {
            return res.status(400).json({
                success: false,
                message: "There is no image filepath found",
            });
        }

        const result = await uploadImage(imageFilePath);

        if (!result) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong when uploading image, Please try again"
            });
        }

        const newlyCreatedImage = await Image.create({
            url: result.url,
            publicId: result.public_id,
            uploadedBy,
        });

        if (!newlyCreatedImage) {
            return new res.status(500).json({
                success: false,
                message: "Something went wrong when creating database record",
            });
        }

        res.status(201).json({
            success: true,
            message: "Uploaded image successfully",
            data: newlyCreatedImage,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {
    uploadImageToGallery,
}