'use client'

import Image from "next/image"
import Link from "next/link"

function Page() {
  return (
    <div className="px-fixed desktop:px-fixedDesktop w-full h-fit">
      <div className="flex flex-col h-screen py-10 text-center" id="pricing">
        <Link href={"/#footer"} className="w-fit">
          <Image
            src="/icons/leftArrow.png"
            width={30}
            height={30}
            className="text-black"
            alt="Go back to homepage arrow icon"
          />
        </Link>
        <h1 className={`text-2xl text-primaryColor`}>Add new topic (B1, B2...)</h1>
        <form action="">

        </form>
      </div>
    </div>
  )
}

export default Page