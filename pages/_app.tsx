import "../lib/styles/globals.css";
import type { AppProps } from "next/app";
import "../lib/styles/App.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
