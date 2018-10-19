import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { lifecycle, onlyUpdateForKeys, compose } from 'recompose';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import Preview from './preview';

import { trendingSearchRequest } from '../ducks/searchGifs';

export const ContentArea = ({ contentList, isLoading, isFailure }) => (
  <ContentAreaWrapper>
    {isLoading && <LoadingInfo>Loading...</LoadingInfo>}
    {!isLoading && isFailure && <LoadingInfo>Error fetching data</LoadingInfo>}
    {!isLoading &&
      !isFailure &&
      contentList.map(content => (
        <Preview
          key={content.id}
          id={content.id}
          src={content.images.fixed_height.url}
          preview={content.images.fixed_height_still.url}
          width={content.images.fixed_height.width}
          height={content.images.fixed_height.height}
        />
      ))}
  </ContentAreaWrapper>
);

const ContentAreaWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 80%;
`;

const LoadingInfo = styled.p`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

ContentArea.propTypes = {
  contentList: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isFailure: PropTypes.bool.isRequired,
};

export const ContentAreaWithMounting = lifecycle({
  componentDidMount() {
    const { dispatchTrendingSearchRequest } = this.props;

    console.log('content area')

    dispatchTrendingSearchRequest();
  },
})(ContentArea);

const ExtendedContentArea = compose(
  onlyUpdateForKeys(['contentList', 'isLoading', 'isFailure'])
)(ContentAreaWithMounting);

const mapStateToProps = state => ({
  isLoading: state.gifsData.isLoading,
  isFailure: state.gifsData.isFailure,
  contentList: state.gifsData.content,
});

const mapDispatchToProps = dispatch => ({
  dispatchTrendingSearchRequest: bindActionCreators(
    trendingSearchRequest,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExtendedContentArea);
