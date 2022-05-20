import { NextPage } from "next";
import Head from "next/head";

const About: NextPage = () => {
    return (
        <>
            <Head>
                <title>Guilded.bio - About</title>
            </Head>
            <div className="w-full py-32 px-8 text-center bg-guilded-gilded">
                <div className="m-auto">
                    <h1 className="text-black text-6xl font-bold">About Us</h1>
                </div>
            </div>
            <div className="bg-guilded-slate h-full text-guilded-white">
                <div className="h-screen mx-auto w-full max-w-6xl font-medium text-2xl text-center py-8 px-4 flex">
                    <p>
                        Guilded.bio was born out of a desire for one centralized place for people to express themselves. We found that the posts feature in
                        Guilded simply didn&apos;t suffice as a proper place to introduce yourself for a variety of reasons. Posts were prone to getting buried,
                        which made it difficult for users to find your introduction post. There was a lack of a per-server profile feature, allowing people to
                        disclose certain information to certain servers, and no place to put information like servers that you own, servers that you moderate,
                        and more. We derive inspiration from other platforms like <a href="https://discord.bio">discord.bio</a>. We are built using{" "}
                        <a className="text-guilded-gilded" href="https://nextjs.org/">
                            Next.js
                        </a>
                        ,{" "}
                        <a className="text-guilded-gilded" href="https://tailwindcss.com/">
                            Tailwind
                        </a>
                        , and{" "}
                        <a className="text-guilded-gilded" href="https://reactjs.org/">
                            React
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default About;
