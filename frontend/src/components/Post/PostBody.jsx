import { useState } from "react";
import { Stack, Typography, IconButton, Box, Avatar } from "@mui/material";
import { North, South, Person, AccessTime } from "@mui/icons-material";
import moment from "moment";
import CommentFeed from "./CommentFeed";
import CommentForm from "./CommentForm";
import ErrorBoundary from "../../utils/ErrorBoundary";
import {
  removeUpvote,
  savePost,
  unsavePost,
  upvotePost,
} from "../../utils/fetchFromApi";
import { useUser } from "../../utils/UserContext";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const PostBody = ({ post }) => {
  const timeSincePost = moment(new Date(post.dateCreated)).fromNow();
  const [postSaved, setPostSaved] = useState(false);
  const { user } = useUser();
  if (post.recipes === undefined) {
    return;
  }

  const addUpvote = async () => {
    await upvotePost(post._id, user);
    window.location.reload();
  };

  const deleteUpvote = async () => {
    await removeUpvote(post._id, user);
    window.location.reload();
  };

  //Styling for save post button
  const bookmarkStyle = {
    position: "absolute",
    top: "30px",
    right: "30px",
  };

  return (
    <Stack direction="column" mb={5} mt={5} width="75vw">
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
            backgroundColor: "#D7D8FF",
            pl: 1,
            pr: 1,
          }}
        >
          <Avatar
            alt="logo"
            src={post.author.profilePicture}
            sx={{ marginLeft: -1 }} // add marginLeft: 0 to align with edge of Stack
          />
          {/* <img src={post.author.profilePicture} alt="logo" height={30} /> */}
          <Typography>
            <ErrorBoundary>{post.author.username}</ErrorBoundary>
          </Typography>
        </Stack>

        {/* Clock element */}
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          sx={{
            borderRadius: 20,
            border: "1px solid #e3e3e3",
            backgroundColor: "#D7D8FF",
            pl: 1,
            pr: 1,
          }}
        >
          <AccessTime />
          <Typography>{timeSincePost}</Typography>
        </Stack>
      </Stack>
      <Box position="relative">
        {/* Main Section - title and voting components */}
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            justifyContent: "space-between",
            backgroundColor: "#A5D2FF",
            borderRadius: 10,
            border: "none",
            p: 3,
            pl: 5,
            pr: 5,
          }}
        >
          <Stack width="87%">
            {/* Title */}
            <Typography variant="h2" color="#323232" fontWeight={"400"}>
              {post.title}
            </Typography>

            {/* Post Content   */}
            <Typography variant="body1" color="black" paragraph fontSize={20}>
              {post.body}
            </Typography>

            {/* Tags */}
            <Stack direction="row" gap={1}>
              {post.tags.map((tag, index) => (
                <Box
                  key={index}
                  sx={{
                    borderRadius: 20,
                    border: "2px solid #323232",
                    color: "#323232",
                    backgroundColor: "#f2a7c6",
                    fontSize: "20px",
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

          {/* Post Image */}
          {post.picture && <img src={post.picture} />}
          <Box sx={{ display: "flex", backgroundColor: "black" }}>
            {/* Button for saving/unsaving post */}
            <IconButton
              style={bookmarkStyle}
              type="button"
              onClick={() => {
                //check that user is logged in
                if (user === null) {
                  window.alert("You must be logged in to save a post");
                  return;
                }
                //If post is saved-> save post, vice versa
                {
                  !postSaved && savePost(post._id, user);
                }
                {
                  postSaved && unsavePost(post._id, user);
                }

                setPostSaved(!postSaved);
              }}
            >
              {/* Display correct bookmark button */}
              {!postSaved && <BookmarkBorderIcon />}
              {postSaved && <BookmarkIcon />}
            </IconButton>
          </Box>
          {/* Voting */}
          <Stack direction="row" alignItems="center">
            <IconButton
              type="button"
              onClick={() => {
                if (user === null) {
                  window.alert("You must be logged in to upvote a post");
                  return;
                }
                addUpvote();
              }}
            >
              <North />
            </IconButton>

            {/* Reply button */}
            <IconButton
              type="button"
              onClick={() => {
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
            {/* <Typography variant="h4">{post.upvotes + upvote}</Typography> */}
          </Stack>
        </Stack>
      </Box>

      <CommentForm postId={post._id} />

      <CommentFeed comments={post.recipes} />
    </Stack>
  );
};

export default PostBody;
