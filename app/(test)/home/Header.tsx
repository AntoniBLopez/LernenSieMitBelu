'use client'
import Image from "next/image";
import Link from "next/link";

export default function Header() {

  return (
    <header className="flex flex-row justify-between items-end my-3 mx-6 laptop:mx-auto laptop:max-w-desktop">
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
      <div className="flex flex-row gap-10 items-end">
        <Link href="/" className="font-bold hover:underline">Abo</Link>
        <Link href="/" className="font-bold hover:underline">Log In</Link>
      </div>
    </header>
  )
}