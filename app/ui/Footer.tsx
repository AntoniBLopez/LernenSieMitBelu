import Image from "next/image"

function Footer() {
  return (
    <footer id='#footer'>
      <div className='w-auto h-px lg:h-px bg-slate-700' />

      <div>
        <section>

        </section>
      </div>
      <section className='grid grid-cols-3 mt-12 mb-20'>
        <div className='flex flex-col gap-2'>
          <h3 className='mb-5'>PRODUCT</h3>
          <a className="hover:underline w-fit" href="">Guide</a> {/* or Web App */}
          <a className="hover:underline w-fit" href="">Pricing</a>
          <a className="hover:underline w-fit" href="">Updates</a>
        </div>
        <div>
          <div className='flex flex-col gap-2'>
            <h3 className='mb-5'>SOCIAL</h3>
            <Image
              src="/icons/socialmedia/twitter.svg"
              width={25}
              height={25}
              className="hover:cursor-pointer hover:scale-125"
              alt="Twitter logo"
            />
          </div>
        </div>
        <div>
          <div className='flex flex-col gap-2'>
            <h3 className='mb-5'>LEGAL</h3>
            <a className="hover:underline w-fit" href="">Terms of services</a>
            <a className="hover:underline w-fit" href="">Privacy policy</a>
          </div>
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
          <p className='self-center'>&nbsp;by <a className="underline text-primaryColor hover:no-underline hover:text-primary2Color" href="">Antoni</a>&nbsp;</p>
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
  )
}

export default Footer