'use client'
import Image from "next/image";
import Link from "next/link";
import ThemeMode from '@/app/utils/ThemeMode'

export default function Header() {

  return (
    <header className="flex flex-row justify-between items-end my-3 mx-10 desktop:mx-auto desktop:w-desktop">
      <Link
        href={"/"}
      >
        <Image
          src={'/icons/icon.png'}
          width={40}
          height={40}
          className="rounded-full hover:cursor-pointer hover:scale-110"
          alt="Site icon"
        />
      </Link>
      <div className="flex flex-row gap-10 items-center">
        <Link href="/" className="text-lg font-bold hover:underline">Abo</Link>
        <Link href="/profile" className="text-lg font-bold hover:underline">Log In</Link>
        <ThemeMode />
      </div>
    </header>
  )
}