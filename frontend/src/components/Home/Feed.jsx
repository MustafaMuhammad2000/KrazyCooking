
import  React,{ useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


import PostElement from "./PostElement";
import { fetchFromAPI } from "../../utils/fetchFromApi";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('older');
  const [sortedPosts, setSortedPosts] = useState(posts);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);



  //// handles the sorting menu changes
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };


  //// sorts the posts by the highest upvotes
  const sortByHighestRating = () => {
    const sorted = [...sortedPosts].sort((a, b) => {
      const aAverageRating = a.upvotes;
      const bAverageRating = b.upvotes;
      return bAverageRating - aAverageRating;
    });
    setSortedPosts(sorted);
  };

  /// sorts the posts by the lowest upvotes
  const sortByLowestRating = () => {
    const sorted = [...sortedPosts].sort((a, b) => {
      const aAverageRating = a.upvotes;
      const bAverageRating = b.upvotes;
      return aAverageRating - bAverageRating;
    });
    setSortedPosts(sorted);
  };

  /// handles the closing of the dropdown
  const handleClose = () => {
    setAnchorEl(null);
  };

  /// sorts the posts by the newest post dates
  const sortByNewest = () => {
    const sorted = [...sortedPosts].sort((a, b) => {
      return new Date(b.dateCreated) - new Date(a.dateCreated);
    });
    setSortedPosts(sorted);
  };

  /// sorts the posts by the oldest post dates
  const sortByOldest = () => {
    const sorted = [...sortedPosts].sort((a, b) => {
      return new Date(a.dateCreated) - new Date(b.dateCreated);
    });
    setSortedPosts(sorted);
  };

  // Fetches all post from api when the page loads
  useEffect(() => {

    fetchFromAPI(`api/post`).then((data) => setSortedPosts(data))
  }, []);

  /// applies the sorting functions to the posts
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
    <Box p={2} display="flex" flexDirection="column" sx={{overflowY: 'auto', flex: 1}}>
      <Box display="flex" justifyContent="flex-end" mb={1}>
      <InputLabel sx={{ paddingLeft: '32px' }}>Sort by:</InputLabel>
        <FormControl>
          <br/>
          <Select value={sortBy} onChange={handleSortChange}  style={{ height: '30px' }}>
            <MenuItem value="older"onClick={() => {handleClose(); sortByOldest();}}>Oldest</MenuItem>
            <MenuItem value="newer" onClick={() => {handleClose(); sortByNewest();}}>Newest</MenuItem>
            <MenuItem value="high"onClick={() => {handleClose(); sortByHighestRating();}}>High Rating</MenuItem>
            <MenuItem value="low"onClick={() => {handleClose(); sortByLowestRating();}}>Low Rating</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box display="flex" justifyContent="center" sx={{overflowY: 'auto', flex: 1}}>
        
        <PostElement posts={sortedPosts} />
      </Box>

    </Box>
  );
};

export default Feed;
