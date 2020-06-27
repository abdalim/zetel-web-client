import CssBaseline from '@material-ui/core/CssBaseline'
import NextApp, { AppContext } from 'next/app'
import Head from 'next/head'
import React from 'react'

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
    const { Component, pageProps } = this.props

    return (
      <>
        <CssBaseline />
        <Head>
          <title>Zetel sampai setel</title>
        </Head>
        <Component {...pageProps} />
      </>
    )
  }
}

export default MyApp
