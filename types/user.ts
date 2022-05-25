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
    badges: BadgeName[];
    flairInfos: FlairInfo[];
    stonks: number;
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

export interface FlairInfo {
    flair: "guilded_gold_v1" | "gil_gang";
    amount: number;
}

export interface BadgeInfo {
    iconUrl: string;
    label: string;
    color: string;
}

const partnerBadge: BadgeInfo = { iconUrl: "/partner-badge.png", label: "", color: "blue" };
const guildedStaff: BadgeInfo = { iconUrl: "/staff-badge.png", label: "Staff", color: "" };

export const badgeMap = {
    PartnerBadge: partnerBadge,
    GuildedStaff: guildedStaff,
} as const;

export type BadgeName = keyof typeof badgeMap;
