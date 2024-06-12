'use client'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../lib/hooks'
import { RootState } from '../lib/store'


function Option({ name, showMessage, isCorrect, resetOptionDesign }: { name: string | number, showMessage: boolean, isCorrect: boolean, resetOptionDesign: boolean }) {

  const [clicked, setClicked] = useState(false)
  const isSoundOn = useAppSelector((state: RootState) => state.store.soundOn)
  const correctSound = new Audio('/sounds/correct-answer.mp3')

  const handleClick = () => {
    if (showMessage) return
    setClicked(true)
  }

  useEffect(() => {
    if (resetOptionDesign) {
      setClicked(false)
    }
  }, [resetOptionDesign])

  useEffect(() => {
    if (showMessage && isCorrect && isSoundOn) {
      correctSound.play()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clicked])

  return (
    <div onClick={handleClick} className={`
      ${clicked
        ?
        isCorrect
          ?
          'border-green-500 font-medium'
          :
          'border-red-500 font-medium'
        :
        'border-gray-200'
      }
      ${showMessage
        ?
        clicked
          ?
          'opacity-100 hover:bg-none'
          :
          `opacity-50 hover:bg-none ${isCorrect ? 'border-green-400' : 'border-gray-200'}`
        :
        'hover:bg-selectedPrimaryColor hover:cursor-pointer hover:font-medium hover:border-slate-300'
      }
      border-2
      rounded-lg
      p-2
    `}>
      {name}
    </div >
  )
}

export default Option