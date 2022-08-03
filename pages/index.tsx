import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";

import Button from "../components/button";
import Link from "next/link";
import { Card } from "../components/profile/card";
import prisma from "../lib/prisma";
import { fetchUser } from "../lib/api";
import { GuildedUser, UserWithBio } from "../types/user";

export const getStaticProps: GetStaticProps = async () => {
    const dbUsers = await prisma.user.findMany({ where: {}, take: 50, include: { defaultBio: true } });
    const fetchedUsers = await (await Promise.all(dbUsers.map((user) => fetchUser(user.id)))).filter(Boolean);
    const combinedUsers = [];
    for (const [index, fetchedUser] of fetchedUsers.entries()) {
        combinedUsers[index] = { ...dbUsers[index], ...fetchedUser };
    }

	// cache and revalidate every like 12 hours
    return { props: { users: combinedUsers }, revalidate: 43_200 };
};

type Props = {
    users: (UserWithBio & GuildedUser)[];
};

const Home: NextPage<Props> = ({ users }: Props) => {
    return (
        <>
            <Head>
                <title>Guilded.bio - Home</title>
                <meta name="description" content="Express yourself on Guilded with a simple link. Explore and find users just like you!" />
            </Head>

            <div className="w-full py-8 md:py-32 px-8 text-center bg-guilded-gilded">
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
            <div className="bg-guilded-gray text-guilded-white w-full flex min-h-screen">
                <div className="mx-auto w-full md:max-w-[100rem] py-5 px-8 md:px-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:auto-cols-min auto-rows-min">
                    {users.map((user) => (
                        <Card key={user.id} user={user} bio={user.defaultBio?.content ?? null} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
