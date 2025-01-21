const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "src/temp");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

function fileFilter (req, file, cb) {
    if (!file.mimetype.startsWith("image")) {
        cb(new Error("File is not an image"), false);
    } else {
        cb(null, true);
    }
  
}

module.exports = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // Maximum 5mb file is allowed
    }
});