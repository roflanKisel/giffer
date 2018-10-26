import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { onlyUpdateForKeys } from 'recompose';
import { Link } from '../routes';

export const NavbarItem = ({ name, link }) => (
  <Link route={link}>
    <StyledNavbarItem>{name}</StyledNavbarItem>
  </Link>
);

const StyledNavbarItem = styled.span`
  padding: 10px 15px 10px 15px;
  cursor: pointer;
  color: white;
  font-size: 19px;
  transition: 0.3s;

  &:hover {
    background-color: #315591;
  }
`;

NavbarItem.defaultProps = {
  name: '',
};

NavbarItem.propTypes = {
  name: PropTypes.string,
  link: PropTypes.string.isRequired,
};

export default onlyUpdateForKeys(['name', 'link'])(NavbarItem);
