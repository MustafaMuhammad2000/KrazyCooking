const express = require("express");
const upload = require("../middleware/multer.js");

const {
  createReview,
  deleteReview,
} = require("../writeCommands/reviewWriteFunctions");

const { verifyToken } = require("../middleware/verifyJWT");
const router = express.Router();

const { validateReview } = require("../middleware/bodyVerify");

/*
    Review Routes 
*/

router.post(
  "/:rcid",
  verifyToken,
  upload.single("image"),
  validateReview,
  createReview
);

router.delete("/:rid", verifyToken, deleteReview);

module.exports = router;
