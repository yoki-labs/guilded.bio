import { User } from "@prisma/client";

export const DeNullishFilter = <T>(b: T): b is Exclude<T, null | undefined | 0 | ""> => !!b;
export const TruncateText = (content: string, length = 150) => (content.length > length ? content.slice(0, length) + "..." : content);
export const haveFullUserData = (user: User) => user.banner && user.avatar && user.name;
export const profilePicture = (url: string | null) => url ?? "https://img.guildedcdn.com/asset/DefaultUserAvatars/profile_1.png";
