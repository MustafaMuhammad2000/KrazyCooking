import {
  Stack,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import logo from "../utils/krazy-logo-45.png";
import SearchBar from "./SearchBar";
import { useUser } from "../utils/UserContext";
import { fetchFromAPI, getProfile } from "../utils/fetchFromApi";
import { fontSize } from "@mui/system";

//style for the login button
const LoginButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 20,
  color: "#6b6c7f",
  padding: "6px 18px",
  border: "2px solid",
  borderRadius: 30,
  lineHeight: 1.5,
  backgroundColor: "#D9DAFF",
  borderColor: "#a9aac9",
  "&:hover": {
    backgroundColor: "#bdbffc",
    borderColor: "#6b6c7f",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#2E987D",
    borderColor: "#3DCBA7",
  },
});
// style for the create post button
const CreatePostButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 20,
  color: "#6b6c7f",
  padding: "6px 18px",
  border: "2px solid",
  borderRadius: 30,
  lineHeight: 1.5,
  marginLeft: 40,
  backgroundColor: "#D9DAFF",
  borderColor: "#a9aac9",
  "&:hover": {
    backgroundColor: "#bdbffc",
    borderColor: "#6b6c7f",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#2E987D",
    borderColor: "#b7b9f7",
  },
});
//style for the register button
const RegisterButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 20,
  color: "#6b6c7f",
  padding: "6px 18px",
  border: "2px solid",
  borderRadius: 30,
  lineHeight: 1.5,
  backgroundColor: "#D9DAFF", //#D9DAFF
  borderColor: "#a9aac9",
  "&:hover": {
    backgroundColor: "#bdbffc",
    borderColor: "#6b6c7f",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#2E987D",
    borderColor: "#3DCBA7",
  },
});

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const axios = require("axios");
  const [tag, setTag] = useState("");

  //sends user to search route with tag of month as search query
  const handleTagPress = () => {
    navigate("/search/" + tag);
  };

  const random_hex_color_code = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return "#" + n.slice(0, 6);
  };

  //sends user to randompost route
  const handleRandomPress = () => {
    navigate("/randompost");
    window.location.reload();
  };
  // opens the menu under the avatar
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // closes the menu under the avatar
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  // handles the logout function by deleting the token
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // obtains the data to use for the avatar and username
  useEffect(() => {
    if (user != null) {
      const data = getProfile(user);
      data
        .then((response) => {
          setAvatar(response.profilePicture);
          setUsername(response.username);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  useEffect(() => {
    fetchFromAPI("api/post/tagofmonth").then((data) =>
      setTag(data.mostFrequentTag)
    );
  }, []);

  return (
    <Stack
      direction="row"
      alignItems={"center"}
      p={2}
      sx={{
        position: "sticky",
        background: "#B4DAFF",
        top: 0,
        justifyContent: "space-between",
        pr: 10,
        pl: 10,
        zIndex: 20,
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" height={45} />
      </Link>

      <LoginButton onClick={handleRandomPress}>Random Post</LoginButton>
      <Box>
        <Chip
          label="Tag of the Month:"
          sx={{
            padding: 1,
            pt: 3,
            pb: 3,
            mr: 2,
            borderRadius: 0,
            fontSize: 20,
            fontWeight: "bold",
            color: "#fff",
            background: `linear-gradient(17deg, ${random_hex_color_code()} 0%, ${random_hex_color_code()} 100%)`,
          }}
        />

        <LoginButton onClick={handleTagPress}> {tag} </LoginButton>
      </Box>

      <Stack direction="row" alignItems={"center"}>
        <SearchBar />
        <Link to="/createPost">
          <CreatePostButton>Create Post</CreatePostButton>
        </Link>

        {user ? (
          <div>
            <Button onClick={handleMenuOpen}>
              <Avatar src={avatar} alt={user.displayName} />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <h3
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  margin: 2,
                }}
              >
                <b> {username}</b>
              </h3>

              <MenuItem onClick={handleMenuClose}>
                <Link
                  to={`/user/myprofile`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <div>
            <Link to="/login">
              <LoginButton variant="contained">Login</LoginButton>
            </Link>
            <Link to="/register">
              <RegisterButton variant="outlined">Register</RegisterButton>
            </Link>
          </div>
        )}
      </Stack>
    </Stack>
  );
};

export default Navbar;
