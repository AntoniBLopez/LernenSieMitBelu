'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Option from '@/app/widgets/Option'
import { RootState } from "@/app/lib/store"
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks"
import { getLevelsAndDispatchToStore } from "@/app/lib/features/state/utils"
import { WordsTraduction } from '@/types'
// import {
//   ArrowLeftIcon,
//   ArrowRightIcon,

// } from '@heroicons/react/24/outline';

const correctMessage = [
  'Nice Work!',
  'Correct!',
  'Awesome!',
  'Great!',
  'Excellent!',
  'Fantastic!',
  'Amazing!',
  'Impressive!',
  'Wonderful!',
]

const wrongMessage = [
  "Not quite, you're still learning!",
  'No worries, learning is a process!',
  "Keep practicing, you'll get it!",
  "Don't give up, you can do it!",
  'You can do it, keep trying!',
  'You got this, keep going!',
  'You got this, keep practicing!',
  "Keep practicing, you'll get there!",
  "Practice makes perfect, keep on trying!",
]

function Page() {

  const router = useRouter()
  const levelsStore = useAppSelector((state: RootState) => state.store.levels)
  const selectedTopic = useAppSelector((state: RootState) => state.store.selectedTopic)
  // const selectedTopic = 'Test'
  const [selectedLevel, setSelectedLevel] = useState('A1') // ADD THE LEVEL OF THE USER
  const [cardNumber, setCardNumber] = useState(1)
  const [levelData, setlevelData] = useState<any>({})
  const [topicWords, setTopicWords] = useState([]) /* TO DO  */
  const [isCorrect, setIsCorrect] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [randomNumber, setRandomNumber] = useState(0)
  const initialSet = [0, 1, 2, 3]
  const sortRandomly = () => Math.random() - 0.5
  const [setToShow, setSetToShow] = useState(initialSet.sort(sortRandomly))
  const [resetResponse, setResetResponse] = useState(false)
  const dispatch = useAppDispatch()

  const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

  const handleSelectedOption = (correctWord: boolean) => {
    if (correctWord) {
      setRandomNumber(getRandomNumber(0, correctMessage.length - 1))
      setIsCorrect(true)
      setShowMessage(true)
    } else {
      setRandomNumber(getRandomNumber(0, wrongMessage.length - 1))
      setIsCorrect(false) // DELETE LINE and do the reset when going to the next card
      setShowMessage(true)
    }
  }

  const nextCard = () => {
    setShowMessage(false)
    setIsCorrect(false)
    setCardNumber(cardNumber + 1)
    setResetResponse(true)
  }

  const restart = () => {
    setShowMessage(false)
    setIsCorrect(false)
    setCardNumber(1)
    setResetResponse(true)
  }

  useEffect(() => {
    if (levelsStore.length === 0) {
      getLevelsAndDispatchToStore(dispatch)
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
    if (levelsStore.length > 0 && Object.keys(levelData).length > 0) {
      const topics = levelData.topics;
      console.log(topics, "topics")
      console.log(selectedTopic, "selectedTopic")
      if (topics && topics[selectedTopic]) {
        setTopicWords(topics[selectedTopic].map((wordObject: WordsTraduction) => wordObject.word));
      } else {
        console.error('Selected topic does not exist in level data');
        window.alert('When you refreshed the page, the information indicating which level you have chosen was lost, please select it again.')
        router.replace('/ui/levels')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelData]);

  useEffect(() => {
    setResetResponse(false) // reset the response design of the card that shows correct or wrong to none
    if (cardNumber < 4) {
      setSetToShow(initialSet.sort(sortRandomly))
    } else if (cardNumber > topicWords.length - 3) { // Prevents the set to be higher than the number of words in the topic and show the 4 last words in a random order
      const numbers = [topicWords.length - 4, topicWords.length - 3, topicWords.length - 2, topicWords.length - 1]
      setSetToShow(numbers.sort(sortRandomly))
    } else {
      /* Manage the set when there is no danger of going out of the min or max of the length of the topic words */
      const correctWord = cardNumber - 1 // the index of the array starts at 0
      const randomStart = getRandomNumber(cardNumber - 3, cardNumber + 3)
      if (randomStart < cardNumber) {
        const numbers = [correctWord, correctWord + 1, correctWord + 2, correctWord + 3]
        setSetToShow(numbers.sort(sortRandomly))
      } else if (randomStart > cardNumber) {
        const numbers = [correctWord, correctWord - 1, correctWord - 2, correctWord - 3]
        setSetToShow(numbers.sort(sortRandomly))
      } else if (randomStart === cardNumber) {
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
  }, [cardNumber])

  return (
    <main className='flex flex-col gap-10'>
      <h1 className='text-3xl font-bold text-center'>Multiple Choice</h1>

      <section className='flex flex-col gap-2'>
        <div className='flex flex-row gap-3 items-center justify-center'>
          <div className='flex font-medium text-grayColor'>
            {cardNumber} / {topicWords.length}
          </div>
        </div>
        <div className='flex flex-col h-fit gap-16 justify-between bg-white border p-5 rounded-xl drop-shadow-md'>
          <div className='flex flex-col gap-2'>
            <p className='opacity-50 font-bold text-sm'>Term</p>
            <div className='text-lg'>{topicWords.length > 0 ? topicWords[cardNumber - 1][0] : 'loading...'}</div>
          </div>
          <div className='flex flex-col gap-4 tablet:mb-5'>
            <p className={`${showMessage ? isCorrect ? 'font-medium opacity-100 text-green-500' : 'font-medium opacity-100 text-red-500' : 'font-bold opacity-50'}`}>{showMessage ? isCorrect ? correctMessage[randomNumber] : wrongMessage[randomNumber] : 'Choose matching term'}</p>
            <section className='grid grid-cols-1 tablet:grid-cols-2 gap-2 tablet:gap-5'>
              {
                topicWords.length > 0
                &&
                setToShow.map((word, index) => {
                  return <div key={index} onClick={() => !showMessage && handleSelectedOption(topicWords[word][0] === topicWords[cardNumber - 1][0])}>
                    <Option
                      showMessage={showMessage}
                      isCorrect={topicWords[word][0] === topicWords[cardNumber - 1][0]}
                      name={topicWords[word][1]}
                      resetResponse={resetResponse}
                    />
                  </div>
                })
              }
            </section>
          </div>
        </div>
        <button
          className='
            self-center
            font-bold
            text-grayColor
            hover:cursor-pointer
            hover:bg-selectedColor
            rounded-full
            py-2
            px-4
            '
          onClick={topicWords.length !== cardNumber ? nextCard : restart}
        >
          {showMessage ? topicWords.length !== cardNumber ? 'Next' : 'Start over' : ''}
        </button>
      </section>
    </main>
  )
}

export default Page