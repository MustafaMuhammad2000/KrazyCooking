const mongoose = require("mongoose");

const db = require("../Models/DB");
const { uploadImage, deleteImage } = require("../helpers/imageFunctions");
const ObjectId = mongoose.Types.ObjectId;

const createPost = async (req, res) => {
  try {
    console.log(req.body);
    const { title, body, tags } = req.body;
    const user = await db.User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    let image_url = "";
    if (req.file) {
      image_url = await uploadImage(req.file);
    }
    const newPost = await db.Post.create({
      title,
      body,
      tags,
      dateCreated: new Date(),
      author: req.user.id,
      picture: image_url,
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.pid;
    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post id" });
    }
    // Find the post and its associated comments
    const post = await db.Post.findById(postId).populate("comments").exec();
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (req.user.id != post.author) {
      return res.status(400).json({ message: "Not your post" });
    }

    // Delete the comments and their associated reviews
    const deleteCommentPromises = post.comments.map(async (comment) => {
      // Delete the reviews' images
      const deleteReviewPromises = comment.reviews.map(async (reviewId) => {
        const review = await db.Review.findById(reviewId);
        if (review && review.picture) {
          await deleteImage(review.picture);
        }
        return db.Review.deleteOne({ _id: reviewId });
      });

      // Delete the comment's image
      if (comment.picture) {
        await deleteImage(comment.picture);
      }

      const deleteCommentPromise = db.Comment.deleteOne({ _id: comment._id });
      const deleteReviewsPromise = Promise.all(deleteReviewPromises);

      return Promise.all([deleteCommentPromise, deleteReviewsPromise]);
    });

    // Delete the post's images
    if (post.picture) {
      await deleteImage(post.image);
    }

    const deleteCommentsPromise = Promise.all(deleteCommentPromises);
    const deletePostPromise = db.Post.findOneAndDelete({ _id: postId });

    await Promise.all([deleteCommentsPromise, deletePostPromise]);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createPost,
  deletePost,
};
