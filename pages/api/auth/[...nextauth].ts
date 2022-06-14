import NextAuth from "next-auth";
import Guilded from "next-auth-guilded";
import prisma from "../../../lib/prisma";
import { ModifiedSession } from "../../../types/session";

export default NextAuth({
    secret: "SDUIAFHSDIUFHSD",
    providers: [
        Guilded({
            authorization: { params: { scope: "servers identify" } },
            clientId: process.env.GUILDED_OAUTH_ID!,
            clientSecret: process.env.GUILDED_OAUTH_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            // by default, next-auth does not include the user ID as part of the session object. Crazy, I know
            // this is a glue fix that takes the ID from the token payload (under .sub) and assigns it to the session object
            if (session?.user) {
                if (token.sub) (session.user as ModifiedSession).id = token.sub;
                if (token.accessToken) (session.user as ModifiedSession).accessToken = token.accessToken as string;
            }
            return session;
        },
        async signIn({ user }) {
            const existingUser = await prisma.user.findUnique({ where: { id: user.id } });
            if (!existingUser)
                await prisma.user.create({
                    data: {
                        id: user.id,
                    },
                });
            return true;
        },
    },
});
