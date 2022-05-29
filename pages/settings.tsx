import { Bio } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { ModifiedSession } from "../types/session";

import NameBadge from "../components/profile/nameBadge";
import { fetchUser } from "../lib/api";
import prisma from "../lib/prisma";
import { GuildedUser, BadgeName, badgeMap } from "../types/user";
import { useState } from "react";
import Button from "../components/button";
import { DeNullishFilter } from "../utility/utils";
import { UserFlairs } from "../components/profile/flairs";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = (await getSession({ req: context.req }))?.user as ModifiedSession | undefined;
    if (!user?.id) {
        return {
            redirect: {
                destination: "/api/auth/signin/guilded?callbackUrl=%2Fsettings",
                permanent: false,
            },
        };
    }

    const storedUser = user.id ? await prisma.user.findFirst({ where: { userId: user.id }, include: { defaultBio: true } }) : null;
    const APIUser = storedUser ? await fetchUser(user.id) : null;
    return { props: { user: APIUser } };
};

type Props = {
    user: GuildedUser;
};

const SettingsPage: NextPage<Props> = ({ user }) => {
    const badges = (user.badges ?? []).map((b) => badgeMap[b as BadgeName]).filter(DeNullishFilter);

    return (
        <>
            <Head>
                <title>Guilded.bio - Settings</title>
                <meta property="og:title" content="Guilded.bio - Settings" />
                <meta property="og:site_name" content="guilded.bio" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://guilded.bio/settings`} />
                <meta name="theme-color" content="#F5C400" />
            </Head>
            <div className="bg-guilded-gray text-guilded-white w-full min-h-screen">
                <div className="mx-auto max-w-2xl py-6 px-4">
                    <div className="bg-guilded-slate rounded-xl p-5 sm:px-8 border border-white/10">
                        <div className="flex">
                            <Image src={user.profilePicture} alt="Your avatar" className="rounded-full shadow-md" height="40" width="40" />
                            <div className="flex flex-col pl-3 my-auto">
                                <div className="flex">
                                    <h1 className="pr-2 text-lg md:text-xl font-bold">{user.name}</h1>
                                    {badges.map((b) => (
                                        <NameBadge key={b.iconUrl} iconURL={b.iconUrl} text={b.label} color={b.color} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className="font-bold text-2xl mt-4">Settings</h1>
                    <p>todo</p>
                    <h1 className="font-bold text-2xl mt-2">Destructive</h1>
                    <Button
                        onClick={async () => {
                            const confirmed = confirm("Are you sure you want to delete all of your data on guilded.bio? This cannot be undone!");
                            if (!confirmed) return;

                            const response = await fetch(`/api/users/${user.id}`, {
                                method: "DELETE",
                            });

                            const data = await response.json();
                            if (!response.ok) return alert(`Error: ${data.error.message}`);
                            signOut();
                        }}
                    >
                        Delete Account
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SettingsPage;
