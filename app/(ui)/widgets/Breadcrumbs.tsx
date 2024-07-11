'use client'
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '@/app/lib/hooks'
import { RootState } from '@/app/lib/store'

const endPoints = [
  { name: 'Home', href: '/' },
  { name: 'Levels', href: '/levels' },
  { name: 'Themen', href: '/levels/topics' }, // Topics
  { name: 'Spiele', href: '/games' }, // Games
  { name: 'Karteikarten', href: '/games/flashcards' }, // Flashcards
  { name: 'MultipleChoice', href: '/games/multiplechoice' },
  { name: 'Schreiben', href: '/games/writing' }, // Writing
  { name: 'Zuordnen', href: '/games/matching' }, // Matching
]

function Breadcrumbs() {

  const { position } = useAppSelector((state: RootState) => state.store.activeTab)

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

  return (
    // <div ref={mainRef} className='flex flex-row items-center gap-1'> // Styles in Header
    <div ref={mainRef} className='flex flex-row items-center gap-1 mx-6 mt-7 laptop:mx-auto laptop:max-w-desktop'>
      {endPoints.slice(0, position + 1).map(({ name, href }, index) => {
        if (position > 3 && window.innerWidth <= 640) {
          if (index > 0 && index < endPoints.length - 2 && !isSizeReduced) {
            isSizeReduced = true
            return (
              <React.Fragment key={index}>
                <button onClick={handleReducedBreadcrumbs} className='flex items-center gap-2'>
                  <div className={`${index < position ? 'hover:text-primaryColor text-current' : 'font-semibold hover:cursor-default'}`}>
                    ...
                  </div>
                </button>
                {showReducedBreadcrumbs && (
                  <div ref={dropdownRef} className={`absolute flex flex-row top-[6rem] left-[${marginLeft}] laptop:divide-x bg-white drop-shadow-md rounded-md items-center z-10`}>
                    {endPoints.slice(1, position).map(({ name, href }, subIndex) => {
                      if (subIndex > 1) return null
                      return (
                        <React.Fragment key={`reduced-${subIndex}`}>
                          <Link onClick={() => setShowReducedBreadcrumbs(false)} href={href} className='block py-1 px-2 hover:rounded-md hover:bg-gray-100 hover:text-primaryColor'>
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
                  <div className={`${index < position ? 'hover:text-primaryColor text-current' : 'font-semibold hover:cursor-default'}`}>
                    {name === 'Home' ? <HomeIcon className='h-5 w-5' /> : name}
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
          if (position > 4 && index === 4) return
          if (position > 5 && index === 5) return
          return (
            <React.Fragment key={index}>
              <Link href={href} className='flex items-center gap-2'>
                <div className={`${index < position ? 'hover:text-primaryColor text-current' : 'font-semibold hover:cursor-default'}`}>
                  {name === 'Home' ? <HomeIcon className='h-5 w-5' /> : name}
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

export default Breadcrumbs
