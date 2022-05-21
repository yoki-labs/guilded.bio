import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import Button from "../components/button";
import Link from "next/link";
import SmallCard from "../components/profile/smallCard";
import prisma from "../lib/prisma";
import { User } from "@prisma/client";
import { fetchUser } from "../lib/api";
import { GuildedUser } from "../types/user";

export const getServerSideProps: GetServerSideProps = async () => {
    const dbUsers = await prisma.user.findMany({ where: {}, take: 10 });
    const fetchedUsers = await Promise.all(dbUsers.map((user) => fetchUser(user.userId)));
    const combinedUsers = [];
    for (const [index, fetchedUser] of fetchedUsers.entries()) {
        combinedUsers[index] = { ...dbUsers[index], ...fetchedUser };
    }

    console.log(combinedUsers.length);
    return { props: { users: combinedUsers } };
};

type Props = {
    users: (User & GuildedUser)[];
};

const Home: NextPage<Props> = ({ users }: Props) => {
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
            <div className="bg-guilded-gray text-guilded-white w-full flex min-h-screen">
                <div className="mx-auto text-center py-5 px-16 inline-grid gap-4 md:grid-cols-3">
                    {users.map((user) => (
                        <SmallCard
                            key={user.id}
                            id={user.userId}
                            name={user.name}
                            iconURL={user.profilePictureLg}
                            badges={[]}
                            bio={user.defaultBioContent ?? "No content yet, but we're sure they're a great person!"}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
