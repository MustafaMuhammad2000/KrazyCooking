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
  getTagOfTheMonth,
} = require("../readCommands/postReadFunctions");

const { validatePost } = require("../middleware/bodyVerify");

const { verifyToken } = require("../middleware/verifyJWT");
const router = express.Router();

/*
    Specifies all the express routes involved with Posts
*/

//Creating a new post
router.post("/", verifyToken, upload.single("image"), validatePost, createPost);

//Deleting an exisiting post
router.delete("/:pid", verifyToken, deletePost);

//Upvote an existing post
router.put("/:pid/upvote", verifyToken, upvotePost);
//Remove an upvote on an existing post
router.put("/:pid/remove-upvote", verifyToken, removeUpvote);

//Get all posts
router.get("/", getAllPosts);

//Get a specific post
router.get("/:pid/view", getPost);

//Get a random post
router.get("/random", getRandomPost);

//Search posts by keyword
router.get("/search", searchPosts);

//Gets tag of the month
router.get("/tagofmonth", getTagOfTheMonth);

module.exports = router;
