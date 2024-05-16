import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="flex flex-row justify-between py-3 px-12 bg-bluishBlackColor">
      <Image
      src={'/icons/icon.png'}
      width={30}
      height={30}
      className="rounded-full"
      alt="Site icon"
      />
      <Link href="/content" className="font-bold hover:underline">Pricing</Link>
      <Link href="/content" className="font-bold hover:underline">LOG IN</Link>
    </header>
  )
}