const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  admin: { type: Boolean, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateCreated: { type: Date, required: true },
  profilePicture: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  savedPosts: { type: mongoose.Schema.Types.ObjectId, ref: "SavedPosts" },
});

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

const savedPostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Posts" }],
});

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
