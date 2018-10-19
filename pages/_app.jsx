import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { compose } from 'recompose';
import { injectGlobal } from 'styled-components';
import initializeStore from '../store/store';

class GifferApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

injectGlobal`
  body {
    margin: 0px;
    font-family: Roboto;
  }
`;

export default compose(
  withRedux(initializeStore),
  withReduxSaga({ async: true })
)(GifferApp);
