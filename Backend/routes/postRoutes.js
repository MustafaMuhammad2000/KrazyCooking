const express = require("express");
const upload = require("../middleware/multer.js");

const {
  createPost,
  deletePost,
} = require("../writeCommands/postWriteFunctions");

const { getAllPosts, getPost } = require("../readCommands/postReadFunctions");

const { verifyToken } = require("../middleware/verifyJWT");
const router = express.Router();

/*
    Post Routes 
*/

router.post("/", verifyToken, upload.single("image"), createPost);

router.delete("/:pid", verifyToken, deletePost);

router.get("/", getAllPosts);

router.get("/:pid", getPost);

module.exports = router;
