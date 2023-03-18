const multer = require("multer");

// Define storage location and file name
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

const storage = multer.memoryStorage();

// Define file filter to accept image files only
const fileFilter = function (req, file, cb) {
  console.log("WTF");
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
