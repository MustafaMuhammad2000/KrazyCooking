import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import { Navbar, Feed, Post, SearchFeed, Login, Register, ProfilePage} from './components';
import {UserProvider} from './utils/UserContext';


const App = () => (
    <UserProvider>
    <BrowserRouter>
        <Box sx={{backgroundColor: '#f5f5f5'}}>
        <Navbar />
        <Routes>
            <Route path = "/" exact element ={<Feed />} />
            <Route path = "/post/:id" element = {<Post />} />
            <Route path = "/search/:searchTerm" element = {<SearchFeed />}/>
            <Route path = "/login" element = {<Login />} />
            <Route path = "/register" element = {<Register />} />
            <Route path = "/user/:id" element = {<ProfilePage />} />
        </Routes>
        </Box>
    </BrowserRouter>    
    </UserProvider>
);


export default App