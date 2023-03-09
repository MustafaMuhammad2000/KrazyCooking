import { useState } from 'react'
import {Stack, Typography, IconButton } from '@mui/material';
import {North, South, Person, AccessTime} from '@mui/icons-material';

const PostBody = () => {

    const [counter, setCounter] = useState(0);

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
                <Person />
                <Typography>
                    Lebron James
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
                    2d
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
                  Title
              </Typography>

              {/* Post Content   */}
              <Typography variant = "h6" color="black">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
              esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
            </Stack>
            
            
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

export default PostBody