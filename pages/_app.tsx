import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
      {process.env.NODE_ENV !== "production" ? null : (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-F60WY9L12P"
            strategy="worker"
          />
          <Script id="google-analytics" strategy="worker">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-F60WY9L12P');
            `}
          </Script>
        </>
      )}
    </>
  );
}

export default MyApp;
