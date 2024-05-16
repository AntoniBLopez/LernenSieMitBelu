import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-row content-between py-3 px-12 bg-bluishBlackColor">
      <Image
      src={'/icons/icon.png'}
      width={30}
      height={30}
      className="rounded-full"
      alt="Site icon"
      />
      <Link href="/content" className="hover:underline font-bold">Pricing</Link>
    </header>
  )
}