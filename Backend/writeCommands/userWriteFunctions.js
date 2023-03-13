const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../Models/DB");
const { uploadImage, deleteImage } = require("../helpers/imageFunctions");
const dotenv = require("dotenv");
dotenv.config();

const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const { admin, username, password } = req.body;

    const userInDb = await db.User.findOne({ username: username });
    if (userInDb) {
      return res.status(409).json({ message: "Username already exists" });
    }

    bcrypt.hash(password, 8, async function (err, hash) {
      //   console.log(hash);
      //   console.log(err);
      const newUser = await db.User.create({
        admin,
        username,
        password: hash,
        profilePicture: process.env.DEFAULT_IMAGE_URL,
        dateCreated: new Date(),
      });
      newUser.save();
      if (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
      }
      res.status(201).json({ validReg: true });
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
};

const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    const user = await db.User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    console.log("passed authentication");
    const payload = { username: user.username, id: user._id };
    const secretKey = process.env.JWT_SECRET_KEY;
    const options = { expiresIn: "10h" };
    const token = jwt.sign(payload, secretKey, options);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const checkImage = async (req, res) => {
  try {
    res.json({ message: "YOU MADE IT HERE" });
    uploadImage(req.file);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file found" });
    }
    image_url = await uploadImage(req.file);
    const username = req.user.username;
    const user = await db.User.findOne({ username });
    if (
      user.profilePicture !== process.env.DEFAULT_IMAGE_URL &&
      user.profilePicture != null &&
      user.profilePicture !== ""
    ) {
      await deleteImage(user.profilePicture, username);
    }
    const updatedUser = await db.User.findOneAndUpdate(
      { username: username },
      { profilePicture: image_url },
      { new: true }
    );
    // console.log(updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const username = req.user.username;
    const { currentPassword, newPassword } = req.body;
    const user = await db.User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const passwordIsValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    bcrypt.hash(newPassword, 8, async function (err, hash) {
      // console.log(hash);
      // console.log(err);
      await db.User.findOneAndUpdate({ username }, { password: hash });
      if (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
      }
      res.status(200).json({ message: "Password updated successfully" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  registerUser,
  loginUser,
  checkImage,
  uploadProfilePic,
  updatePassword,
};
