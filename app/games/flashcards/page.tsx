'use client'
import { useEffect, useRef, useState } from 'react'
import { RootState } from "@/app/lib/store"
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks"
import { getLevelsAndDispatchToStore } from "@/app/lib/features/state/utils"
import { WordsTraduction } from '@/types'
import confettiFireworks from '@/app/widgets/confettiFireworks'
import Breadcrumbs from '@/app/widgets/Breadcrumbs'
import SelectedLabels from '@/app/widgets/SelectedLabels'
import GameButton from '@/app/widgets/GameButton'
import {
  ChevronRightIcon,
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation'
import FinalGameButtons from '@/app/widgets/FinalGameButtons'
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

  const mainRef = useRef<HTMLInputElement>(null)
  const [marginLeft, setMarginLeft] = useState('');

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
  };

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

  const handleNextCard = () => {
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
  }

  const goToChangeTopic = () => {
    router.push('/ui/levels/topics')
  }

  useEffect(() => {
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
    const handleMarginResize = () => {
      if (mainRef.current) {
        const mainElement = mainRef.current;
        const computedStyles = window.getComputedStyle(mainElement);
        const marginLeft = computedStyles.marginLeft;
        setMarginLeft(marginLeft);
      }
    }
    window.addEventListener('resize', handleMarginResize)

    return () => {
      window.removeEventListener('resize', handleMarginResize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainRef.current])

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
    <main ref={mainRef} className='flex flex-col mx-12 mt-8 mb-16 laptop:max-w-desktop laptop:mx-auto gap-8'>
      <div className='flex flex-col gap-2 items-start'>
        <Breadcrumbs actualTab="Flashcards" marginLeft={marginLeft} />
        <SelectedLabels showLevel={true} showTopic={true} />
      </div>

      <section className='flex flex-col gap-2'>
        <div className='flex flex-row gap-3 items-center justify-center'>
          <div className='flex font-medium opacity-60'>
            {actualCardNumber} / {topicWords.length}
          </div>
        </div>
        <div onClick={handleCardClick} className='flex flex-col h-[60vh] items-center justify-center p-5 rounded-xl border drop-shadow-md hover:cursor-pointer bg-white'>
          {
            actualCardNumber === topicWords.length && correctMatchesCount === topicWords.length
              ?
              <div className='flex justify-center text-center relative top-6 text-xl tablet:top-8 tablet:text-2xl font-bold text-gradient-to-r from-green-400 to-blue-400 '>
                Du hast alle Wörter richtig verstanden!
              </div>
              :
              isFlipped
                ?
                <div className='text-2xl'>{topicWords.length > 0 ? topicWords[actualCardNumber - 1][0] : 'Wird geladen...'}</div>
                :
                <div className='text-2xl'>{topicWords.length > 0 ? topicWords[actualCardNumber - 1][1] : 'Wird geladen...'}</div>
          }
        </div>
        <div onClick={handlePrevCard} className='flex flex-row gap-5 justify-center items-center'>
          <button>
            <ArrowLeftCircleIcon className='w-12 h-auto text-grayColor' />
          </button>
          <button onClick={handleNextCard}>
            <ArrowRightCircleIcon className='w-12 h-auto text-grayColor' />
          </button>
        </div>
        {
          showMessage
            ?
            topicWords.length !== actualCardNumber
              ?
              <GameButton name='Weiter' Icon={ChevronRightIcon} isLastCard={topicWords.length === actualCardNumber} nextCard={handleNextCard} />
              :
              <FinalGameButtons topicWords={topicWords} actualCardNumber={actualCardNumber} restart={restart} goToChangeTopic={goToChangeTopic} />
            :
            undefined
        }
      </section>
    </main>
  )
}

export default Page