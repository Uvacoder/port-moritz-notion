import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Providers } from '../components/Providers'

import * as React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers pageProps={pageProps}>
      <Component {...pageProps} />
    </Providers>
  )
}

export default MyApp
