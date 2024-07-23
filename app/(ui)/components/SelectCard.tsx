import Link from 'next/link'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'

function SelectCard({ isChooseLevels = false, levelName, topicName, length }: { isChooseLevels?: boolean, levelName: string, topicName?: string, length: number }) {
  const isCardBlocked = length < 2

  useEffect(() => {
    if (!localStorage.getItem("soundOn")) {
      localStorage.setItem("soundOn", 'true')
    }
  }, [])

  return (
    <Link
      href={isCardBlocked ? '' : isChooseLevels ? `/levels/${levelName}/topics` : `/levels/${levelName}/topics/${topicName}/games`}
      className={`
        flex
        flex-col
        w-full
        h-fit
        bg-white
        dark:bg-bgColorCardDark
        rounded-md
        group
        ${isCardBlocked ? 'bg-slate-200 opacity-50 hover:cursor-default' : 'drop-shadow-md hover:cursor-pointer'}
      `}
    >
      <div className='flex flex-col w-full h-fit px-5 py-2'>
        <main className={` ${isCardBlocked && 'flex flex-row gap-2 items-center'}`}>
          <span className='font-medium text-xl w-5'>{topicName ? topicName : levelName}</span>
          {
            isCardBlocked
            &&
            <LockClosedIcon className='w-4 h-4' />
          }
        </main>
        <footer>
          <span className='text-sm'>{isCardBlocked ? 'Demnächst' : `${length} ${isChooseLevels ? 'Themen' : 'Wörter'}`}</span>
        </footer>
      </div>
      {/* <div className='w-full h-1 rounded-full bg-gradient-to-r from-green-400 to-blue-400 opacity-60'></div> */}
      {
        !isCardBlocked
        &&
        <div className='w-full h-1 rounded-br-full rounded-bl-full bg-gradient-to-r from-green-400 to-blue-400 opacity-0 group-hover:opacity-80 transition-opacity duration-200'></div>
      }
    </Link>
  )
}

export default SelectCard