import {useState, useEffect, setState} from 'react'
import {useParams} from 'react-router-dom';
import PostBody from './PostBody';
import {Stack, IconButton} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fetchFromAPI } from '../../utils/fetchFromApi';
import CommentFeed from './CommentFeed';



const Post = () => {

  const { id } = useParams();

  const [post, setPost] = useState([]);

  useEffect(() => {
    fetchFromAPI('api/post/' + id + '/view').then((data) => setPost(data))
  }, []);

  console.log(post);
  console.log(id);

  return (
    <Stack
        direction="row" 
        justifyContent="center"
        gap = {2}
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
        {/* Contains all the info from original post */}
        <PostBody post = {post} />

        

    </Stack>
  )
}

export default Post