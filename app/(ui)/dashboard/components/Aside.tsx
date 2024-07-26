'use client'
import { UserIcon, ChartPieIcon, LockClosedIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Profile', href: '/dashboard/profile', icon: UserIcon },
  { name: 'Chart', href: '/dashboard/chart', icon: ChartPieIcon },
  { name: 'Privacy', href: '/dashboard/legal', icon: LockClosedIcon, },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
];

export default function Aside() {
  const pathname = usePathname()

  return (
    <aside className={`self-start w-full h-fit tablet:w-fit tablet:h-fit ${pathname.includes('/levels') ? 'hidden' : ''} transition-all duration-500`}>
      <div className='flex flex-row tablet:flex-col w-full h-fit tablet:w-fit tablet:h-full max-tablet:justify-between drop-shadow-md rounded-xl bg-gradient-to-b from-[#55aeb8] to-[#2cd5a2]'>
        {
          links.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  `flex flex-col h-fit w-full tablet:w-fit py-5 px-4 tablet:py-10 tablet:px-6 items-center text-sm font-medium hover:text-black hover:bg-white dark:hover:bg-bgColorCardDark dark:hover:text-white hover:scale-110 transition-all duration-100`,
                  {
                    'scale-110 bg-white text-black dark:bg-bgColorCardDark dark:text-white': pathname === link.href,
                    'bg-transparent text-white': pathname !== link.href,
                    'max-tablet:rounded-tl-xl max-tablet:rounded-bl-xl tablet:rounded-t-xl': index === 0,
                    'max-tablet:rounded-tr-xl max-tablet:rounded-br-xl tablet:rounded-b-xl': index === links.length - 1,
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