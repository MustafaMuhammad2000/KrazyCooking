import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import { Navbar, Feed, Post, SearchFeed, Login, Register} from './components';


const App = () => (
    <BrowserRouter>
        <Box sx={{backgroundColor: '#f5f5f5'}}>
        <Navbar />
        <Routes>
            <Route path = "/" exact element ={<Feed />} />
            <Route path = "/post/:id" element = {<Post />} />
            <Route path = "/search/:searchTerm" element = {<SearchFeed />}/>
            <Route path = "/login" element = {<Login />} />
            <Route path = "/register" element = {<Register />} />
        </Routes>
        </Box>
    </BrowserRouter>    
);


export default App