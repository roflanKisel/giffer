import React from 'react';
import styled from 'styled-components';
import NavbarItem from './navbar-item';

export const Navbar = () => (
  <StyledNavbar>
    <StyledTitle>Giffer</StyledTitle>
    <StyledNavigation>
      <NavbarItem name="Home" link="/" />
      <NavbarItem name="About" link="/about" />
    </StyledNavigation>
  </StyledNavbar>
);

const StyledNavbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: #4578cc;
  width: 100%;
  z-index: 0;
`;

const StyledTitle = styled.p`
  font-size: 22px;
  justify-self: flex-start;
  margin: 0px;
  margin-left: 5px;
  font-weight: bold;
  color: white;
  user-select: none;
`;

const StyledNavigation = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default Navbar;
