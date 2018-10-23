import React from 'react';
import Navbar from './navbar';

const withLayout = WrappedComponent =>
  class Layout extends React.Component {
    static getInitialProps(ctx) {
      return WrappedComponent.getInitialProps
        ? WrappedComponent.getInitialProps(ctx)
        : {};
    }

    render() {
      return (
        <div>
          <Navbar />
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };

export default withLayout;
