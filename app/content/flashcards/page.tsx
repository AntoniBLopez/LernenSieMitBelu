import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <main className='flex flex-col w-full h-full gap-5'>
      <Link href={"/"} className="w-fit">
        <Image
          src="/icons/leftArrow.png"
          width={30}
          height={30}
          className="text-black"
          alt="Go back to homepage arrow icon"
        />
      </Link>
      <h1 className='text-3xl font-bold text-center'>Flashcards</h1>
    </main>
  )
}

export default page