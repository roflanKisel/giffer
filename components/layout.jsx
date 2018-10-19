import React from 'react';
import PropTypes from 'prop-types';
import { onlyUpdateForKeys } from 'recompose';
import Navbar from './navbar';

export const Layout = ({ children }) => (
  <div>
    <Navbar />
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default onlyUpdateForKeys(['children'])(Layout);
