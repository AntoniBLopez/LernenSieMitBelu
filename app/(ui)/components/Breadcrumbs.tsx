'use client'
import { UserIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Breadcrumbs() {
  const isBrowser = typeof window !== "undefined"
  const pathName = usePathname()
  const level = pathName.split('/')[2]
  const topic = pathName.split('/')[4]

  const endPoints = [
    { name: 'Profile', href: '/dashboard/profile' },
    { name: 'Levels', href: '/levels' },
    { name: 'Themen', href: `/levels/${level}/topics` }, // Topics
    { name: 'Spiele', href: `/levels/${level}/topics/${topic}/games` }, // Games
    { name: 'Karteikarten', href: `/levels/${level}/topics/${topic}/games/flashcards` }, // Flashcards
    { name: 'MultipleChoice', href: `/levels/${level}/topics/${topic}/games/multiplechoice` }, // MultipleChoice
    { name: 'Schreiben', href: `/levels/${level}/topics/${topic}/games/writing` }, // Writing
    { name: 'Zuordnen', href: `/levels/${level}/topics/${topic}/games/matching` }, // Matching
  ]

  const [showReducedBreadcrumbs, setShowReducedBreadcrumbs] = useState(false)
  const [isClickOutside, setIsClickOutside] = useState(false)

  const mainRef = useRef<HTMLInputElement>(null)
  const [marginLeft, setMarginLeft] = useState('12px');

  const dropdownRef = useRef<HTMLDivElement | null>(null)
  let isSizeReduced = false

  const handleReducedBreadcrumbs = () => {
    if (isClickOutside) return
    setShowReducedBreadcrumbs(!showReducedBreadcrumbs)
  }

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowReducedBreadcrumbs(false)
      setIsClickOutside(true)
      setTimeout(() => {
        setIsClickOutside(false)
      }, 100);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handleMarginResize = () => {
      if (mainRef.current) {
        const mainElement = mainRef.current;
        const computedStyles = window.getComputedStyle(mainElement);
        const marginLeft = computedStyles.marginLeft;
        setMarginLeft(marginLeft);
      }
    }
    window.addEventListener('resize', handleMarginResize)
    return () => {
      window.removeEventListener('resize', handleMarginResize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainRef.current])

  const position = endPoints.findIndex(endpoint => endpoint.href === pathName)

  return (
    <div ref={mainRef} className='flex flex-row items-center gap-1 mx-6 mt-7 laptop:mx-auto laptop:max-w-desktop'>
      {endPoints.slice(0, position + 1).map(({ name, href }, index) => {
        if (position > 3 && isBrowser && window.innerWidth <= 640) {
          if (index > 0 && index < endPoints.length - 2 && !isSizeReduced) {
            isSizeReduced = true
            return (
              <React.Fragment key={index}>
                <button onClick={handleReducedBreadcrumbs} className='flex items-center gap-2'>
                  <div className={`${index < position ? 'hover:text-primaryDarkColor text-current' : 'text-primaryDarkColor dark:text-primaryColor font-semibold hover:cursor-default'}`}>
                    ...
                  </div>
                </button>
                {showReducedBreadcrumbs && (
                  <div ref={dropdownRef} className={`absolute flex flex-row top-[6rem] left-[${marginLeft}] laptop:divide-x bg-white dark:bg-bgColorCardDark drop-shadow-md rounded-md items-center z-10`}>
                    {endPoints.slice(1, position).map(({ name, href }, subIndex) => {
                      if (subIndex > 1) return null
                      return (
                        <React.Fragment key={`reduced-${subIndex}`}>
                          <Link onClick={() => setShowReducedBreadcrumbs(false)} href={href} className='block py-1 px-2 hover:rounded-md hover:bg-gray-100 dark:hover:bg-bgColorCardHoverDark hover:text-primaryColor dark:hover:text-primaryDarkColor'>
                            {name}
                          </Link>
                          {
                            subIndex < endPoints.slice(1, 2).length
                            &&
                            <ChevronRightIcon key={`chevron-${subIndex}`} className='h-3 w-3 ml-0 block laptop:hidden' />
                          }
                        </React.Fragment>
                      )
                    })}
                  </div>
                )}
                {index < position
                  &&
                  <ChevronRightIcon key={`chevron-${index}`} className='h-3 w-3 ml-0' />
                }
              </React.Fragment>
            )
          } else if (index === 0 || isSizeReduced) {
            console.log(position)
            console.log(index)
            if (position === 4 && index === 2) return

            if (position === 5 && index === 2) return
            if (position === 5 && index === 4) return

            if (position === 6 && index === 2) return
            if (position === 6 && index === 4) return
            if (position === 6 && index === 5) return

            if (position === 7 && index === 2) return
            if (position === 7 && index === 4) return
            if (position === 7 && index === 5) return
            if (position === 7 && index === 6) return

            return (
              <React.Fragment key={index}>
                <Link href={href} className='flex items-center gap-2'>
                  <div className={`${index < position ? 'hover:text-primaryDarkColor text-current' : 'text-primaryColor dark:text-primaryColor font-semibold hover:cursor-default'}`}>
                    {name === 'Profile' ? <UserIcon className='h-5 w-5' /> : name}
                  </div>
                </Link>
                {
                  index < position
                  &&
                  <ChevronRightIcon key={`chevron-${index}`} className='h-3 w-3 ml-0' />
                }
              </React.Fragment>
            )
          }
        } else {
          /* Hide the games the user is not playing */
          if (position > 4 && index === 4) return
          if (position > 5 && index === 5) return
          if (position > 6 && index === 6) return
          return (
            <React.Fragment key={index}>
              <Link href={href} className='flex items-center gap-2'>
                <div className={`${index < position ? 'hover:text-primaryDarkColor text-current' : 'text-primaryDarkColor dark:text-primaryColor font-semibold hover:cursor-default'}`}>
                  {name === 'Profile' ? <UserIcon className={`h-5 w-5 ${position === 0 ? 'h-6' : ''}`} strokeWidth={position === 0 ? 2 : 1.5} /> : name}
                </div>
              </Link>
              {index < position
                &&
                <ChevronRightIcon key={`chevron-${index}`} className='h-3 w-3 ml-0' />
              }
            </React.Fragment>
          )
        }
      })}
    </div >
  )
}