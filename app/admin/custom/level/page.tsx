'use client'

import Image from "next/image"
import Link from "next/link"

function Page() {

  const handleSubmit = (e: any) => {
    e.preventDefault()


    console.log('Submitted')
  }

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
        <h1 className={`text-2xl text-primaryColor`}>Add new level (B1, B2...)</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row gap-5">
            <label
              className="block font-bold text-gray-900 self-center whitespace-nowrap"
              htmlFor="topic"
            >
              New Level:
            </label>
            <input
              id="topic"
              type="text"
              name="topic"
              placeholder="A2"
              className="py-2 px-3"
              required
            />
          <button
            type='submit'
            className='
              flex
              flex-row
              w-56
              gap-2
              px-4
              py-2
              justify-center
              self-center
              font-medium
              rounded-lg
              bg-primaryColor
              hover:bg-primaryColorDark
              text-black
            '
          >
            Add
          </button>
          </div>
        </form>
        <div className="flex flex-col gap-5">
          <div className='w-auto h-px lg:h-px bg-slate-700' />
          <table>
            <thead>
              <tr>
                <th>Levels</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>-&gt; A1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Page