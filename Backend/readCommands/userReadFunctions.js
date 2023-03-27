/*
  All functionality for read commands related to users
*/
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const db = require("../Models/DB");

//Get information regarding currently logged in user
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await db.User.findById(userId);
    const profileInfo = {
      username: user.username,
      dateCreated: user.dateCreated,
      profilePicture: user.profilePicture,
      dateOfBirth: user.dateOfBirth,
    };
    res.status(200).json(profileInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//Get all posts written by currently logged in user
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

//Gets all saved posts for currently logged in user
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
  getUserProfile,
};
