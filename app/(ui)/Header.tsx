'use client'
import MenuIcon from '@/app/(ui)/components/MenuIcon'
import Breadcrumbs from '@/app/(ui)/components/Breadcrumbs'
import { usePathname } from 'next/navigation';
import ThemeMode from '@/app/utils/ThemeMode'

export default function Header() {
  const pathname = usePathname()

  console.log('pathname', pathname)
  console.log(pathname.includes('/levels') || pathname.includes('/games'))

  return (
    <>
      <header className="flex flex-row my-3 mx-6 laptop:mx-auto laptop:max-w-desktop justify-between items-center">
        <div className="flex flex-row gap-10">
          <MenuIcon />
        </div>
        <ThemeMode />

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
        pathname.includes('/levels') || pathname.includes('/games')
          ?
          <Breadcrumbs />
          :
          ''
      }
    </>
  )
}