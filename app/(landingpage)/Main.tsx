'use client'
import '@/app/(landingpage)/scrollAnimation.css'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Headline from '@/app/(landingpage)/utils/Headline'
import PaymentButton from '@/app/(landingpage)/widgets/PaymentButton'
import PlanDetails from '@/app/(landingpage)/widgets/PlanDetails'
import NextVideo from 'next-video'
import DemoVideo from '@/videos/lernenapp.mp4'
import { animate, stagger, inView, timeline, scroll } from "motion"

export default function Main() {

  // const [script, setScript] = useState<any>(null)
  // const scriptRef = useRef<any>(null)

  // animate(".step-1", { backgroundColor: "red" })

  const sequence: any = [
    'text-stop',
    // ['#step-1', { opacity: 1 }, { duration: 2 }],
    // ['#step-1', { opacity: 0, { duration: 0.1 }],
    // ['#step-1', { opacity: 1 }, { duration: 2.8 }],
    ['#step-1 h3', { transform: 'translateY(0%)' }, { duration: 6 }],
    ['#step-1 picture', { transform: 'translateY(0%)' }, { duration: 4 }],
    ['#step-1 p', { transform: 'translateY(0%)' }, { duration: 3 }],
    ['#step-1', { transform: 'translateY(0%)' }, { duration: 0.5 }],
    ['#step-1', { transform: 'translateY(-150%)' }, { duration: 0.5 }],
    ['#step-2 h3', { transform: 'translateY(0%)' }, { duration: 0.5 }],
    ['#step-2 p', { transform: 'translateY(0%)' }, { duration: 0.5 }],
    ['#step-2 picture', { transform: 'translateY(0%)' }, { duration: 0.5 }],
    ['#step-2', { transform: 'translateY(0%)' }, { duration: 0.5 }],
    ['#step-2', { transform: 'translateY(-150%)' }, { duration: 0.5 }],
    ['#step-3 h3', { transform: 'translateY(0%)' }, { duration: 0.5 }],
    ['#step-3 p', { transform: 'translateY(0%)' }, { duration: 0.5 }],
    ['#step-3 picture', { transform: 'translateY(0%)' }, { duration: 0.5 }],
    ['#step-3', { transform: 'translateY(-150%)' }, { duration: 0.5 }],
    ['#step-3', { transform: 'translateY(0%)' }, { duration: 0.5 }],
    ['#step-4 h3', { transform: 'translateY(0%)' }, { duration: 0.5 }],
    ['#step-4 p', { transform: 'translateY(0%)' }, { duration: 0.5 }],
    ['#step-4 picture', { transform: 'translateY(0%)' }, { duration: 0.5 }],
    ['#step-4', { transform: 'translateY(-150%)' }, { duration: 0.5 }],
    ['#step-4', { transform: 'translateY(0%)' }, { duration: 0.5 }],
  ]

  useEffect(() => {
    // animate("#headline", { x: [-500, 0], opacity: [0, 1] }, { duration: 1.2, delay: stagger(1) })
    animate("#headline", { x: [-500, 0], opacity: [0, 1] }, { duration: 1.5 })
    animate("#video", { x: [500, 0], opacity: [0, 1] }, { duration: 1.5 })
    const onScroll = timeline(sequence)

    scroll(onScroll, {
      // target: '#step-1',
      // offset: ["start end", "end end"],
      // target: document.querySelector('#step-1'),
      offset: ["350px", "end end"],
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="h-fit w-full">
      <div
        className="
          flex
          flex-col
          laptop:flex-row
          overflow-x-hidden
          gap-10
          h-screen
          mx-10
          desktop:w-desktop
          desktop:mx-auto
          mt-20
          mb-36
          bg-white
          dark:bg-bgColorCardDark
        "
      >
        <Headline />
        <div id='video' className="w-full h-full">
          <NextVideo src={DemoVideo} style={{}} accentColor='#50c9a4' className='w-full h-fit' />
        </div>
      </div>

      <div id='text-stop' className='sticky top-0 w-full h-screen bg-bgColorLight dark:bg-bgColorDark'>
        <section className="flex-shrink-0 w-full h-[40rem] mx-10 desktop:w-desktop desktop:mx-auto overflow-y-hidden">
          {/* <script defer async src='https://cdn.trustindex.io/loader.js?3b845a03223a5388e946ead85cf'></script> */}
          <div className='flex flex-col mt-40 relative'>

            <div id='step-1' className='step absolute flex flex-row gap-10'>
              <div className='flex flex-col gap-10'>
                <h3 className='flex flex-col mt-5 text-6xl -translate-y-80 text-center text-primaryColor'>
                  <span>Spanisch To-Go,</span>
                  <span>egal wann, egal wo.</span>
                  <span></span>
                </h3>
                <p className='text-center text-xl px-24 translate-y-[41rem]'><span className='text-primaryColor'>Lerne effektiv</span> und mit Spaß Vokabeln, die dich weiterbringen und <span className='text-primaryColor'>auf dein Level abgestimmt</span> sind. Denn eine Sprache zu lernen macht nur Spaß, wenn das Lernen maßgeschneidert  ist.</p>
              </div>
              <picture className='w-full h-fit translate-y-[41rem]'>
                <Image src='/photos/levels.png' width={400} height={400} alt='levels photo sample' className='rounded-tr-[100px] shadow-customized' />
              </picture>
            </div>

            <div id='step-2' className='step absolute flex flex-row gap-10'>
              <picture className='flex justify-end w-full h-fit translate-y-[41rem]'>
                <Image src='/photos/levels.png' width={400} height={400} alt='levels photo sample' className='rounded-tr-[100px] shadow-customized' />
              </picture>
              <div className='flex flex-col gap-10'>
                <h3 className='flex flex-col mt-5 text-6xl translate-y-[41rem] text-center text-primaryColor'>
                  <span>Du lernst nicht</span>
                  <span>alleine.</span>
                  <span></span>
                </h3>
                <p className='text-center text-xl px-24 translate-y-[41rem]'>
                  Belu <span className='text-primaryColor'>hat</span>schon vielen Menschen geholfen, ihr <span className='text-primaryColor'>Spanisch</span> zu verbessern. Begib dich jetzt auf deine Reise und teste die App 3 Tage gratis.
                </p>
              </div>
            </div>

            <div id='step-3' className='step absolute flex flex-row gap-10'>
              <div className='flex flex-col gap-10'>
                <h3 className='flex flex-col mt-5 text-6xl translate-y-[41rem] text-center text-primaryColor'>
                  <span>Spanisch To-Go,</span>
                  <span>egal wann, egal wo.</span>
                  <span></span>
                </h3>
                <p className='text-center text-xl px-24 translate-y-[41rem]'><span className='text-primaryColor'>Lerne effektiv</span> und mit Spaß Vokabeln, die dich weiterbringen und <span className='text-primaryColor'>auf dein Level abgestimmt</span> sind. Denn eine Sprache zu lernen macht nur Spaß, wenn das Lernen maßgeschneidert  ist.</p>
              </div>
              <picture className='w-full h-fit translate-y-[41rem]'>
                <Image src='/photos/levels.png' width={400} height={400} alt='levels photo sample' className='rounded-tr-[100px] shadow-customized' />
              </picture>
            </div>

            <div id='step-4' className='step absolute flex flex-row gap-10'>
              <picture className='w-full h-fit translate-y-[41rem]'>
                <Image src='/photos/levels.png' width={400} height={400} alt='levels photo sample' className='rounded-tr-[100px] shadow-customized' />
              </picture>
              <div className='flex flex-col gap-10'>
                <h3 className='flex flex-col mt-5 text-6xl translate-y-[41rem] text-center text-primaryColor'>
                  <span>Spanisch To-Go,</span>
                  <span>egal wann, egal wo.</span>
                  <span></span>
                </h3>
                <p className='text-center text-xl px-24 translate-y-[41rem]'><span className='text-primaryColor'>Lerne effektiv</span> und mit Spaß Vokabeln, die dich weiterbringen und <span className='text-primaryColor'>auf dein Level abgestimmt</span> sind. Denn eine Sprache zu lernen macht nur Spaß, wenn das Lernen maßgeschneidert  ist.</p>
              </div>
            </div>

          </div>
        </section>
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