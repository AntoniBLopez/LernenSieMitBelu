'use client'
import '@/app/(ui)/games/flashcards/styles.css'
import { useRouter } from 'next/navigation'
import { WordsTraduction } from '@/types'
import { RootState } from "@/app/lib/store"
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks"
import { getLevelsAndDispatchToStore } from "@/app/lib/features/state/utils"
import EndGameScreen from '@/app/(ui)/components/EndGameScreen'
import confettiFireworks from '@/app/(ui)/components/confettiFireworks'
import SelectedLabels from '@/app/(ui)/components/SelectedLabels'
import { setActiveTab } from '@/app/lib/features/state/stateSlice'
// import Image from 'next/image'
import {
  CheckIcon,
  XMarkIcon,
  ArrowUturnLeftIcon
} from '@heroicons/react/24/outline';
import { BiUserVoice } from "react-icons/bi";
import { useEffect, useState } from 'react'

function Page() {

  const [correctSound, setCorrectSound] = useState<HTMLAudioElement | null>(null)
  const [allWordsCorrectSound, setAllWordsCorrectSound] = useState<HTMLAudioElement | null>(null)
  const [currentlySpeaking, setCurrentlySpeaking] = useState(false)

  const [isFlipped, setIsFlipped] = useState(false)
  const [nextCard, setNextCard] = useState(false)
  const [prevCard, setPrevCard] = useState(false)
  const [showStats, setShowStats] = useState(false)

  const [learningCount, setLearningCount] = useState(0)
  const [knownCount, setKnownCount] = useState(0)
  const [countRegister, setCountRegister] = useState<any>([]) // 0 = learning, 1 = known

  const isBrowser = typeof window !== 'undefined'
  const [selectedTopic, setSelectedTopic] = useState<string | null>(isBrowser ? localStorage.getItem("selectedTopic") : null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(isBrowser ? localStorage.getItem("selectedLevel") : null)

  const [restartGame, setRestartGame] = useState(false)
  const [actualCardNumber, setActualCardNumber] = useState(1)

  const [levelData, setlevelData] = useState<any>({})
  const [topicWords, setTopicWords] = useState<any>([])

  const [isCorrect, setIsCorrect] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [resetCard, setResetCard] = useState(false)

  const sortRandomly = () => Math.random() - 0.5

  const levelsStore = useAppSelector((state: RootState) => state.store.levels)
  const dispatch = useAppDispatch()
  const router = useRouter()


  const handleCardClick = () => {
    setIsFlipped(!isFlipped)
  }

  const handleVoice = (event: any, word: string) => {
    event.stopPropagation()
    if (!currentlySpeaking) {
      let utterance = new SpeechSynthesisUtterance(word)
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

  const handleLearningButton = () => {
    goToNextCard()
    setLearningCount(learningCount + 1)
    setCountRegister([...countRegister, 0])

    if (actualCardNumber === topicWords.length) {
      setShowStats(true)
    }
  }
  const handleKnownButton = () => {
    if (localStorage.getItem("soundOn") === 'true' && correctSound && knownCount + 1 !== topicWords.length) {
      correctSound.play()
    }
    goToNextCard()
    setKnownCount(knownCount + 1)
    setCountRegister([...countRegister, 1])

    console.log(actualCardNumber === topicWords.length)
    if (actualCardNumber === topicWords.length) {
      setShowStats(true)
    }
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
    setActualCardNumber(1)
    setLearningCount(0)
    setKnownCount(0)
    setShowStats(false)
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
    if (actualCardNumber === topicWords.length && knownCount === topicWords.length) {
      confettiFireworks()
      if (localStorage.getItem("soundOn") === 'true' && allWordsCorrectSound !== null) {
        allWordsCorrectSound.play()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showStats])

  useEffect(() => {
    if (resetCard && nextCard && !restartGame) {
      setTimeout(() => {
        setActualCardNumber(actualCardNumber + 1)
      }, 100)
      setIsFlipped(false)
      setNextCard(false)
    } else if (resetCard && prevCard && !restartGame) {
      setTimeout(() => {
        setActualCardNumber(actualCardNumber - 1)
      }, 100)
      setIsFlipped(false)
      setPrevCard(false)
    } else {
      setRestartGame(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetCard])

  return (
    <main className='flex flex-col w-full mt-1 gap-10'>
      <div className='flex flex-col gap-2 items-start'>
        <SelectedLabels showLevel={true} showTopic={true} />
      </div>

      {
        showStats
          ?
          <EndGameScreen knownCount={knownCount} learningCount={learningCount} topicWords={topicWords} restart={restart} />
          :
          <section className='flex flex-col gap-2'>
            <div className='flex flex-row gap-3 items-center justify-between'>
              <div
                className='
                  text-sm
                  ml-2
                  w-10
                  py-1
                  font-semibold
                  dark:font-black
                  text-center
                  text-black
                  bg-red-200
                  border-2
                  border-red-500
                  rounded-full
              '>
                {learningCount}
              </div>
              <div className='flex font-medium'>
                {actualCardNumber} / {topicWords.length}
              </div>
              <div
                className='
                  text-sm
                  mr-2
                  w-10
                  py-1
                  font-semibold
                  dark:font-black
                  text-center
                  text-black
                  bg-green-200
                  border-2
                  border-green-500
                  rounded-full
              '>
                {knownCount}
              </div>
            </div>

            <div className='relative'>
              <div
                onClick={handleCardClick}
                className={`
                  card
                  card-front
                  absolute
                  w-full
                  flex
                  flex-col h-[50vh]
                  p-5
                  rounded-xl
                  drop-shadow-lg
                  hover:cursor-pointer
                  bg-white
                  dark:bg-bgColorCardDark
                  ${isFlipped ? '[transform:rotateY(180deg)] tablet:[transform:rotateX(180deg)]' : ''}`
                }
              >
                {
                  !showStats
                  &&
                  <>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm ml-3'>Español</span>
                      <button
                        className='p-3 rounded-full hover:bg-[#ebeef2] dark:hover:bg-bgColorCardHoverDark'
                        onClick={event => handleVoice(event, topicWords[actualCardNumber - 1][1])}>
                        <BiUserVoice className='w-6 h-auto text-black dark:text-white' />
                      </button>
                    </div>
                    <div className='flex relative h-full items-center justify-center mb-12 text-2xl'>
                      {topicWords.length > 0 ? topicWords[actualCardNumber - 1][1] : 'Wird geladen...'}
                    </div>
                  </>
                }
              </div>
              <div
                onClick={handleCardClick}
                className={`
                  card
                  card-back
                  absolute
                  w-full
                  flex
                  flex-col
                  h-[50vh]
                  p-5
                  rounded-xl
                  drop-shadow-md
                  hover:cursor-pointer
                  bg-white
                  dark:bg-bgColorCardDark
                  ${isFlipped ? '' : '[transform:rotateY(-180deg)] tablet:[transform:rotateX(-180deg)]'}
                `}
              >
                {
                  !showStats
                  &&
                  <>
                    <span className='text-sm ml-3 mt-3'>Alemán</span>
                    <div
                      className='
                        flex
                        relative
                        items-center
                        justify-center
                        bottom-[1.1rem]
                        h-full
                        text-2xl
                      '>
                      {topicWords.length > 0 ? topicWords[actualCardNumber - 1][0] : 'Wird geladen...'}
                    </div>
                  </>
                }
              </div>
            </div>
            <div className='h-[50vh]'></div>
            <div className='flex flex-row items-center justify-between'>
              <div className='flex flex-1'>
                <button
                  className='
                    rounded-full
                    p-2
                    bg-slate-200
                    dark:bg-bgColorCardDark
                    disabled:bg-transparent
                    disabled:opacity-30
                    laptop:bg-transparent
                    dark:laptop:bg-transparent
                    laptop:hover:bg-slate-200
                    dark:laptop:hover:bg-bgColorCardDark
                    laptop:disabled:hover:bg-transparent
                    dark:laptop:disabled:hover:bg-transparent
                  '
                  disabled={actualCardNumber === 1}
                  onClick={actualCardNumber > 1 ? handlePrevCard : undefined

                  }>
                  <ArrowUturnLeftIcon className='w-6 h-auto' />
                </button>
              </div>
              <div className='flex-1 flex justify-center gap-5 tablet:gap-10'>
                <button
                  className='
                    rounded-full
                    p-1
                    bg-slate-200
                    dark:bg-bgColorCardDark
                    disabled:bg-transparent
                    disabled:opacity-30
                    laptop:bg-transparent
                    dark:laptop:bg-transparent
                    laptop:hover:bg-slate-200
                    dark:laptop:hover:bg-bgColorCardDark
                    laptop:disabled:hover:bg-transparent
                    dark:laptop:disabled:hover:bg-transparent
                  '
                  onClick={handleLearningButton}
                >
                  <XMarkIcon className='w-8 h-auto text-red-500' />
                </button>
                <button
                  className='
                    rounded-full
                    p-1
                    bg-slate-200
                    dark:bg-bgColorCardDark
                    disabled:bg-transparent
                    disabled:opacity-30
                    laptop:bg-transparent
                    dark:laptop:bg-transparent
                    laptop:hover:bg-slate-200
                    dark:laptop:hover:bg-bgColorCardDark
                    laptop:disabled:hover:bg-transparent
                    dark:laptop:disabled:hover:bg-transparent
                  '
                  onClick={handleKnownButton}
                >
                  <CheckIcon className='w-8 h-auto text-green-500' />
                </button>
              </div>
              <div className='flex-1'></div>
            </div>
          </section>
      }
    </main>
  )
}

export default Page