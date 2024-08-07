import React from 'react'
import { Word } from '@/types'
import GameButton from './GameButton'
import {
  ArrowPathIcon,
  ArrowUturnLeftIcon
} from '@heroicons/react/24/outline'

function FinalGameButtons({ topicWords, actualCardNumber, bgBlue = false, restart = () => undefined }: { topicWords: Word[], actualCardNumber: number, bgBlue?: boolean, restart?: () => void }) {
  return (
    <div className='flex flex-col w-full justify-center items-center mobile:flex-row gap-4 self-start slide-in'>
      <GameButton name='Weiterlernen' bgBlue={bgBlue} restart={restart} Icon={ArrowPathIcon} isLastCard={topicWords.length === actualCardNumber} />
      <GameButton name='Spiel ändern' bgBlue={bgBlue} changeGameButton={true} Icon={ArrowUturnLeftIcon} isLastCard={topicWords.length === actualCardNumber} />
    </div>
  )
}

export default FinalGameButtons