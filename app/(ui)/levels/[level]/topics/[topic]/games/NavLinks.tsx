'use client';
import {
  BoltIcon,
  ClipboardDocumentListIcon,
  PuzzlePieceIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
  const pathName = usePathname()
  const level = pathName.split('/')[2]
  const topic = pathName.split('/')[4]

  const links = [
    { name: 'Karteikarten', href: `/levels/${level}/topics/${topic}/games/flashcards`, icon: BoltIcon }, // N.1
    { name: 'MultipleChoice', href: `/levels/${level}/topics/${topic}/games/multiplechoice`, icon: ClipboardDocumentListIcon }, // N.2
    { name: 'Schreiben', href: `/levels/${level}/topics/${topic}/games/writing`, icon: PencilSquareIcon }, // N.4
    { name: 'Zuordnen', href: `/levels/${level}/topics/${topic}/games/matching`, icon: PuzzlePieceIcon, }, // N.3
  ]

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex flex-col h-fit py-3 px-6 items-center rounded-md drop-shadow-md text-sm font-medium whitespace-nowrap bg-gray-50 dark:bg-bgColorCardDark hover:bg-sky-100 dark:hover:bg-bgColorCardHoverDark hover:text-primaryDarkColor',
              // {
              //   'bg-sky-100 text-blue-600': pathname === link.href,
              // },
            )}
          >
            <div className='flex flex-row self-start gap-2 items-center'>
              <LinkIcon className="w-6 h-auto" />
              <p className="self-end font-semibold">{link.name}</p>
            </div>
          </Link>
        )
      })}
    </>
  )
}
