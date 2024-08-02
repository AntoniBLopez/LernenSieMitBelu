'use client'
import Image from "next/image"
import PaymentButton from '@/app/(landingpage)/widgets/PaymentButton'

function Headline() {
  return (
    <div id="headline" className="flex flex-col gap-10 w-full h-fit">
      <div className="flex flex-col gap-8">
        <h1 className='flex flex-col gap-2 text-5xl font-extrabold'>
          <span className='max-laptop:text-center'>
            Spanische Vokabel
          </span>
          <span className='flex flex-col max-mobile:items-center max-laptop:justify-center laptop:flex-row'>
            <span className='self-center max-laptop:mb-2.5'>
              lernen mit&nbsp;
              <span className='bg-primaryColor px-1.5 rounded-md'>
                <span className="text-white">Spaß</span>
              </span>
            </span>
          </span>
        </h1>

        <div className='w-full max-laptop:text-center'>
          <p className='max-laptop:inline-block text-base opacity-90 max-w[85%] tablet:max-w-[60%] laptop:max-w-[85%] max-laptop:text-center font-medium'>
            Meistere spanische Vokabeln wie ein Profi – jederzeit und überall mit dieser App.
          </p>
        </div>

      </div>
      <div className='flex flex-col w-full max-laptop:items-center gap-3'>
        <PaymentButton size='w-56' />
        <p className='flex flex-row text-sm ml-1 items-center font-medium'>
          <Image
            src="/icons/landingpage/gift.png"
            width={17}
            height={17}
            alt="Git icon"
            className='inline-block self-start'
          />
          <span className='text-[#00C82A] self-start whitespace-nowrap'>
            &nbsp;&nbsp;3 Tage
          </span>
          &nbsp;kostenloser Testzeitraum
        </p>
      </div>
    </div>
  )
}

export default Headline