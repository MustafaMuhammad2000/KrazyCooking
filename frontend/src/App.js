import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { UserProvider } from "./utils/UserContext";
import {
  Navbar,
  Feed,
  Post,
  SearchFeed,
  Login,
  Register,
  ProfilePage,
  CreatePost,
  RandomPost,
  SavedPostsFeed,
  Sidebar,
  MyPostsFeed,
  SearchResults,
} from "./components";

const App = () => (
  <UserProvider>
    <BrowserRouter>
      <Box sx={{ backgroundColor: "#f5f5f5" }}>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" exact element={<Feed />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/myprofile" element={<ProfilePage />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/randompost" element={<RandomPost />} />
          <Route path="/saved" element={<SavedPostsFeed />} />
          <Route path="/myPosts" element={<MyPostsFeed />} />
        </Routes>
      </Box>
    </BrowserRouter>
  </UserProvider>
);

export default App;
