import React from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  searchByQueryRequest,
  trendingSearchRequest,
} from '../ducks/searchGifs';
import withLayout from '../components/layout';
import SearchLine from '../components/search-line';
import ContentArea from '../components/content-area';

const Index = ({
  isLoading,
  isFailure,
  contentList,
  dispatchSearchByQueryRequest,
  dispatchTrendingSearchRequest,
}) => (
  <StyledIndex>
    <SearchLine handleSearchByQuery={dispatchSearchByQueryRequest} />
    <ContentArea
      isLoading={isLoading}
      isFailure={isFailure}
      contentList={contentList}
      handleTrendingSearch={dispatchTrendingSearchRequest}
    />
  </StyledIndex>
);

const StyledIndex = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
`;

const mapStateToProps = state => ({
  isLoading: state.gifsData.isLoading,
  isFailure: state.gifsData.isFailure,
  contentList: state.gifsData.content,
});

const mapDispatchToProps = dispatch => ({
  dispatchSearchByQueryRequest: bindActionCreators(
    searchByQueryRequest,
    dispatch
  ),
  dispatchTrendingSearchRequest: bindActionCreators(
    trendingSearchRequest,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLayout(Index));
