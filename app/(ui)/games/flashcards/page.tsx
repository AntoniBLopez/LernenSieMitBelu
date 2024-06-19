'use client'
import '@/app/(ui)/games/flashcards/styles.css'
import { useEffect, useRef, useState } from 'react'
import { RootState } from "@/app/lib/store"
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks"
import { getLevelsAndDispatchToStore } from "@/app/lib/features/state/utils"
import { WordsTraduction } from '@/types'
import confettiFireworks from '@/app/(ui)/widgets/confettiFireworks'
import SelectedLabels from '@/app/(ui)/widgets/SelectedLabels'
import GameButton from '@/app/(ui)/widgets/GameButton'
import {
  ChevronRightIcon,
  CheckIcon,
  XMarkIcon,
  ArrowUturnLeftIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation'
import FinalGameButtons from '@/app/(ui)/widgets/FinalGameButtons'
import { setActiveTab } from '@/app/lib/features/state/stateSlice'
// import Speaker from '@/public/icons/speaker.svg'
// import Image from 'next/image'

const knowMessage = 'Known' // Delete and put directly
const stillLearningMessage = 'Still learning' // Delete and put directly

function Page() {

  const [correctSound, setCorrectSound] = useState<HTMLAudioElement | null>(null)
  const [allWordsCorrectSound, setAllWordsCorrectSound] = useState<HTMLAudioElement | null>(null)

  const [isFlipped, setIsFlipped] = useState(false)
  const [nextCard, setNextCard] = useState(false)
  const [prevCard, setPrevCard] = useState(false)

  const [learningCount, setLearningCount] = useState(0)
  const [knownCount, setKnownCount] = useState(0)
  const [countRegister, setCountRegister] = useState<any>([]) // 0 = learning, 1 = known

  const isBrowser = typeof window !== 'undefined'
  const [selectedTopic, setSelectedTopic] = useState<string | null>(isBrowser ? localStorage.getItem("selectedTopic") : null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(isBrowser ? localStorage.getItem("selectedLevel") : null)

  const [restartGame, setRestartGame] = useState(false)
  const [actualCardNumber, setActualCardNumber] = useState(1)
  const [correctMatchesCount, setCorrectMatchesCount] = useState(0)

  const [levelData, setlevelData] = useState<any>({})
  const [topicWords, setTopicWords] = useState<any>([])

  const [isCorrect, setIsCorrect] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [randomMessageNumber, setRandomMessageNumber] = useState(0)
  const [resetCard, setResetCard] = useState(false)

  const sortRandomly = () => Math.random() - 0.5
  const initialSet = [0, 1, 2, 3]
  const [setToShow, setSetToShow] = useState(initialSet.sort(sortRandomly))

  const levelsStore = useAppSelector((state: RootState) => state.store.levels)
  const isSoundOn = useAppSelector((state: RootState) => state.store.soundOn)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

  const handleCardClick = () => {
    setIsFlipped(!isFlipped)
  }

  const handleSelectedOption = (wordSelected: string, actualCorrectWord: string) => {
    if (wordSelected === actualCorrectWord) {
      if (isSoundOn && correctSound !== null && correctMatchesCount !== topicWords.length - 1) {
        correctSound.play()
      }
      setRandomMessageNumber(getRandomNumber(0, knowMessage.length - 1))
      setIsCorrect(true)
      setShowMessage(true)
      setCorrectMatchesCount(correctMatchesCount + 1)
    } else {
      setRandomMessageNumber(getRandomNumber(0, stillLearningMessage.length - 1))
      setShowMessage(true)
    }
  }

  const handleLearningButton = () => {
    goToNextCard()
    setLearningCount(learningCount + 1)
    setCountRegister([...countRegister, 0])
  }
  const handleKnownButton = () => {
    goToNextCard()
    setKnownCount(knownCount + 1)
    setCountRegister([...countRegister, 1])
  }

  const goToNextCard = () => {
    setResetCard(true)
    setNextCard(true)
    setShowMessage(false)
    setIsCorrect(false)
  }
  const handlePrevCard = () => {
    setResetCard(true)
    setPrevCard(true)
    setShowMessage(false)
    setIsCorrect(false)

    if (countRegister[countRegister.length - 1] === 0) {
      setLearningCount(learningCount - 1)
      countRegister.pop()
    } else if (countRegister[countRegister.length - 1] === 1) {
      setKnownCount(knownCount - 1)
      const newArray = [...countRegister]
      newArray.pop()
      setCountRegister([...newArray])
    }
  }

  const restart = () => {
    setRestartGame(true)
    setResetCard(true)
    setNextCard(false)
    setPrevCard(false)
    setShowMessage(false)
    setIsCorrect(false)
    setCorrectMatchesCount(0)
    setActualCardNumber(1)
    setLearningCount(0)
    setKnownCount(0)
  }

  const goToChangeTopic = () => {
    router.push('/levels/topics')
  }

  useEffect(() => {
    dispatch(setActiveTab({ name: 'Flashcards', position: 4 }))
    if (levelsStore.length === 0) {
      getLevelsAndDispatchToStore(dispatch)
    }

    setCorrectSound(new Audio('/sounds/correct-answer.mp3'))
    setAllWordsCorrectSound(new Audio('/sounds/open-new-level.mp3'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (levelsStore.length > 0) {
      setlevelData(levelsStore.find(obj => obj.level === selectedLevel))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelsStore])

  useEffect(() => {
    if (levelsStore.length > 0 && Object.keys(levelData).length > 0 && selectedLevel !== null && selectedTopic !== null) {
      const onlyWords = levelData.topics[selectedTopic].map((wordObject: WordsTraduction) => wordObject.word)

      /* To order them all randomly */
      setTopicWords(onlyWords.sort(sortRandomly))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelData]);

  useEffect(() => {
    setResetCard(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualCardNumber])

  useEffect(() => {
    if (actualCardNumber === topicWords.length && correctMatchesCount === topicWords.length) {
      confettiFireworks()
      if (isSoundOn && allWordsCorrectSound !== null) {
        allWordsCorrectSound.play()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMessage])

  useEffect(() => {
    if (resetCard && nextCard && !restartGame) {
      setActualCardNumber(actualCardNumber + 1)
      setIsFlipped(false)
      setNextCard(false)
    } else if (resetCard && prevCard && !restartGame) {
      setActualCardNumber(actualCardNumber - 1)
      setIsFlipped(false)
      setPrevCard(false)
    } else {
      setRestartGame(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetCard])


  return (
    <main className='flex flex-col mx-12 mt-1 mb-16 laptop:max-w-desktop laptop:mx-auto gap-8'>
      <div className='flex flex-col gap-2 items-start'>
        <SelectedLabels showLevel={true} showTopic={true} />
      </div>

      <section className='flex flex-col gap-2'>
        <div className='flex flex-row gap-3 items-center justify-between'>
          <div className='ml-2'>
            {learningCount}
          </div>
          <div className='flex font-medium'>
            {actualCardNumber} / {topicWords.length}
          </div>
          <div className='mr-2'>
            {knownCount}
          </div>
        </div>

        <div className='relative'>
          <div onClick={handleCardClick} className={`card card-front absolute w-full flex flex-col h-[50vh] p-5 rounded-xl border drop-shadow-md hover:cursor-pointer bg-white ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
            {
              actualCardNumber === topicWords.length && correctMatchesCount === topicWords.length
                ?
                <div className='flex self-center relative top-6 text-xl tablet:top-8 tablet:text-2xl font-bold text-gradient-to-r from-green-400 to-blue-400 '>
                  Du hast alle Wörter richtig verstanden!
                </div>
                :
                <>
                  <span className='text-sm'>Español</span>
                  <div className='flex relative items-center justify-center bottom-3 h-full text-2xl'>{topicWords.length > 0 ? topicWords[actualCardNumber - 1][1] : 'Wird geladen...'}</div>
                </>
            }
          </div>
          <div onClick={handleCardClick} className={`card card-back absolute w-full flex flex-col h-[50vh] p-5 rounded-xl border drop-shadow-md hover:cursor-pointer bg-white ${isFlipped ? '' : '[transform:rotateY(-180deg)] '}`}>
            {
              actualCardNumber === topicWords.length && correctMatchesCount === topicWords.length
                ?
                <div className='flex self-center relative top-6 text-xl tablet:top-8 tablet:text-2xl font-bold text-gradient-to-r from-green-400 to-blue-400 '>
                  Du hast alle Wörter richtig verstanden!
                </div>
                :
                <>
                  <span className='text-sm'>Alemán</span>
                  <div className=' flex relative items-center justify-center bottom-3 h-full text-2xl'>{topicWords.length > 0 ? topicWords[actualCardNumber - 1][0] : 'Wird geladen...'}</div>
                </>

            }
          </div>
        </div>
        <div className='h-[50vh]'></div>
        <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-1'>
            <button className='rounded-full p-2 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent' disabled={actualCardNumber === 1} onClick={actualCardNumber > 1 ? handlePrevCard : undefined}>
              <ArrowUturnLeftIcon className='w-6 h-auto' />
            </button>
          </div>
          <div className='flex-1 flex justify-center gap-2 tablet:gap-10'>
            <button title='Lernen' className='rounded-full p-1 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent' disabled={actualCardNumber === topicWords.length} onClick={actualCardNumber < topicWords.length ? handleLearningButton : undefined}>
              <XMarkIcon className='w-8 h-auto text-red-500' />
            </button>
            <button title='Bekannt' className='rounded-full p-1 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent' disabled={actualCardNumber === topicWords.length} onClick={actualCardNumber < topicWords.length ? handleKnownButton : undefined}>
              <CheckIcon className='w-8 h-auto text-green-500' />
            </button>
          </div>
          <div className='flex-1'></div>
        </div>
        {
          showMessage && topicWords.length !== actualCardNumber
          &&
          <FinalGameButtons topicWords={topicWords} actualCardNumber={actualCardNumber} restart={restart} goToChangeTopic={goToChangeTopic} />
        }
      </section>
    </main>
  )
}

export default Page