import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Preview = ({ src, height, width, alt, selected }) => (
  <StyledImage
    src={src}
    height={height}
    width={width}
    alt={alt}
    selected={selected}
  />
);

Preview.propTypes = {
  src: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
};

const StyledImage = styled.img`
  border-radius: 5px;
  margin: 10px;
  transition: 0.2s;
  max-width: 100%;
  z-index: ${props => (props.selected ? '1' : '0')};
  transform: ${props => (props.selected ? 'scale(1.3, 1.3)' : 'scale(1, 1)')};
`;

export default Preview;
