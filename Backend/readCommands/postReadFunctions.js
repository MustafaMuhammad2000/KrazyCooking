const mongoose = require("mongoose");
const db = require("../Models/DB");
const ObjectId = mongoose.Types.ObjectId;

const getAllPosts = async (req, res) => {
  //console.log("Hello from posts");

  //get all posts, sorted by most recent
  const Posts = await db.Post.find({})
    .sort({ createdAt: -1 })
    .populate({
      path: "comments",
      populate: {
        path: "reviews",
      },
    })
    .populate("author");
  res.status(200).json(Posts);
};

const getPost = async (req, res) => {
  const postId = req.params.pid;
  try {
    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post id" });
    }
    const post = await db.Post.findById(postId)
      .populate("author")
      .populate({
        path: "comments",
        populate: {
          path: "reviews",
        },
      });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllPosts,
  getPost,
};
