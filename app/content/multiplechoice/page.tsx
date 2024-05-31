'use client'
import { useEffect, useState } from 'react'
import Option from '@/app/widgets/Option'
import { RootState } from "@/app/lib/store"
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks"
import { getLevelsAndDispatchToStore } from "@/app/lib/features/state/utils"
import { WordsTraduction } from '@/types'
import {
  ArrowLeftIcon,
  ArrowRightIcon,

} from '@heroicons/react/24/outline';

function Page() {

  const [userLevel, setUserLevel] = useState('A1') // ADD THE LEVEL OF THE USER
  const [cardNumber, setCardNumber] = useState(1)
  const selectedTopic = 'Hogar' // DELETE
  // const selectedTopic = useAppSelector((state: RootState) => state.store.selectedTopic) // DESCOMENT
  const [words, setWords] = useState([]) /* TO DO  */
  const levelsStore = useAppSelector((state: RootState) => state.store.levels)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (Object.keys(levelsStore).length === 0) {
      getLevelsAndDispatchToStore(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className='flex flex-col gap-10'>
      <h1 className='text-3xl font-bold text-center'>Multiple Choice</h1>

      <section className='flex flex-col gap-2'>
        <div className='flex flex-row gap-3 items-center justify-center'>
          <ArrowLeftIcon className="size-8 text-grayColor p-1 hover:cursor-pointer hover:rounded-full hover:bg-gray-200" />
          <div className='flex font-medium text-grayColor'>
            {cardNumber} / {Object.keys(levelsStore).length > 0 && levelsStore[userLevel].topics[selectedTopic].length}
          </div>
          <ArrowRightIcon className="size-8 text-grayColor p-1 hover:cursor-pointer hover:rounded-full hover:bg-gray-200" />
        </div>
        <div className='flex flex-col h-[60vh] justify-between bg-white border p-5 rounded-xl drop-shadow-md'>
          <div className='flex flex-col gap-2'>
            <p className='opacity-50 font-medium'>Definition</p>
            <div className='font-bold'>Español</div>
          </div>
          <div className='flex flex-col gap-4 tablet:mb-5'>
            <p className='font-bold text-grayColor'>Choose matching term</p>
            <section className='grid grid-cols-1 tablet:grid-cols-2 gap-2 tablet:gap-5'>
              {
                Object.keys(levelsStore).length > 0
                &&
                selectedTopic.length > 0
                &&
                levelsStore[userLevel].topics[selectedTopic].map((topicWord: WordsTraduction, index: number) => {
                  return (
                    <Option key={index} name={topicWord.word[0]} />
                  )
                })
              }
              <Option key='2' name='x' />
              <Option key='1' name='n' />
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Page