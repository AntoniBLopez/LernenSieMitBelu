'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function StartButton() {
  const pathname = usePathname()

  return (
    <>
      {
        <div className={`mt-10 mb-7 ml-6 laptop:mx-auto laptop:max-w-desktop ${pathname.includes('/levels') || pathname.includes('/games') ? 'hidden' : ''}`}>
          <Link
            href="/levels"
            className='ml-[5.5rem] py-4 px-10 rounded-xl text-lg font-bold bg-primaryColor text-white hover:bg-primaryDarkColor hover:shadow-md'>
            Start
          </Link>
        </div>
      }
    </>
  )
}