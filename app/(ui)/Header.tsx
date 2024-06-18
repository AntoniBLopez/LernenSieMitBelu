'use client'
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "@/app/lib/hooks"
import { changeSoundStatus } from "@/app/lib/features/state/stateSlice"
import { useState } from "react";

export default function Header() {

  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const dispatch = useAppDispatch()

  const handleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn)
    dispatch(changeSoundStatus())
  }

  return (
    <header className="flex flex-row justify-between items-end my-3 mx-12 laptop:mx-auto laptop:max-w-desktop">
      <Link
        href={"/"}
      >
        <Image
          src={'/icons/icon.png'}
          width={30}
          height={30}
          className="rounded-full hover:cursor-pointer hover:scale-110"
          alt="Site icon"
        />
      </Link>
      <div className="flex flex-row gap-10 items-end">
        <Link href="/" className="font-bold hover:underline">Abo</Link>
        <Link href="/" className="font-bold hover:underline">Log In</Link>
        {
          isSpeakerOn
            ?
            <SpeakerWaveIcon onClick={handleSpeaker} className='mr-2 hover:cursor-pointer' width={18} height={18} />
            // <Image src="/icons/speakerOn.svg" onClick={handleSpeaker} className='mr-2 hover:cursor-pointer' width={25} height={25} alt="Speaker Icon" />
            :
            <SpeakerXMarkIcon onClick={handleSpeaker} className='mr-2 hover:cursor-pointer' width={18} height={18} />
          // <Image src="/icons/speakerOff.svg" onClick={handleSpeaker} className='mr-2 hover:cursor-pointer' width={25} height={25} alt="Speaker Icon" />
        }
      </div>
    </header>
  )
}