import { useState, useEffect } from "react";
import { Box } from "@mui/material";

import PostElement from "./PostElement";
import { fetchFromAPI } from "../../utils/fetchFromApi";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  // Fetches all post from api when the page loads
  useEffect(() => {
    fetchFromAPI("api/post").then((data) => setPosts(data));
  }, []);

  return (
    // Create a post element containing all the posts
    <Box
      p={2}
      justifyContent="center"
      display="flex"
      sx={{ overflowY: "auto", flex: 2 }}
    >
      <PostElement posts={posts} />
    </Box>
  );
};

export default Feed;
