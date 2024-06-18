'use client'
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../lib/hooks'
import { RootState } from '../lib/store'

const endPoints = [
  { name: 'Home', href: '/' },
  { name: 'Levels', href: '/levels' },
  { name: 'Topics', href: '/levels/topics' },
  { name: 'Games', href: '/games' },
  { name: 'Flashcards', href: '/games/flashcards' },
  { name: 'MultipleChoice', href: '/games/multiplechoice' },
  { name: 'Writing', href: '/games/writing' },
  { name: 'Matching', href: '/games/matching' },
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
    <div ref={mainRef} className='flex flex-row items-center gap-1 mx-12 mt-7 laptop:mx-auto laptop:max-w-desktop'>
      {endPoints.slice(0, position + 1).map(({ name, href }, index) => {
        if (position > 3) {
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
                    {endPoints.slice(1, position).map(({ name, href }, subIndex) => (
                      <React.Fragment key={`reduced-${subIndex}`}>
                        <Link href={href} className='block py-1 px-2 hover:rounded-md hover:bg-gray-100 hover:text-primaryColor'>
                          {name}
                        </Link>
                        {
                          subIndex < endPoints.slice(1, position).length
                          &&
                          <ChevronRightIcon key={`chevron-${subIndex}`} className='h-3 w-3 ml-0 block laptop:hidden' />
                        }
                      </React.Fragment>
                    ))}
                  </div>
                )}
                {index < position
                  &&
                  <ChevronRightIcon key={`chevron-${index}`} className='h-3 w-3 ml-0' />
                }
              </React.Fragment>
            )
          } else if (index === 0 || index > position - 1 && isSizeReduced) {
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
