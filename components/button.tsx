export default function Button(props: any) {
    const colorName: string = props.color ?? "gilded"
    let className = "px-4 py-1 rounded text-lg "
    switch (colorName) {
        case "gilded":
            className += "bg-guilded-gilded text-guilded-black"
            break
        case "black":
            className += "bg-black text-guilded-white"
            break
        default:
            break
    }
    return (
        <button className={className} {...props} />
    );
}
