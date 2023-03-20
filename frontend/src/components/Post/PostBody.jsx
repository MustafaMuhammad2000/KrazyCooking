import { useState } from 'react'
import {Stack, Typography, IconButton, Box, TextField } from '@mui/material';
import {North, South, Person, AccessTime} from '@mui/icons-material';
import moment from 'moment';
import CommentFeed from './CommentFeed';


const PostBody = ({post}) => {

    const [counter, setCounter] = useState(0);
    const timeSincePost = moment(new Date(post.dateCreated)).fromNow();
    console.log(post);
  return (
    <Stack direction= "column" mb={5} width = "75vw">

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
                <Person />
                <Typography>
                    {/* {post.author.username} */}
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
            <Stack>
              {/* Title */}
              <Typography variant = "h2" color="black">
                  {post.title}
              </Typography>

              {/* Post Content   */}
              <Typography variant = "h6" color="black">
                    {post.body}
              </Typography>
              {/* Post image */}
              
            </Stack>
            
            {/* Post Image */}
            <img src={post.picture} alt="post-picture"/>

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

        <CommentFeed currentUserId = "1"/>

    </Stack>
  )
}

export default PostBody