'use client'
import { useEffect, useState } from 'react'

function Option({ name, showMessage, isCorrect, resetOptionDesign }: { name: string | number, showMessage: boolean, isCorrect: boolean, resetOptionDesign: boolean }) {

  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    if (showMessage) return
    setClicked(true)
  }

  useEffect(() => {
    if (resetOptionDesign) {
      setClicked(false)
    }
  }, [resetOptionDesign])

  return (
    <div onClick={handleClick} className={`
      ${clicked
        ?
        isCorrect
          ?
          'bg-green-50 border-green-500 font-medium'
          :
          'bg-red-50 border-red-500 font-medium'
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