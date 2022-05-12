import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider
      session={
        process.env.VERCEL || process.env.NODE_ENV === "development"
          ? {
              expires: 140000,
              user: {
                email: "test@guilded.bio",
                image:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png",
                name: `test account ${Math.floor(Math.random() * 10000)}`,
              },
            }
          : session
      }
    >
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
