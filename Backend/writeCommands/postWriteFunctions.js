/*
  All functionality for write commands related to Posts
*/
const mongoose = require("mongoose");
const db = require("../Models/DB");
const { uploadImage, deleteImage } = require("../helpers/imageFunctions");
const ObjectId = mongoose.Types.ObjectId;

//Creating a post from request body
const createPost = async (req, res) => {
  try {
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
      upvotes: [],
      dateCreated: new Date(),
      author: req.user.id,
      picture: image_url,
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//deleting a post by id, have to be post owner or admin to delete
const deletePost = async (req, res) => {
  try {
    const postId = req.params.pid;
    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post id" });
    }
    // Find the post and its associated recipes
    const post = await db.Post.findById(postId).populate("recipes").exec();
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (req.user.id != post.author && !req.user.admin) {
      return res.status(400).json({ message: "Not your post" });
    }

    // Delete the recipes and their associated reviews
    const deleteRecipePromises = post.recipes.map(async (recipe) => {
      // Delete the reviews' images
      const deleteReviewPromises = recipe.reviews.map(async (reviewId) => {
        const review = await db.Review.findById(reviewId);
        if (review && review.picture) {
          await deleteImage(review.picture);
        }
        return db.Review.deleteOne({ _id: reviewId });
      });

      // Delete the recipe's image
      if (recipe.picture) {
        await deleteImage(recipe.picture);
      }

      const deleteRecipePromise = db.Recipe.deleteOne({ _id: recipe._id });
      const deleteReviewsPromise = Promise.all(deleteReviewPromises);

      return Promise.all([deleteRecipePromise, deleteReviewsPromise]);
    });

    // Delete the post's images
    if (post.picture) {
      await deleteImage(post.picture);
    }

    const deleteRecipesPromise = Promise.all(deleteRecipePromises);
    const deletePostPromise = db.Post.findOneAndDelete({ _id: postId });

    await Promise.all([deleteRecipesPromise, deletePostPromise]);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//Upovting a post, have to be a registered user and only one upvote per post
const upvotePost = async (req, res) => {
  try {
    const postId = req.params.pid;
    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post id" });
    }
    const post = await db.Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user.id;
    if (post.upvotes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already upvoted this post" });
    }

    post.upvotes.push(userId);
    await post.save();

    return res.status(200).json({ message: "Post upvoted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

//Remvoe upvote from post, have to be a user who already upvoted the post
const removeUpvote = async (req, res) => {
  try {
    const postId = req.params.pid;
    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post id" });
    }
    const post = await db.Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user.id;
    const index = post.upvotes.indexOf(userId);
    if (index === -1) {
      return res
        .status(400)
        .json({ message: "You have not upvoted this post" });
    }

    post.upvotes.splice(index, 1);
    await post.save();

    return res.status(200).json({ message: "Remove post upvote" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  deletePost,
  upvotePost,
  removeUpvote,
};
