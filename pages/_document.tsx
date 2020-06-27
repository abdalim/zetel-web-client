import { ServerStyleSheets as MuiServerStyleSheets } from '@material-ui/styles'
import Document, {
  DocumentContext,
  Head,
  Main,
  NextScript,
} from 'next/document'
import { ServerStyleSheet as StyledComponentStyleSheets } from 'styled-components'

export default class MyDocument extends Document {
  public static async getInitialProps(ctx: DocumentContext) {
    const styledComponentsSheets = new StyledComponentStyleSheets()
    const muiSheets = new MuiServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledComponentsSheets.collectStyles(
              muiSheets.collect(<App {...props} />)
            ),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {muiSheets.getStyleElement()}
            {styledComponentsSheets.getStyleElement()}
          </>
        ),
      }
    } finally {
      styledComponentsSheets.seal()
    }
  }

  public render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="robots" content="noindex" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
