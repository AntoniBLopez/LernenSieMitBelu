'use client'
import {
  SpeakerWaveIcon,
  // SpeakerXMarkIcon,
  Cog6ToothIcon,
  ChevronRightIcon,
  UserIcon,
  ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/outline'
import Image from "next/image";
import { useState } from "react";
import { Dropdown } from "flowbite-react"
import Link from 'next/link';
import Breadcrumbs from '@/app/(ui)/widgets/Breadcrumbs'
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";

export default function Header() {
  const { name } = useAppSelector((state: RootState) => state.store.activeTab)

  const isBrowser = typeof window !== 'undefined'
  const [isSpeakerOn, setIsSpeakerOn] = useState(isBrowser ? localStorage.getItem("soundOn") === "true" : true)

  const handleSpeaker = () => {
    const modeChanged = !isSpeakerOn
    localStorage.setItem("soundOn", modeChanged.toString())
    setIsSpeakerOn(!isSpeakerOn)
  }

  return (
    <>
      <header className="flex flex-row justify-between my-3 mx-6 laptop:mx-auto laptop:max-w-desktop">
        <div className="flex flex-row gap-10">
          <Dropdown
            label={<Image
              src={'/icons/icon.png'}
              width={30}
              height={30}
              className="rounded-full hover:cursor-pointer hover:scale-110"
              alt="Site icon"
            />}
            className='drop-shadow-md'
            arrowIcon={false}
            inline
            dismissOnClick={false}
          >
            <Dropdown.Item className='gap-2 pb-3 hover:bg-white hover:cursor-default select-text'>
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
            <div className='w-full h-[0.5px] bg-slate-300 mb-1' />
            <Link href="/profile">
              <Dropdown.Item className='flex flex-row justify-between font-semibold align-bottom'>
                <div className='flex flex-row gap-2'>
                  <UserIcon width={18} height={18} strokeWidth={1.8} />
                  Profile
                </div>
                <ChevronRightIcon width={16} height={16} strokeWidth={1.5} className='' />
              </Dropdown.Item>
            </Link>
            <Dropdown.Item onClick={handleSpeaker} className='flex flex-row justify-between font-semibold align-bottom'>
              <div className='flex flex-row gap-2'>
                <SpeakerWaveIcon width={18} height={18} strokeWidth={1.5} />
                Sound
              </div>
              <span className='font-medium text-grayColor'>{isSpeakerOn ? 'On' : 'Off'}</span>
            </Dropdown.Item>
            <Dropdown.Item className='flex flex-row justify-between font-semibold align-bottom'>
              <div className='flex flex-row gap-2'>
                <Cog6ToothIcon width={18} height={18} strokeWidth={1.8} />
                Settings
              </div>
              <ChevronRightIcon width={16} height={16} strokeWidth={1.5} className='' />
            </Dropdown.Item>
            <Dropdown.Divider className='bg-gray-300' />
            <Link href="/">
              <Dropdown.Item className='flex flex-row justify-between font-semibold align-bottom'>
                <div className='flex flex-row gap-2'>
                  <ArrowLeftStartOnRectangleIcon width={18} height={18} strokeWidth={2} className='text-red-500' />
                  Sign out
                </div>
              </Dropdown.Item>
            </Link>
          </Dropdown>

          {/* <Breadcrumbs /> */}
        </div>

        {/* <div className="flex flex-row gap-10 items-end">
        {
          isSpeakerOn
            ?
            <SpeakerWaveIcon onClick={handleSpeaker} className='mr-2 hover:cursor-pointer' width={18} height={18} />
            // <Image src="/icons/speakerOn.svg" onClick={handleSpeaker} className='mr-2 hover:cursor-pointer' width={25} height={25} alt="Speaker Icon" />
            :
            <SpeakerXMarkIcon onClick={handleSpeaker} className='mr-2 hover:cursor-pointer' width={18} height={18} />
          // <Image src="/icons/speakerOff.svg" onClick={handleSpeaker} className='mr-2 hover:cursor-pointer' width={25} height={25} alt="Speaker Icon" />
        }
      </div> */}
      </header>
      {
        name === 'Profile'
        ?
        ''
        :
        <Breadcrumbs />
      }
    </>
  )
}