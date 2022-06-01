import Image from "next/image";
import Link from "next/link";
import { GuildedUser } from "../../types/user";
import { TruncateText } from "../../utility/utils";
import { UserFlairs } from "./flairs";

export const Card = (props: { user: GuildedUser; bio: string | null }) => {
    const { user } = props;

    return (
        <Link href={`/u/${user.id}`}>
            <a>
                <div className="bg-guilded-slate rounded-xl p-5 md:max-w-md w-full min-h-[15rem] max-h-[15rem] overflow-hidden shadow-lg hover:shadow-sm hover:bg-[#24262d] transition">
                    <div className="flex">
                        <Image src={user.profilePictureLg} alt={`${user.name}'s avatar`} className="rounded-full my-auto shadow" height="80" width="80" />
                        <div className="flex flex-col pl-4 my-auto truncate">
                            <h1 className={`my-auto font-semibold ${user.name.length > 12 ? "text-xl truncate" : "text-2xl"}`}>{user.name}</h1>
                            <UserFlairs user={user} />
                        </div>
                    </div>
                    <hr className="mb-2 mt-4 border-guilded-gray border" />
                    <div className="flex shadow-inner">
                        {props.bio ? (
                            <p className="w-full h-fill text-guilded-white text-left whitespace-pre-wrap overflow-wrap-anywhere linear-gradient">
                                {TruncateText(props.bio)}
                            </p>
                        ) : (
                            <p className="italic text-guilded-subtitle">No content yet, but we&apos;re sure they&apos;re an amazing person!</p>
                        )}
                    </div>
                </div>
            </a>
        </Link>
    );
};
