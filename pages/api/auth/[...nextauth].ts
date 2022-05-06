import NextAuth from "next-auth";
import { stringify } from "querystring";

export default NextAuth({
  callbacks: {
    session({ session, token, user }) {
      return session; // The return type will match the one returned in `useSession()`
    },
  },
  providers: [
    {
      id: "guilded",
      clientId: process.env.GUILDED_OAUTH_ID,
      clientSecret: process.env.GUILDED_OAUTH_SECRET,
      name: "guilded",
      type: "oauth",
      version: "2.0",
      authorization: {
        url: "https://authlink.guildedapi.com/auth",
        params: { scope: "identify" },
      },
      token: {
        url: "https://oauth.guildedapi.com/v1/token",
        async request(context) {
          const data = await fetch(`https://oauth.guildedapi.com/v1/token`, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
            body: stringify({
              client_id: context.provider.clientId,
              client_secret: context.provider.clientSecret,
              grant_type: "authorization_code",
              code: context.params.code,
            }),
          }).then((x) => x.json());
          return { tokens: data };
        },
      },
      userinfo: "https://oauth.guildedapi.com/v1/users/@me",
      profile(data) {
        return {
          id: data.id,
          name: data.name,
          avatar: data.avatar,
          banner: data.banner,
          createdAt: data.banner,
        };
      },
    },
  ],
});
