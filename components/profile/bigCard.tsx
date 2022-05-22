import Image from "next/image";
import Link from "next/link";

export default function BigCard(props: { id: string; name: string; bio: string; badges: string[]; iconURL: string }) {
    return (
        <div className="bg-guilded-slate rounded-2xl pb-10 h-fithover:cursor-pointer px-24">
            <div className="flex py-4 pl-6">
                <Image src={props.iconURL} alt={`${props.name}'s avatar`} className="rounded-full" height="140" width="140" />
                <h1 className="pt-6 px-6 text-2xl md:text-3xl font-bold">{props.name}</h1>
            </div>
            <div className="w-11/12 mx-auto border-t-2 border-guilded-gray" />
            <p className="px-6 pt-6 text-clip">{props.bio.length > 198 ? props.bio.slice(0, 198) + "..." : props.bio}</p>
        </div>
    );
}
