import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Layout from "./layout";
import Head from "next/head";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="keywords" content="guilded, guilded.gg, guilded.bio, guilded bio, guilded user" />
                <meta name="author" content="Yoki Labs" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <SessionProvider session={session}>
                <Layout>
                    <Component {...pageProps} />
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </Layout>
            </SessionProvider>
        </>
    );
}

export default MyApp;
