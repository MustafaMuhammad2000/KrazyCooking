import { Stack, Box } from '@mui/material';
import PostCard from './PostCard';

const PostElement = ({ posts }) => {
  return (
    <Stack
        direction="column" 
        justifyContent="center"
        gap = {2}
        width = "75vw"
    >
        {/* { posts.map((item, index) => (
            <Box key={index}>
                <PostCard post = {item} />;
            </Box>
        ))} */}
        <Box>
            <PostCard />
        </Box>
        <Box>
            <PostCard />
        </Box>
        <Box>
            <PostCard />
        </Box>
        <Box>
            <PostCard />
        </Box>
        <Box>
            <PostCard />
        </Box>
        <Box>
            <PostCard />
        </Box>
        <Box>
            <PostCard />
        </Box>
        <Box>
            <PostCard />
        </Box>
        <Box>
            <PostCard />
        </Box>

    </Stack>
  )
}

export default PostElement