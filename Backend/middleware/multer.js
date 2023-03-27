/*
  Middleware functions that ensure the files attached to a request fit the criteria's specified 
  e.g should ounly be an image file and be a certain size
*/

const multer = require("multer");

const storage = multer.memoryStorage();

// Define file filter to accept image files only
const fileFilter = function (req, file, cb) {
  if (!file || !file.fieldname) {
    return cb(new Error("File field is required!"), false);
  }
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Define upload limits
const limits = {
  fileSize: 20 * 1024 * 1024, // 20 MB limit
};

const upload = multer({
  fileFilter: fileFilter,
  storage: storage,
  limits: limits,
});
// Export Multer middleware
module.exports = upload;
