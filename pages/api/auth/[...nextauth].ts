import NextAuth from "next-auth";
import Guilded from "next-auth-guilded";

export default NextAuth({
  secret: "SDUIAFHSDIUFHSD",
  providers:
    process.env.NODE_ENV === "development"
      ? []
      : [
          Guilded({
            clientId: process.env.GUILDED_OAUTH_ID!,
            clientSecret: process.env.GUILDED_OAUTH_SECRET!,
          }),
        ],
});
