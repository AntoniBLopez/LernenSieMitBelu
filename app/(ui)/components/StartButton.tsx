'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function StartButton() {
  const pathname = usePathname()

  return (
    <>
      {
        <div className={`flex mt-10 mb-4 mx-6 laptop:mx-auto laptop:max-w-desktop ${pathname.includes('/levels') ? 'hidden' : ''}`}>
          <Link
            href="/levels"
            className='tablet:ml-[5.8rem]
            py-3
            px-10
            rounded-xl
            text-lg
            font-bold
            bg-gradient-to-r
            from-[#55aeb8]
            to-[#2cd5a2]
            text-white
            hover:from-[#62c2cd]
            hover:to-[#2bcb9b]
            hover:shadow-md'>
            Start
          </Link>
        </div>
      }
    </>
  )
}