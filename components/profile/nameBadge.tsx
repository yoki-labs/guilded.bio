import Image from "next/image";

export default function NameBadge(props: { text: string; color: string; iconURL?: string }) {
    let bg = "bg-[#4F515C]";
    switch (props.color) {
        case "blue":
            bg = "bg-[#008AE1]";
            break;
        default:
            break;
    }
    return (
        <span className={`rounded my-auto py-0 px-[4px] flex ${bg} mr-2`}>
            {props.iconURL && <Image src={props.iconURL} alt={`${props.text} badge icon`} height="64" width="64" className="mr-1" />}
            <span className="uppercase text-xs text-white font-black my-auto">{props.text}</span>
        </span>
    );
}
