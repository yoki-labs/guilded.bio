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
            session?.user && ((session.user as ModifiedSession).id = token.sub);
            return session;
        },
        async signIn({ profile }) {
            if (!profile.sub) return false;
            const existingUser = await prisma.user.findFirst({ where: { email: profile.email } });
            if (!existingUser)
                await prisma.user.create({
                    data: {
                        userId: profile.sub,
                    },
                });
            return true;
        },
    },
});
