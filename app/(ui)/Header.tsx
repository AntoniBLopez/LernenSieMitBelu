'use client'
import MenuIcon from '@/app/(ui)/components/MenuIcon'
import Breadcrumbs from '@/app/(ui)/components/Breadcrumbs'
import { usePathname } from 'next/navigation';
import ThemeMode from '@/app/utils/ThemeMode'
import StartButton from '@/app/(ui)/components/StartButton'

export default function Header() {
  const pathname = usePathname()

  return (
    <>
      <header className="flex flex-row my-3 mx-6 laptop:mx-auto laptop:max-w-desktop justify-between items-center">
        <div className="flex flex-row gap-10">
          <MenuIcon />
        </div>
        <ThemeMode />
      </header>
      {
        pathname.includes('/levels')
          ?
          <Breadcrumbs />
          :
          ''
      }
      <StartButton />
    </>
  )
}