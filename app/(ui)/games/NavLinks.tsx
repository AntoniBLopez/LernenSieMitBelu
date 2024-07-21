'use client';
import {
  BoltIcon,
  ClipboardDocumentListIcon,
  PuzzlePieceIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
// import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Karteikarten', href: '/games/flashcards', icon: BoltIcon }, // N.1
  { name: 'Multiple Choice', href: '/games/multiplechoice', icon: ClipboardDocumentListIcon }, // N.2
  { name: 'Schreiben', href: '/games/writing', icon: PencilSquareIcon }, // N.4
  { name: 'Zuordnen', href: '/games/matching', icon: PuzzlePieceIcon, }, // N.3
];

export default function NavLinks() {
  // const pathname = usePathname()

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.name === 'Zuordnen' ? '' : link.href}
            className={clsx(
              'flex flex-col h-fit py-3 px-6 items-center rounded-md drop-shadow-md text-sm font-medium whitespace-nowrap bg-gray-50 dark:bg-bgColorCardDark hover:bg-sky-100 hover:text-primaryDarkColor',
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
