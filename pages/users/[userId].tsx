import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ModifiedSession } from "../../types/session";

import NameBadge from "../../components/profile/nameBadge";
import { fetchUser } from "../../lib/api";
import prisma from "../../lib/prisma";
import { BadgeInfo, GuildedUser, UserWithBio, BadgeName, badgeMap } from "../../types/user";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { userId } = ctx.params as { userId: string };
    const storedUser = userId ? await prisma.user.findFirst({ where: { userId }, include: { defaultBio: true } }) : null;
    const APIUser = storedUser ? await fetchUser(userId) : null;

    return { props: { storedUser, APIUser } };
};

type Props = {
    storedUser: UserWithBio | null;
    APIUser: GuildedUser | null;
};

const UserPage: NextPage<Props> = ({ storedUser, APIUser }: Props) => {
    const { data: session } = useSession();

    if (!storedUser || !APIUser) {
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

    const isCurrentUser = session && APIUser.id === (session.user as ModifiedSession).id;
    const badges: BadgeInfo[] = APIUser.badges.map((b) => badgeMap[b as BadgeName]).filter((b): b is Exclude<BadgeInfo, null | undefined | "" | 0> => !!b);

    return (
        <>
            <Head>
                <title>Guilded.bio - {APIUser.name}</title>
            </Head>
            <div className="bg-guilded-gray text-guilded-white w-full min-h-screen">
                <div className="mx-auto max-w-2xl py-8 px-4">
                    <div className="bg-guilded-slate rounded-xl p-5 sm:px-7 sm:px-8 shadow">
                        <div className="flex">
                            <Image src={APIUser.profilePicture} alt={`${APIUser.name}'s avatar`} className="rounded-full shadow-md" height="120" width="120" />
                            <div className="flex flex-col pl-6 my-auto">
                                <div className="flex">
                                    <h1 className="pr-3 text-2xl md:text-3xl font-bold">{APIUser.name}</h1>
                                    {isCurrentUser && <NameBadge text="You" color="blue" />}
                                    {badges.map((b) => (
                                        <NameBadge key={b.iconUrl} iconURL={b.iconUrl} text={b.label} color={b.color} />
                                    ))}
                                </div>
                                <div></div>
                            </div>
                        </div>
                        <hr className="border border-guilded-gray my-4" />
                        {storedUser.defaultBio?.content ? (
                            <p className="text-clip">{storedUser.defaultBio?.content}</p>
                        ) : (
                            <p className="italic text-guilded-subtitle">No content yet, but we&apos;re sure they&apos;re an amazing person!</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserPage;
