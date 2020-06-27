import CssBaseline from '@material-ui/core/CssBaseline'
import NextApp, { AppContext } from 'next/app'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'

import configureStore from '../store'
import { AppState } from '../store/reducers'

const makeStore = (initialState: AppState) => {
  return configureStore(initialState)
}

class MyApp extends NextApp {
  public static async getInitialProps({ Component, ctx }: AppContext) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}
    return { pageProps }
  }

  public async componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  public render() {
    // @ts-ignore TODO fix store type
    const { Component, pageProps, store } = this.props

    return (
      <>
        <CssBaseline />
        <ReduxProvider store={store}>
          <Head>
            <title>Zetel sampai setel</title>
          </Head>
          <Component {...pageProps} />
        </ReduxProvider>
      </>
    )
  }
}

// @ts-ignore TODO
export default withRedux(makeStore)(MyApp)
