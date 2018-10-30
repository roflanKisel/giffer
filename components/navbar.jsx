import React from 'react';
import styled from 'styled-components';
import NavbarItem from './navbar-item';

export const Navbar = () => (
  <StyledNavbar>
    <StyledTitle>Giffer</StyledTitle>
    <StyledNavigation>
      <NavbarItem name="Trending" link="/" />
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
  padding: 10px 15px 10px 15px;
  font-size: 19px;
  justify-self: flex-start;
  margin: 0px;
  font-weight: bold;
  color: white;
  user-select: none;
`;

const StyledNavigation = styled.div`
  justify-self: flex-end;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export default Navbar;
