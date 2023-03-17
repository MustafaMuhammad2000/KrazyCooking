const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const db = require("../Models/DB");

const getMyPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const posts = await db.Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate("author", "username profilePicture")
      .lean();
    posts.forEach(function (post) {
      post.upvotes = post.upvotes.length;
    });
    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getSavedPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const savedPosts = await db.SavedPost.findOne({ userId })
      .populate({
        path: "savedPosts",
        populate: {
          path: "author",
          select: "username profilePicture",
        },
      })
      .sort({ createdAt: -1 })
      .lean();
    if (!savedPosts) {
      return res
        .status(404)
        .json({ message: "Saved posts not found for user" });
    }
    res.status(200).json({ savedPosts: savedPosts.savedPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMyPosts,
  getSavedPosts,
};
