import { Link } from "react-router-dom";
import {
  Typography,
  Stack,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { AccessTime, North, South } from "@mui/icons-material";
import { useState, useEffect } from "react";
import moment from "moment";
import { useUser } from "../../utils/UserContext";
import {
  savePost,
  getSavedPosts,
  upvotePost,
  removeUpvote,
  deletePost,
  unsavePost,
} from "../../utils/fetchFromApi";

const PostCard = ({ post }) => {
  const timeSincePost = moment(new Date(post.dateCreated)).fromNow();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [saved, setSaved] = useState(); // new state variable
  const { id } = useUser();
  const { admin } = useUser();
  const { user } = useUser();
  const axios = require("axios");

  // retrieves the saved posts
  useEffect(() => {
    const response = getSavedPosts("api/user/savedPosts", user);
    response.then((data) => {
      const saved = data.some((savedPost) => savedPost._id === post._id);
      setSaved(saved);
    });
  }, [user, post._id]);

  // handles the dot menu
  function handleMenuClick(event) {
    const svg = event.currentTarget;
    setMenuAnchor(event.currentTarget);
  }

  // handles the closing of the dropdown menu
  function handleMenuClose() {
    setMenuAnchor(null);
  }

  /// function for calling to delete the posts
  const handleDeletePost = async () => {
    const response = await deletePost(post._id, user);
    window.location.href = window.location.href;
    response.then((data) => {
      alert("Post deleted.");
    });
  };

  const addUpvote = async () => {
    await upvotePost(post._id, user);
    window.location.reload();
  };

  const deleteUpvote = async () => {
    await removeUpvote(post._id, user);
    window.location.reload();
  };

  /// save post function
  const handleSavePost = () => {
    if (saved) {
      // if the post is already saved, unsave it
      const response = unsavePost(post._id, user);
      response.then((data) => {
        setSaved(false);
      });
    } else {
      // if the post is not saved, save it
      const response = savePost(post._id, user);
      response.then((data) => {
        setSaved(true);
      });
    }
    handleMenuClose();
  };

  return (
    <Stack direction="column" mb={5}>
      {/* Upper Section - user and time components */}
      <Stack
        direction="row"
        alignItems="center"
        pb={0.5}
        pr={2}
        pl={2}
        sx={{ top: 0, justifyContent: "space-between" }}
      >
        {/* User element */}
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          sx={{
            borderRadius: 20,
            border: "1px solid #e3e3e3",
            backgroundColor: "#B4B5FF",
            pl: 1,
            pr: 1,
          }}
        >
          <img src={post.author.profilePicture} alt="logo" height={30} />
          <Typography>{post.author.username}</Typography>
        </Stack>

        {/* Clock element */}
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          sx={{
            borderRadius: 20,
            border: "1px solid #e3e3e3",
            backgroundColor: "#B4B5FF",
            pl: 1,
            pr: 1,
          }}
        >
          <AccessTime />
          <Typography>{timeSincePost}</Typography>
        </Stack>
      </Stack>

      {/* Main Section - title and voting components */}
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          justifyContent: "space-between",
          backgroundColor: "#CEE7FF",
          borderRadius: 10,
          border: "none",
          p: 3,
        }}
      >
        <Stack>
          {/* Title */}
          <Typography variant="h2" color="gray">
            <Link to={`/post/${post._id}`}>{post.title}</Link>
          </Typography>

          {/* Tags */}
          <Stack direction="row" gap={1} mt={1}>
            {post.tags.map((tag, index) => (
              <Box
                key={index}
                sx={{
                  borderRadius: 20,
                  border: "1px solid #323232",
                  color: "#323232",
                  backgroundColor: "#f2a7c6",
                  fontSize: "16px",
                  fontWeight: "400",
                  fontFamily: "Roboto",
                  pl: 1,
                  pr: 1,
                }}
              >
                {tag}
              </Box>
            ))}
          </Stack>
        </Stack>

        {/* Voting and Menu */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Voting */}
          <Stack direction="row" alignItems="center">
            <IconButton
              type="button"
              onClick={() => {
                // setUpvote(1);

                if (user === null) {
                  window.alert("You must be logged in to upvote a post");
                  return;
                }
                addUpvote();
              }}
            >
              <North />
            </IconButton>
            <IconButton
              type="button"
              onClick={() => {
                // setUpvote(-1);

                if (user === null) {
                  window.alert("You must be logged in to remove an upvote");
                  return;
                }

                deleteUpvote();
              }}
            >
              <South />
            </IconButton>

            <Typography variant="h4">{post.upvotes}</Typography>
          </Stack>

          {/* Menu*/}
          <Stack direction="row" alignItems="center">
            <Button>
              <svg
                onClick={handleMenuClick}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ fill: "#000", stroke: "none" }} /* default color */
              >
                <circle cx="12" cy="6" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="18" r="2" />
              </svg>
            </Button>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
            >
              {saved ? (
                <MenuItem onClick={handleSavePost}>Unsave Post</MenuItem>
              ) : (
                <MenuItem onClick={handleSavePost}>Save Post</MenuItem>
              )}
              {id === post.author._id || admin ? (
                <MenuItem onClick={handleDeletePost} style={{ color: "red" }}>
                  Delete Post
                </MenuItem>
              ) : null}
            </Menu>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PostCard;
