import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import SearchLine from '../components/search-line';
import ContentArea from '../components/content-area';
import { lifecycle } from 'recompose';

class Index extends React.Component {
  componentDidMount() {
    console.log('index');
  }

  render() {
    const { className } = this.props;

    return (
      <Layout>
        <div className={className}>
          <SearchLine />
          <ContentArea />
        </div>
      </Layout>
    );
  }
}

const StyledIndex = styled(Index)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
`;

Index.propTypes = {
  className: PropTypes.string.isRequired,
};

export default StyledIndex;
