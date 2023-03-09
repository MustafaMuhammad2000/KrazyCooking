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
  profilePicture: { type: String },
  savedPosts: { type: mongoose.Schema.Types.ObjectId, ref: "SavedPost" },
});

const postsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: Boolean, required: true },
  postAuthor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  postPicture: { type: String },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
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
      post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
      date_created: { type: Date, required: true },
    },
  ],
});

const reviewSchema = new mongoose.Schema({
  body: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  reviewPicture: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const commentsSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    commentPicture: { type: String },
    upvotes: { type: Number, required: true },
    body: { type: String, required: true },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

const User = mongoose.model("Users", usersSchema);
const Post = mongoose.model("Posts", postsSchema);
const Comment = mongoose.model("Comments", commentsSchema);
const SavedPost = mongoose.model("SavedPost", savedPostSchema);

module.exports = {
  User,
  Post,
  Comment,
  SavedPost,
};
