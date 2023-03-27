/*
  Specifies mondodb user schema
*/
const mongoose = require("mongoose");

/*
  Schema for users of the application, either regular user or admin
  specified by the admin boolean
*/
const usersSchema = new mongoose.Schema({
  admin: { type: Boolean, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateCreated: { type: Date, required: true },
  profilePicture: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  savedPosts: { type: mongoose.Schema.Types.ObjectId, ref: "SavedPosts" },
});

/*
  Schema for a post of the application, represents a user's request to find
  a recipe for an odd food concotion
*/
const postsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  upvotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
  ],
  picture: { type: String },
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipes" }],
  tags: [{ type: String }],
});

postsSchema.index({ title: "text", tags: "text" });

/*
  Schema for saved posts for a users account
*/
const savedPostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Posts" }],
});

/*
  Schema for a recipe in reply to a post
*/
const recipeSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  picture: { type: String },
  body: { type: String, required: true },
  dateCreated: {
    type: Date,
    required: true,
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reviews" }],
});

/*
  Schema for review in reply to a recipe, indicates the quality of the review
*/
const reviewSchema = new mongoose.Schema({
  body: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  picture: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
});

const User = mongoose.model("User", usersSchema);
const Post = mongoose.model("Posts", postsSchema);
const Recipe = mongoose.model("Recipes", recipeSchema);
const Review = mongoose.model("Reviews", reviewSchema);
const SavedPost = mongoose.model("SavedPosts", savedPostSchema);

module.exports = {
  User,
  Post,
  Recipe,
  Review,
  SavedPost,
};
