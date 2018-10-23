import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withLayout from '../components/layout';
import GifArea from '../components/gif-area';

import { searchByIdRequest } from '../ducks/searchGifs';

export class Gifpage extends React.Component {
  static getInitialProps({ ctx: { query } }) {
    return { query };
  }

  render() {
    const {
      query,
      dispatchSearchByIdRequest,
      gif,
      isLoading,
      isFailure,
    } = this.props;

    return (
      <GifArea
        gif={gif}
        gifId={query.id}
        handleSearchById={dispatchSearchByIdRequest}
        isLoading={isLoading}
        isFailure={isFailure}
      />
    );
  }
}

Gifpage.defaultProps = {
  gif: null,
};

Gifpage.propTypes = {
  dispatchSearchByIdRequest: PropTypes.func.isRequired,
  query: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  gif: PropTypes.shape({
    url: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
  }),
  isLoading: PropTypes.bool.isRequired,
  isFailure: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.gifsData.isLoading,
  isFailure: state.gifsData.isFailure,
  gif: state.gifsData.searchedGif,
});

const mapDispatchToProps = dispatch => ({
  dispatchSearchByIdRequest: bindActionCreators(searchByIdRequest, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLayout(Gifpage));
