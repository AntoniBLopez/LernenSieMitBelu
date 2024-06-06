'use client'
import { useEffect, useState } from 'react'

function Option({ name, showMessage, isCorrect, resetResponse }: { name: string | number, showMessage: boolean, isCorrect: boolean, resetResponse: boolean }) {

  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    if (showMessage) return
    setClicked(true)
  }

  useEffect(() => {
    if (resetResponse) {
      setClicked(false)
    }
  }, [resetResponse])

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