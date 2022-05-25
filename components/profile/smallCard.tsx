import Image from "next/image";
import Link from "next/link";

export default function SmallCard(props: { id: string; name: string; bio: string | null; badges: string[]; iconURL: string }) {
    return (
        <Link href={`/u/${props.id}`}>
            <a>
                <div className="bg-guilded-slate rounded-xl p-5 h-fit max-w-md shadow-lg hover:shadow-sm hover:bg-[#24262d] transition">
                    <div className="flex">
                        <Image src={props.iconURL} alt={`${props.name}'s avatar`} className="rounded-full my-auto shadow" height="80" width="80" />
                        <h1 className="my-auto ml-4 text-2xl md:text-3xl font-semibold">{props.name}</h1>
                    </div>
                    <hr className="mb-2 mt-3 border-guilded-gray border" />
                    {props.bio ? (
                        <p className="w-full h-full text-guilded-white text-clip break-words text-left">
                            {props.bio.length > 198 ? props.bio.slice(0, 198) + "..." : props.bio}
                        </p>
                    ) : (
                        <p className="italic text-guilded-subtitle">No content yet, but we&apos;re sure they&apos;re an amazing person!</p>
                    )}
                </div>
            </a>
        </Link>
    );
}
