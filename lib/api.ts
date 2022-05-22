import { GuildedUser } from "../types/user";

export const fetchUser = (id: string) =>
    fetch(`https://www.guilded.gg/api/users/${id}/profilev3`)
        .then((x) => x.json() as Promise<GuildedUser>)
        .catch(() => null);
