import { Bio } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ModifiedSession } from "../../types/session";

import NameBadge from "../../components/profile/nameBadge";
import { fetchUser } from "../../lib/api";
import prisma from "../../lib/prisma";
import { GuildedUser, BadgeName, badgeMap } from "../../types/user";
import { MouseEventHandler, useState } from "react";
import Button from "../../components/button";
import { DeNullishFilter } from "../../utility/utils";
import { UserFlairs } from "../../components/profile/flairs";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { userId } = ctx.params as { userId: string };
    const storedUser = userId ? await prisma.user.findFirst({ where: { userId }, include: { defaultBio: true } }) : null;
    const APIUser = storedUser ? await fetchUser(userId) : null;

    return { props: { user: APIUser, bio: storedUser?.defaultBio ?? null } };
};

type Props = {
    user: GuildedUser;
    bio: Bio | null;
};

function ToolbarButton(props: { icon: string; onClick: MouseEventHandler }) {
    return (
        <button className="pt-0.5 pb-0 px-1 rounded bg-guilded-gray text-guilded-subtitle hover:text-guilded-white transition-colors" onClick={props.onClick}>
            <i className={`ci-${props.icon}`} />
        </button>
    );
}

const UserPage: NextPage<Props> = ({ user, bio }) => {
    const { data: session } = useSession();
    const [isInEditingMode, setIsInEditingMode] = useState(false);
    const [bioContent, setBioContent] = useState(bio?.content);
    const [newBioContent, setNewBioContent] = useState(bioContent);
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
                <div className="bg-guilded-gray text-guilded-white w-full min-h-screen flex">
                    <h1 className="text-6xl font-bold mx-auto pt-20 px-8">404, that user doesn&apos;t exist!</h1>
                </div>
            </>
        );
    }

    const isCurrentUser = session && user.id === (session.user as ModifiedSession).id;
    const badges = user.badges.map((b) => badgeMap[b as BadgeName]).filter(DeNullishFilter);
    const newBioLength = newBioContent?.length ?? 0;

    return (
        <>
            <Head>
                <title>Guilded.bio - {user.name}</title>
                <meta name="description" content={`Learn more about Guilded user ${user.name}!`} />
                <meta property="og:title" content={`${user.name}'s bio`} />
                <meta property="og:site_name" content="guilded.bio" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://guilded.bio/u/${user.id}`} />
                <meta property="og:image" content={user.profilePictureLg} />
                <meta
                    property="og:description"
                    content={`${
                        bio?.content
                            ? bio.content.length > 50
                                ? bio.content.slice(0, 50) + "..."
                                : bio.content
                            : "No bio yet, but we're sure they're an amazing person!"
                    }`}
                />
                <meta name="theme-color" content="#F5C400" />
                <meta property="twitter:image" content="summary_large_image" />
            </Head>
            <div className="bg-guilded-gray text-guilded-white w-full min-h-screen">
                <div className="mx-auto max-w-2xl py-8 px-4">
                    <div className="bg-guilded-slate rounded-xl p-5 sm:px-8 shadow">
                        <div className="flex">
                            <Image src={user.profilePicture} alt={`${user.name}'s avatar`} className="rounded-full shadow-md" height="120" width="120" />
                            <div className="flex flex-col pl-6 my-auto">
                                <div className="flex">
                                    <h1 className="pr-2 text-2xl md:text-3xl font-bold">{user.name}</h1>
                                    {isCurrentUser && <NameBadge text="You" color="blue" />}
                                    {badges.map((b) => (
                                        <NameBadge key={b.iconUrl} iconURL={b.iconUrl} text={b.label} color={b.color} />
                                    ))}
                                </div>
                                <UserFlairs user={user} />
                            </div>
                        </div>
                        <hr className="border border-guilded-gray mt-4 mb-4" />
                        {isInEditingMode ? (
                            <form onSubmit={handleSubmit}>
                                <div className="text-white flex flex-wrap">
                                    <textarea
                                        id="newBioContent"
                                        defaultValue={bio?.content ? bioContent : ""}
                                        maxLength={250}
                                        onChange={(data) => setNewBioContent(data.target.value)}
                                        className="w-full px-3 pt-3 pb-40 rounded-lg bg-guilded-gray resize-none"
                                    />
                                    <p
                                        className={`ml-auto ${newBioLength === 250 ? "font-bold" : ""} ${
                                            newBioLength >= 200 ? "text-red-400/70" : newBioLength >= 100 ? "text-guilded-gilded/70" : "text-guilded-white/70"
                                        }`}
                                    >
                                        {newBioContent?.length ? newBioContent.length : bioContent?.length}/250
                                    </p>
                                </div>
                                <div className="pt-4">
                                    <Button>Save</Button>
                                    <button
                                        form=""
                                        className="ml-3 font-bold text-guilded-subtitle hover:text-guilded-white transition-colors"
                                        onClick={() => {
                                            setIsInEditingMode(false);
                                            setNewBioContent(bioContent ?? "");
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex">
                                <div className="flex w-full max-h-48 overflow-y-auto overflow-x-hidden">
                                    {bio?.content ? (
                                        <p className="text-clip break-all whitespace-pre-wrap">{bioContent}</p>
                                    ) : (
                                        <p className="italic text-guilded-subtitle break-all">
                                            No content yet, but we&apos;re sure they&apos;re an amazing person!
                                        </p>
                                    )}
                                </div>
                                {isCurrentUser && (
                                    <div className="ml-auto text-xl pl-4">
                                        <ToolbarButton
                                            icon="edit"
                                            onClick={() => {
                                                setIsInEditingMode(true);
                                            }}
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
