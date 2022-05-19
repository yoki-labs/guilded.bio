import type { NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import Footer from "../components/footer";
import GiantRectangle from "../components/giantRectangle/giantRectangle";
import Navbar from "../components/navbar/navbar";
import YellowButton from "../components/buttons/yellowButton";
import BlackButton from "../components/buttons/blackButton";
import Link from "next/link";

const Home: NextPage = () => {
    const { data: session } = useSession();

    return (
        <div className="bg-guilded-slate text-guilded-white">
            <Head>
                <title>Guilded.bio</title>
                <meta name="description" content="A platform allowing users to share details about themselves with a simple link." />
            </Head>
            <Navbar />
            <GiantRectangle>
                <div className="h-full px-2 mx-auto w-full max-w-3xl text-center py-5 flex">
                    <div className="m-auto">
                        <h1 className="text-black text-6xl font-bold">Tell the world about yourself</h1>
                        <div className="py-6">
                            <Link href="/bios/create">
                                <BlackButton>
                                    <p className="font-semibold">
                                        Create your own <span className="text-guilded-gilded">bio</span>
                                    </p>
                                </BlackButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </GiantRectangle>
            <div className="h-screen mx-auto w-full max-w-3xl text-center py-5 flex"></div>
            <Footer />
        </div>
    );
};

export default Home;
