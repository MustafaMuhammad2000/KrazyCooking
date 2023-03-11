const mongoose = require("mongoose");

const db = require("../Models/DB");
const { uploadImage, deleteImage } = require("../helpers/imageFunctions");
const ObjectId = mongoose.Types.ObjectId;

const createComment = async (req, res) => {
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

    const comment = new db.Comment({
      body,
      author: userId,
      upvotes: 0,
      dateCreated: new Date(),
      picture: image_url,
    });

    await comment.save();

    post.comments.push(comment._id);
    await post.save();

    return res.status(201).json({ comment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.cid;
    if (!ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: "Invalid comment id" });
    }
    const comment = await db.Comment.findById(commentId).populate("reviews");
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (req.user.id != comment.author) {
      return res.status(400).json({ message: "Not your comment" });
    }

    // Delete reviews' images and remove reviews from the comment
    const deleteReviewPromises = comment.reviews.map(async (review) => {
      if (review.picture) {
        await deleteImage(review.picture);
      }
      return db.Review.deleteOne({ _id: review._id });
    });
    await Promise.all(deleteReviewPromises);
    comment.reviews = [];

    // Delete comment's image
    if (comment.picture) {
      await deleteImage(comment.picture);
    }

    // Remove comment from post's comments array
    const post = await db.Post.findOneAndUpdate(
      { comments: commentId },
      { $pull: { comments: commentId } },
      { new: true }
    );

    if (!post) {
      console.log("WTF no parent post?");
    }
    // Delete comment
    await db.Comment.deleteOne({ _id: commentId });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  createComment,
  deleteComment,
};
