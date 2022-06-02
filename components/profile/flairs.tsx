import Image from "next/image";
import { GuildedUser } from "../../types/user";

export const Stonks = (numStonks: number) => {
    // Guilded only displays 3 images max for stonks, so if a user has more than 3 this prevents from adding more than 3.
    const maxStonks = Math.min(3, numStonks);
    const stonks = [...Array(maxStonks)].map((_, i) => (
        <div key={i} className={`first:z-20 even:z-10 last:z-0 even:-ml-[14px] ${maxStonks !== 1 ? "last:-ml-[14px]" : ""}`}>
            <Image src="/stonks.png" height="20" width="20" />
        </div>
    ));

    return stonks;
};

export const Gold = (numGold: number) => {
	// OG Gold has max of 5 images, so minmax.
    const maxGold = Math.min(5, numGold);
    const gold = [...Array(maxGold)].map((_, i) => (
        <div key={i} className={i === 0 ? "" : "-ml-[14px]"}>
            <Image src="/guilded-gold.png" height="20" width="20" />
        </div>
    ));

    return gold;
};

export const GilGang = () => (
    <img
        src="/gilgang.png"
        alt="gil gang"
		className="h-[20px] w-[25px]"
    />
);

export const UserFlairs = (props: { user: GuildedUser }) => {
    const { user } = props;
    const numStonks = user.stonks;
    const numGold = user.flairInfos?.find((f) => f.flair === "guilded_gold_v1")?.amount ?? 0;
    const isGilGang = user.flairInfos?.find((f) => f.flair === "gil_gang");

    return (
        <div id="flairs" className="flex gap-1 vertical-align">
            {!!numStonks && <div className="z-0 flex"> {Stonks(numStonks)} </div>}
            {!!numGold && <div className="z-0 flex"> {Gold(numGold)} </div>}
            {!!isGilGang && (
                <div className="z-0 flex">
                    {" "}
                    <GilGang />{" "}
                </div>
            )}
        </div>
    );
};
