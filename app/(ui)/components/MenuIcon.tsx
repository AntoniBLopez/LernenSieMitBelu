'use client'
import { useEffect, useState } from 'react'
import { Dropdown } from "flowbite-react"
import Link from 'next/link';
import Image from "next/image";
import {
  // SpeakerXMarkIcon,
  // ChevronRightIcon,
  SpeakerWaveIcon,
  Cog6ToothIcon,
  UserIcon,
  ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/outline'

export default function MenuIcon() {

  const isBrowser = typeof window !== 'undefined'
  const [isSpeakerOn, setIsSpeakerOn] = useState(isBrowser ? localStorage.getItem("soundOn") === "true" : true)

  const handleSpeaker = () => {
    const modeChanged = !isSpeakerOn
    localStorage.setItem("soundOn", modeChanged.toString())
    setIsSpeakerOn(!isSpeakerOn)
  }

  return (
    <Dropdown
      label={<Image
        src={'/icons/icon.png'}
        width={40}
        height={40}
        className="rounded-full hover:cursor-pointer hover:scale-110"
        alt="Site icon"
      />}
      className='light:border-none rounded-lg drop-shadow-md bg-white dark:bg-bgColorCardDark dark:border-2 dark:border-gray-800'
      arrowIcon={false}
      inline
      dismissOnClick={true} // Keep dropdown open or not when click inside
    >
      <Dropdown.Item className='gap-2 pb-3 hover:cursor-default hover:bg-transparent select-text'>
        <Image
          src={'/icons/icon.png'}
          width={35}
          height={35}
          className="rounded-full"
          alt="Site icon"
        />
        <div className='flex flex-col text-start'>
          <span className="block text-sm font-semibold">Bonnie Green</span>
          <span className="block truncate text-sm text-grayColor">name@flowbite.com</span>
        </div>
      </Dropdown.Item>
      <div className='w-full h-[0.5px] bg-slate-300 dark:bg-gray-700 mb-1' />
      <Link href="/dashboard/profile">
        <Dropdown.Item className='flex flex-row justify-between font-semibold align-bottom dark:hover:bg-selectedColorDark'>
          <div className='flex flex-row gap-2'>
            <UserIcon width={18} height={18} strokeWidth={1.8} />
            Profile
          </div>
          {/* <ChevronRightIcon width={16} height={16} strokeWidth={1.5} className='' /> */}
        </Dropdown.Item>
      </Link>
      <Dropdown.Item onClick={handleSpeaker} className='flex flex-row justify-between font-semibold align-bottom dark:hover:bg-selectedColorDark'>
        <div className='flex flex-row gap-2'>
          <SpeakerWaveIcon width={18} height={18} strokeWidth={1.5} />
          Sound
        </div>
        <span className='font-medium text-grayColor'>{isSpeakerOn ? 'On' : 'Off'}</span>
      </Dropdown.Item>
      <Link href="/dashboard/settings">
        <Dropdown.Item className='flex flex-row justify-between font-semibold align-bottom dark:hover:bg-selectedColorDark'>
          <div className='flex flex-row gap-2'>
            <Cog6ToothIcon width={18} height={18} strokeWidth={1.8} />
            Settings
          </div>
          {/* <ChevronRightIcon width={16} height={16} strokeWidth={1.5} className='' /> */}
        </Dropdown.Item>
      </Link>
      <Dropdown.Divider className='bg-gray-300 dark:bg-gray-700' />
      <Link href="/">
        <Dropdown.Item className='flex flex-row justify-between font-semibold align-bottom dark:hover:bg-selectedColorDark'>
          <div className='flex flex-row gap-2'>
            <ArrowLeftStartOnRectangleIcon width={18} height={18} strokeWidth={2} className='text-red-500' />
            Sign out
          </div>
        </Dropdown.Item>
      </Link>
    </Dropdown>
  )
}