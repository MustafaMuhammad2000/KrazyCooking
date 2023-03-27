const express = require("express");
const upload = require("../middleware/multer.js");

const {
  createRecipe,
  deleteRecipe,
} = require("../writeCommands/recipeWriteFunctions");

const { verifyToken } = require("../middleware/verifyJWT");
const router = express.Router();

const { validateRecipe } = require("../middleware/bodyVerify");

/*
    Specifies all the express routes involved with Recipes
*/

// creating a new recipe
router.post(
  "/:pid",
  verifyToken,
  upload.single("image"),
  validateRecipe,
  createRecipe
);

// deleting an existing recipe
router.delete("/:rcid", verifyToken, deleteRecipe);

module.exports = router;
