import { useState } from "react";
import { Stack, Typography, IconButton, Box, TextField } from "@mui/material";
import { North, South, Person, AccessTime } from "@mui/icons-material";
import moment from "moment";
import CommentFeed from "./CommentFeed";
import CommentForm from "./CommentForm";
import ErrorBoundary from "../../utils/ErrorBoundary";
import { upvotePost } from "../../utils/fetchFromApi";
import { useUser } from "../../utils/UserContext";

const PostBody = ({ post }) => {
  const timeSincePost = moment(new Date(post.dateCreated)).fromNow();
  const { user } = useUser();
  if (post.recipes === undefined) {
    return;
  }

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
        }}
      >
        <Stack>
          {/* Title */}
          <Typography variant="h2" color="black">
            {post.title}
          </Typography>

          {/* Post Content   */}
          <Typography variant="h6" color="black">
            {post.body}
          </Typography>
          {/* Post image */}
        </Stack>

        {/* Post Image */}
        {post.picture && <img src={post.picture} />}

        {/* Voting */}
        <Stack direction="row" alignItems="center">
          <IconButton
            type="button"
            onClick={() => {
              //setCounter(counter + 1);
              upvotePost(post._id, user);
            }}
          >
            <North />
          </IconButton>
          <IconButton
            type="button"
            onClick={() => {
              //setCounter(counter -1);
            }}
          >
            <South />
          </IconButton>

          <Typography variant="h5">{post.upvotes}</Typography>
        </Stack>
      </Stack>

      <CommentForm postId={post._id} />

      <CommentFeed comments={post.recipes} />
    </Stack>
  );
};

export default PostBody;
