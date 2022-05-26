import Image from "next/image";
import Link from "next/link";

export const Card = (props: { id: string; name: string; bio: string | null; badges: string[]; iconURL: string }) => {
    return (
        <Link href={`/u/${props.id}`}>
            <a>
                <div className="bg-guilded-slate rounded-xl p-5 h-fit max-w-md overflow-hidden shadow-lg hover:shadow-sm hover:bg-[#24262d] transition">
                    <div className="flex">
                        <Image src={props.iconURL} alt={`${props.name}'s avatar`} className="rounded-full my-auto shadow" height="80" width="80" />
                        <h1 className="my-auto ml-4 text-2xl md:text-3xl font-semibold">{props.name}</h1>
                    </div>
                    <hr className="mb-2 mt-4 border-guilded-gray border" />
                    <div className="flex">
						{props.bio ? (
							<p className="w-full max-h-20 text-guilded-white break-words text-left whitespace-pre-wrap">
								{props.bio.length > 75 ? props.bio.slice(0, 75) + "..." : props.bio}
							</p>
						) : (
							<p className="italic text-guilded-subtitle">No content yet, but we&apos;re sure they&apos;re an amazing person!</p>
						)}
					</div>
                </div>
            </a>
        </Link>
    );
}
