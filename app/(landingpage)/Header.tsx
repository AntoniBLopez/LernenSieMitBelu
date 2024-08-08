'use client'
import Image from "next/image";
import Link from "next/link";
import ThemeMode from '@/app/utils/ThemeMode'
import { animate } from "motion"
import { useEffect, useState } from "react";
import PaymentButton from "./widgets/PaymentButton";


export default function Header() {

  const [isScrolled, setIsScrolled] = useState(false)
  const [showActionButton, setShowActionButton] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    animate("#header", { y: [-100, 0], opacity: [0, 1] }, { duration: 1.2 })

    const handleScroll = () => {
      // Check if scroll position is not at the top
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      if (window.scrollY > 360) {
        setShowActionButton(true)
      } else {
        setShowActionButton(false)
      }
    };

    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsDesktop(false)
      } else {
        setIsDesktop(true)
      }
    }

    // Add event listener
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize)

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  return (
    // desktop:mx-auto desktop:w-desktop
    <>
      <header id="header" className="fixed top-0 w-full bg-white dark:bg-bgColorCardDark z-50">
        <div className="flex flex-row justify-between items-center py-3 px-10">
          <Link
            href={"/"}
          >
            <Image
              src={'/icons/icon.png'}
              width={40}
              height={40}
              className="rounded-full hover:cursor-pointer hover:scale-110 transition-all duration-100"
              alt="Site icon"
            />
          </Link>
          {
            showActionButton
              ?
              <>
                <PaymentButton size='w-50' header hidden={isDesktop ? true : false} />
                <div className="flex flex-row gap-5 tablet:gap-10 items-center">
                  <PaymentButton size='w-50' header hidden={isDesktop ? false : true} />
                  <ThemeMode />
                </div>
              </>
              :
              <div className="flex flex-row gap-10 items-center">
                <Link href="/" className="text-lg font-bold hover:underline">Abo</Link>
                <Link href="/dashboard/profile" className="text-lg font-bold hover:underline">Log In</Link>
                <ThemeMode />
              </div>
          }
        </div>
        <div className={`w-full h-px bg-gray-400 dark:bg-black ${isScrolled ? 'opacity-100' : 'opacity-0'} transition-all duration-1000`} />
      </header>
    </>
  )
}