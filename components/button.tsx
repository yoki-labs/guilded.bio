export default function Button(props: any) {
    const colorName: string = props.color ?? "gilded";
    let className = "px-4 py-1 rounded text-lg ";

    if (props.bold === "true") className += "font-bold ";

    switch (colorName) {
        case "gilded":
            className += "bg-guilded-gilded text-guilded-black";
            break;
        case "black":
            className += "bg-black text-guilded-white";
            break;
        case "red":
            className += "bg-red-500 text-guilded-black";
            break;
        default:
            break;
    }
    return <button disabled={props.disabled ?? false} className={className} {...props} />;
}
