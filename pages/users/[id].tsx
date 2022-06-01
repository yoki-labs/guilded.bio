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
import { DeNullishFilter, TruncateText } from "../../utility/utils";
import { UserFlairs } from "../../components/profile/flairs";
import Link from "next/link";
import { toast } from "react-toastify";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id } = ctx.params as { id: string };
    const storedUser = id ? await prisma.user.findFirst({ where: { id }, include: { defaultBio: true } }) : null;
    const APIUser = storedUser ? await fetchUser(id) : null;

    return { props: { user: APIUser, bio: storedUser?.defaultBio ?? null } };
};

type Props = {
    user: GuildedUser;
    bio: Bio | null;
};

function ToolbarButton(props: { icon: string; onClick: MouseEventHandler }) {
    return (
        <button
            className="block pt-0.5 pb-0 px-1 rounded bg-guilded-gray text-guilded-subtitle hover:text-guilded-white transition-colors"
            onClick={props.onClick}
        >
            <i className={`ci-${props.icon}`} />
        </button>
    );
}

const UserPage: NextPage<Props> = ({ user, bio }) => {
    const { data: session } = useSession();
    const [isInEditingMode, setIsInEditingMode] = useState(false);
    const [userBio, setUserBio] = useState(bio);

    /**
     * @var bioContent - Users currently saved bio
     * @var newBioContent - Potentially new bio, which is just an edited current bio. Set equal to bioContent for initial save button disable.
     */
    const [bioContent, setBioContent] = useState(userBio?.content);
    const [newBioContent, setNewBioContent] = useState(bioContent);

    const handleSubmit = async (event: any) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault();

        if (!event.target) return;

        // If the bio hasn't changed ignore.
        if (newBioContent === bioContent) return;

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(userBio ? `/api/users/${user.id}/bios/${userBio.id}` : `/api/users/${user.id}/bios`, {
            method: userBio ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // author: user.id is a placeholder for now until i get auth on the API settled.
            body: JSON.stringify(userBio ? { content: newBioContent } : { content: newBioContent, default: true, author: user.id }),
        });

        if (!response.ok) {
            const data = (await response.json().catch(() => ({
                error: {
                    message: "Unparseable.",
                },
            }))) as { error: { message: string } };
            return toast.error(data.error.message);
        }

        const data = (await response.json()) as { bio: Bio };

        setIsInEditingMode(false);

        // User bio
        setUserBio(data.bio);
        setBioContent(data.bio.content);
        setNewBioContent(data.bio.content);

        return true;
    };

    const handleDelete = async () => {
        const confirmed = confirm("Are you sure you want to delete this bio? This cannot be undone!");
        if (!confirmed || !userBio) return;

        const response = await fetch(`/api/users/${user.id}/bios/${userBio.id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            const data = await response.json();
            return toast.error(data.error.message);
        }

        setUserBio(null);
        setBioContent("");
        setNewBioContent("");
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
                    content={`${bioContent?.length ? TruncateText(bioContent, 125) : "No bio yet, but we're sure they're an amazing person!"}`}
                />
                <meta name="theme-color" content="#F5C400" />
            </Head>
            <div className="bg-guilded-gray text-guilded-white w-full min-h-screen">
                <div className="mx-auto max-w-2xl py-8 px-4">
					<div className="sm:h-full">
						<div style={{
							backgroundImage: `linear-gradient(to top, rgb(41 43 50 / var(--tw-bg-opacity)) 5%, transparent 60%), url(${user.profileBannerLg ?? '/default-banner.png'})`,
							height: "250px",
						}} className={`rounded-t-[10px] bg-contain bg-center sm:bg-cover rounded-b-none bg-no-repeat`}>
							<div className="pl-4 sm:pl-6 h-full flex-col sm:flex-row flex align-center">
								<div className="h-fit mt-auto sm:my-auto flex relative rounded-full">
									<img src={user.profilePicture} alt={`${user.name}'s avatar`} className="rounded-full shadow-md bg-guilded-slate guilded-border-solid" height="120" width="120" />
									{isCurrentUser && (
										<Link href="/settings">
											<a className="z-10 mt-auto">
												<i className="ci-settings rounded-full p-1 text-xl -ml-7 bg-guilded-slate text-guilded-subtitle hover:text-guilded-white transition-colors" />
											</a>
										</Link>
									)}
								</div>								
								<div className="flex flex-col sm:pt-4 sm:pl-4 mb-auto sm:my-auto">
									<div className="flex-col md:flex-row flex">
										<div className="flex">
											<h1 className={`text-shadow pr-2 ${user.name.length > 15 ? 'text-xl truncate' : 'text-2xl'} font-bold`}>{user.name}</h1>
											{isCurrentUser && <NameBadge text="You" color="blue" />}
										</div>
										<div className="flex mt-1">
											{badges.map((b) => (
												<NameBadge key={b.iconUrl} iconURL={b.iconUrl} text={b.label} color={b.color} />
											))}
										</div>
									</div>
									<UserFlairs user={user} />
								</div>
							</div>
						</div>
					</div>
                    <div className="bg-guilded-slate rounded-xl rounded-t-none p-5 pt-0 sm:px-8 shadow">
                        {isInEditingMode ? (
                            <form onSubmit={handleSubmit}>
                                <div className="text-white flex flex-wrap">
                                    <textarea
                                        id="newBioContent"
                                        defaultValue={bioContent?.length ? bioContent : ""}
                                        maxLength={250}
                                        onChange={(data) => setNewBioContent(data.target.value)}
                                        className="w-full px-3 pt-3 pb-40 rounded-lg bg-guilded-gray resize-none"
                                    />
                                    <p
                                        className={`ml-auto ${newBioLength === 250 ? "font-bold" : ""} ${
                                            newBioLength >= 200 ? "text-red-400/70" : newBioLength >= 100 ? "text-guilded-gilded/70" : "text-guilded-white/70"
                                        }`}
                                    >
                                        {newBioContent == null ? 0 : newBioContent.length}/250
                                    </p>
                                </div>
                                <div className="pt-2">
                                    <Button disabled={newBioContent === bioContent}>Save</Button>
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
                            <div className="flex flex-col sm:flex-row">
                                <div className="flex w-full max-h-48 overflow-y-auto overflow-x-hidden">
                                    {bioContent?.length ? (
                                        <p className="text-clip whitespace-pre-wrap overflow-wrap-anywhere">{bioContent}</p>
                                    ) : (
                                        <p className="italic text-guilded-subtitle break-all">
                                            No content yet, but we&apos;re sure they&apos;re an amazing person!
                                        </p>
                                    )}
                                </div>
                                {isCurrentUser && (
                                    <div className="flex pt-2 space-x-1 sm:inline sm:ml-auto text-xl sm:pl-4 sm:space-y-1 sm:space-x-0 sm:pt-0">
                                        <ToolbarButton
                                            icon="edit"
                                            onClick={() => {
                                                setIsInEditingMode(true);
                                            }}
                                        />
                                        {userBio && !!bioContent?.length && <ToolbarButton icon="trash_full" onClick={handleDelete} />}
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
