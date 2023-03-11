const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const db = require("../Models/DB");

const getSavedPost = async (req, res) => {
  console.log(req.user.username);
  const userPosts = await db.Post.find({ author: req.user.id });

  res.status(200).json(userPosts);
};

const getMyPosts = async (req, res) => {
  console.log(req.user.username);
  const userPosts = await db.Post.find({ author: req.user.id })
    .populate("author")
    .populate("pet")
    .populate("comments");

  res.status(200).json(userPosts);
};
