import type { NextPage } from "next";
import Head from "next/head";

import Footer from "../components/footer";
import Box from "../components/box";
import Navbar from "../components/navbar/navbar";
import Button from "../components/button";
import Link from "next/link";

const Home: NextPage = () => {
    return (
        <div className="bg-guilded-slate text-guilded-white">
            <Head>
                <title>Guilded.bio</title>
                <meta name="description" content="A platform allowing users to share details about themselves with a simple link." />
            </Head>
            <Navbar />
            <Box>
                <div className="h-full px-2 mx-auto w-full text-center py-5 flex">
                    <div className="m-auto">
                        <h1 className="text-black text-6xl font-bold">Tell the world about yourself</h1>
                        <div className="py-6">
                            <Link href="/bios/create">
                                <Button color="black">
                                    <p className="font-semibold">
                                        Create your own <span className="text-guilded-gilded">bio</span>
                                    </p>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Box>
            <div className="h-screen mx-auto w-full max-w-3xl text-center py-5 flex"></div>
            <Footer />
        </div>
    );
};

export default Home;
