import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useUser } from "../../utils/UserContext";
import PostElement from './PostElement';
import { getMyPosts } from '../../utils/fetchFromApi';

import ErrorBoundary from "../../utils/ErrorBoundary";

const MyPostsFeed = () => {

  const [posts, setPosts] = useState([]);
  const { user } = useUser();    

  useEffect(() => {
    getMyPosts('api/user/myPosts',user).then((data) => setPosts(data))
  },[user]);

  return (
    
    <Box p ={2} justifyContent = "center" display = "flex" sx ={{overflowY: 'auto', flex: 2}}>
      <ErrorBoundary>
        <PostElement posts={posts} />
      </ErrorBoundary>
    </Box>
  )
}

export default MyPostsFeed