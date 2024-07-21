'use client'
import React, { useEffect } from 'react'
import { UserIcon, ChartPieIcon, LockClosedIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Profile', href: '/profile', icon: UserIcon },
  { name: 'Chart', href: '/profile/chart', icon: ChartPieIcon },
  { name: 'Privacy', href: '/profile/legal', icon: LockClosedIcon, },
  { name: 'Settings', href: '/profile/settings', icon: Cog6ToothIcon },
];

export default function Aside() {
  const pathname = usePathname()

  useEffect(() => {
    console.log('pathname', pathname)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <aside className={`self-start w-fit h-fit ${pathname.includes('/levels') || pathname.includes('/games') ? 'hidden' : ''}`}>
      <div className='flex flex-col w-fit drop-shadow-md rounded-xl bg-gradient-to-b from-[#55aeb8] to-[#2cd5a2]'>
        {
          links.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  `flex flex-col h-fit py-10 px-6 items-center text-sm font-medium hover:text-black hover:bg-white dark:hover:bg-bgColorCardDark dark:hover:text-white hover:scale-110 transition-all duration-200`,
                  {
                    'scale-110 bg-white text-black dark:bg-bgColorCardDark dark:text-white': pathname === link.href,
                    'bg-transparent text-white': pathname !== link.href,
                    'rounded-t-xl': index === 0,
                    'rounded-b-xl': index === links.length - 1,
                  },
                )}
              >
                <div>
                  <Icon className="w-6 h-6" />
                  {/* <p className="self-end font-semibold">{link.name}</p> */}
                </div>
              </Link>
            )
          })
        }
      </div>
    </aside>
  )
}