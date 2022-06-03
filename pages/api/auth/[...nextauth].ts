import { Prisma } from "@prisma/client";
import NextAuth from "next-auth";
import Guilded from "next-auth-guilded";
import { GuildedProfile } from "next-auth-guilded/dist/types/typings";
import { fetchUser } from "../../../lib/api";
import prisma from "../../../lib/prisma";
import { ModifiedSession } from "../../../types/session";
import { BareUser, GuildedUser } from "../../../types/user";

export default NextAuth({
    secret: "SDUIAFHSDIUFHSD",
    providers: [
        Guilded({
            clientId: process.env.GUILDED_OAUTH_ID!,
            clientSecret: process.env.GUILDED_OAUTH_SECRET!,
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            // by default, next-auth does not include the user ID as part of the session object. Crazy, I know
            // this is a glue fix that takes the ID from the token payload (under .sub) and assigns it to the session object
            session?.user && token.sub && ((session.user as ModifiedSession).id = token.sub);
            return session;
        },
        async signIn({ user }) {
            const { name, avatar, banner } = user as GuildedProfile;
            const { stonks, flairInfos, id, badges } = (await fetchUser(user.id)) as GuildedUser;
            const userDataToCache: Omit<BareUser, "id" | "flairInfos"> & { flairInfos: Prisma.InputJsonArray } = {
                name,
                avatar,
                banner,
                badges: badges ?? [],
                stonks,
                flairInfos: (flairInfos ?? []) as unknown as Prisma.InputJsonArray,
            };

            await prisma.user.upsert({
                create: {
                    id,
                    ...userDataToCache,
                },
                update: userDataToCache,
                where: {
                    id,
                },
            });
            return true;
        },
    },
});
