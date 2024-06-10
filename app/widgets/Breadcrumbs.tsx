'use client'
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

const endPoints = [
  { name: 'Home', href: '/' },
  { name: 'Levels', href: '/ui/levels' },
  { name: 'Topics', href: '/ui/levels/topics' },
  { name: 'Games', href: '/games' },
  { name: 'MultipleChoice', href: '/games/multiplechoice' },
  { name: 'Matching', href: '/games/matching' },
  { name: 'Flashcards', href: '/games/flashcards' },
]

function Breadcrumbs({ actualTab }: { actualTab: string }) {

  const [showReducedBreadcrumbs, setShowReducedBreadcrumbs] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const actualTabIndex = endPoints.findIndex(({ name }) => name === actualTab)
  const itemsToShow = endPoints.slice(0, actualTabIndex + 1);

  let isSizeReduced = false
  const handleReducedBreadcrumbs = () => {
    setShowReducedBreadcrumbs(!showReducedBreadcrumbs)
  }

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowReducedBreadcrumbs(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='flex flex-row items-center space-x-1'>
      {itemsToShow.map(({ name, href }, index) => {
        if (itemsToShow.length > 4) {
          if (index > 0 && index < itemsToShow.length - 2 && !isSizeReduced) {
            isSizeReduced = true
            return (
              <React.Fragment key={index}>
                <button onClick={handleReducedBreadcrumbs} className='flex items-center gap-2'>
                  <div
                    className={
                      `
                      ${name === actualTab ? 'font-semibold' : 'text-current'}
                      ${index < actualTabIndex ? 'hover:text-primaryColor' : 'text-current hover:cursor-default'}
                      `
                    }
                  >
                    ...
                  </div>
                </button>
                {showReducedBreadcrumbs && (
                  <div ref={dropdownRef} className="absolute flex flex-row top-28 left-12 desktop:left-36 bg-white drop-shadow-md rounded-md items-center z-10">
                    {itemsToShow.slice(1, itemsToShow.length - 2).map(({ name, href }, subIndex) => (
                      <React.Fragment key={`reduced-${subIndex}`}>
                        <Link href={href} className='block py-1 px-2 hover:bg-gray-100 hover:text-primaryColorDark'>
                          {name}
                        </Link>
                        {
                          subIndex < itemsToShow.slice(1, itemsToShow.length - 2).length - 1
                          &&
                          <ChevronRightIcon key={`chevron-${subIndex}`} className='h-3 w-3 ml-0 block tablet:hidden' />
                        }
                      </React.Fragment>
                    ))}
                  </div>
                )}
                {index < actualTabIndex
                  &&
                  <ChevronRightIcon key={`chevron-${index}`} className='h-3 w-3 ml-0' />
                }
              </React.Fragment>
            )
          } else if (index === 0 || index > itemsToShow.length - 3 && isSizeReduced) {
            return (
              <React.Fragment key={index}>
                <Link href={href} className='flex items-center gap-2'>
                  <div
                    className={
                      `
                      ${name === actualTab ? 'font-semibold' : 'text-current'}
                      ${index < actualTabIndex ? 'hover:text-primaryColor' : 'text-current hover:cursor-default'}
                      `
                    }
                  >
                    {name === 'Home' ? <HomeIcon className='h-5 w-5' /> : name}
                  </div>
                </Link>
                {index < actualTabIndex
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
                <div
                  className={
                    `
                  ${name === actualTab ? 'font-semibold' : 'text-current'}
                  ${index < actualTabIndex ? 'hover:text-primaryColor' : 'text-current hover:cursor-default'}
                  `
                  }
                >
                  {name === 'Home' ? <HomeIcon className='h-5 w-5' /> : name}
                </div>
              </Link>
              {index < actualTabIndex
                &&
                <ChevronRightIcon key={`chevron-${index}`} className='h-3 w-3 ml-0' />
              }
            </React.Fragment>
          )
        }
      })
      }
    </div>
  )
}

export default Breadcrumbs