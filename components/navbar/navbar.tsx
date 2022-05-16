import Link from "next/link";
import Button from "../button";
import NavbarItem from "./navbarItem";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="rounded px-2 py-2.5 bg-guilded-black sm:px-4">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <div className="self-center whitespace-nowrap pl-2 md:pl-20 my-auto text-base sm:text-lg md:text-xl select-none">
                    <Link href="/">
                        <a>
                            <span className="text-guilded-gilded">guilded</span>
                            <span className="text-white">.bio</span>
                        </a>
                    </Link>
                </div>
                <div className="w-full md:block md:w-auto" id="mobile-menu">
                    <ul className="mt-4 items-center flex flex-col sm:text-xs md:mt-0 md:flex-row md:space-x-4 md:text-sm">
                        <NavbarItem text={"About"} dest={"/about"} />
                        <NavbarItem text={"Users"} dest={"/users"} />
                        <NavbarItem text={"Community"} dest={"/community"} />
                        {session ? <Button onClick={() => signOut()}>Log Out</Button> : <Button onClick={() => signIn()}>Log In</Button>}
                    </ul>
                </div>
            </div>
        </nav>
    );

    // return (
    //     <div className="bg-guilded-black justify-center overflow-hidden absolute mx-auto object-top h-15 w-full p-3 flex flex-col">
    //         <div className="container mx-auto flex flex-wrap items-center justify-between">
    //             <div className="self-center whitespace-nowrap pl-2 md:pl-20 my-auto text-base sm:text-lg md:text-xl select-none">
    //                 <Link href="/">
    //                     <a>
    //                         <span className="text-guilded-gilded">guilded</span>
    //                         <span className="text-white">.bio</span>
    //                     </a>
    //                 </Link>
    //             </div>
    //             <div className="w-full block flex-grow md:flex lg:items-center md:w-auto">
    //                 <div className="flex flex-col sm:text-xs md:mt-0 md:flex-row md:space-x-8 md:text-sm">
    //                     <NavbarItem text={"About"} dest={"/about"} />
    //                     <NavbarItem text={"Users"} dest={"/users"} />
    //                     <NavbarItem text={"Community"} dest={"/community"} />
    //                 </div>
    //                 <div>

    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
}
