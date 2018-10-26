import React from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  searchByQueryRequest,
  trendingSearchRequest,
} from '../ducks/searchGifs';
import withLayout from '../components/layout';
import SearchLine from '../components/search-line';
import ContentArea from '../components/content-area';

class Index extends React.PureComponent {
  static propTypes = {
    dispatchSearchByQueryRequest: PropTypes.func.isRequired,
    dispatchTrendingSearchRequest: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isFailure: PropTypes.bool.isRequired,
    contentList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        url: PropTypes.string,
        previewUrl: PropTypes.string,
        width: PropTypes.string,
        height: PropTypes.string,
        title: PropTypes.string,
      })
    ).isRequired,
  };

  state = {
    searchQuery: '',
  };

  onSearchQueryChange = event => {
    this.setState({
      searchQuery: event.target.value,
    });

    this.performSearch();
  };

  performSearch = () => {
    const { searchQuery } = this.state;
    const {
      dispatchSearchByQueryRequest,
      dispatchTrendingSearchRequest,
    } = this.props;

    if (searchQuery) {
      dispatchSearchByQueryRequest({ searchQuery });
    } else {
      dispatchTrendingSearchRequest();
    }
  };

  render() {
    const { searchQuery } = this.state;
    const {
      isLoading,
      isFailure,
      contentList,
      dispatchTrendingSearchRequest,
    } = this.props;

    return (
      <StyledIndex>
        <SearchLine
          searchQuery={searchQuery}
          onSearchQueryChange={this.onSearchQueryChange}
        />
        <ContentArea
          isLoading={isLoading}
          isFailure={isFailure}
          contentList={contentList}
          handleTrendingSearch={dispatchTrendingSearchRequest}
        />
      </StyledIndex>
    );
  }
}

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
