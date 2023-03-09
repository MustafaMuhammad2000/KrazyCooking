import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';

import PostElement from './PostElement';
import { fetchFromAPI } from '../../utils/fetchFromApi';

const Feed = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchFromAPI('api').then((data) => setPosts(data.items))
  }, []);

  return (
    
    <Box p ={2} justifyContent = "center" display = "flex" sx ={{overflowY: 'auto', flex: 2}}>

        <PostElement posts={posts} />
    </Box>
  )
}

export default Feed