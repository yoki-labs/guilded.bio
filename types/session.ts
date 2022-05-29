import { DefaultSession } from "next-auth";

// this type extends the session and adds the ID property to it. The reason for it being string, null, or undefined
// is due to next-auth type requirements. null and undefined signify a state of the session.
export type ModifiedSession = DefaultSession["user"] & { id: string };
