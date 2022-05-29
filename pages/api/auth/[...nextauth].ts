import NextAuth from "next-auth";
import Guilded from "next-auth-guilded";
import prisma from "../../../lib/prisma";
import { ModifiedSession } from "../../../types/session";

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
            const existingUser = await prisma.user.findFirst({ where: { userId: user.id } });
            if (!existingUser)
                await prisma.user.create({
                    data: {
                        userId: user.id,
                    },
                });
            return true;
        },
    },
});
