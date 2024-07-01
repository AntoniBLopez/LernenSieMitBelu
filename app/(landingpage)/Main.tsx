'use client'
import Headline from '@/app/(landingpage)/utils/Headline'
import Image from 'next/image'
import PaymentButton from '@/app/(landingpage)/widgets/PaymentButton'
import PlanDetails from './widgets/PlanDetails'
import NextVideo from 'next-video'
import DemoVideo from '@/videos/lernenapp.mp4'
// import { useState } from 'react'

export default function Main() {

  return (
    <main className="h-fit w-full">
      <div className="
        grid
        grid-cols-1
        laptop:grid-cols-2
        h-screen
        mx-10
        desktop:mx-auto
        desktop:w-desktop
        mt-20
        mb-36
        bg-white"
      >
        <Headline />
        <div className="w-full h-full">
          <NextVideo src={DemoVideo} style={{}} accentColor='#50c9a4' className='w-full h-fit' />
        </div>
      </div>

      {/* <div className="px-fixed desktop:px-fixedDesktop w-full h-fit bg-primaryExtraDarkColor">
        <div className="h-screen py-10">
          <h1>Main 3</h1>
        </div>
      </div> */}

      <div id='pricing' className="px-fixed desktop:px-fixedDesktop w-full h-fit bg-bgColor">
        <div className="flex flex-col items-center gap-10 h-fit py-20">
          <h3 className='font-bold text-primaryColor'>Pricing</h3>
          <h2 className='flex flex-col gap-2 text-5xl text-center font-extrabold'>
            <span>
              Your final stop in the
            </span>
            search for organization!
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
              &nbsp;&nbsp;25% off
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
              drop-shadow-md
              laptop:hover:scale-105 transition-all duration-200
            '>

              {/* <p className='font-bold text-lg'>Starter</p> */}
              <p className='font-bold text-lg'>Monthly Pass</p>

              <div className='flex flex-row gap-2'>
                <span className='flex flex-col justify-end mb-1 line-through opacity-80 text-xl'>
                  20€
                </span>
                <span className='text-5xl font-bold'>
                  15€
                </span>
                <span className='flex flex-col justify-end mb-1 opacity-60 text-sm font-semibold'>
                  EUR
                </span>
              </div>

              <li className='flex flex-col gap-2'>
                <PlanDetails text='Limited Workspaces (5)' />
                <PlanDetails text='5 Blocks per Workspace' />
                <PlanDetails text='5 Tasks per Block' />
                <PlanDetails text='Viewing with Google Calendar' />
              </li>
              <div className='flex flex-col gap-2 text-center'>
                <PaymentButton size='w-[100%]' />
                <p className='text-sm font-medium opacity-90'>Pay once. Start building blocks!</p>
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
              drop-shadow-md
              laptop:hover:scale-105 transition-all duration-200
            '>
              <div className='absolute text-xs font-semibold px-2 py-1 bg-primaryColor text-white rounded-full z-10 -top-3 translate-x-[172px]'>
                Popular
              </div>

              <p className='font-bold text-lg'>Half-Year Pass</p>

              <div className='flex flex-row gap-2'>
                <span className='flex flex-col justify-end mb-1 line-through opacity-80 text-xl'>
                  90€
                </span>
                <span className='text-5xl font-bold'>
                  75€
                </span>
                <span className='flex flex-col justify-end mb-1 opacity-60 text-sm font-semibold'>
                  EUR
                </span>
              </div>

              <li className='flex flex-col gap-2'>
                <PlanDetails text='Unlimited Workspaces' />
                <PlanDetails text='500 Blocks per Workspace' />
                <PlanDetails text='500 Tasks per Block' />
                <PlanDetails text='Viewing with Google Calendar' />
              </li>
              <div className='flex flex-col gap-2 text-center'>
                <PaymentButton size='w-[100%]' />
                <p className='text-sm font-medium opacity-90'>Pay once. Build unlimited blocks!</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main >
  )
}