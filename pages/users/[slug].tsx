import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import BigCard from "../../components/profile/bigCard";

const User: NextPage = () => {
    return (
        <>
            <Head>
                <title>Guilded.bio - About</title>
            </Head>
            <div className="bg-guilded-slate h-full w-full text-guilded-white">
                <div className="mx-auto py-8 px-4 flex"></div>
            </div>
        </>
    );
};

export default User;
