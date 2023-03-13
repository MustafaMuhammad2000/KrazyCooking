const mongoose = require("mongoose");

const db = require("../Models/DB");
const { uploadImage, deleteImage } = require("../helpers/imageFunctions");
const ObjectId = mongoose.Types.ObjectId;

const createReview = async (req, res) => {
  try {
    const commentId = req.params.cid;
    const userId = req.user.id;
    const { body, rating } = req.body;
    if (!ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: "Invalid comment id" });
    }
    if (rating < 0 || rating > 5) {
      return res.status(400).json({ message: "Impossible rating" });
    }
    const comment = await db.Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
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

    comment.reviews.push(review);
    await comment.save();

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
    if (req.user.id != review.author) {
      return res.status(400).json({ message: "Not your review" });
    }
    if (review.picture) {
      await deleteImage(review.picture);
    }

    // Remove review from parent comment's reviews array
    const comment = await db.Comment.findOneAndUpdate(
      { reviews: reviewId },
      { $pull: { reviews: reviewId } },
      { new: true }
    );

    if (!comment) {
      console.log("WTF no parent comment?");
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
