import React from 'react'
import { Word } from '@/types'
import GameButton from './GameButton'
import {
  ArrowPathIcon,
  ArrowUturnLeftIcon
} from '@heroicons/react/24/outline'

function FinalGameButtons({ topicWords, actualCardNumber, restart = () => undefined, goToChangeTopic = () => undefined }: { topicWords: Word[], actualCardNumber: number, restart?: () => void, goToChangeTopic?: () => void }) {
  return (
    <div className='flex flex-col gap-2'>
      <GameButton name='Weiterlernen' restart={restart} Icon={ArrowPathIcon} isLastCard={topicWords.length === actualCardNumber} />
      <GameButton name='Thema wechseln' goToChangeTopic={goToChangeTopic} changeTopicButton={true} Icon={ArrowUturnLeftIcon} isLastCard={topicWords.length === actualCardNumber} />
    </div>
  )
}

export default FinalGameButtons