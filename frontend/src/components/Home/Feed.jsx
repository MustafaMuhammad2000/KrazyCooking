import  React,{ useState, useEffect } from 'react';
import { Box, Stack, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import PostElement from './PostElement';
import { fetchFromAPI } from '../../utils/fetchFromApi';

const Feed = () => {

  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('newer');
  const [sortedPosts, setSortedPosts] = useState(posts);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  
  


  const sortByHighestRating = () => {
    const sorted = [...sortedPosts].sort((a, b) => {
      const aAverageRating = a.upvotes;
      const bAverageRating = b.upvotes;
      return bAverageRating - aAverageRating;
    });
    setSortedPosts(sorted);
  };

  const sortByLowestRating = () => {
    const sorted = [...sortedPosts].sort((a, b) => {
      const aAverageRating = a.upvotes;
      const bAverageRating = b.upvotes;
      return aAverageRating - bAverageRating;
    });
    setSortedPosts(sorted);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const sortByNewest = () => {
    const sorted = [...sortedPosts].sort((a, b) => {
      return new Date(b.dateCreated) - new Date(a.dateCreated);
    });
    setSortedPosts(sorted);
  };

  const sortByOldest = () => {
    const sorted = [...sortedPosts].sort((a, b) => {
      return new Date(a.dateCreated) - new Date(b.dateCreated);
    });
    setSortedPosts(sorted);
  };

  useEffect(() => {
    fetchFromAPI(`api/post`).then((data) => setSortedPosts(data))
  }, []);

  useEffect(() => {
    if (sortBy === 'newer') {
      sortByNewest();
    } else if (sortBy === 'older') {
      sortByOldest();
    } else if (sortBy === 'high') {
      sortByHighestRating();
    }
  }, [sortBy, posts]);

  return (
    console.log("sposts: ", posts),
    <Box p={2} display="flex" flexDirection="column" sx={{overflowY: 'auto', flex: 1}}>
      <Box display="flex" justifyContent="flex-end" mb={1}>
      <InputLabel sx={{ paddingLeft: '32px' }}>Sort by:</InputLabel>
        <FormControl>
          <br/>
          <Select value={sortBy} onChange={handleSortChange}  style={{ height: '30px' }}>
            <MenuItem value="newer" onClick={() => {handleClose(); sortByNewest();}}>Newest</MenuItem>
            <MenuItem value="older"onClick={() => {handleClose(); sortByOldest();}}>Oldest</MenuItem>
            <MenuItem value="high"onClick={() => {handleClose(); sortByHighestRating();}}>High Rating</MenuItem>
            <MenuItem value="low"onClick={() => {handleClose(); sortByLowestRating();}}>Low Rating</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box display="flex" justifyContent="center" sx={{overflowY: 'auto', flex: 1}}>
        
        <PostElement posts={sortedPosts} />
      </Box>
    </Box>
  )
}

export default Feed;
