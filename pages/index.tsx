import type { NextPage } from "next";
import Head from "next/head";

import Button from "../components/button";
import Link from "next/link";
import SmallCard from "../components/profile/smallCard";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Guilded.bio - Home</title>
            </Head>

            <div className="w-full py-32 px-8 text-center bg-guilded-gilded">
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
            <div className="bg-guilded-gray text-guilded-white w-screen">
                <div className="h-full w-screen text-center py-5 px-16 inline-grid gap-4 md:grid-cols-3">
                    <SmallCard
                        id="pmb0VA"
                        name="nico"
                        iconURL="/test-pfp.png"
                        badges={[]}
                        bio="biography about me autobiography memoir confessions diary journal profile sketch life story adventures experiences letters saga bio life history personal account personal anecdote personal narrative vita reminiscences self-portrayal annals epic narration recapitulation"
                    />
                    <SmallCard
                        id="pmb0VA"
                        name="nico"
                        iconURL="/test-pfp.png"
                        badges={[]}
                        bio="biography about me autobiography memoir confessions diary journal profile sketch life story adventures experiences letters saga bio life history personal account personal anecdote personal narrative vita reminiscences self-portrayal annals epic narration recapitulation"
                    />
                    <SmallCard
                        id="pmb0VA"
                        name="nico"
                        iconURL="/test-pfp.png"
                        badges={[]}
                        bio="biography about me autobiography memoir confessions diary journal profile sketch life story adventures experiences letters saga bio life history personal account personal anecdote personal narrative vita reminiscences self-portrayal annals epic narration recapitulation"
                    />
                    <SmallCard
                        id="pmb0VA"
                        name="nico"
                        iconURL="/test-pfp.png"
                        badges={[]}
                        bio="biography about me autobiography memoir confessions diary journal profile sketch life story adventures experiences letters saga bio life history personal account personal anecdote personal narrative vita reminiscences self-portrayal annals epic narration recapitulation"
                    />
                    <SmallCard
                        id="pmb0VA"
                        name="nico"
                        iconURL="/test-pfp.png"
                        badges={[]}
                        bio="biography about me autobiography memoir confessions diary journal profile sketch life story adventures experiences letters saga bio life history personal account personal anecdote personal narrative vita reminiscences self-portrayal annals epic narration recapitulation"
                    />
                    <SmallCard
                        id="pmb0VA"
                        name="nico"
                        iconURL="/test-pfp.png"
                        badges={[]}
                        bio="biography about me autobiography memoir confessions diary journal profile sketch life story adventures experiences letters saga bio life history personal account personal anecdote personal narrative vita reminiscences self-portrayal annals epic narration recapitulation"
                    />
                    <SmallCard
                        id="pmb0VA"
                        name="nico"
                        iconURL="/test-pfp.png"
                        badges={[]}
                        bio="biography about me autobiography memoir confessions diary journal profile sketch life story adventures experiences letters saga bio life history personal account personal anecdote personal narrative vita reminiscences self-portrayal annals epic narration recapitulation"
                    />
                    <SmallCard
                        id="pmb0VA"
                        name="nico"
                        iconURL="/test-pfp.png"
                        badges={[]}
                        bio="biography about me autobiography memoir confessions diary journal profile sketch life story adventures experiences letters saga bio life history personal account personal anecdote personal narrative vita reminiscences self-portrayal annals epic narration recapitulation"
                    />
                </div>
            </div>
        </>
    );
};

export default Home;
