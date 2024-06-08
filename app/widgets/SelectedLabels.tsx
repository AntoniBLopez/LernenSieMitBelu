'use client'
import { useState } from 'react'

function SelectedLabels({ showLevel = false, showTopic = false }: { showLevel?: boolean, showTopic?: boolean }) {

  const isBrowser = typeof window !== 'undefined'
  const [selectedLevel, setSelectedLevel] = useState(isBrowser ? localStorage.getItem("selectedLevel") : null)
  const [selectedTopic, setSelectedTopic] = useState(isBrowser ? localStorage.getItem("selectedTopic") : null)

  return (
    <div className='flex flex-row items-center gap-1'>
      {
        showLevel
        &&
        <div className='text-sm font-semibold py-1 px-5 rounded-full text-white bg-gradient-to-r from-green-400 to-blue-400'>{selectedLevel}</div>
      }
      {
        showTopic
        &&
        <div className='text-sm font-semibold py-1 px-5 rounded-full text-white bg-gradient-to-r from-green-400 to-blue-400'>{selectedTopic}</div>
      }
    </div>

  )
}

export default SelectedLabels