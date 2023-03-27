import { Stack, Box, Typography } from "@mui/material";
import PostCard from "./PostCard";
import ErrorBoundary from "../../utils/ErrorBoundary";

const PostElement = ({ posts }) => {
  return (
    <Stack direction="column" justifyContent="center" gap={2} width="75vw">
      {/* Create a post card for each post passed to this function */}
      {posts.map((post) => (
        <Box key={post._id}>
          <ErrorBoundary>
            <PostCard post={post} />
          </ErrorBoundary>
        </Box>
      ))}
    </Stack>
  );
};

export default PostElement;
