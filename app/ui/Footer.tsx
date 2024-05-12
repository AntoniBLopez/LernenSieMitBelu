import Image from "next/image"
import Link from 'next/link'

export default function Footer() {
  return (
    <div className="w-full h-full px-fixed bg-bluishBlackColor">
      <footer className="pb-12 max-w-3xl mx-auto" id='footer'>
      <div className='w-auto mb-12 h-px lg:h-px bg-slate-700' />
        <section className='grid grid-cols-3 mb-20 max-mobile:gap-10 max-mobile:grid-cols-2'>
          <div className='flex flex-col gap-2'>
            <h3 className='mb-2'>PRODUCT</h3>
            <Link className="hover:underline w-fit" href="">Guide</Link> {/* or Web App */}
            <Link className="hover:underline w-fit" href="#pricing">Pricing</Link>
            <Link className="hover:underline w-fit" href="">Updates</Link>
            <Link className="hover:underline w-fit" href="/support">Support</Link>
          </div>
          <div className='flex flex-col gap-2 '>
            <h3 className='mb-2'>SOCIAL</h3>
            <Link className="w-fit" href={"https://twitter.com/taskease_click"} target="_blank">
              <Image
                src="/logos/socialmedia/whiteX.svg"
                width={25}
                height={25}
                className="hover:cursor-pointer hover:scale-125"
                alt="X social media logo"
              />
            </Link>
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='mb-2'>LEGAL</h3>
            <Link className="hover:underline w-fit" href="/legal/tos">Terms of services</Link>
            <Link className="hover:underline w-fit" href="/legal/privacy">Privacy policy</Link>
          </div>
        </section>

        <section className='flex flex-col gap-2'>
          <p className='self-center'>&quot;Make it work, make it right, make it fast&quot;</p>
          <div className="flex flex-row justify-center ">
            <p className='self-center'>Build with&nbsp;</p>
            <Image
              src="/icons/whiteHeart.png"
              width={20}
              height={20}
              className="h-5 self-center"
              alt="Heart emoji"
            />
            <p className='self-center'>&nbsp;by <Link className="underline text-primaryColor hover:no-underline hover:text-primary2Color" href="https://twitter.com/AntoniBLopez" target="_blank">Antoni</Link>&nbsp;</p>
            <Image
              src="/me.png"
              width={20}
              height={20}
              className="rounded-full self-center h-5"
              alt="My profile picture"
            />
          </div>
          <p className='self-center'>Copyright © 2024 - All rights reserved</p>
          {/* IF NECESSARY */}
          {/* <p>Logo by Freepik - Flaticon</p> */}
        </section>
      </footer>
    </div>
  )
}