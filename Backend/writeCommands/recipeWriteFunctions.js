const mongoose = require("mongoose");

const db = require("../Models/DB");
const { uploadImage, deleteImage } = require("../helpers/imageFunctions");
const ObjectId = mongoose.Types.ObjectId;

const createRecipe = async (req, res) => {
  try {
    const { body } = req.body;
    const postId = req.params.pid;
    const userId = req.user.id;
    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post id" });
    }
    console.log(postId);
    const post = await db.Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    let image_url = "";
    if (req.file) {
      image_url = await uploadImage(req.file);
    }

    const recipe = new db.Recipe({
      body,
      author: userId,
      upvotes: 0,
      dateCreated: new Date(),
      picture: image_url,
    });

    await recipe.save();

    post.recipes.push(recipe._id);
    await post.save();

    return res.status(201).json({ recipe });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.rcid;
    if (!ObjectId.isValid(recipeId)) {
      return res.status(400).json({ message: "Invalid recipe id" });
    }
    const recipe = await db.Recipe.findById(recipeId).populate("reviews");
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    if (req.user.id != recipe.author) {
      return res.status(400).json({ message: "Not your recipe" });
    }

    // Delete reviews' images and remove reviews from the recipe
    const deleteReviewPromises = recipe.reviews.map(async (review) => {
      if (review.picture) {
        await deleteImage(review.picture);
      }
      return db.Review.deleteOne({ _id: review._id });
    });
    await Promise.all(deleteReviewPromises);
    recipe.reviews = [];

    // Delete recipe's image
    if (recipe.picture) {
      await deleteImage(recipe.picture);
    }

    // Remove recipe from post's recipes array
    const post = await db.Post.findOneAndUpdate(
      { recipes: recipeId },
      { $pull: { recipes: recipeId } },
      { new: true }
    );

    if (!post) {
      console.log("WTF no parent post?");
    }
    // Delete recipe
    await db.Recipe.deleteOne({ _id: recipeId });

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  createRecipe,
  deleteRecipe,
};
