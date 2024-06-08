'use client'
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { useState } from 'react'

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

  const actualTabIndex = endPoints.findIndex(({ name }) => name === actualTab)

  const itemsToShow = endPoints.slice(0, actualTabIndex + 1);

  return (
    <div className='flex flex-row items-center space-x-1'>
      {itemsToShow.map(({ name, href }, index) => {
        return (
          <>
            <Link key={index} href={href} className='flex items-center gap-2'>
              <div
                className={`${name === actualTab && 'font-bold'} ${index < actualTabIndex ? 'hover:text-primaryColorDark' : 'hover:cursor-default'}`}
              >
                {name === 'Home' ? <HomeIcon className='h-5 w-5' /> : name}
              </div>
            </Link>
            {index < actualTabIndex
              &&
              <ChevronRightIcon className='h-5 w-5 ml-0' />
            }
          </>
        )
      })
      }
    </div>
  )
}

export default Breadcrumbs