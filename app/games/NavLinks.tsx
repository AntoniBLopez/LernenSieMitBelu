'use client';

import {
  BoltIcon,
  ClipboardDocumentListIcon,
  PuzzlePieceIcon,
  PencilSquareIcon,
  PencilIcon

} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  // { name: 'Temporal Back', href: '/ui/levels/topics', icon: ArrowUturnLeftIcon },
  { name: 'Karteikarten', href: '/games/flashcards', icon: BoltIcon }, // N.1
  { name: 'Multiple Choice', href: '/games/multiplechoice', icon: ClipboardDocumentListIcon }, // N.2
  { name: 'Schreiben', href: '/games/writing', icon: PencilSquareIcon }, // N.4
  { name: 'Zuordnen', href: '/games/matching', icon: PuzzlePieceIcon, }, // N.3
];

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-fit gap-2 py-3 px-6 items-center rounded-md drop-shadow-md text-sm font-medium bg-gray-50 hover:bg-sky-100 hover:text-blue-600',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6 max-mobile:ml-[28%] max-md:ml-[38%]" />
            <p className="self-end font-semibold">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
