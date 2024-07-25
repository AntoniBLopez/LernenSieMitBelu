'use client'
import { useEffect, useRef, useState } from 'react'
import { RootState } from "@/app/lib/store"
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks"
import { getLevelsAndDispatchToStore } from "@/app/lib/features/state/utils"
import { WordsTraduction } from '@/types'
import confettiFireworks from '@/app/(ui)/components/confettiFireworks'
import SelectedLabels from '@/app/(ui)/components/SelectedLabels'
import GameButton from '@/app/(ui)/components/GameButton'
import EndGameScreen from '@/app/(ui)/components/EndGameScreen'
import {
  ChevronRightIcon,
  CheckBadgeIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';
import SpanishKeyboardLetter from '@/app/(ui)/levels/[level]/topics/[topic]/games/writing/components/spanishKeyboardLetter'
import { BiUserVoice } from 'react-icons/bi'

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

function Page({ params }: { params: { level: string, topic: string } }) {
  const [showStats, setShowStats] = useState(false)
  const [currentlySpeaking, setCurrentlySpeaking] = useState(false)
  const [clickOnVoice, setClickOnVoice] = useState(false)

  const [isIphone, setIsIphone] = useState(false)
  const [correctSound, setCorrectSound] = useState<HTMLAudioElement | null>(null)
  const [allWordsCorrectSound, setAllWordsCorrectSound] = useState<HTMLAudioElement | null>(null)

  const isBrowser = typeof window !== 'undefined'
  const [isSoundOn, setIsSoundOn] = useState(isBrowser ? localStorage.getItem("soundOn") === "true" : true)

  const [restartGame, setRestartGame] = useState(false)
  const [actualCardNumber, setActualCardNumber] = useState(1)
  const [correctMatchesCount, setCorrectMatchesCount] = useState(0)

  const [levelData, setlevelData] = useState<any>({})
  const [topicWords, setTopicWords] = useState<any>([])
  const sortRandomly = () => Math.random() - 0.5

  const [showMessage, setShowMessage] = useState(false)
  const [hasOmitted, setHasOmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [randomMessageNumber, setRandomMessageNumber] = useState(0)
  const [resetOptionDesign, setResetOptionDesign] = useState(false)

  const [userWord, setUserWord] = useState('')
  const [spanishLetterAdded, setSpanishLetterAdded] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(true)
  const [inputWidth, setInputWidth] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const levelsStore = useAppSelector((state: RootState) => state.store.levels)
  const dispatch = useAppDispatch()

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
      if (correctSound !== null && isSoundOn) {
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
    console.log('word does not changed')
    setSpanishLetterAdded(false)
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
    setHasOmitted(false)
    setIsCorrect(false)
    setUserWord('')
    setClickOnVoice(false)
  }

  const restart = () => {
    setRestartGame(true)
    setResetOptionDesign(true)
    setShowMessage(false)
    setHasOmitted(false)
    setIsCorrect(false)
    setCorrectMatchesCount(0)
    setActualCardNumber(1)
    setUserWord('')
    setShowStats(false)
    setClickOnVoice(false)
  }

  useEffect(() => {
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
      setlevelData(levelsStore.find((obj: any) => obj.level === params.level))
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
    if (levelsStore.length > 0 && Object.keys(levelData).length > 0) {
      const onlyWords = levelData.topics[decodeURI(params.topic)].map((wordObject: WordsTraduction) => wordObject.word)
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

  useEffect(() => {
    if (spanishLetterAdded && inputRef.current) {
      inputRef.current.focus()
      setIsInputFocused(true)
      setSpanishLetterAdded(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spanishLetterAdded])


  return (
    <main className='flex flex-col w-full mt-1 gap-10'>
      <div className='flex flex-col gap-2 items-start'>
        <SelectedLabels levelName={params.level} topicName={params.topic} />
      </div>
      {
        showStats
          ?
          <EndGameScreen knownCount={correctMatchesCount} learningCount={topicWords.length - correctMatchesCount} topicWords={topicWords} restart={restart} />
          :

          <section className='flex flex-col gap-2'>
            <div className='flex flex-row gap-3 items-center justify-center'>
              <div className='flex font-medium slide-in opacity-60'>
                {actualCardNumber} / {topicWords.length}
              </div>
            </div>
            <div className='flex flex-col h-fit gap-6 tablet:gap-16 justify-between bg-white dark:bg-bgColorCardDark p-5 rounded-xl drop-shadow-md'>
              <div className='text-lg slide-in'>{topicWords.length > 0 ? topicWords[actualCardNumber - 1][0] : 'Wird geladen...'}</div>
              <div className='flex flex-col gap-4'>
                <p className={`${showMessage ? hasOmitted ? 'slide-in font-medium opacity-100 text-blue-500' : isCorrect ? 'slide-in font-medium opacity-100 text-green-500' : 'slide-in font-medium opacity-100 text-red-500' : 'font-bold opacity-50'}`}>
                  {showMessage ? isCorrect ? correctMessage[randomMessageNumber] : wrongMessage[randomMessageNumber] : 'Deine Antwort'}
                </p>
                {
                  !showMessage
                  &&
                  <div className='flex flex-wrap gap-2 items-center'>
                    <SpanishKeyboardLetter spanishLetter='á' setSpanishLetterAdded={setSpanishLetterAdded} setUserWord={setUserWord} />
                    <SpanishKeyboardLetter spanishLetter='é' setSpanishLetterAdded={setSpanishLetterAdded} setUserWord={setUserWord} />
                    <SpanishKeyboardLetter spanishLetter='í' setSpanishLetterAdded={setSpanishLetterAdded} setUserWord={setUserWord} />
                    <SpanishKeyboardLetter spanishLetter='ó' setSpanishLetterAdded={setSpanishLetterAdded} setUserWord={setUserWord} />
                    <SpanishKeyboardLetter spanishLetter='ú' setSpanishLetterAdded={setSpanishLetterAdded} setUserWord={setUserWord} />
                    <SpanishKeyboardLetter spanishLetter='ñ' setSpanishLetterAdded={setSpanishLetterAdded} setUserWord={setUserWord} />
                  </div>
                }
                <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                  <input
                    type="text"
                    name="userWord"
                    id="userWord"
                    value={userWord}
                    onChange={(e) => setUserWord(e.target.value)}
                    placeholder={hasOmitted ? '' : 'Schreiben Sie Spanisch'}
                    className={`
                      w-full
                      rounded-md
                      font-normal
                      px-4
                      py-3
                      outline-none
                      dark:text-black
                      bg-bgColorLight
                      focus:bg-selectedColor
                      disabled:border-2 disabled:py-[0.65rem]
                      ${hasOmitted
                        ? 'font-normal disabled:bg-slate-100 disabled:border-slate-300 dark:disabled:bg-bgColorCardHoverDark dark:disabled:border-slate-700'
                        : isCorrect ? 'disabled:bg-green-50 disabled:border-green-500 dark:disabled:bg-green-200 disabled:font-semibold'
                          : 'disabled:bg-red-50 disabled:border-red-500 dark:disabled:bg-red-100 disabled:font-semibold'}
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
                      bottom-[0.65rem]
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
                  <div className={`flex ${showMessage && isCorrect ? 'flex-row' : 'flex-col tablet:flex-row'} gap-2`}>
                    {
                      showMessage
                        ?
                        isCorrect
                          ?
                          <button className='p-2 rounded-full bg-slate-100 mobile:bg-transparent mobile:hover:bg-slate-200 dark:mobile:hover:bg-bgColorCardHoverDark slide-in' onClick={event => handleVoice(topicWords[actualCardNumber - 1][1])}>
                            <BiUserVoice className={`w-[1.6rem] h-auto text-black dark:text-white`} />
                          </button>
                          :
                          <div className='flex flex-row items-center gap-2'>
                            <span className='flex flex-row gap-2 text-xl text-primaryExtraDarkColor slide-in'>
                              {topicWords[actualCardNumber - 1][1]}
                              <CheckBadgeIcon className='w-6 text-primaryExtraDarkColor' />
                            </span>
                            <button className='p-2 rounded-full bg-slate-100 mobile:bg-transparent mobile:hover:bg-slate-200 dark:mobile:hover:bg-bgColorCardHoverDark slide-in' onClick={event => handleVoice(topicWords[actualCardNumber - 1][1])}>
                              <BiUserVoice className={`w-[1.6rem] h-auto text-black dark:text-white`} />
                            </button>
                          </div>
                        :
                        <div className='flex flex-wrap w-full gap-2'>
                          <button
                            disabled={showMessage || userWord === ''}
                            className={`
                              self-start
                              gap-2
                              items-center
                              font-semibold
                              text-white
                              dark:text-black
                              dark:disabled:text-slate-400
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
                          <button
                            className={`
                              self-start
                              gap-2
                              items-center
                              font-semibold
                              text-blue-500
                              hover:text-white
                              hover:bg-blue-500
                              rounded-md
                              py-2
                              px-4
                              slide-in
                              hover:cursor-pointer
                            ${userWord.length > 0 ? 'hidden' : ''}
                              disabled:cursor-default disabled:bg-transparent
                            `}
                            onClick={() => setHasOmitted(true)}
                          >
                            Omitir
                          </button>
                        </div>
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