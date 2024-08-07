import Image from "next/image"
import Link from 'next/link'

export default function Footer() {
  return (
    <div className="w-full h-full px-fixed bg-bluishBlackColor">
      <footer className="pb-12 max-w-3xl mx-auto" id='footer'>
        <div className='w-auto mb-12 h-px lg:h-px bg-slate-700' />
        <section className='grid grid-cols-3 mb-20 max-mobile:gap-10 max-mobile:grid-cols-2'>
          <div className='flex flex-col gap-2'>
            <h3 className='mb-2 font-bold'>PRODUCT</h3>
            <Link className="hover:underline w-fit" href="">Guide</Link> {/* or Web App */}
            <Link className="hover:underline w-fit" href="#pricing">Preisgestaltung</Link>
            <Link className="hover:underline w-fit" href="">Updates</Link>
            <Link className="hover:underline w-fit" href="/support">Support</Link>
          </div>
          <div className='flex flex-col gap-2 '>
            <h3 className='mb-2 font-bold'>SOCIAL</h3>
            <Link className="w-fit" href={"https://twitter.com/taskease_click"} target="_blank">
              <Image
                src="/logos/socialmedia/x.png"
                width={25}
                height={25}
                className="hover:cursor-pointer hover:scale-125"
                alt="X social media logo"
              />
            </Link>
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='mb-2 font-bold'>LEGAL</h3>
            <div className="flex flex-col gap-2 text-black">
              <Link className="hover:underline hover:text-primaryColor w-fit" href="/legal/tos">Terms of services</Link>
              <Link className="hover:underline w-fit" href="/legal/privacy">Privacy policy</Link>
            </div>
          </div>
        </section>

        <section className='flex flex-col gap-2'>
          <p className='self-center'>&quot;Lernen Sie schnell und einfach&quot;</p>
          <p className='self-center'>Urheberrechte © 2024 - Alle Rechte vorbehalten.</p>
          {/* IF NECESSARY */}
          {/* <p>Logo by Freepik - Flaticon</p> */}
        </section>
      </footer>
    </div>
  )
}