const express = require("express");
const upload = require("../middleware/multer.js");

const {
  createPost,
  deletePost,
  upvotePost,
  removeUpvote,
} = require("../writeCommands/postWriteFunctions");

const {
  getAllPosts,
  getPost,
  getRandomPost,
  searchPosts,
} = require("../readCommands/postReadFunctions");

const { validatePost } = require("../middleware/bodyVerify");

const { verifyToken } = require("../middleware/verifyJWT");
const router = express.Router();

/*
    Post Routes 
*/

router.post("/", verifyToken, upload.single("image"), validatePost, createPost);

router.delete("/:pid", verifyToken, deletePost);

router.put("/:pid/upvote", verifyToken, upvotePost);

router.put("/:pid/remove-upvote", verifyToken, removeUpvote);

router.get("/", getAllPosts);

router.get("/:pid/view", getPost);

router.get("/random", getRandomPost);

router.get("/search", searchPosts);

module.exports = router;
