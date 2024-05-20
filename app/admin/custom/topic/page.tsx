'use client'

import Image from "next/image"
import Link from "next/link"

function Page() {
  return (
    <div className="px-fixed desktop:px-fixedDesktop w-full h-fit">
      <div className="flex flex-col max-w-xl mx-auto h-screen my-10 gap-7 text-center" id="pricing">
        <Link href={"/admin"} className="w-fit">
          <Image
            src="/icons/leftArrow.png"
            width={30}
            height={30}
            className="text-black"
            alt="Go back to homepage arrow icon"
          />
        </Link>
        <h1 className={`text-2xl text-primaryColor`}>Add new topic</h1>
        <form action="">
          <div className="flex flex-row gap-5">
            <label
              className="block font-bold text-gray-900 self-center"
              htmlFor="topic"
            >
              New Topic:
            </label>
            <input
              id="topic"
              type="text"
              name="topic"
              placeholder="Natur"
              className="py-2 px-3"
              required
            />

          </div>
        </form>
      </div>
    </div>
  )
}

export default Page