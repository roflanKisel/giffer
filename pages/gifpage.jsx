import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Layout from '../components/layout';

import { searchByIdRequest } from '../ducks/searchGifs';

export class Gifpage extends React.Component {
  static getInitialProps({ ctx: { query } }) {
    return { query };
  }

  componentDidMount() {
    const { dispatch, query } = this.props;

    dispatch(searchByIdRequest({ gifId: query.id }));
  }

  render() {
    const { gif, isLoading, isFailure } = this.props;

    return (
      <Layout>
        {isLoading && <div>Loading...</div>}
        {!isLoading && isFailure && <div>Failure.</div>}
        {!isLoading &&
          !isFailure &&
          gif && (
            <StyledImageWrapper>
              <StyledImage
                src={gif.images.original.url}
                height={gif.images.original.height}
                width={gif.images.original.width}
              />
            </StyledImageWrapper>
          )}
      </Layout>
    );
  }
}

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

Gifpage.propTypes = {
  dispatch: PropTypes.func,
  query: PropTypes.object.isRequired,
  gif: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  isFailure: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.gifsData.isLoading,
  isFailure: state.gifsData.isFailure,
  gif: state.gifsData.searchedGif,
});

export default connect(mapStateToProps)(Gifpage);
