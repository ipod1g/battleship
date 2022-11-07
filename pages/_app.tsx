import "../lib/styles/globals.scss";
import type { AppProps } from "next/app";
import "../lib/styles/App.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
