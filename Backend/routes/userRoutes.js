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
} = require("../readCommands/userReadFunctions");
const router = express.Router();

const {
  validateRegister,
  validateLogin,
  validateUpdatePass,
} = require("../middleware/bodyVerify");

/*
    register and login routes
*/

router.post("/register", validateRegister, registerUser);

router.post("/login", validateLogin, loginUser);

router.post(
  "/uploadProfilePic",
  verifyToken,
  upload.single("image"),
  uploadProfilePic
);

router.patch(
  "/updatePassword",
  verifyToken,
  validateUpdatePass,
  updatePassword
);

router.post("/savePost/:pid", verifyToken, savePost);

router.delete("/removedSavedPost/:pid", verifyToken, removeSavedPost);

router.post("/checkImage", upload.single("image"), checkImage);

router.get("/savedPosts", verifyToken, getSavedPosts);

router.get("/myPosts", verifyToken, getMyPosts);

// test route for getting user who is logged in
router.get("/getUser", verifyToken, (req, res) => {
  console.log(req.user);
  console.log("I have made it back here :)");
  res.send("Welcome");
});

module.exports = router;
