'use client'
import { Word } from '@/types';
import { useEffect, useState } from 'react'

export default function MatchingCard({ wordsGroup, setWordsSelected }: { wordsGroup: []; setWordsSelected: any }) {

  const [randomOrderedWords, setRandomOrderedWords] = useState<any>([])
  const [selected, setSelected] = useState<any>([])

  const handleClick = (word: string) => {
    setSelected((prevState: any) => prevState.concat(word))
    setWordsSelected((prevState: any) => prevState.concat(word))
  }

  useEffect(() => {
    console.log('wordsGroup', wordsGroup)
    if (wordsGroup && wordsGroup.length > 0) {
      const result: Array<string> = []
      wordsGroup.forEach((group: any) => {
        result.push(group[0], group[1])
      })
      result.sort(() => Math.random() - 0.5)
      setRandomOrderedWords(result)
    }
  }, [wordsGroup])

  return (
    <>
      {
        randomOrderedWords && randomOrderedWords.length > 0 &&
        randomOrderedWords.map((word: any, index: number) =>
        (
          <div
            key={word}
            onClick={() => handleClick(word)}
            className={`
              grid-item
              rounded-lg
              text-center
              content-center
              cursor-pointer
              hover:bg-selectedColor
              dark:hover:bg-selectedColorDark
              ${selected[0] === word || selected[1] === word ? 'bg-selectedColor dark:bg-selectedColorDark' : 'bg-white dark:bg-bgColorCardDark'}
            `}
          >
            {word}
          </div>
        ))
      }
    </>
  )
}