'use client'
import { useEffect, useRef, useState } from 'react'
import Option from '@/app/(ui)/widgets/Option'
import { RootState } from "@/app/lib/store"
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks"
import { getLevelsAndDispatchToStore } from "@/app/lib/features/state/utils"
import { WordsTraduction } from '@/types'
import confettiFireworks from '@/app/(ui)/widgets/confettiFireworks'
import SelectedLabels from '@/app/(ui)/widgets/SelectedLabels'
import GameButton from '@/app/(ui)/widgets/GameButton'
import {
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation'
import FinalGameButtons from '@/app/(ui)/widgets/FinalGameButtons'
import { setActiveTab } from '@/app/lib/features/state/stateSlice'
// import Speaker from '@/public/icons/speaker.svg'
// import Image from 'next/image'

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

  const [isCorrect, setIsCorrect] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [randomMessageNumber, setRandomMessageNumber] = useState(0)
  const [resetOptionDesign, setResetOptionDesign] = useState(false)

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

  const handleSelectedOption = (wordSelected: string, actualCorrectWord: string) => {
    if (wordSelected === actualCorrectWord) {
      if (isSoundOn && correctSound !== null && correctMatchesCount !== topicWords.length - 1) {
        correctSound.play()
      }
      setRandomMessageNumber(getRandomNumber(0, correctMessage.length - 1))
      setIsCorrect(true)
      setShowMessage(true)
      setCorrectMatchesCount(correctMatchesCount + 1)
    } else {
      setRandomMessageNumber(getRandomNumber(0, wrongMessage.length - 1))
      setShowMessage(true)
    }
  }

  const nextCard = () => {
    setResetOptionDesign(true)
    setShowMessage(false)
    setIsCorrect(false)
  }

  const restart = () => {
    setRestartGame(true)
    setResetOptionDesign(true)
    setShowMessage(false)
    setIsCorrect(false)
    setCorrectMatchesCount(0)
    setActualCardNumber(1)
  }

  const goToChangeTopic = () => {
    router.push('/levels/topics')
  }

  useEffect(() => {
    dispatch(setActiveTab({ name: 'MultipleChoice', position: 5 }))
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
      // /* This is the solution for ordering the words randomly divided in 3 ordered sets */
      // /* I divide the number of words in the topic by 3 to get the number of words to show in the first third of the card to get them ordered randomly */
      // const oneThird = onlyWords.length / 3
      // const firstThird = onlyWords.filter((wordObj: WordsTraduction, index: number) => index < oneThird).sort(sortRandomly)
      // /* The second third will show the next set also randomly ordered */
      // const secondThird = onlyWords.filter((wordObj: WordsTraduction, index: number) => index >= oneThird && index < oneThird * 2).sort(sortRandomly)
      // /* The third set it's going to be all the remaining words randomly ordered starting from the second third */
      // const remainingWords = onlyWords.filter((wordObj: WordsTraduction, index: number) => index >= oneThird * 2).sort(sortRandomly)
      // console.log([...firstThird, ...secondThird, ...remainingWords], '[...firstThird, ...secondThird, ...remainingWords]')
      // setTopicWords([...firstThird, ...secondThird, ...remainingWords])

      /* This is the alternative solution for the random order, to order them all randomly, without the 3 ordered sets */
      setTopicWords(onlyWords.sort(sortRandomly))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelData]);

  useEffect(() => {
    setResetOptionDesign(false) // reset the response design of the card that shows correct or wrong to none
    if (actualCardNumber < 4) {
      setSetToShow(initialSet.sort(sortRandomly))
    } else if (actualCardNumber > topicWords.length - 3) { // Prevents the set to be higher than the number of words in the topic and show the 4 last words in a random order
      const numbers = [topicWords.length - 4, topicWords.length - 3, topicWords.length - 2, topicWords.length - 1]
      setSetToShow(numbers.sort(sortRandomly))
    } else {
      /* Manage the set when there is no danger of going out of the min or max of the length of the topic words */
      const correctWord = actualCardNumber - 1 // the index of the array starts at 0
      const randomStart = getRandomNumber(actualCardNumber - 3, actualCardNumber + 3)
      if (randomStart < actualCardNumber) {
        const numbers = [correctWord, correctWord + 1, correctWord + 2, correctWord + 3]
        setSetToShow(numbers.sort(sortRandomly))
      } else if (randomStart > actualCardNumber) {
        const numbers = [correctWord, correctWord - 1, correctWord - 2, correctWord - 3]
        setSetToShow(numbers.sort(sortRandomly))
      } else if (randomStart === actualCardNumber) {
        /* If the set starts from the correct word, randomly go below OR above it */
        const correctWord = randomStart - 1 // the index of the array starts at 0
        if (Math.round(Math.random()) === 0) { /* 0 or 1 */
          const numbers = [correctWord, correctWord - 1, correctWord - 2, correctWord - 3]
          setSetToShow(numbers.sort(sortRandomly))
        } else {
          const numbers = [correctWord, correctWord + 1, correctWord + 2, correctWord + 3]
          setSetToShow(numbers.sort(sortRandomly))
        }
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


  return (
    <main ref={mainRef} className='flex flex-col mx-12 mt-1 mb-16 laptop:max-w-desktop laptop:mx-auto gap-8'>
      <div className='flex flex-col gap-2 items-start'>
        <SelectedLabels showLevel={true} showTopic={true} />
      </div>

      <section className='flex flex-col gap-2'>
        <div className='flex flex-row gap-3 items-center justify-center'>
          <div className='flex font-medium opacity-60'>
            {actualCardNumber} / {topicWords.length}
          </div>
        </div>
        <div className='flex flex-col h-fit gap-12 tablet:gap-16 justify-between bg-white border p-5 rounded-xl drop-shadow-md'>
          {
            actualCardNumber === topicWords.length && correctMatchesCount === topicWords.length
              ?
              <div className='flex justify-center text-center relative top-6 text-xl tablet:top-8 tablet:text-2xl font-bold text-gradient-to-r from-green-400 to-blue-400 '>
                Du hast alle Wörter richtig verstanden!
              </div>
              :
              <div className='text-lg'>{topicWords.length > 0 ? topicWords[actualCardNumber - 1][0] : 'Wird geladen...'}</div>
          }
          <div className='flex flex-col gap-4 tablet:mb-5'>
            <p className={`${showMessage ? isCorrect ? 'slide-in font-medium opacity-100 text-green-500' : 'slide-in font-medium opacity-100 text-red-500' : 'font-bold opacity-50'}`}>{showMessage ? isCorrect ? correctMessage[randomMessageNumber] : wrongMessage[randomMessageNumber] : 'Wähle die richtige Antwort'}</p>
            <section className='grid grid-cols-1 tablet:grid-cols-2 gap-2 tablet:gap-5'>
              {
                topicWords.length > 0
                &&
                setToShow.map((word, index) => {
                  return <div key={index} onClick={() => !showMessage && handleSelectedOption(topicWords[word][0], topicWords[actualCardNumber - 1][0])}>
                    <Option
                      showMessage={showMessage}
                      isCorrect={topicWords[word][0] === topicWords[actualCardNumber - 1][0]}
                      name={topicWords[word][1]}
                      resetOptionDesign={resetOptionDesign}
                    />
                  </div>
                })
              }
            </section>
          </div>
        </div>
        {
          showMessage
            ?
            topicWords.length !== actualCardNumber
              ?
              <GameButton name='Weiter' Icon={ChevronRightIcon} isLastCard={topicWords.length === actualCardNumber} nextCard={nextCard} />
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