const mongoose = require("mongoose");

const db = require("../Models/DB");
const { uploadImage, deleteImage } = require("../helpers/imageFunctions");
const ObjectId = mongoose.Types.ObjectId;

const createReview = async (req, res) => {
  try {
    const recipeId = req.params.rcid;
    const userId = req.user.id;
    const { body, rating } = req.body;
    if (!ObjectId.isValid(recipeId)) {
      return res.status(400).json({ message: "Invalid recipe id" });
    }
    if (rating < 0 || rating > 5) {
      return res.status(400).json({ message: "Impossible rating" });
    }
    const recipe = await db.Recipe.findById(recipeId).populate({
      path: "reviews",
      select: "author",
    });
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    const existingReview = recipe.reviews.find(
      (review) => review.author.toString() === userId
    );
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "User has already written a review for this recipe" });
    }
    image_url = await uploadImage(req.file);

    const review = new db.Review({
      body,
      rating,
      author: userId,
      picture: image_url,
      dateCreated: new Date(),
    });
    await review.save();

    recipe.reviews.push(review);
    await recipe.save();

    return res.status(201).json(review);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.rid;
    if (!ObjectId.isValid(reviewId)) {
      return res.status(400).json({ message: "Invalid review id" });
    }
    // Delete review image
    const review = await db.Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    if (req.user.id != review.author && !req.user.admin) {
      return res.status(400).json({ message: "Not your review" });
    }
    if (review.picture) {
      await deleteImage(review.picture);
    }

    // Remove review from parent recipe's reviews array
    const recipe = await db.Recipe.findOneAndUpdate(
      { reviews: reviewId },
      { $pull: { reviews: reviewId } },
      { new: true }
    );

    if (!recipe) {
      console.log("WTF no parent recipe?");
    }
    // Delete review
    await db.Review.deleteOne({ _id: reviewId });
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  createReview,
  deleteReview,
};
