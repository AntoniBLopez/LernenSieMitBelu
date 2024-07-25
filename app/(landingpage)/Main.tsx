'use client'
import Headline from '@/app/(landingpage)/utils/Headline'
import Image from 'next/image'
import PaymentButton from '@/app/(landingpage)/widgets/PaymentButton'
import PlanDetails from './widgets/PlanDetails'
import NextVideo from 'next-video'
import DemoVideo from '@/videos/lernenapp.mp4.json'
import { useEffect, useState, useRef } from 'react'

export default function Main() {

  // const [script, setScript] = useState<any>(null)
  // const scriptRef = useRef<any>(null)

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.trustindex.io/loader.js?3b845a03223a5388e946ead85cf';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [])

  // useEffect(() => {
  //   if (script) {
  //     console.log('script loaded', script)
  //   }
  // }, [script])

  return (
    <main className="h-fit w-full">
      <div className="
          grid
          grid-cols-1
          laptop:grid-cols-2
          gap-10
          h-screen
          mx-10
          desktop:mx-auto
          desktop:w-desktop
          mt-20
          mb-36
          bg-white
          dark:bg-bgColorCardDark
        ">
        <Headline />
        <div className="w-full h-full">
          <NextVideo src={DemoVideo} style={{}} accentColor='#50c9a4' className='w-full h-fit' />
        </div>
      </div>

      <div className="px-fixed desktop:px-fixedDesktop w-full h-fit bg-bgColorLight dark:bg-bgColorDark">
        <div className="h-screen py-10">
          <h1>Main 3</h1>
          <script defer async src='https://cdn.trustindex.io/loader.js?3b845a03223a5388e946ead85cf'></script>

        </div>
      </div>

      <div id='pricing' className="px-fixed desktop:px-fixedDesktop w-full h-fit bg-bgColorLight dark:bg-bgColorDark">
        <div className="flex flex-col items-center gap-10 h-fit py-20">
          <h3 className='font-bold text-primaryColor'>Preise</h3>
          <h2 className='flex flex-col gap-2 text-5xl text-center font-extrabold'>
            <span>
            Endlich Ihre Begleit-App
            </span>
            Lerne jederzeit und Uberall!
          </h2>

          <p className='flex flex-row text-md ml-1 items-center'>
            <Image
              src="/icons/landingpage/gift.png"
              width={20}
              height={20}
              alt="Git icon"
              className='inline-block self-start'
            />
            <span className='text-[#00C82A] whitespace-nowrap self-start'>
              &nbsp;&nbsp;15% off
            </span>
            &nbsp;for the first 50 customers (12 left)
          </p>

          <div className='flex flex-col laptop:flex-row gap-10'>
            <div className='
              flex
              flex-col
              relative
              w-full
              tablet:w-[29rem]
              h-fit
              p-8
              gap-8
              rounded-xl
              laptop:rounded-3xl
              bg-white
              dark:bg-bgColorCardDark
              drop-shadow-md
              transition-all duration-200
            '>

              {/* <p className='font-bold text-lg'>Starter</p> */}
              <p className='font-bold text-lg'>Monatspass</p>

              <div className='flex flex-row gap-2'>
                <span className='flex flex-col justify-end mb-1 line-through opacity-80 text-xl'>
                  24€
                </span>
                <span className='text-5xl font-bold'>
                  20€
                </span>
                <span className='flex flex-col justify-end mb-1 opacity-60 text-sm font-semibold'>
                  Monat
                </span>
              </div>

              <li className='flex flex-col gap-2'>
                <PlanDetails text='3 Tage kostenloser Testzeitraum' />
                <PlanDetails text='4 Spiele verfügbar' />
                <PlanDetails text='A1 bis B2 Vokabeln' />
              </li>
              <div className='flex flex-col gap-2 text-center'>
                <PaymentButton size='w-[100%]' />
                <p className='text-xs font-medium dark:font-normal opacity-60'>Monatliche Zahlung. Lernen Sie, wie und wann Sie wollen!</p>
              </div>
            </div>
            <div className='
              flex
              flex-col
              relative
              max-w-auto
              tablet:w-[29rem]
              h-fit
              p-8
              gap-8
              rounded-xl
              laptop:rounded-3xl
              border-primaryColor
              border-2
              bg-white
              dark:bg-bgColorCardDark
              drop-shadow-md
              laptop:scale-110 transition-all duration-200
            '>
              <div className='absolute text-xs font-semibold px-2 py-1 bg-primaryColor text-white dark:text-black rounded-full z-10 -top-3 translate-x-[168px]'>
                Popular
              </div>

              <p className='font-bold text-lg'>Semesterpass</p>

              <div className='flex flex-row gap-2'>
                <span className='flex flex-col justify-end mb-1 line-through opacity-80 text-xl'>
                  24€
                </span>
                <span className='text-5xl font-bold'>
                  14€
                </span>
                <span className='flex flex-col justify-end mb-1 opacity-60 text-sm font-semibold'>
                  Monat
                </span>
              </div>

              <li className='flex flex-col gap-2'>
                <PlanDetails text='3 Tage kostenloser Testzeitraum' />
                <PlanDetails text='4 Spiele verfügbar' />
                <PlanDetails text='A1 bis B2 Vokabeln' />
                <PlanDetails text='Deine eigene Vokabelliste erstellen' />
              </li>
              <div className='flex flex-col gap-2 text-center'>
                <PaymentButton size='w-[100%]' />
                <p className='text-xs font-medium dark:font-normal opacity-60'>Halbjährliche Zahlung. Lernen Sie, wie und wann Sie wollen!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main >
  )
}