import { useState } from "react";
import {
  Stack,
  Typography,
  IconButton,
  Box,
  TextField,
  Button,
} from "@mui/material";
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
  const [upvote, setUpvote] = useState(0);
  const { user } = useUser();
  if (post.recipes === undefined) {
    return;
  }

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
          <Person />
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
            {/* Post image */}
          </Stack>

          {/* Post Image */}
          {post.picture && <img src={post.picture} />}
          <Box sx={{ display: "flex", backgroundColor: "black" }}>
            <IconButton
              style={bookmarkStyle}
              type="button"
              onClick={() => {
                console.log("user: ", user);
                if (user === null) {
                  window.alert("You must be logged in to save a post");
                  return;
                }
                {
                  !postSaved && savePost(post._id, user);
                }
                {
                  postSaved && unsavePost(post._id, user);
                }

                setPostSaved(!postSaved);
              }}
            >
              {!postSaved && <BookmarkBorderIcon />}
              {postSaved && <BookmarkIcon />}
            </IconButton>
          </Box>
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
                upvotePost(post._id, user);
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

                removeUpvote(post._id, user);
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