import {useState} from 'react'
import PostBody from './PostBody';
import {Stack, IconButton} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Post = () => {
  return (
    <Stack
        direction="row" 
        justifyContent="center"
        gap = {2}
        width = "75vw"
        alignContent="center"
    >   
        <IconButton sx = {{
            borderRadius: 25,
            backgroundColor: 'grey',
            height: 45,
            widgth: 45,

        }}>
            <ArrowBackIcon />
        </IconButton>
        <PostBody />

    </Stack>
  )
}

export default Post