const express = require("express");
const upload = require("../middleware/multer.js");

const {
  createRecipe,
  deleteRecipe,
} = require("../writeCommands/recipeWriteFunctions");

const { verifyToken } = require("../middleware/verifyJWT");
const router = express.Router();

/*
    Recipe Routes 
*/

router.post("/:pid", verifyToken, upload.single("image"), createRecipe);

router.delete("/:rcid", verifyToken, deleteRecipe);

module.exports = router;
