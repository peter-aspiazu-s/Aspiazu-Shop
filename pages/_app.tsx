import { useState, useEffect } from 'react';
import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from '../themes'
import { CartProvider, UIProvider, AuthProvider } from '../context';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function App({ Component, pageProps }: AppProps) {

  const [showChild, setShowChild] = useState(false);
    useEffect(() => {
        setShowChild(true);
    }, []);
    if (!showChild) {
        return <></>;
    }

  return (
    <SessionProvider>
      <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}>
        <SWRConfig
          value={{
            // refreshInterval: 3000,
            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
          }}
        >
          <AuthProvider>
            <CartProvider>
              <UIProvider>
                <ThemeProvider theme={ lightTheme }>
                  <CssBaseline />
                  <Component {...pageProps} />
                </ThemeProvider>
              </UIProvider>
            </CartProvider>
          </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  )
}
