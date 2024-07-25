import Image from "next/image"
import Link from 'next/link'
import { FaYoutube, FaXTwitter, FaInstagram, FaFacebook, FaSquareFacebook } from "react-icons/fa6";
import { PiInstagramLogoFill } from "react-icons/pi";

export default function Footer() {
  return (
    <div className="w-full h-full pt-16 pb-10 px-fixed desktop:px-fixedDesktop">
      <footer id='footer' className="flex flex-col mobile:flex-col-reverse laptop:flex-row justify-center w-full pb-12 gap-10">
        <section className='flex flex-col-reverse mobile:flex-col text-center laptop:text-start gap-6 laptop:gap-10'>
          <div className="flex flex-col gap-2">
            <p>&quot;Maximize your productivity, one block at a time&quot;</p>
            <p className="">Copyright © 2024 - All rights reserved</p>
          </div>
          <div className="flex flex-row self-center items-center gap-2 laptop:self-start">
            <Link className="w-fit h-fit" href={"https://www.youtube.com/@einfachspanischmitbelu"} target="_blank">
              <FaYoutube
                className="w-9 h-9 hover:cursor-pointer hover:scale-110 transition-all duration-200 text-red-500"
              />
            </Link>
            <Link className="w-fit h-fit" href={"https://www.facebook.com/einfachspanischmitbelu"} target="_blank">
              <FaSquareFacebook
                className="w-7 h-7 hover:cursor-pointer hover:scale-110 transition-all duration-200 text-blue-500"
              />
            </Link>
            <Link className="w-fit h-fit" href={"https://www.instagram.com/spanischmitbelu"} target="_blank">
              <FaInstagram
                className="w-7 h-7 hover:cursor-pointer hover:scale-110 transition-all duration-200"
              />
            </Link>
          </div>
        </section>
        <section className='flex flex-row gap-6 mobile:gap-20'>
          <div className='flex flex-row gap-6 mobile:gap-10'>
            <div className="h-full w-px bg-black" />
            <div className="flex flex-col gap-2">
              <h3 className='mb-2 font-semibold'>PRODUCT</h3>
              <Link className="hover:underline hover:font-semibold w-fit" href="">Guide</Link> {/* or Web App */}
              <Link className="hover:underline hover:font-semibold w-fit" href="#pricing">Pricing</Link>
              <Link className="hover:underline hover:font-semibold w-fit" href="">Updates</Link>
              <Link className="hover:underline hover:font-semibold w-fit" href="/support">Support</Link>
            </div>
          </div>
          <div className='flex flex-row gap-6 mobile:gap-10'>
            <div className="h-full w-px bg-black" />
            <div className="flex flex-col w-36 gap-2">
              <h3 className='mb-2 font-semibold'>LEGAL</h3>
              <Link className="hover:underline hover:font-semibold w-fit" href="/legal/tos">Terms of services</Link>
              <Link className="hover:underline hover:font-semibold w-fit" href="/legal/privacy">Privacy policy</Link>
            </div>
          </div>
        </section>
      </footer>
    </div>
  )
}