import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React from "react"
import { withBlitz } from "app/blitz-client"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { configureChains, createClient, WagmiConfig, mainnet } from "wagmi"
import { publicProvider } from "wagmi/providers/public"

import "app/core/styles/index.css"
import "@rainbow-me/rainbowkit/styles.css"

const { chains, provider } = configureChains([mainnet], [publicProvider()])
const { connectors } = getDefaultWallets({
  appName: "Feadbeatw",
  chains,
})
const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
})

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          {getLayout(<Component {...pageProps} />)}
        </RainbowKitProvider>
      </WagmiConfig>
    </ErrorBoundary>
  )
}

export default withBlitz(MyApp)
