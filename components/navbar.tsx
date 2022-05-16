import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

import Button from "../components/button"

export default function Navbar() {
  const {data: session} = useSession();

  return (
    <div className="bg-guilded-black absolute mx-auto object-top h-15 w-full p-3 flex">
      <div className="pl-2 md:pl-20 my-auto text-base sm:text-lg md:text-xl select-none">
        <Link href="/">
          <a>
            <span className="text-guilded-gilded">guilded</span>
            <span className="text-white">.bio</span>
          </a>
        </Link>
      </div>
      <div className="ml-auto my-auto">
        {!session && (
          <Button onClick={() => signIn()}>Log in</Button>
        )}
      </div>
    </div>
  );
}
