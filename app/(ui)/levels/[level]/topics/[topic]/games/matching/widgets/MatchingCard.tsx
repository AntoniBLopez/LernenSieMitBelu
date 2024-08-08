'use client'
import { Word } from '@/types';
import { useEffect, useState } from 'react'

export default function MatchingCard({ wordsGroup, setWordsSelected, isMatch, setIsMatch }: { wordsGroup: []; setWordsSelected: any; isMatch: boolean; setIsMatch: any }) {

  const [randomOrderedWords, setRandomOrderedWords] = useState<any>([])
  const [selected, setSelected] = useState<any>([])

  const handleClick = (word: string) => {
    console.log('selected CLICKED')
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
        randomOrderedWords.map((word: any, index: number) => {

          const wordDidMatch = isMatch && selected[0] === word || selected[1] === word ? true : false
          return (
            <div
              key={index}
              onClick={() => wordDidMatch ? null : handleClick(word)}
              className={`
                grid-item
                rounded-lg
                text-center
                content-center
                cursor-pointer
                ${wordDidMatch
                  ? 'disabled cursor-auto bg-bgColorLight dark:bg-bgColorDark'
                  : !wordDidMatch && selected[0] === word || !wordDidMatch && selected[1] === word // if selected (with click)
                    ? 'bg-selectedColor dark:bg-selectedColorDark hover:bg-selectedColor dark:hover:bg-selectedColorDark'
                    : 'bg-white dark:bg-bgColorCardDark hover:bg-selectedColor dark:hover:bg-selectedColorDark' // if not selected and not match
                }
              `}
            >
              {wordDidMatch ? '' : word}
            </div>
          )
        })
      }
    </>
  )
}