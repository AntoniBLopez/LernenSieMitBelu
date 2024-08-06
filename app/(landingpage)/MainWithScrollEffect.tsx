// 'use client'
// import '@/app/(landingpage)/scrollAnimation.css'
// import { useEffect, useState, useRef } from 'react'
// import Image from 'next/image'
// import Headline from '@/app/(landingpage)/utils/Headline'
// import PaymentButton from '@/app/(landingpage)/widgets/PaymentButton'
// import PlanDetails from '@/app/(landingpage)/widgets/PlanDetails'
// import MuxPlayer from '@mux/mux-player-react'
// // import NextVideo from 'next-video'
// // import DemoVideo from '@/videos/app-vokabeltrainer.mp4'
// import { animate, stagger, inView, timeline, scroll } from "motion"

// export default function Main() {

//   const stickyEnd = useRef<HTMLDivElement>(null)
//   // const [script, setScript] = useState<any>(null)
//   // const scriptRef = useRef<any>(null)

//   // animate(".step-1", { backgroundColor: "red" })

//   const sequence: any = [
//     [{ name: 'standard time', duration: +0.1 }],
//     // ['#step-1 h3', { transform: 'translateY(0%)' }, { duration: 0.1, at: 'standard time' }],
//     // ['#step-1 h3', { transform: 'translateY(0%)' }, { duration: 0.1, at: '-0.1' }],
//     ['#step-1 picture', { transform: 'translateY(0%)' }, { duration: 0.03, at: '<' }],
//     ['#step-1 p', { transform: 'translateY(0%)' }, { duration: 0.03, at: '<' }],
//     // ['#step-1', { transform: 'translateY(0%)' }, { duration: 0.1, at: 'standard time' }],
//     ['#step-1', { transform: 'translateY(-150%)' }, { duration: 0.02, at: 'standard time' }],
//     ['#step-2 h3', { transform: 'translateY(-290%)' }, { duration: 0.02, at: '<' }],
//     ['#step-2 picture', { transform: 'translateY(-100%)' }, { duration: 0.01, at: 'standard time' }],
//     ['#step-2 p', { transform: 'translateY(-420%)' }, { duration: 0.01, at: '<' }],
//     ['#step-2', { transform: 'translateY(-150%)' }, { duration: 0.02, at: 'standard time' }],
//     ['#step-3 h3', { transform: 'translateY(-590%)' }, { duration: 0.02, at: '<' }],
//     ['#step-3 picture', { transform: 'translateY(-200%)' }, { duration: 0.01, at: 'standard time' }],
//     ['#step-3 p', { transform: 'translateY(-630%)' }, { duration: 0.01, at: '<' }],
//     // ['#step-3', { transform: 'translateY(0%)' }, { duration: 0.05, at: 'standard time' }],
//     ['#step-3', { transform: 'translateY(-150%)' }, { duration: 0.02, at: 'standard time' }],
//     ['#step-4 h3', { transform: 'translateY(-860%)' }, { duration: 0.02, at: '<' }],
//     ['#step-4 picture', { transform: 'translateY(-300%)' }, { duration: 0.01, at: 'standard time' }],
//     ['#step-4 p', { transform: 'translateY(-1220%)' }, { duration: 0.01, at: '<' }],
//     ['#step-4 p', { transform: 'translateY(-1220%)' }, { duration: 0.01, at: 'standard time' }],
//     // ['#step-4', { transform: 'translateY(-150%)' }, { duration: 0.01, at: 'standard time' }],
//     // ['#step-4', { transform: 'translateY(-150%)' }, { duration: 5, at: 'standard time' }],
//   ]

//   const getVideo = async () => {
//     await fetch('https://api.mux.com/video/v1/assets/1SZbpjrszuzrmQ69UpetkJ6w65Jkm9yJqZ7IsIcgrtM')
//       .then(response => response.json())
//       .then(data => console.log('video response: ', data))
//       .catch(error => console.log('error: ', error))
//     // console.log('video response: ', response.json())
//     // const data = await response.json()
//     // return data.video
//   }

//   useEffect(() => {
//     getVideo()
//     // animate("#headline", { x: [-500, 0], opacity: [0, 1] }, { duration: 1.2, delay: stagger(1) })
//     animate("#headline", { x: [-500, 0], opacity: [0, 1] }, { duration: 1.5 })
//     animate("#video", { x: [500, 0], opacity: [0, 1] }, { duration: 1.5 })
//     const onScroll = timeline(sequence, { endDelay: 0.2 })

