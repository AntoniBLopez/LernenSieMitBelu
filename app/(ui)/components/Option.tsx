'use client'
import Image from 'next/image'
import { BiUserVoice } from "react-icons/bi";
import { useEffect, useState } from 'react'

function Option({ name, showMessage, isThisOptionCorrect, isChosenCorrect, resetOptionDesign }: { name: string | number, showMessage: boolean, isThisOptionCorrect: boolean, isChosenCorrect: boolean, resetOptionDesign: boolean }) {

  const [clicked, setClicked] = useState(false)
  const [currentlySpeaking, setCurrentlySpeaking] = useState(false)

  const handleClick = () => {
    if (showMessage) return
    setClicked(true)
  }

  const handleVoice = (event: any) => {
    event.stopPropagation()
    if (!currentlySpeaking) {
      let utterance = new SpeechSynthesisUtterance(name.toString())
      utterance.lang = 'es-ES'
      utterance.onstart = () => {
        setCurrentlySpeaking(true)
      }
      utterance.onend = () => {
        setCurrentlySpeaking(false)
      }
      speechSynthesis.speak(utterance)
    }
  }

  useEffect(() => {
    if (resetOptionDesign) {
      setClicked(false)
    }
  }, [resetOptionDesign])

  return (
    <div onClick={handleClick} className={`
      flex
      justify-between
      items-center
      border-2
      border-gray-200
      dark:border-gray-600
      rounded-lg
      ${clicked
        ?
        isThisOptionCorrect
          ?
          'bg-green-50 dark:bg-green-200 border-green-500 dark:border-green-500 text-black font-medium py-1 pl-[0.55rem] pr-1'
          :
          'bg-red-50 dark:bg-red-300 border-red-500 dark:border-red-500 text-black font-medium p-[0.55rem]'
        :
        'border-gray-200 p-[0.55rem]'
      }
      ${showMessage
        ?
        clicked
          ?
          'opacity-100 hover:bg-none'
          :
          `opacity-50 hover:bg-none ${isThisOptionCorrect ? 'border-green-400 dark:border-green-300 py-1 pl-[0.55rem] pr-1' : 'border-gray-200 dark:border-gray-600'}`
        :
        'hover:bg-selectedPrimaryColor dark:hover:bg-[#273b35] hover:cursor-pointer hover:font-medium hover:border-slate-300'
      }
    `}>
      <span className='ml-2'>
        {name}
      </span>
      {
        showMessage && isThisOptionCorrect
        &&
        <button className={`p-1 rounded-full ${isChosenCorrect ? 'hover:bg-green-200 dark:hover:bg-green-300' : 'hover:bg-gray-300 dark:hover:bg-black'} hover:text-black`} onClick={event => handleVoice(event)}>
          <BiUserVoice className={`w-[1.6rem] h-auto text-black ${isChosenCorrect ? 'dark:text-black' : ' dark:text-white'}`} />
        </button>
      }
    </div >
  )
}

export default Option