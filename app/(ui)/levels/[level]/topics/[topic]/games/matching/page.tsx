'use client'
import MatchingCard from '@/app/(ui)/levels/[level]/topics/[topic]/games/matching/widgets/MatchingCard'
import SelectedLabels from '@/app/(ui)/components/SelectedLabels'
import { getLevelsAndDispatchToStore } from '@/app/lib/features/state/utils'
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks'
import { RootState } from '@/app/lib/store'
import { WordsTraduction } from '@/types'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Page({ params }: { params: { level: string, topic: string } }) {
  const dispatch = useAppDispatch()
  const levelsStore = useAppSelector((state: RootState) => state.store.levels)
  const sortRandomly = () => Math.random() - 0.5

  const [levelData, setlevelData] = useState<any>({})
  const [topicWords, setTopicWords] = useState<any>([])
  const [groupedWords, setGroupedWords] = useState<any>([])
  const [actualCardNumber, setActualCardNumber] = useState(1)
  const [wordsSelected, setWordsSelected] = useState<any>([])
  const [isMatch, setIsMatch] = useState(false)

  useEffect(() => {
    if (levelsStore.length === 0) {
      getLevelsAndDispatchToStore(dispatch)
    }
    console.log(levelsStore)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (levelsStore.length > 0) {
      setlevelData(levelsStore.find(obj => obj.level === params.level))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelsStore])

  useEffect(() => {
    if (levelsStore.length > 0 && Object.keys(levelData).length > 0) {
      const onlyWords = levelData.topics[decodeURI(params.topic)].map((wordObject: WordsTraduction) => wordObject.word)

      /* To order them all randomly */
      setTopicWords(onlyWords.sort(sortRandomly))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelData])

  useEffect(() => {
    if (topicWords.length > 0) {
      console.log('topicWords', topicWords)
      const result = []
      /* Dividir el array en grupos de 12 palabras, 6 traducicones (en español y 6 en alemán) */
      for (let i = 0; i < topicWords.length; i += 6) {
        result.push(topicWords.slice(i, i + 6))
      }
      /* Si el último grupo tiene menos de 6 traducciones, eliminarlo y añadir un grupo con las últimas 6 traducciones */
      if (result.length > 1 && result[result.length - 1].length < 6) {
        result.pop()
        result.push(topicWords.slice(topicWords.length - 6, topicWords.length))
      }
      setGroupedWords(result)
    }
  }, [topicWords])

  useEffect(() => {
    if (wordsSelected && wordsSelected?.length > 0) {
      if (wordsSelected?.length === 2) {
        console.log('Ya hay 2 palabras seleccionadas')

        const matchFound = groupedWords[0].some((traduction: any) => {
          return (
            (wordsSelected[0] === traduction[0] && wordsSelected[1] === traduction[1]) ||
            (wordsSelected[0] === traduction[1] && wordsSelected[1] === traduction[0])
          )
        })

        if (matchFound) {
          setIsMatch(true)
          console.log('Hay match')
        } else {
          if (isMatch) setIsMatch(false)
          console.log('No hay match')
        }

        setWordsSelected([])
      }
      console.log(wordsSelected)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordsSelected])

  return (
    <main className='flex flex-col w-full mt-1 gap-10'>
      <div className='flex flex-row gap-2 justify-between'>
        <SelectedLabels levelName={params.level} topicName={params.topic} />
        <div className='pr-5'>{actualCardNumber}/{groupedWords?.length}</div>
      </div>

      <section
        className='
          grid
          grid-cols-4
          grid-rows-3
          w-full h-[70vh]
          p-2
          gap-2
          rounded-xl
          drop-shadow-md
        '
      >
        {
          groupedWords.length > 0 &&
          <MatchingCard wordsGroup={groupedWords[actualCardNumber - 1]} setWordsSelected={setWordsSelected} isMatch={isMatch} setIsMatch={setIsMatch} />
        }
      </section>
    </main>
  )
}

export default Page