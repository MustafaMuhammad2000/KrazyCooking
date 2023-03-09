const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../Models/DB");
const { uploadImage } = require("../helpers/imageFunctions");
const { response } = require("express");
const { Promise } = require("mongodb");
const { json } = require("body-parser");

const createPost = async (req, res) => {
  try {
    console.log(req.body);
    const { title, body, resolved, tags } = req.body;
    const user = await db.User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    let image_url = "";
    if (req.file) {
      image_url = await uploadImage(req.file);
    }
    const newPost = await Posts.Post.create({
      title,
      body,
      post_author: req.user.username,
      dateLost: moment(dateLost).format(),
      location,
      photos,
    });
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
