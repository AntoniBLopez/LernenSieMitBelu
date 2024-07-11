'use client'
import { useAppSelector } from '@/app/lib/hooks'
import { RootState } from '@/app/lib/store'
// import Link from 'next/link'
import { useEffect, useState } from 'react'

function SelectedLabels({ showLevel = false, showTopic = false }: { showLevel?: boolean, showTopic?: boolean }) {


  // const isBrowser = typeof window !== 'undefined'
  const chosenLevel = useAppSelector((state: RootState) => state.store.chosenLevel)
  const chosenTopic = useAppSelector((state: RootState) => state.store.chosenTopic)
  // const [selectedLevel, setSelectedLevel] = useState(isBrowser ? localStorage.getItem("selectedLevel") : null)
  // const [selectedTopic, setSelectedTopic] = useState(isBrowser ? localStorage.getItem("selectedTopic") : null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(chosenLevel)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(chosenTopic)

  useEffect(() => {
    if (!selectedLevel) {
      setSelectedLevel(localStorage.getItem("selectedLevel"))
    }
    if (!selectedTopic) {
      setSelectedTopic(localStorage.getItem("selectedTopic"))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex flex-row items-center gap-1'>
      {
        showLevel
        &&
        // <Link href={'/ui/levels'} className={`text-sm font-semibold py-1 px-5 rounded-full hover:cursor-pointer text-white bg-gradient-to-r from-green-400 to-blue-400`}>{selectedLevel}</Link>
        <div
          className={`text-sm font-semibold py-1 px-5 rounded-full cursor-default text-white bg-gradient-to-r from-green-400 to-blue-400`}>
          {
            selectedLevel
              ?
              selectedLevel
              :
              'Ladet...'
          }
        </div>
      }
      {
        showTopic
        &&
        // <Link href={'/ui/levels/topics'} className={`text-sm font-semibold py-1 px-5 rounded-full hover:cursor-pointer text-white bg-gradient-to-r from-green-400 to-blue-400`}>{selectedTopic}</Link>
        <div className={`text-sm font-semibold py-1 px-5 rounded-full cursor-default text-white bg-gradient-to-r from-green-400 to-blue-400`}>
          {
            selectedTopic
              ?
              selectedTopic
              :
              'Ladet...'
          }
        </div>
      }
    </div>

  )
}

export default SelectedLabels