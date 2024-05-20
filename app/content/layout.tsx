import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col mx-mobile tablet:mx-tablet max-mx-contentMargin'>
      <header className='mt-12 mb-5'>
        <Link href={"/"} className="w-fit">
          <Image
            src="/icons/leftArrow.png"
            width={30}
            height={30}
            alt="Go back to homepage arrow icon"
            className='hover:scale-110'
          />
        </Link>
      </header>
      {children}
    </div>
  )
}

export default layout