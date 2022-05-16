import type { Session } from "next-auth";
import { useSession as shadowedUseSession } from "next-auth/react";

export const useSession = (): {
    data: Session | null;
    status: string;
} => {
    return process.env.VERCEL || process.env.NODE_ENV === "development"
        ? {
              status: "authenticated",
              data: {
                  expires: "140000",
                  user: {
                      email: "test@guilded.bio",
                      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png",
                      name: `test account ${Math.floor(Math.random() * 10000)}`,
                  },
              },
          }
        : shadowedUseSession();
};
