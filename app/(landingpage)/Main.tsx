'use client'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Headline from '@/app/(landingpage)/components/Headline'
import UserReviews from '@/app/(landingpage)/components/UserReviews'
import PaymentButton from '@/app/(landingpage)/widgets/PaymentButton'
import PlanDetails from '@/app/(landingpage)/widgets/PlanDetails'
import MuxPlayer from '@mux/mux-player-react'
// import NextVideo from 'next-video'
// import DemoVideo from '@/videos/app-vokabeltrainer.mp4'
import { animate, stagger, inView, timeline, scroll } from "motion"

export default function Main() {

  const stickyEnd = useRef<HTMLDivElement>(null)
  // const [script, setScript] = useState<any>(null)
  // const scriptRef = useRef<any>(null)


  const getVideo = async () => {
    await fetch('https://api.mux.com/video/v1/assets/1SZbpjrszuzrmQ69UpetkJ6w65Jkm9yJqZ7IsIcgrtM')
      .then(response => response.json())
      .then(data => console.log('video response: ', data))
      .catch(error => console.log('error: ', error))
    // console.log('video response: ', response.json())
    // const data = await response.json()
    // return data.video
  }

  useEffect(() => {
    getVideo()
    // animate("#headline", { x: [-500, 0], opacity: [0, 1] }, { duration: 1.2, delay: stagger(1) })
    animate("#headline", { x: [-500, 0], opacity: [0, 1] }, { duration: 1.5 })
    animate("#video", { x: [500, 0], opacity: [0, 1] }, { duration: 1.5 })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="h-full">
      <div className='flex flex-col h-fit mt-40 mb-20 mx-10 desktop:mx-auto desktop:w-desktop gap-16'>
        <div
          className="
          flex
          flex-col
          laptop:flex-row
          gap-10
          h-fit
          bg-white
          dark:bg-bgColorCardDark
        "
        >
          <Headline />
          <div id='video' className="w-full h-fit">
            {/* <NextVideo src={DemoVideo} style={{}} accentColor='#50c9a4' className='w-full h-fit' /> */}
            <MuxPlayer
              streamType="on-demand"
              playbackId="mEeasIlVAz0102nlL9c4DBayMmgj006vKAyRn4h7GbALRY"
              metadataVideoTitle="Placeholder (optional)"
              metadataViewerUserId="Placeholder (optional)"
              accentColor="#50c9a4"
            // primaryColor="#50c9a4"
            // secondaryColor="#000000"
            />
          </div>
        </div>
        <UserReviews />
      </div>

      <div className='w-full h-fit bg-bgColorLight dark:bg-bgColorDark'>
        <section className="flex flex-col h-fit mx-10 gap-5 desktop:w-desktop desktop:mx-auto ">
          {/* <script defer async src='https://cdn.trustindex.io/loader.js?3b845a03223a5388e946ead85cf'></script> */}

          <div id='step-1' className='flex flex-col desktop:flex-row h-screen justify-center items-center gap-10'>
            <div className='flex flex-col gap-10'>
              <h3 className='flex flex-col mt-5 text-6xl text-center text-primaryColor'>
                <span>Spanisch To-Go,</span>
                <span>egal wann, egal wo.</span>
                <span></span>
              </h3>
              <p className='text-center text-xl px-24'><span className='text-primaryColor'>Lerne effektiv</span> und mit Spaß Vokabeln, die dich weiterbringen und <span className='text-primaryColor'>auf dein Level abgestimmt</span> sind. Denn eine Sprache zu lernen macht nur Spaß, wenn das Lernen maßgeschneidert  ist.</p>
            </div>
            <picture className='flex w-full h-fit justify-center'>
              <Image src='/photos/levels.png' width={380} height={380} alt='levels photo sample' className='rounded-tr-[100px] shadow-customized' />
            </picture>
          </div>

          <div id='step-2' className='flex flex-col-reverse desktop:flex-row h-screen gap-10'>
            <picture className='flex justify-center w-full h-fit'>
              <Image src='/photos/levels.png' width={380} height={380} alt='levels photo sample' className='rounded-tr-[100px] shadow-customized' />
            </picture>
            <div className='flex flex-col gap-10'>
              <h3 className='flex flex-col mt-5 text-6xl text-center text-primaryColor'>
                <span>Du lernst nicht</span>
                <span>alleine.</span>
                <span></span>
              </h3>
              <p className='text-center text-xl px-24'>
                Belu <span className='text-primaryColor'>hat</span>schon vielen Menschen geholfen, ihr <span className='text-primaryColor'>Spanisch</span> zu verbessern. Begib dich jetzt auf deine Reise und teste die App 3 Tage gratis.
              </p>
            </div>
          </div>

          <div id='step-3' className='flex flex-col desktop:flex-row h-screen gap-10'>
            <div className='flex flex-col gap-10'>
              <h3 className='flex flex-col mt-5 text-6xl  text-center text-primaryColor'>
                <span>Spanisch To-Go,</span>
                <span>egal wann, egal wo.</span>
                <span></span>
              </h3>
              <p className='text-center text-xl px-24 '><span className='text-primaryColor'>Lerne effektiv</span> und mit Spaß Vokabeln, die dich weiterbringen und <span className='text-primaryColor'>auf dein Level abgestimmt</span> sind. Denn eine Sprache zu lernen macht nur Spaß, wenn das Lernen maßgeschneidert  ist.</p>
            </div>
            <picture className='flex w-full h-fit justify-center '>
              <Image src='/photos/levels.png' width={380} height={380} alt='levels photo sample' className='rounded-tr-[100px] shadow-customized' />
            </picture>
          </div>

          <div id='step-4' className='flex flex-col-reverse desktop:flex-row h-fit mb-20 gap-10'>
            <picture className='flex justify-center w-full h-fit '>
              <Image src='/photos/levels.png' width={380} height={380} alt='levels photo sample' className='rounded-tr-[100px] shadow-customized' />
            </picture>
            <div className='flex flex-col gap-10'>
              <h3 className='flex flex-col mt-5 text-6xl  text-center text-primaryColor'>
                <span>Du lernst nicht</span>
                <span>alleine.</span>
                <span></span>
              </h3>
              <p className='text-center text-xl px-24 '>
                Belu <span className='text-primaryColor'>hat</span>schon vielen Menschen geholfen, ihr <span className='text-primaryColor'>Spanisch</span> zu verbessern. Begib dich jetzt auf deine Reise und teste die App 3 Tage gratis.
              </p>
            </div>
          </div>
        </section>
      </div>


      <div
        className='
          bg-white
          dark:bg-bgColorCardDark
          w-full
          h-screen
        '
        ref={stickyEnd}
      >
        Reviews
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