import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-end py-3 px-12 desktop:px-desktop bg-bluishBlackColor">
      <Link
        href={"/"}
      >
        <Image
          src={'/icons/icon.png'}
          width={30}
          height={30}
          className="rounded-full hover:cursor-pointer hover:scale-110"
          alt="Site icon"
        />
      </Link>
      <Link href="/" className="font-bold hover:underline">Pricing</Link>
      <Link href="/" className="font-bold hover:underline">LOG IN</Link>
    </header>
  )
}