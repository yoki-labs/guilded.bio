import { Bio, User } from "@prisma/client";

export interface GuildedUser {
    id: string;
    name: string;
    subdomain: string;
    aliases: Alias[];
    profilePictureSm: string;
    profilePicture: string;
    profilePictureLg: string;
    profilePictureBlur: string;
    profileBannerBlur: string;
    profileBannerLg: string;
    profileBannerSm: string;
    aboutInfo: AboutInfo;
    badges: string[];
    createdAt: string;
}

export interface AboutInfo {
    tagLine: string;
}

export interface Alias {
    alias: string;
    discriminator: null;
    name: string;
    createdAt: string;
    userId: string;
    gameId: number;
    socialLinkSource: null;
    editedAt: string;
    socialLinkHandle: null;
    playerInfo: null;
}

export type UserWithBio = User & { defaultBio: Bio | null };
