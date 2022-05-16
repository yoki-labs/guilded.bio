export default function NavbarItem(props: { text: string; dest: string }) {
    return (
        <li>
            <a href={props.dest} className="block py-2 pr-4 pl-3 md:p-0 lg:mt-0 text-guilded-gilded hover:text-white mr-4">
                {props.text}
            </a>
        </li>
    );
}
