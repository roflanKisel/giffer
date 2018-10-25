import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '../routes';
import Preview from './preview';

class HoverPreview extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

  state = {
    isSelected: false,
  };

  onSelectedSet = () => {
    this.setState({
      isSelected: true,
    });
  };

  onSelectedUnset = () => {
    this.setState({
      isSelected: false,
    });
  };

  render() {
    const { src, preview, height, width, id, title } = this.props;
    const { isSelected } = this.state;

    return (
      <Link route="gifpage" params={{ id }}>
        <ImageWrapper
          onMouseEnter={this.onSelectedSet}
          onMouseLeave={this.onSelectedUnset}
        >
          <Preview
            src={isSelected ? src : preview}
            height={height}
            width={width}
            alt={title}
            selected={isSelected}
          />
        </ImageWrapper>
      </Link>
    );
  }
}

const ImageWrapper = styled.a`
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default HoverPreview;
