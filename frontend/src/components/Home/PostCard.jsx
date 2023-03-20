import {Link} from 'react-router-dom';
import { Typography, Stack, Grid, Box, IconButton} from '@mui/material';
import {AccessTime, Person, North, South} from '@mui/icons-material';
import { useState } from 'react';
import moment from 'moment';


const PostCard = ({post}) => {

    const [counter, setCounter] = useState(0);
    const timeSincePost = moment(new Date(post.dateCreated)).fromNow();

  return (
    <Stack direction= "column" mb={5}>

        {/* Upper Section - user and time components */}
        <Stack
        direction= "row"
        alignItems = "center"
        pb ={0.5}
        pr={2}
        pl={2}
        sx = {{top: 0, justifyContent: 'space-between'}}
        >
        
            {/* User element */}
            <Stack direction="row" alignItems="center" gap={1} sx = {{
                borderRadius: 20,
                border: '1px solid #e3e3e3',
                backgroundColor: "#0BDBB6",
                pl: 1,
                pr: 1
            }}>
                <img src={post.author.profilePicture} alt="logo" height={30} />
                <Typography>
                    {post.author.username}
                </Typography>
            </Stack>

            {/* Clock element */}
            <Stack direction="row" alignItems="center" gap={1} sx = {{
                borderRadius: 20,
                border: '1px solid #e3e3e3',
                backgroundColor: "#0BDBB6",
                pl: 1,
                pr: 1
            }}>
                <AccessTime />
                <Typography>
                    {timeSincePost}
                </Typography>
            </Stack>
        
        </Stack>

        {/* Main Section - title and voting components */}
        <Stack 
            direction = "row" 
            alignItems="center" 
            sx = {{
                justifyContent: "space-between", 
                backgroundColor: "#E9FFFF",
                borderRadius: 10,
                border: 'none',
                p: 3
        }}>
            {/* Title */}
            <Typography variant = "h2" color="gray">
                <Link to={`post/${post._id}`}>{post.title}</Link>
            </Typography>
            
            {/* Voting */}
            <Stack direction="row" alignItems="center">
                <IconButton type = "button" onClick={() =>{setCounter(counter+1)}}>
                    <North />
                </IconButton>
                <IconButton type = "button" onClick={() =>{setCounter(counter-1)}}>
                    <South />
                </IconButton>
                
                <Typography variant = "h5">
                    {counter}
                </Typography>
            </Stack>
            
        </Stack>

    </Stack>

    
  )
}

export default PostCard