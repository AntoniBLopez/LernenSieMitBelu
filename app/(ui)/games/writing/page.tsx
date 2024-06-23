'use client'
import { useEffect, useRef, useState } from 'react'
import { RootState } from "@/app/lib/store"
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks"
import { getLevelsAndDispatchToStore } from "@/app/lib/features/state/utils"
import { WordsTraduction } from '@/types'
import confettiFireworks from '@/app/(ui)/widgets/confettiFireworks'
import SelectedLabels from '@/app/(ui)/widgets/SelectedLabels'
import GameButton from '@/app/(ui)/widgets/GameButton'
import EndGameScreen from '@/app/(ui)/widgets/EndGameScreen'
import {
  ChevronRightIcon,
  CheckBadgeIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation'
import { setActiveTab } from '@/app/lib/features/state/stateSlice'
import Image from 'next/image'

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

  const [showStats, setShowStats] = useState(false)
  const [currentlySpeaking, setCurrentlySpeaking] = useState(false)
  const [clickOnVoice, setClickOnVoice] = useState(false)

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

  const [showMessage, setShowMessage] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [randomMessageNumber, setRandomMessageNumber] = useState(0)
  const [resetOptionDesign, setResetOptionDesign] = useState(false)

  const [userWord, setUserWord] = useState('')
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [inputWidth, setInputWidth] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const tempInputRef = useRef<HTMLInputElement>(null)

  const levelsStore = useAppSelector((state: RootState) => state.store.levels)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const getRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min

  const capitalizeFirstLetter = (word: string): string => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  const handleVoice = (word: string) => {
    setClickOnVoice(true)
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

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (clickOnVoice) return
    const trimmedUserWord = userWord.trim() // removes whitespaces
    if (capitalizeFirstLetter(trimmedUserWord) === capitalizeFirstLetter(topicWords[actualCardNumber - 1][1].toLowerCase())) {
      // if (trimmedUserWord === topicWords[actualCardNumber - 1][1]) {
      if (localStorage.getItem("soundOn") === 'true' && correctSound !== null) {
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
  // const focusAndOpenKeyboardOnIphone = (el: HTMLInputElement | null) => {
  //   if (el && tempInputRef.current) {
  //     // Set temporary input position
  //     tempInputRef.current.style.position = 'absolute'
  //     tempInputRef.current.style.top = (el.offsetTop + 7) + 'px'
  //     tempInputRef.current.style.left = el.offsetLeft + 'px'
  //     tempInputRef.current.style.height = '0'
  //     tempInputRef.current.style.opacity = '0'

  //     // Focus on the temporary element to open keyboard
  //     tempInputRef.current.focus()

  //     // After a short delay, focus on the actual input element
  //     setTimeout(() => {
  //       el.focus()
  //       el.click()
  //     }, 300)
  //   }
  // }

  const nextCard = () => {
    setResetOptionDesign(true)
    setShowMessage(false)
    setIsCorrect(false)
    setUserWord('')
    setClickOnVoice(false)
  }

  const restart = () => {
    setRestartGame(true)
    setResetOptionDesign(true)
    setShowMessage(false)
    setIsCorrect(false)
    setCorrectMatchesCount(0)
    setActualCardNumber(1)
    setUserWord('')
    setShowStats(false)
    setClickOnVoice(false)
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
      // if (window.innerWidth <= 640 && isIphone) {
      //   setTimeout(() => {
      //     focusAndOpenKeyboardOnIphone(inputRef.current) // DOES NOT WORK
      //   }, 100)
      // } else {
      // }
      inputRef.current.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualCardNumber])

  useEffect(() => {

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && showMessage && topicWords.length !== actualCardNumber) {
        e.preventDefault()
        nextCard()
      } else if (e.key === 'Enter' && topicWords.length === actualCardNumber) {
        setShowStats(true)
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

  useEffect(() => {
    if (showStats && correctMatchesCount === topicWords.length) {
      confettiFireworks()
      if (localStorage.getItem("soundOn") === 'true' && allWordsCorrectSound !== null) {
        allWordsCorrectSound.play()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showStats])


  return (
    <main className='flex flex-col mx-12 mt-1 mb-16 laptop:max-w-desktop laptop:mx-auto gap-8'>
      <div className='flex flex-col gap-2 items-start'>
        <SelectedLabels showLevel={true} showTopic={true} />
      </div>
      {
        showStats
          ?
          <EndGameScreen knownCount={correctMatchesCount} learningCount={topicWords.length - correctMatchesCount} topicWords={topicWords} restart={restart} goToChangeTopic={goToChangeTopic} />
          :

          <section className='flex flex-col gap-2'>
            <div className='flex flex-row gap-3 items-center justify-center'>
              <div className='flex font-medium slide-in opacity-60'>
                {actualCardNumber} / {topicWords.length}
              </div>
            </div>
            <div className='flex flex-col h-fit gap-6 tablet:gap-16 justify-between bg-white border p-5 rounded-xl drop-shadow-md'>
              <div className='text-lg slide-in'>{topicWords.length > 0 ? topicWords[actualCardNumber - 1][0] : 'Wird geladen...'}</div>
              <div className='flex flex-col gap-4'>
                <p className={`${showMessage ? isCorrect ? 'slide-in font-medium opacity-100 text-green-500' : 'slide-in font-medium opacity-100 text-red-500' : 'font-bold opacity-50'}`}>{showMessage ? isCorrect ? correctMessage[randomMessageNumber] : wrongMessage[randomMessageNumber] : 'Deine Antwort'}</p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
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
                      bottom-[0.68rem]
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
                      showMessage
                        ?
                        isCorrect
                          ?
                          <button className='p-2 rounded-full hover:bg-slate-200' onClick={event => handleVoice(topicWords[actualCardNumber - 1][1])}>
                            <Image src='/icons/voice.png' alt='Symbol zum Anhören des Textes' width={18} height={18} />
                          </button>
                          :
                          <div className='flex flex-row items-center gap-2'>
                            <span className='flex flex-row gap-2 text-xl text-primaryExtraDarkColor slide-in'>
                              {topicWords[actualCardNumber - 1][1]}
                              <CheckBadgeIcon className='w-6 text-primaryExtraDarkColor' />
                            </span>
                            <button className='p-2 rounded-full hover:bg-slate-200' onClick={event => handleVoice(topicWords[actualCardNumber - 1][1])}>
                              <Image src='/icons/voice.png' alt='Symbol zum Anhören des Textes' width={18} height={18} />
                            </button>
                          </div>
                        :
                        undefined
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
                  <button
                    onClick={() => setShowStats(true)}
                    className={`
                      flex
                      flex-row
                      gap-2
                      items-center
                      self-center
                      font-semibold
                      text-white
                      hover:cursor-pointer
                      bg-blue-500
                      hover:bg-blue-600
                      rounded-md
                      py-2
                      px-4
                      slide-in
                    `}
                  >
                    Statistiken zeigen
                    <ChartPieIcon className='w-5 h-5' />
                  </button>
                :
                undefined
            }
          </section>
      }
    </main>
  )
}

export default Page