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
import { useTheme } from 'next-themes'

export default function Main() {

  const { theme, systemTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme
  const isBrowser = typeof window !== 'undefined'
  const [isDarkMode, setIsDarkMode] = useState(isBrowser ? localStorage.theme === 'dark' : currentTheme === 'dark')
  const stickyEnd = useRef<HTMLDivElement>(null)
  // const [script, setScript] = useState<any>(null)
  // const scriptRef = useRef<any>(null)

  useEffect(() => {
    setIsDarkMode(currentTheme === 'dark')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTheme])

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
      <div className='flex flex-col h-fit mt-28 desktop:mt-40 mb-20 mx-10 desktop:mx-auto desktop:w-desktop gap-16'>
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
              playbackId="OGDNQsfomBd00iSh6OEXtIF72TpDncqCUl8bZaKS2bVs"
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

      <div className='w-full h-fit pt-20 pb-10 desktop:pt-36 desktop:pb-20 bg-bgColorLight dark:bg-bgColorDark'>
        <section className="flex flex-col h-fit mx-10 gap-24 desktop:gap-44 desktop:w-desktop desktop:mx-auto ">
          {/* <script defer async src='https://cdn.trustindex.io/loader.js?3b845a03223a5388e946ead85cf'></script> */}

          <div id='step-1' className='flex flex-col desktop:flex-row h-fit justify-center items-center gap-10 desktop:gap-14'>
            <div className='flex flex-col gap-10'>
              <h3 className='flex flex-col text-3xl mobile:text-4xl tablet:text-5xl desktop:text-6xl font-bold text-center text-primaryColor'>
                <span>Spanisch To-Go,</span>
                <span>egal wann, egal wo.</span>
                <span></span>
              </h3>
              <p className='text-center text-lg tablet:text-xl tablet:px-24'><span className='text-primaryColor font-semibold'>Lerne effektiv</span> und <span className='text-primaryColor font-semibold'>mit Spaß</span> Vokabeln, die dich weiterbringen und <span className='text-primaryColor font-semibold'>auf dein Level abgestimmt</span> sind. Denn eine Sprache zu lernen macht nur Spaß, wenn das Lernen maßgeschneidert  ist.</p>
            </div>
            <picture className='flex w-full h-fit justify-center'>
              <Image
                src={isDarkMode ? '/photos/levels-dark.png' : '/photos/levels-light.png'}
                width={350} height={350}
                quality={100}
                alt='levels photo sample'
                className='rounded-tr-[100px] shadow-landingpage-card'
              />
            </picture>
          </div>

          <div id='step-2' className='flex flex-col-reverse desktop:flex-row h-fit justify-center gap-10 desktop:gap-14'>
            <picture className='flex justify-center w-full h-fit'>
              <Image
                src={isDarkMode ? '/photos/topic-dark.png' : '/photos/topic-light.png'}
                width={350} height={350}
                quality={100}
                alt='topics photo sample'
                className='rounded-tr-[100px] shadow-landingpage-card'
              />
            </picture>
            <div className='flex flex-col gap-10'>
              <h3 className='flex flex-col mt-5 text-3xl mobile:text-4xl tablet:text-5xl desktop:text-6xl font-bold text-center text-primaryColor'>
                <span>Du lernst nicht</span>
                <span>alleine.</span>
                <span></span>
              </h3>
              <p className='text-center text-lg tablet:text-xl tablet:px-24'>
                Belu <span className='text-primaryColor font-semibold'>hat</span>schon <span className='text-primaryColor font-semibold'>vielen Menschen geholfen</span>, ihr <span className='text-primaryColor font-semibold'>Spanisch</span> zu <span className='text-primaryColor font-semibold'>verbessern</span>. Begib dich jetzt auf deine Reise und teste die App 3 Tage gratis.
              </p>
            </div>
          </div>

          <div id='step-3' className='flex flex-col desktop:flex-row h-fit gap-10 desktop:gap-14'>
            <div className='flex flex-col gap-10'>
              <h3 className='flex flex-col mt-5 text-3xl mobile:text-4xl tablet:text-5xl desktop:text-6xl font-bold text-center break-words text-primaryColor'>
                <span>Zertifizierte</span>
                <span>Lernmethode</span>
                <span></span>
              </h3>
              <p className='text-center text-lg tablet:text-xl tablet:px-24 '>Durch ihre <span className='text-primaryColor font-semibold'>langjährige Erfahrung</span> als <span className='text-primaryColor font-semibold'>zertifizierte Spanischlehrerin</span> für deutschsprachige Schüler kennt Belu die Herausforderungen beim Vokabellernen genau und hat die App <span className='text-primaryColor font-semibold'>speziell</span> auf deine Bedürfnisse <span className='text-primaryColor font-semibold'>zugeschnitten</span>.</p>
            </div>
            <picture className='flex w-full h-fit justify-center '>
              <Image
                src={isDarkMode ? '/photos/games-dark.png' : '/photos/games-light.png'}
                width={350} height={350}
                quality={100}
                alt='Games photo sample'
                className='rounded-tr-[100px] shadow-landingpage-card'
              />
            </picture>
          </div>

          <div id='step-4' className='flex flex-col h-fit gap-10 desktop:gap-14'>
            <div className='flex flex-col w-full desktop:flex-row gap-10'>
              <div className='flex flex-col w-full desktop:mx-20 desktop:flex-row gap-10'>
                <h3 className='flex-2 flex-col w-full desktop:w-fit mt-5 text-3xl mobile:text-4xl tablet:text-5xl desktop:text-6xl font-bold text-center desktop:text-start text-primaryColor'>
                  <span className='break-words'>Karteikarten </span>
                  <br />
                  <span> waren gestern.</span>
                  <span></span>
                </h3>
                <p className='flex-1 text-center tablet:px-24 desktop:px-0 desktop:text-start text-lg tablet:text-xl self-end'>
                  Wiederhole Fehler, wechsle das Level mit einem Klick und lerne in einer strukturierten und sinnvollen Reihenfolge für bessere Erfolge.
                </p>
              </div>
            </div>
            <div className='flex flex-wrap justify-center gap-10'>
              <picture className='flex flex-col justify-center w-fit h-fit gap-2'>
                <span className='self-center font-bold text-primaryColor'>Karteikarten</span>
                <Image
                  src={isDarkMode ? '/photos/games/flashcard-dark.png' : '/photos/games/flashcard-light.png'}
                  width={220}
                  height={220}
                  quality={100}
                  alt='Flashcard game photo sample'
                  className='rounded-[20px] shadow-landingpage-card-blue'
                />
              </picture>
              <picture className='flex flex-col justify-center w-fit h-fit gap-2'>
                <span className='self-center font-bold text-primaryColor'>MultipleChoice</span>
                <Image
                  src={isDarkMode ? '/photos/games/multiplechoice-dark.png' : '/photos/games/multiplechoice-light.png'}
                  width={220}
                  height={220}
                  quality={100}
                  alt='multiplechoice game photo sample'
                  className='rounded-[20px] shadow-landingpage-card-blue'
                />
              </picture>
              <picture className='flex flex-col justify-center w-fit h-fit gap-2'>
                <span className='self-center font-bold text-primaryColor'>Schreiben</span>
                <Image
                  src={isDarkMode ? '/photos/games/writing-dark.png' : '/photos/games/writing-light.png'}
                  width={220}
                  height={220}
                  quality={100}
                  alt='writing game photo sample'
                  className='rounded-[20px] shadow-landingpage-card-blue'
                />
              </picture>
              <picture className='flex flex-col justify-center w-fit h-fit gap-2'>
                <span className='self-center font-bold text-primaryColor'>Zuordnen</span>
                <Image
                  src={isDarkMode ? '/photos/games/multiplechoice-dark.png' : '/photos/games/multiplechoice-light.png'}
                  width={220}
                  height={220}
                  quality={100}
                  alt='multiplechoice game photo sample'
                  className='rounded-[20px] shadow-landingpage-card-blue'
                />
              </picture>
            </div>
          </div>
        </section>
      </div>


      {/* <div
        className='
          bg-white
          dark:bg-bgColorCardDark
          w-full
          h-screen
        '
        ref={stickyEnd}
      >
        Reviews
      </div> */}

      <div id='pricing' className="px-fixed desktop:px-fixedDesktop w-full h-fit bg-bgColorLight dark:bg-bgColorDark">
        <div className="flex flex-col items-center gap-6 desktop:gap-10 h-fit pt-20 pb-28">
          <h3 className='font-bold text-primaryColor'>Preise</h3>
          <h2 className='flex flex-col gap-2 text-3xl mobile:text-4xl desktop:text-6xl text-center font-extrabold'>
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

          <div className='flex flex-col laptop:flex-row gap-10 tablet:pt-10'>
            <div className='
              flex
              flex-col
              relative
              w-full
              max-mobile:w-72
              max-tablet:w-96
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
              max-mobile:w-72
              max-tablet:w-96
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
              <div className='absolute text-xs font-semibold px-2 py-1 bg-primaryColor text-white dark:text-black rounded-full z-10 -top-3 translate-x-20 mobile:translate-x-32 tablet:translate-x-[168px]'>
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