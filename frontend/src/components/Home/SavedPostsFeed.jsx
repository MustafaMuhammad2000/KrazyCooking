import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useUser } from "../../utils/UserContext";
import PostElement from './PostElement';
import { getSavedPosts } from '../../utils/fetchFromApi';

import ErrorBoundary from "../../utils/ErrorBoundary";

const SavedPostsFeed = () => {

  const [posts, setPosts] = useState([]);
  const { user } = useUser();    

  useEffect(() => {
    getSavedPosts('api/user/savedPosts',user).then((data) => setPosts(data))
  },[user]);

  return (
    
    <Box p ={2} justifyContent = "center" display = "flex" sx ={{overflowY: 'auto', flex: 2}}>
      <ErrorBoundary>
        <PostElement posts={posts} />
      </ErrorBoundary>
    </Box>
  )
}

export default SavedPostsFeed