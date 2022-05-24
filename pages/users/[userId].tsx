import { Bio, User } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ModifiedSession } from "../../types/session";

import NameBadge from "../../components/profile/nameBadge";
import { fetchUser } from "../../lib/api";
import prisma from "../../lib/prisma";
import { GuildedUser } from "../../types/user";
import { MouseEventHandler, useState } from "react";
import Button from "../../components/button";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { userId } = ctx.params as { userId: string };
    const storedUser = userId ? await prisma.user.findFirst({ where: { userId }, include: { defaultBio: true } }) : null;
    const APIUser = storedUser ? await fetchUser(userId) : null;

    return { props: { user: APIUser, bio: storedUser?.defaultBio } };
};

type Props = {
    user: GuildedUser;
    bio: Bio | null;
};

function ToolbarButton(props: { icon: string, onClick: MouseEventHandler }) {
    return (
        <button
            className="pt-0.5 pb-0 px-1 rounded bg-guilded-gray text-guilded-subtitle hover:text-guilded-white transition-colors"
            onClick={props.onClick}
        >
            <i className={`ci-${props.icon}`} />
        </button>
    )
}

const UserPage: NextPage<Props> = ({ user, bio }) => {
    const { data: session } = useSession();
    const [isInEditingMode, setIsInEditingMode] = useState(false);
    const [newBioContent, setNewBioContent] = useState("");
    const [bioContent, setBioContent] = useState(bio?.content);
    const handleSubmit = async (event: any) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault();

        if (!event.target) return;

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(bio ? `/api/users/${user.id}/bios/${bio.id}` : `/api/users/${user.id}/bios`, {
            method: bio ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // author: user.id is a placeholder for now until i get auth on the API settled.
            body: JSON.stringify(bio ? { content: newBioContent } : { content: newBioContent, default: true, author: user.id }),
        });

        const data = await response.json();
        if (!response.ok) return alert(`Error!: ${data.error.message}`);
        setIsInEditingMode(false);
        setBioContent(newBioContent);
        return true;
    };

    if (!user) {
        return (
            <>
                <Head>
                    <title>Guilded.bio - 404</title>
                </Head>
                <div className="bg-guilded-gray text-guilded-white w-full min-h-screen">
                    <h1>404</h1>
                </div>
            </>
        );
    }
    const isCurrentUser = session && user.id === (session.user as ModifiedSession).id;
    const badges: string[] = user.badges;
    return (
        <>
            <Head>
                <title>Guilded.bio - {user.name}</title>
            </Head>
            <div className="bg-guilded-gray text-guilded-white w-full min-h-screen">
                <div className="mx-auto max-w-2xl py-8 px-4">
                    <div className="bg-guilded-slate rounded-xl p-5 sm:px-8 shadow">
                        <div className="flex">
                            <Image src={user.profilePicture} alt={`${user.name}'s avatar`} className="rounded-full" height="120" width="120" />
                            <div className="my-auto flex">
                                <h1 className="pl-6 pr-3 text-2xl md:text-3xl font-bold">{user.name}</h1>
                                {isCurrentUser && <NameBadge text="You" color="blue" />}
                            </div>
                        </div>
                        <hr className="border border-guilded-gray mt-4 mb-2" />
                        {isInEditingMode ? (
                            <form onSubmit={handleSubmit}>
                                <div className="text-white flex flex-wrap">
                                    <textarea
                                        id="newBioContent"
                                        defaultValue={bio?.content ?? ""}
                                        maxLength={250}
                                        onChange={(data) => setNewBioContent(data.target.value)}
                                        className="w-full px-2 pt-3 pb-40 rounded-lg bg-guilded-gray resize-none overflow-hidden"
                                    />
                                </div>
                                <div className="pt-2">
                                    <Button>Save</Button>
                                    <button
                                        form={null}
                                        className="ml-3 font-bold text-guilded-subtitle hover:text-guilded-white transition-colors"
                                        onClick={() => {
                                            setIsInEditingMode(false)
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex">
                                {bio?.content ? (
                                    <p className="text-clip px-2 pt-3">{bioContent}</p>
                                ) : (
                                    <p className="italic text-guilded-subtitle">No content yet, but we&apos;re sure they&apos;re an amazing person!</p>
                                )}
                                {isCurrentUser && (
                                    <div className="ml-auto text-xl pl-4">
                                        <ToolbarButton
                                            icon="edit"
                                            onClick={() => {setIsInEditingMode(true)}}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserPage;
