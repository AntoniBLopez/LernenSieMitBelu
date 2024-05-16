import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <main>
      <Link href={"/"} className="w-fit">
        <Image
          src="/icons/leftArrow.png"
          width={30}
          height={30}
          className="text-black"
          alt="Go back to homepage arrow icon"
        />
      </Link>
      <h1>Flashcards</h1>
    </main>
  )
}

export default page