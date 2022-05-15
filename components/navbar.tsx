import Image from "next/image";

export default function Navbar() {
  return (
    <div className="bg-black absolute mx-auto object-top h-15 w-full">
      <div className="md:pl-20 pt-2.5 align-middle">
        <Image src="/gbio-logo.png" width="213" height="35" alt="logo" />
      </div>
    </div>
  );
}
