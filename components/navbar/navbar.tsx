import Link from "next/link";
import NavbarItem from "./navbarItem";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Button from "../button";

export default function Navbar() {
    const { data: session } = useSession();
    const [isDropdownActive, setIsDropdownActive] = useState(false);

    return (
        <nav className="px-2 py-2.5 bg-guilded-black sm:px-4 w-full">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <div className="whitespace-nowrap pl-2 md:pl-20 my-auto text-4xl md:text-3xl select-none">
                    <Link href="/">
                        <a>
                            <span className="text-guilded-gilded">guilded</span>
                            <span className="text-white">.bio</span>
                        </a>
                    </Link>
                </div>
                <div className="block md:hidden pr-4" onClick={() => setIsDropdownActive(!isDropdownActive)}>
                    <button className="flex items-center px-3 py-2 rounded text-guilded-gilded hover:text-white">
                        <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                </div>
                <div className={`w-full md:block md:w-auto ${isDropdownActive ? "block" : "hidden"}`} id="mobile-menu">
                    <ul className="mt-4 items-center flex flex-col md:mt-0 md:flex-row md:space-x-4 md:pr-16">
                        <NavbarItem text="About" dest="/about" />
                        <NavbarItem text="Community" dest="/community" />
                        {session ? (
                            <>
                                <NavbarItem text="Your Profile" dest={`/users/${session.user!.name}`} />
                                <div className="py-2">
                                    <Button color="gilded" onClick={() => signOut()}>
                                        Sign Out
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="py-2">
                                <Button color="gilded" onClick={() => signIn("guilded")}>
                                    Log In
                                </Button>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
