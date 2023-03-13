const express = require("express");
const upload = require("../middleware/multer.js");

const {
  registerUser,
  loginUser,
  checkImage,
  uploadProfilePic,
  updatePassword,
} = require("../writeCommands/userWriteFunctions");

const { verifyToken } = require("../middleware/verifyJWT");
const router = express.Router();

/*
    register and login routes
*/

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post(
  "/uploadProfilePic",
  verifyToken,
  upload.single("image"),
  uploadProfilePic
);

router.patch("/updatePassword", verifyToken, updatePassword);

router.post("/checkImage", upload.single("image"), checkImage);

// router.get("/myPosts", verifyJWT, getMyPosts);

// test route for getting user who is logged in
router.get("/getUser", verifyToken, (req, res) => {
  console.log(req.user);
  console.log("I have made it back here :)");
  res.send("Welcome");
});

module.exports = router;
