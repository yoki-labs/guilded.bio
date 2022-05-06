import type { NextPage } from "next";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <Head>
        <title>Guilded.bio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span>Guilded.bio</span>
        </h1>
        {session ? (
          <p>Welcome {session.user!.name}!</p>
        ) : (
          <button className={styles.login_button} onClick={() => signIn()}>
            <p>Login</p>
          </button>
        )}
      </main>

      <footer className={styles.footer}>Created by Yoki Labs</footer>
    </div>
  );
};

export default Home;
