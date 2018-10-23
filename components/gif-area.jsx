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

const StyledImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
