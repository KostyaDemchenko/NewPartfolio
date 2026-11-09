import type { AppProps } from "next/app";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "@/src/app/global.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  );
}
