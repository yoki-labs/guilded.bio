import { User } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import BigCard from "../../components/profile/bigCard";
import { fetchUser } from "../../lib/api";
import prisma from "../../lib/prisma";
import { GuildedUser, UserWithBio } from "../../types/user";

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
    return (
        <>
            <Head>
                <title>Guilded.bio - {APIUser?.name ?? "404"}</title>
            </Head>
            <div className="bg-guilded-gray text-guilded-white w-full min-h-screen flex">
                {storedUser && APIUser ? (
                    <div className="mx-auto py-8 px-4">
                        <BigCard
                            id={APIUser.id}
                            name={APIUser.name}
                            iconURL={APIUser.profilePictureLg}
                            bio={storedUser.defaultBio?.content ?? "Nothing yet, but we're sure they're an amazing person!"}
                            badges={APIUser.badges}
                        />
                    </div>
                ) : (
                    <h1>404</h1>
                )}
            </div>
        </>
    );
};

export default UserPage;
