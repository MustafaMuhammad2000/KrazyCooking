import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


//Styles for the GUI
const SidebarWrapper = styled.div`
  position: relative;
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 95%;
  left: ${({ isOpen }) => (isOpen ? "180px" : "0")};
  background-color: white;
  border: 1px solid #333;
  cursor: pointer;
  outline: none;
  padding: 10px;
  margin: 10px 0;
  z-index: 1;
`;

const SidebarMenu = styled.div`
  width: ${({ isOpen }) => (isOpen ? "180px" : "0")};
  height: 100vh;
  background-color: #f1f1f1;
  position: fixed;
  top: 15;
  left: ${({ isOpen }) => (isOpen ? "0" : "-200px")};
  transition: width 0.5s, left 0.5s;
  z-index: 10;
`;

const SidebarLink = styled(Link)`
  display: block;
  padding: 12px 24px;
  font-size: 18px;
  font-weight: bold;
  color: #6b6c7f;
  text-decoration: none;
  border-left: 4px solid transparent;
  text-align: center;
  border-bottom: 1px solid #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;


  &:hover {
    background-color: #f7f7f7;
  }

  &.active {
    border-left: 4px solid #3DCBA7;
    color: #3DCBA7;
  }
`;

const SidebarLinkSpecial = styled(Link)`
  display: block;
  padding: 12px 24px;
  font-size: 17px;
  font-weight: bold;
  color: #6b6c7f;
  text-decoration: none;
  border-left: 4px solid transparent;
  text-align: center;
  border-bottom: 1px solid #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;


  &:hover {
    background-color: #f7f7f7;
  }

  &.active {
    border-left: 4px solid #3DCBA7;
    color: #3DCBA7;
  }
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  ///toggles the sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarWrapper>
      <ToggleButton isOpen={isOpen} onClick={toggleSidebar}>
        {isOpen ? "❮" : "❯"}
      </ToggleButton>
      <SidebarMenu isOpen={isOpen}>
        <SidebarLink to="/">🏠 Home</SidebarLink>
        <SidebarLink to="/saved">💾 Saved&nbsp;Posts</SidebarLink>
        <SidebarLink to="/myPosts">✏️ My Posts</SidebarLink>
      </SidebarMenu>
    </SidebarWrapper>
  );
};

export default Sidebar;
