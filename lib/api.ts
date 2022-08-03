import { GuildedUser } from "../types/user";

export const fetchUser = (id: string) =>
    fetch(`https://www.guilded.gg/api/users/${id}/profilev3`)
        .then((x) => x.json() as Promise<GuildedUser | { code: string; message: string }>)
        .then((x) => ("code" in x && x.code === "NotFoundError" ? null : x))
        .catch(() => null);
