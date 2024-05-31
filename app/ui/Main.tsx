'use client'
import { bricolage } from '@/app/ui/fonts'
// import Image from 'next/image'
import SideNav from './dashboard/SideNav'
// import { useState } from 'react'

export default function Main() {

  return (
    <main className="h-fit w-full">
      <div className="px-fixed desktop:px-fixedDesktop w-full h-fit">
        <div className="flex flex-col h-screen py-10 text-center" >
          <h1 className='text-6xl text-primaryColor'>Lernen Sie Mit Belu</h1>
          <SideNav />
        </div>
        <div className="px-fixed w-full h-fit">
          <div className="h-screen py-10">

            <h1>Main 2</h1>
          </div>
        </div>

        <div className="px-fixed w-full h-fit">
          <div className="h-screen py-10">

            <h1>Main 3</h1>
          </div>
        </div>
      </div>
    </main >
  )
}