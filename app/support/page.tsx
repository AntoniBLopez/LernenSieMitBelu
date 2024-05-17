import Image from "next/image"
import Link from "next/link"

export default function Support() {


  return (
    <div className="w-full h-screen bg-bluishBlackColor">
      <div className="w-full h-full px-fixed">
        <section className="flex flex-col gap-8 max-w-xl mx-auto py-16">
          <Link href={"/#footer"} className="w-fit">
            <Image
              src="/icons/whiteBackArrow.png"
              width={30}
              height={30}
              className="text-black"
              alt="Go back to homepage arrow icon"
            />
          </Link>
          <h1 className="text-3xl font-bold">Support</h1>
          <div>For any questions please send an email to: <span className="font-bold">contact@taskease.click</span>
          </div>
        </section>
      </div>

    </div>
  )
}