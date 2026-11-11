import type { AppProps } from "next/app";
import { Fira_Code } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "@/src/app/global.scss";

// Self-hosted at build time: no request to Google Fonts, one variable file for all
// weights, preloaded, with a size-adjusted fallback so the text doesn't jump on swap.
const firaCode = Fira_Code({ subsets: ["latin"], display: "swap" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* On :root rather than a wrapper class, so portals (the project modal) get it too. */}
      <style jsx global>{`
        :root {
          --font-fira-code: ${firaCode.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  );
}
