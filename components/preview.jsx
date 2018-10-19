import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '../routes';

export class Preview extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
  };

  state = {
    isFocused: false,
  };

  onFocuseSet = () => {
    this.setState({
      isFocused: true,
    });
  };

  onFocuseUnset = () => {
    this.setState({
      isFocused: false,
    });
  };

  render() {
    const { src, preview, height, width, id } = this.props;
    const { isFocused } = this.state;

    return (
      <Link route="gifpage" params={{ id }}>
        <ImageWrapper>
          <StyledImage
            onMouseEnter={this.onFocuseSet}
            onMouseLeave={this.onFocuseUnset}
            src={isFocused ? src : preview}
            height={isFocused ? parseInt(height, 10) + 20 : height}
            width={isFocused ? parseInt(width, 10) + 20 : width}
            alt="http://playfaircapital.com/v2/wp-content/uploads/2013/12/logo-light-appear-here.png"
          />
        </ImageWrapper>
      </Link>
    );
  }
}

const ImageWrapper = styled.div`
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  border-radius: 5px;
  margin: 10px;
  transition: 0.2s;

  &:hover {
    margin: 0px;
  }
`;

export default Preview;
