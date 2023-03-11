const express = require("express");
const upload = require("../middleware/multer.js");

const {
  createComment,
  deleteComment,
} = require("../writeCommands/commentWriteFunctions");

const { verifyToken } = require("../middleware/verifyJWT");
const router = express.Router();

/*
    Comment Routes 
*/

router.post("/:pid", verifyToken, upload.single("image"), createComment);

router.delete("/:cid", verifyToken, deleteComment);

module.exports = router;