//     scroll(onScroll, {
//       // target: sequence,
//       // offset: ["start end", "end end"],
//       // target: document.querySelector('#step-1'),
//       offset: ["500px", "8500px"],
//     })
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   return (
//     <main className="h-full w-full">
//       <div
//         className="
//           flex
//           flex-col
//           laptop:flex-row
//           overflow-x-hidden
//           gap-10
//           h-screen
//           mx-10
//           desktop:w-desktop
//           desktop:mx-auto
//           mt-20
//           mb-36
//           bg-white
//           dark:bg-bgColorCardDark
//         "
//       >
//         <Headline />
//         <div id='video' className="w-full h-full">
//           {/* <NextVideo src={DemoVideo} style={{}} accentColor='#50c9a4' className='w-full h-fit' /> */}
//           <MuxPlayer
//             streamType="on-demand"
//             playbackId="mEeasIlVAz0102nlL9c4DBayMmgj006vKAyRn4h7GbALRY"
//             metadataVideoTitle="Placeholder (optional)"
//             metadataViewerUserId="Placeholder (optional)"
//             accentColor="#50c9a4"
//             // primaryColor="#50c9a4"
//             // secondaryColor="#000000"
//           />
//         </div>
//       </div>

//       <div className='h-[8000px]'>
//         <div id='text-stop' className='sticky top-0 w-full h-screen bg-bgColorLight dark:bg-bgColorDark'>
//           <section className="flex flex-shrink-0 flex-col pt-40 w-full h-full mx-10 desktop:w-desktop desktop:mx-auto overflow-y-hidden">
//             {/* <script defer async src='https://cdn.trustindex.io/loader.js?3b845a03223a5388e946ead85cf'></script> */}

//             <div id='step-1' className='step absolute flex flex-row gap-10'>
//               <div className='flex flex-col gap-10'>
//                 <h3 className='flex flex-col mt-5 text-6xl text-center text-primaryColor'>
//                   <span>Spanisch To-Go,</span>
//                   <span>egal wann, egal wo.</span>
//                   <span></span>
//                 </h3>
//                 <p className='text-center text-xl px-24 translate-y-[28rem]'><span className='text-primaryColor'>Lerne effektiv</span> und mit Spaß Vokabeln, die dich weiterbringen und <span className='text-primaryColor'>auf dein Level abgestimmt</span> sind. Denn eine Sprache zu lernen macht nur Spaß, wenn das Lernen maßgeschneidert  ist.</p>
//               </div>
//               <picture className='w-full h-fit translate-y-[35rem]'>
//                 <Image src='/photos/levels.png' width={400} height={400} alt='levels photo sample' className='rounded-tr-[100px] shadow-landingpage-card' />
//               </picture>
//             </div>

//             <div id='step-2' className='step absolute flex flex-row gap-10'>
//               <picture className='flex justify-end w-full h-fit translate-y-[13rem]'>
//                 <Image src='/photos/levels.png' width={400} height={400} alt='levels photo sample' className='rounded-tr-[100px] shadow-landingpage-card' />
//               </picture>
//               <div className='flex flex-col gap-10'>
//                 <h3 className='flex flex-col mt-5 text-6xl translate-y-[12rem] text-center text-primaryColor'>
//                   <span>Du lernst nicht</span>
//                   <span>alleine.</span>
//                   <span></span>
//                 </h3>
//                 <p className='text-center text-xl px-24 translate-y-[12rem]'>
//                   Belu <span className='text-primaryColor'>hat</span>schon vielen Menschen geholfen, ihr <span className='text-primaryColor'>Spanisch</span> zu verbessern. Begib dich jetzt auf deine Reise und teste die App 3 Tage gratis.
//                 </p>
//               </div>
//             </div>

//             <div id='step-3' className='step absolute flex flex-row gap-10'>
//               <div className='flex flex-col gap-10'>
//                 <h3 className='flex flex-col mt-5 text-6xl -translate-y-[11rem] text-center text-primaryColor'>
//                   <span>Spanisch To-Go,</span>
//                   <span>egal wann, egal wo.</span>
//                   <span></span>
//                 </h3>
//                 <p className='text-center text-xl px-24 -translate-y-[10rem]'><span className='text-primaryColor'>Lerne effektiv</span> und mit Spaß Vokabeln, die dich weiterbringen und <span className='text-primaryColor'>auf dein Level abgestimmt</span> sind. Denn eine Sprache zu lernen macht nur Spaß, wenn das Lernen maßgeschneidert  ist.</p>
//               </div>
//               <picture className='w-full h-fit -translate-y-[9rem]'>
//                 <Image src='/photos/levels.png' width={400} height={400} alt='levels photo sample' className='rounded-tr-[100px] shadow-landingpage-card' />
//               </picture>
//             </div>

//             <div id='step-4' className='step absolute flex flex-row gap-10'>
//               <picture className='flex justify-end w-full h-fit -translate-y-[31rem]'>
//                 <Image src='/photos/levels.png' width={400} height={400} alt='levels photo sample' className='rounded-tr-[100px] shadow-landingpage-card' />
//               </picture>
//               <div className='flex flex-col gap-10'>
//                 <h3 className='flex flex-col mt-5 text-6xl -translate-y-[32rem] text-center text-primaryColor'>
//                   <span>Du lernst nicht</span>
//                   <span>alleine.</span>
//                   <span></span>
//                 </h3>
//                 <p className='text-center text-xl px-24 -translate-y-[42rem]'>
//                   Belu <span className='text-primaryColor'>hat</span>schon vielen Menschen geholfen, ihr <span className='text-primaryColor'>Spanisch</span> zu verbessern. Begib dich jetzt auf deine Reise und teste die App 3 Tage gratis.
//                 </p>
//               </div>
//             </div>
//           </section>
//         </div>
//       </div>

//       <div
//         className='
//           relative
//           bg-white
//           dark:bg-bgColorCardDark
//           w-full
//           h-screen
//         '
//         ref={stickyEnd}
//       >
//         Reviews
//       </div>

//       <div id='pricing' className="relative px-fixed desktop:px-fixedDesktop w-full h-fit bg-bgColorLight dark:bg-bgColorDark">
//         <div className="flex flex-col items-center gap-10 h-fit py-20">
//           <h3 className='font-bold text-primaryColor'>Preise</h3>
//           <h2 className='flex flex-col gap-2 text-5xl text-center font-extrabold'>
//             <span>
//               Endlich Ihre Begleit-App
//             </span>
//             Lerne jederzeit und Uberall!
//           </h2>

//           <p className='flex flex-row text-md ml-1 items-center'>
//             <Image
//               src="/icons/landingpage/gift.png"
//               width={20}
//               height={20}
//               alt="Git icon"
//               className='inline-block self-start'
//             />
//             <span className='text-[#00C82A] whitespace-nowrap self-start'>
//               &nbsp;&nbsp;15% off
//             </span>
//             &nbsp;for the first 50 customers (12 left)
//           </p>

//           <div className='flex flex-col laptop:flex-row gap-10'>
//             <div className='
//               flex
//               flex-col
//               relative
//               w-full
//               tablet:w-[29rem]
//               h-fit
//               p-8
//               gap-8
//               rounded-xl
//               laptop:rounded-3xl
//               bg-white
//               dark:bg-bgColorCardDark
//               drop-shadow-md
//               transition-all duration-200
//             '>

//               {/* <p className='font-bold text-lg'>Starter</p> */}
//               <p className='font-bold text-lg'>Monatspass</p>

//               <div className='flex flex-row gap-2'>
//                 <span className='flex flex-col justify-end mb-1 line-through opacity-80 text-xl'>
//                   24€
//                 </span>
//                 <span className='text-5xl font-bold'>
//                   20€
//                 </span>
//                 <span className='flex flex-col justify-end mb-1 opacity-60 text-sm font-semibold'>
//                   Monat
//                 </span>
//               </div>

//               <li className='flex flex-col gap-2'>
//                 <PlanDetails text='3 Tage kostenloser Testzeitraum' />
//                 <PlanDetails text='4 Spiele verfügbar' />
//                 <PlanDetails text='A1 bis B2 Vokabeln' />
//               </li>
//               <div className='flex flex-col gap-2 text-center'>
//                 <PaymentButton size='w-[100%]' />
//                 <p className='text-xs font-medium dark:font-normal opacity-60'>Monatliche Zahlung. Lernen Sie, wie und wann Sie wollen!</p>
//               </div>
//             </div>
//             <div className='
//               flex
//               flex-col
//               relative
//               max-w-auto
//               tablet:w-[29rem]
//               h-fit
//               p-8
//               gap-8
//               rounded-xl
//               laptop:rounded-3xl
//               border-primaryColor
//               border-2
//               bg-white
//               dark:bg-bgColorCardDark
//               drop-shadow-md
//               laptop:scale-110 transition-all duration-200
//             '>
//               <div className='absolute text-xs font-semibold px-2 py-1 bg-primaryColor text-white dark:text-black rounded-full z-10 -top-3 translate-x-[168px]'>
//                 Popular
//               </div>

//               <p className='font-bold text-lg'>Semesterpass</p>

//               <div className='flex flex-row gap-2'>
//                 <span className='flex flex-col justify-end mb-1 line-through opacity-80 text-xl'>
//                   24€
//                 </span>
//                 <span className='text-5xl font-bold'>
//                   14€
//                 </span>
//                 <span className='flex flex-col justify-end mb-1 opacity-60 text-sm font-semibold'>
//                   Monat
//                 </span>
//               </div>

//               <li className='flex flex-col gap-2'>
//                 <PlanDetails text='3 Tage kostenloser Testzeitraum' />
//                 <PlanDetails text='4 Spiele verfügbar' />
//                 <PlanDetails text='A1 bis B2 Vokabeln' />
//                 <PlanDetails text='Deine eigene Vokabelliste erstellen' />
//               </li>
//               <div className='flex flex-col gap-2 text-center'>
//                 <PaymentButton size='w-[100%]' />
//                 <p className='text-xs font-medium dark:font-normal opacity-60'>Halbjährliche Zahlung. Lernen Sie, wie und wann Sie wollen!</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main >
//   )
// }