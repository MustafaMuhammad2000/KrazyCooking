import {Link, useLocation} from 'react-router-dom';
import { Typography, Stack, Grid, Box, IconButton, Menu, MenuItem, Button} from '@mui/material';
import {AccessTime, Person, North, South} from '@mui/icons-material';
import { useState } from 'react';
import moment from 'moment';
import { useUser } from "../../utils/UserContext";
import { savePost } from "../../utils/fetchFromApi";

const PostCard = ({post}) => {

    const [counter, setCounter] = useState(0);
    const timeSincePost = moment(new Date(post.dateCreated)).fromNow();
    const [menuAnchor, setMenuAnchor] = useState(null);
    const {id} = useUser();
    const {admin} = useUser();
    const {user} = useUser();    
    const axios = require("axios");
      const location = useLocation();
      const isSavedPage = location.pathname === "/saved";

    function handleMenuClick(event) {
      const svg = event.currentTarget;
      setMenuAnchor(event.currentTarget);
    }

    function handleMenuClose() {
        setMenuAnchor(null);
    }

    const handleDeletePost = () => {
      axios
        .delete(`http://localhost:8000/api/post/${post._id}`, {
          headers: {
            authorization: `${user}`,
          },
        })
        .then((response) => {
          alert("Post deleted.");
          window.location.href = "/";
        }
        )
        .catch((error) => {
          console.log(error);
          alert("Unable to delete post. Please try again later.");
        });
    };   


    const handleSavePost = () => {
   
        savePost(post._id,user)
        .then((response) => {
       //   alert("Post saved.");
        })
        .catch((error) => {
          console.log(error);
          alert("Unable to save post. Please try again later.");
        });
    };     

  return (
    (
      <Stack direction="column" mb={5}>
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
              backgroundColor: "#0BDBB6",
              pl: 1,
              pr: 1,
            }}
          >
            <img src={post.author.profilePicture} alt="logo" height={30} />
            <Typography>{post.author.username}</Typography>
          </Stack>

          {/* Clock element */}
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{
              borderRadius: 20,
              border: "1px solid #e3e3e3",
              backgroundColor: "#0BDBB6",
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
            backgroundColor: "#E9FFFF",
            borderRadius: 10,
            border: "none",
            p: 3,
          }}
        >
          {/* Title */}
          <Typography variant="h2" color="gray">
             <Link to={isSavedPage ? `/post/${post._id}` : `/saved/post/${post._id}`}>{post.title}</Link>
          </Typography>

          {/* Voting and Menu */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            {/* Voting */}
            <Stack direction="row" alignItems="center">
              <IconButton
                type="button"
                onClick={() => {
                  setCounter(counter + 1);
                }}
              >
                <North />
              </IconButton>
              <IconButton
                type="button"
                onClick={() => {
                  setCounter(counter - 1);
                }}
              >
                <South />
              </IconButton>

              <Typography variant="h5">{counter}</Typography>
            </Stack>
            {/* Menu*/}
            <Stack direction="row" alignItems="center">
              <Button>
                <svg
                  onClick={handleMenuClick}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  style={{ fill: "#000", stroke: "none" }} /* default color */
                >
                  <circle cx="12" cy="6" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="18" r="2" />
                </svg>
              </Button>
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleSavePost}>Save Post</MenuItem>
                {(id === post.author._id)|| (admin) ? (
                  <MenuItem onClick={handleDeletePost} style={{ color: "red" }}>
                    Delete Post
                  </MenuItem>
                ) : null}
              </Menu>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    )
  );
}

export default PostCard