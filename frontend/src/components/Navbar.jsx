import { Stack, Button, Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

import logo from "../utils/krazy-logo-45.png";
import SearchBar from "./SearchBar";

import { useUser } from "../utils/UserContext";

const LoginButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 20,
  padding: "6px 18px",
  border: "2px solid",
  borderRadius: 30,
  lineHeight: 1.5,
  backgroundColor: "#3DCBA7",
  borderColor: "#3DCBA7",
  "&:hover": {
    backgroundColor: "#45E4BC",
    borderColor: "#3DCBA7",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#2E987D",
    borderColor: "#3DCBA7",
  },
});

const CreatePostButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 20,
  color: "#6b6c7f",
  padding: "6px 18px",
  border: "1px solid",
  borderRadius: 30,
  lineHeight: 1.5,
  marginLeft: 40,
  backgroundColor: "#b7b9f7",
  borderColor: "#b7b9f7",
  "&:hover": {
    backgroundColor: "#D9DAFF",
    borderColor: "#6b6c7f",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#b7b9f7",
    borderColor: "#b7b9f7",
  },
});

const RegisterButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 20,
  padding: "6px 18px",
  border: "2px solid",
  borderRadius: 30,
  lineHeight: 1.5,
  backgroundColor: "#3DCBA7",
  borderColor: "#3DCBA7",
  "&:hover": {
    backgroundColor: "#45E4BC",
    borderColor: "#3DCBA7",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#2E987D",
    borderColor: "#3DCBA7",
  },
});

const Navbar = () => {
  const { user, setUser } = useUser();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    window.location.href = "/";
  };

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
        zIndex: 1,
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" height={45} />
      </Link>

      <Stack direction="row" alignItems={"center"}>
        <SearchBar />
        <Link to="/createPost">
          <CreatePostButton>Create Post</CreatePostButton>
        </Link>

        {user ? (
          <div>
            <Button onClick={handleMenuOpen}>
              <Avatar src={user.photoURL} alt={user.displayName} />
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
              <MenuItem onClick={handleMenuClose}>
                <Link
                  to={`/user/${user}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Profile
                </Link>
              </MenuItem>

              <MenuItem onClick={handleMenuClose}>
                <Link
                  to={`/user/${user}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Change Password
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
