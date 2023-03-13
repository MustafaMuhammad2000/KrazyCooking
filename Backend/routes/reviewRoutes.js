const express = require("express");
const upload = require("../middleware/multer.js");

const {
  createReview,
  deleteReview,
} = require("../writeCommands/reviewWriteFunctions");

const { verifyToken } = require("../middleware/verifyJWT");
const router = express.Router();

/*
    Review Routes 
*/

router.post("/:cid", verifyToken, upload.single("image"), createReview);

router.delete("/:rid", verifyToken, deleteReview);

module.exports = router;
