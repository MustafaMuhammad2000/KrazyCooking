import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarWrapper = styled.div`
  position: relative;
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 95%;
  left: ${({ isOpen }) => (isOpen ? "150px" : "0")};
  background-color: white;
  border: 1px solid #333;
  cursor: pointer;
  outline: none;
  padding: 10px;
  margin: 10px 0;
  z-index: 1;
`;

const SidebarMenu = styled.div`
  width: ${({ isOpen }) => (isOpen ? "150px" : "0")};
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
  padding: 10px;
  font-size: 18px;
  color: #333;
  text-decoration: none;

  &:hover {
    background-color: #ddd;
  }
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarWrapper>
      <ToggleButton isOpen={isOpen} onClick={toggleSidebar}>
        {isOpen ? "❮" : "❯"}
      </ToggleButton>
      <SidebarMenu isOpen={isOpen}>
        <SidebarLink to="/">Home</SidebarLink>
        <SidebarLink to="/saved">Saved Posts</SidebarLink>
        <SidebarLink to="/myPosts">My Posts</SidebarLink>
      </SidebarMenu>
    </SidebarWrapper>
  );
};

export default Sidebar;
