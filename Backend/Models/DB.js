const mongoose = require("mongoose");

//Saved Posts (DONE)
//Use Cloudinary for images
//Profile picture
//Comment picture
//Post picture
//Ability to resolve/archive post (Have to discuss)
//Reply Schema (DONE)

const usersSchema = new mongoose.Schema({
  admin: { type: Boolean, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateCreated: { type: Date, required: true },
  profilePicture: { type: String, required: true },
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
  picture: { type: String },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
  tags: [{ type: String }],
});

const savedPostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  savedPosts: [
    {
      post: { type: mongoose.Schema.Types.ObjectId, ref: "Posts" },
      dateCreated: { type: Date, required: true },
    },
  ],
});

const commentsSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  picture: { type: String },
  upvotes: { type: Number, required: true },
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
const Comment = mongoose.model("Comments", commentsSchema);
const Review = mongoose.model("Reviews", reviewSchema);

const SavedPost = mongoose.model("SavedPost", savedPostSchema);

module.exports = {
  User,
  Post,
  Comment,
  Review,
  SavedPost,
};
