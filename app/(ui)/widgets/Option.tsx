'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

function Option({ name, showMessage, isCorrect, resetOptionDesign }: { name: string | number, showMessage: boolean, isCorrect: boolean, resetOptionDesign: boolean }) {

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
      rounded-lg
      ${clicked
        ?
        isCorrect
          ?
          'bg-green-50 border-green-500 font-medium py-1 pl-[0.55rem] pr-1'
          :
          'bg-red-50 border-red-500 font-medium p-[0.55rem]'
        :
        'border-gray-200 p-[0.55rem]'
      }
      ${showMessage
        ?
        clicked
          ?
          'opacity-100 hover:bg-none'
          :
          `opacity-50 hover:bg-none ${isCorrect ? 'border-green-400 py-1 pl-[0.55rem] pr-1' : 'border-gray-200'}`
        :
        'hover:bg-selectedPrimaryColor hover:cursor-pointer hover:font-medium hover:border-slate-300'
      }
    `}>
      <span className='ml-2'>
        {name}
      </span>
      {
        showMessage && isCorrect
        &&
        <button className='p-2 rounded-full hover:bg-green-200' onClick={event => handleVoice(event)}>
          <Image src='/icons/voice.png' alt='Symbol zum Anhören des Textes' width={18} height={18} />
        </button>
      }
    </div >
  )
}

export default Option