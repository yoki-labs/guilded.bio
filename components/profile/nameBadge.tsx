import Image from "next/image";

export default function NameBadge(props: { text: string; color: string; iconURL?: string; children?: any }) {
    let bg = "bg-[#4F515C]";
    switch (props.color) {
        case "blue":
            bg = "bg-[#008AE1]";
            break;
        case "yellow":
            bg = "bg-guilded-gilded";
            break;
        default:
            break;
    }
    return (
        <span className={`rounded mt-auto mb-[5px] py-[2px] px-[5px] flex ${bg} mr-2`}>
            {props.iconURL && (
                <div className={`flex ${props.text.length ? "pr-[3px]" : "my-[2px]"}`}>
                    <Image src={props.iconURL} alt={`${props.text} badge icon`} className="my-auto" height="12" width="12" layout="raw" />
                </div>
            )}
            {props.children}
            <span className={`uppercase text-xs ${props.color === "yellow" ? "text-guilded-black" : "text-white"} font-black my-auto`}>{props.text}</span>
        </span>
    );
}
