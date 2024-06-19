'use client'
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
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation'
import FinalGameButtons from '@/app/(ui)/widgets/FinalGameButtons'
import { setActiveTab } from '@/app/lib/features/state/stateSlice'

const correctMessage = [
  'Gut gemacht!',
  'Korrekt!',
  'Großartig!',
  'Super!',
  'Exzellent!',
  'Ausgezeichnet!',
  'Fantastisch!',
  'Beeindruckend!',
  'Wunderbar!',
]

const wrongMessage = [
  'Kein Problem, Lernen ist ein Prozess!',
  "Übe weiter, du wirst es schaffen!",
  "Gib nicht auf, du kannst es schaffen!",
  'Du kannst es schaffen, versuch es weiter!',
  'Du schaffst das, mach weiter!',
  'Du schaffst das, übe weiter!',
  "Übe weiter, du wirst es schaffen!",
  "Übung macht den Meister, versuch es weiter!",
]

function Page() {

  const [isIphone, setIsIphone] = useState(false)
  const [correctSound, setCorrectSound] = useState<HTMLAudioElement | null>(null)
  const [allWordsCorrectSound, setAllWordsCorrectSound] = useState<HTMLAudioElement | null>(null)

  const isBrowser = typeof window !== 'undefined'
  const [selectedTopic, setSelectedTopic] = useState<string | null>(isBrowser ? localStorage.getItem("selectedTopic") : null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(isBrowser ? localStorage.getItem("selectedLevel") : null)

  const [restartGame, setRestartGame] = useState(false)
  const [actualCardNumber, setActualCardNumber] = useState(1)
  const [correctMatchesCount, setCorrectMatchesCount] = useState(0)

  const [levelData, setlevelData] = useState<any>({})
  const [topicWords, setTopicWords] = useState<any>([])
  const sortRandomly = () => Math.random() - 0.5

  const [isCorrect, setIsCorrect] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [randomMessageNumber, setRandomMessageNumber] = useState(0)
  const [resetOptionDesign, setResetOptionDesign] = useState(false)

  const [userWord, setUserWord] = useState('')
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [inputWidth, setInputWidth] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const tempInputRef = useRef<HTMLInputElement>(null)

  const levelsStore = useAppSelector((state: RootState) => state.store.levels)
  const isSoundOn = useAppSelector((state: RootState) => state.store.soundOn)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const getRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min

  const capitalizeFirstLetter = (word: string): string => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const trimmedUserWord = userWord.trim() // removes whitespaces
    if (capitalizeFirstLetter(trimmedUserWord) === capitalizeFirstLetter(topicWords[actualCardNumber - 1][1].toLowerCase())) {
      // if (trimmedUserWord === topicWords[actualCardNumber - 1][1]) {
      if (isSoundOn && correctSound !== null && correctMatchesCount !== topicWords.length - 1) {
        correctSound.play()
      }
      setIsCorrect(true)
      setShowMessage(true)
      setCorrectMatchesCount(correctMatchesCount + 1)
    } else {
      setRandomMessageNumber(getRandomNumber(0, wrongMessage.length - 1))
      setShowMessage(true)
    }
  }

  const handleBlur = () => {
    if (window.innerWidth <= 640) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    setIsInputFocused(false)
  }

  /* DOES NOT WORK */
  const focusAndOpenKeyboardOnIphone = (el: HTMLInputElement | null) => {
    if (el && tempInputRef.current) {
      // Set temporary input position
      tempInputRef.current.style.position = 'absolute'
      tempInputRef.current.style.top = (el.offsetTop + 7) + 'px'
      tempInputRef.current.style.left = el.offsetLeft + 'px'
      tempInputRef.current.style.height = '0'
      tempInputRef.current.style.opacity = '0'

      // Focus on the temporary element to open keyboard
      tempInputRef.current.focus()

      // After a short delay, focus on the actual input element
      setTimeout(() => {
        el.focus()
        el.click()
      }, 300)
    }
  }

  const nextCard = () => {
    setResetOptionDesign(true)
    setShowMessage(false)
    setIsCorrect(false)
    setUserWord('')
  }

  const restart = () => {
    setRestartGame(true)
    setResetOptionDesign(true)
    setShowMessage(false)
    setIsCorrect(false)
    setCorrectMatchesCount(0)
    setActualCardNumber(1)
    setUserWord('')
  }

  const goToChangeTopic = () => {
    router.push('/levels/topics')
  }

  useEffect(() => {
    dispatch(setActiveTab({ name: 'Writing', position: 6 }))

    if (levelsStore.length === 0) {
      getLevelsAndDispatchToStore(dispatch)
    }

    if (inputRef.current) {
      setInputWidth(inputRef.current.offsetWidth);
    }

    /* Detect if the user's device is iphone */
    const userAgent = window.navigator.userAgent
    setIsIphone(/iPhone/i.test(userAgent))

    setCorrectSound(new Audio('/sounds/correct-answer.mp3'))
    setAllWordsCorrectSound(new Audio('/sounds/open-new-level.mp3'))

    const preventScroll = (e: TouchEvent) => {
      if (window.innerWidth <= 640) {
        e.preventDefault()
      }
    }

    window.addEventListener('touchmove', preventScroll, { passive: false })

    return () => {
      window.removeEventListener('touchmove', preventScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (levelsStore.length > 0) {
      setlevelData(levelsStore.find(obj => obj.level === selectedLevel))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelsStore])

  useEffect(() => {
    if (resetOptionDesign && !restartGame) {
      setActualCardNumber(actualCardNumber + 1)
    } else {
      setRestartGame(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetOptionDesign])

  useEffect(() => {
    if (levelsStore.length > 0 && Object.keys(levelData).length > 0 && selectedLevel !== null && selectedTopic !== null) {
      const onlyWords = levelData.topics[selectedTopic].map((wordObject: WordsTraduction) => wordObject.word)
      /* To order them all randomly */
      setTopicWords(onlyWords.sort(sortRandomly))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelData])

  useEffect(() => {
    setResetOptionDesign(false) // reset the response design of the card that shows correct or wrong to none
    if (inputRef.current) {
      if (window.innerWidth <= 640 && isIphone) {
        setTimeout(() => {
          focusAndOpenKeyboardOnIphone(inputRef.current) // DOES NOT WORK
        }, 100)
      } else {
        inputRef.current.focus()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualCardNumber])

  useEffect(() => {
    if (actualCardNumber === topicWords.length && correctMatchesCount === topicWords.length) {
      confettiFireworks()
      if (isSoundOn && allWordsCorrectSound !== null) {
        allWordsCorrectSound.play()
      }
    }

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && showMessage && topicWords.length !== actualCardNumber) {
        e.preventDefault()
        nextCard()
      }
    }
    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMessage])

  useEffect(() => {
    const handleResize = () => {
      if (inputRef.current) {
        setInputWidth(inputRef.current.offsetWidth);
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRef.current])


  return (
    <main className='flex flex-col mx-12 mt-1 mb-16 laptop:max-w-desktop laptop:mx-auto gap-8'>
      <div className='flex flex-col gap-2 items-start'>
        <SelectedLabels showLevel={true} showTopic={true} />
      </div>

      <section className='flex flex-col gap-2'>
        <div className='flex flex-row gap-3 items-center justify-center'>
          <div className='flex font-medium slide-in opacity-60'>
            {actualCardNumber} / {topicWords.length}
          </div>
        </div>
        <div className='flex flex-col h-fit gap-6 tablet:gap-16 justify-between bg-white border p-5 rounded-xl drop-shadow-md'>
          {
            actualCardNumber === topicWords.length && correctMatchesCount === topicWords.length
              ?
              <div className='flex justify-center text-center relative top-6 text-xl tablet:top-8 tablet:text-2xl font-bold text-gradient-to-r from-green-400 to-blue-400 '>
                Du hast alle Wörter richtig verstanden!
              </div>
              :
              <div className='text-lg slide-in'>{topicWords.length > 0 ? topicWords[actualCardNumber - 1][0] : 'Wird geladen...'}</div>
          }
          <div className='flex flex-col gap-4'>
            <p className={`${showMessage ? isCorrect ? 'slide-in font-medium opacity-100 text-green-500' : 'slide-in font-medium opacity-100 text-red-500' : 'font-bold opacity-50'}`}>{showMessage ? isCorrect ? correctMessage[randomMessageNumber] : wrongMessage[randomMessageNumber] : 'Deine Antwort'}</p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <input
                type="text"
                name="userWord"
                id="userWord"
                value={userWord}
                onChange={(e) => setUserWord(e.target.value)}
                placeholder='Schreiben Sie Spanisch'
                className={`
                  w-full
                  rounded-md
                  px-4
                  py-3
                  outline-none
                  bg-bgColor
                  focus:bg-selectedColor
                  disabled:border-2 disabled:py-[0.65rem] ${isCorrect ? 'disabled:bg-green-50 disabled:border-green-500' : 'disabled:bg-red-50 disabled:border-red-500'}
                `}
                ref={inputRef}
                onFocus={() => setIsInputFocused(true)}
                onBlur={handleBlur}
                disabled={showMessage}
                autoComplete='off'
                autoFocus
              />
              <div
                className={`
                  relative
                  self-center
                  bottom-[1.18rem]
                  h-[0.15rem]
                  rounded-br-3xl
                  rounded-bl-3xl
                  bg-blue-400
                  ${isInputFocused && !showMessage ? 'opacity-100 ' : 'opacity-0'}
                  transition-opacity
                  duration-75
                `}
                style={{ width: inputWidth - 5 + 'px' }}
              />
              <div className='flex flex-row gap-5 items-center'>
                <button
                  disabled={showMessage || userWord === ''}
                  className={`
                    self-start
                    gap-2
                    items-center
                    font-semibold
                    text-white
                    bg-primaryColor
                    hover:bg-primaryDarkColor
                    rounded-md
                    py-2
                    px-4
                    slide-in
                    hover:cursor-pointer
                    disabled:cursor-default disabled:bg-disabledPrimaryColor
                  `}>
                  Antwort
                </button>
                {
                  showMessage && !isCorrect
                  &&
                  <span className='flex flex-row gap-2 text-xl text-primaryExtraDarkColor'>
                    {topicWords[actualCardNumber - 1][1]}
                    <CheckBadgeIcon className='w-6 text-primaryExtraDarkColor' />
                  </span>
                }
              </div>
            </form>
          </div>
        </div>
        {
          showMessage
            ?
            topicWords.length !== actualCardNumber
              ?
              <GameButton name='Weiter' nextCard={nextCard} Icon={ChevronRightIcon} isLastCard={topicWords.length === actualCardNumber} />
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