import type { NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import Button from "../components/button";
import Footer from "../components/footer";
import Navbar from "../components/navbar/navbar";

const Home: NextPage = () => {
    const { data: session } = useSession();

    return (
        <div className="bg-guilded-slate text-guilded-white">
            <Head>
                <title>Guilded.bio</title>
                <meta name="description" content="A platform allowing users to share details about themselves with a simple link." />
            </Head>

            <Navbar />
            <div className="h-screen mx-auto w-full max-w-3xl text-center py-5 flex">
                <div className="m-auto">
                    <h1 className="font-bold text-4xl">
                        Welcome to <span className="text-guilded-gilded">Guilded.bio</span>
                    </h1>
                    {session ? (
                        <>
                            <p>Welcome {session.user!.name}!</p>
                            <Button onClick={() => signOut()}>Logout</Button>
                        </>
                    ) : (
                        <Button onClick={() => signIn()}>Login</Button>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
