'use client'
import { useEffect, useState } from 'react'
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

  const levelsStore = useAppSelector((state: RootState) => state.store.levels)
  // const selectedTopic = useAppSelector((state: RootState) => state.store.selectedTopic) // DESCOMENT
  const selectedTopic = 'Hogar' // DELETE
  const [userLevel, setUserLevel] = useState('A1') // ADD THE LEVEL OF THE USER
  const [cardNumber, setCardNumber] = useState(1)
  const [words, setWords] = useState(Object.keys(levelsStore).length > 0 ? levelsStore[userLevel].topics[selectedTopic].map(wordObject => wordObject.word) : []) /* TO DO  */
  const [isCorrect, setIsCorrect] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [randomNumber, setRandomNumber] = useState(0)
  const dispatch = useAppDispatch()

  const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

  const handleOption = (correctWord: boolean) => {
    if (correctWord) {
      setRandomNumber(getRandomNumber(0, correctMessage.length - 1))
      setIsCorrect(true) // reset to false when going to the next card
      setShowMessage(true) // reset to false when going to the next card
    } else {
      setRandomNumber(getRandomNumber(0, wrongMessage.length - 1))
      setIsCorrect(false) // DELETE LINE and do the reset when going to the next card
      setShowMessage(true) // reset to false when going to the next card
    }
  }

  useEffect(() => {
    if (Object.keys(levelsStore).length === 0) {
      getLevelsAndDispatchToStore(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (Object.keys(levelsStore).length > 0) {
      setWords(levelsStore[userLevel].topics[selectedTopic].map(wordObject => wordObject.word))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelsStore])

  return (
    <main className='flex flex-col gap-10'>
      <h1 className='text-3xl font-bold text-center'>Multiple Choice</h1>

      <section className='flex flex-col gap-2'>
        <div className='flex flex-row gap-3 items-center justify-center'>
          <div className='flex font-medium text-grayColor'>
            {cardNumber} / {words.length}
          </div>
        </div>
        <div className='flex flex-col h-fit gap-16 justify-between bg-white border p-5 rounded-xl drop-shadow-md'>
          <div className='flex flex-col gap-2'>
            <p className='opacity-50 font-bold text-sm'>Term</p>
            <div className='text-lg'>{words.length > 0 ? words[cardNumber - 1][1] : 'loading...'}</div>
          </div>
          <div className='flex flex-col gap-4 tablet:mb-5'>
            <p className={`${showMessage ? isCorrect ? 'font-medium opacity-100 text-green-500' : 'font-medium opacity-100 text-red-500' : 'font-bold opacity-50'}`}>{showMessage ? isCorrect ? correctMessage[randomNumber] : wrongMessage[randomNumber] : 'Choose matching term'}</p>
            <section className='grid grid-cols-1 tablet:grid-cols-2 gap-2 tablet:gap-5'>
              {
                words.length > 0
                &&
                <div key={0} onClick={() => !showMessage && handleOption(true)}>
                  <Option showMessage={showMessage} isCorrect={true} name={words[cardNumber - 1][0]} />
                </div>
              }
              <div key={1} onClick={() => !showMessage && handleOption(false)}>
                <Option showMessage={showMessage} isCorrect={false} name='x' />
              </div>
              <div key={2} onClick={() => !showMessage && handleOption(false)}>
                <Option showMessage={showMessage} isCorrect={false} name='n' />
              </div>
              <div key={3} onClick={() => !showMessage && handleOption(false)}>
                <Option showMessage={showMessage} isCorrect={false} name='n' />
              </div>
            </section>
          </div>
        </div>
        <div className='
            self-center
            font-bold
            text-grayColor
            hover:cursor-pointer
            hover:bg-selectedColor
            rounded-full
            py-2
            px-4
            '>
          {showMessage && 'Next'}
        </div>
      </section>
    </main>
  )
}

export default Page