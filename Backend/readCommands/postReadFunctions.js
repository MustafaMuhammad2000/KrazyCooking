/*
  All functionality for read commands related to Posts
*/
const mongoose = require("mongoose");
const db = require("../Models/DB");
const ObjectId = mongoose.Types.ObjectId;

//Gets all post in the DB
const getAllPosts = async (req, res) => {
  //get all posts, sorted by most recent
  const Posts = await db.Post.find({})
    .sort({ createdAt: -1 })
    .populate("author", "username profilePicture")
    .lean();
  Posts.forEach(function (post) {
    post.upvotes = post.upvotes.length;
  });
  res.status(200).json(Posts);
};

//Gets specific post in the DB
const getPost = async (req, res) => {
  const postId = req.params.pid;
  try {
    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post id" });
    }
    const post = await db.Post.findById(postId)
      .populate("author", "username profilePicture")
      .populate({
        path: "recipes",
        populate: [
          {
            path: "author",
            select: "username profilePicture",
          },
          {
            path: "reviews",
            populate: {
              path: "author",
              select: "username profilePicture",
            },
          },
        ],
      })
      .lean();
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    post.upvotes = post.upvotes.length;
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

//Gets random post from db
const getRandomPost = async (req, res) => {
  try {
    const postCount = await db.Post.countDocuments();
    const randomIndex = Math.floor(Math.random() * postCount);
    const post = await db.Post.findOne()
      .populate("author", "username profilePicture")
      .skip(randomIndex)
      .populate({
        path: "recipes",
        populate: [
          {
            path: "author",
            select: "username profilePicture",
          },
          {
            path: "reviews",
            populate: {
              path: "author",
              select: "username profilePicture",
            },
          },
        ],
      })
      .lean();
    if (!post) {
      return res.status(404).json({ error: "No posts found" });
    }
    post.upvotes = post.upvotes.length;
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

//Search posts by keyword in db
const searchPosts = async (req, res) => {
  const searchTerm = req.query.q;
  const regex = new RegExp(escapeRegex(searchTerm), "gi");

  try {
    const posts = await db.Post.find({
      $or: [{ title: { $regex: regex } }, { tags: { $regex: regex } }],
    })
      .populate("author", "username profilePicture")
      .lean();

    const sortedPosts = posts.sort((a, b) => {
      const aTitleMatch = a.title.match(regex);
      const bTitleMatch = b.title.match(regex);
      const aTagMatch = a.tags.filter((tag) => tag.match(regex)).length;
      const bTagMatch = b.tags.filter((tag) => tag.match(regex)).length;

      // Sort by number of matches first
      if (aTitleMatch && bTitleMatch) {
        if (aTagMatch + aTitleMatch.length > bTagMatch + bTitleMatch.length) {
          return -1;
        } else if (
          aTagMatch + aTitleMatch.length <
          bTagMatch + bTitleMatch.length
        ) {
          return 1;
        }
      } else if (aTitleMatch && !bTitleMatch) {
        return -1;
      } else if (!aTitleMatch && bTitleMatch) {
        return 1;
      }

      // Sort by post date if there is a tie in number of matches
      if (a.dateCreated > b.dateCreated) {
        return -1;
      } else if (a.dateCreated < b.dateCreated) {
        return 1;
      } else {
        return 0;
      }
    });
    posts.forEach(function (post) {
      post.upvotes = post.upvotes.length;
    });
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

//Get most common tag in posts within the last 30 days
const getTagOfTheMonth = async (req, res) => {
  const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Calculate a month ago from now
  console.log(monthAgo);
  try {
    const posts = await db.Post.find({
      dateCreated: { $gte: monthAgo },
    }).select("tags"); // Find all posts created in the past month and only select the tags field
    const tagCounts = posts.reduce((acc, post) => {
      post.tags.forEach((tag) => {
        if (acc[tag]) {
          acc[tag]++;
        } else {
          acc[tag] = 1;
        }
      });
      return acc;
    }, {}); // Count the occurrences of each tag in all the posts
    const mostFrequentTag = Object.keys(tagCounts).reduce((a, b) =>
      tagCounts[a] > tagCounts[b] ? a : b
    ); // Find the tag with the highest occurrence count

    res.send({ mostFrequentTag });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getAllPosts,
  getPost,
  getRandomPost,
  searchPosts,
  getTagOfTheMonth,
};
