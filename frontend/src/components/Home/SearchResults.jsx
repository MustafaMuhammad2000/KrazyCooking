import { useState, useEffect, fetchData } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import PostElement from './PostElement';
import { fetchFromAPI } from '../../utils/fetchFromApi';
import { useParams } from 'react-router-dom';

const SearchResults = () => {

  const { query } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchFromAPI('api/post/search?q=' + query).then((data) => setPosts(data));
  }, [query]);

  if (posts.length == 0) { //if no posts found show no results msg
    return (
      <Box p={2} display="flex" justifyContent="center">
        <Typography variant="h6">No results found for "{query}"</Typography>
      </Box>
    )
  }
  else {
    return (
      <Box p={2} justifyContent="center" display="flex" sx={{ overflowY: 'auto', flex: 2 }}>
        <PostElement posts={posts} />
      </Box>
    )
  }
}

export default SearchResults