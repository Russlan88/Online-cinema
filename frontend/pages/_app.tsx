import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import '../app/assets/styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
