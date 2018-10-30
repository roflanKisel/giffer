import React from 'react';
import styled from 'styled-components';
import { lifecycle } from 'recompose';
import PropTypes from 'prop-types';
import withLoadingStatus from './loading-status';

const GifArea = ({ gif }) => (
  <div>
    {gif && (
      <StyledImageWrapper>
        <StyledImage src={gif.url} height={gif.height} width={gif.width} />
        <StyledText>Username: {gif.username}</StyledText>
        <StyledText>Rating: {gif.rating}</StyledText>
      </StyledImageWrapper>
    )}
  </div>
);

GifArea.defaultProps = {
  gif: null,
};

GifArea.propTypes = {
  gif: PropTypes.shape({
    url: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
  }),
};

const StyledText = styled.div`
  font-size: 22px;
  margin: 5px 0px 5px 0px;
`;

const StyledImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  padding: 20px;
`;

const StyledImage = styled.img`
  border-radius: 10px;
`;

const GifAreaWithMounting = lifecycle({
  componentDidMount() {
    const { handleSearchById, gifId } = this.props;

    handleSearchById({ gifId });
  },
})(withLoadingStatus(GifArea));

export default GifAreaWithMounting;
