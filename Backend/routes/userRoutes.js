const express = require("express");
const upload = require("../middleware/multer.js");
const { verifyToken } = require("../middleware/verifyJWT");

const {
  registerUser,
  loginUser,
  checkImage,
  uploadProfilePic,
  updatePassword,
  savePost,
  removeSavedPost,
} = require("../writeCommands/userWriteFunctions");

const {
  getMyPosts,
  getSavedPosts,
  getUserProfile,
} = require("../readCommands/userReadFunctions");
const router = express.Router();

const {
  validateRegister,
  validateLogin,
  validateUpdatePass,
} = require("../middleware/bodyVerify");

/*
    Specifies all the express routes involved with a user
*/

//Register a new user
router.post("/register", validateRegister, registerUser);

//Login into an exisitng user's account
router.post("/login", validateLogin, loginUser);

//Upload a profile pic to a user's account
router.post(
  "/uploadProfilePic",
  verifyToken,
  upload.single("image"),
  uploadProfilePic
);

//Updates password to a user's account
router.patch(
  "/updatePassword",
  verifyToken,
  validateUpdatePass,
  updatePassword
);

//Saves a post for a user
router.post("/savePost/:pid", verifyToken, savePost);
//Removes a saved post for a user
router.delete("/removeSavedPost/:pid", verifyToken, removeSavedPost);
//Gets all saved posts for user
router.get("/savedPosts", verifyToken, getSavedPosts);
//Gets all posts written by a user
router.get("/myPosts", verifyToken, getMyPosts);
//Gets info regarding the user
router.get("/profile", verifyToken, getUserProfile);

// test route for getting user who is logged in
router.get("/getUser", verifyToken, (req, res) => {
  res.send("Welcome");
});

module.exports = router;
