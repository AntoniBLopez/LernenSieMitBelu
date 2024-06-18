'use client'

import { useEffect, useState } from "react"
import { Level, Levels, WordsTraduction } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { RootState } from "@/app/lib/store"
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks"
import { getLevelsAndDispatchToStore } from "@/app/lib/features/state/utils"
import axios from "axios"

function Page() {
  const levelsStore = useAppSelector((state: RootState) => state.store.levels)
  const dispatch = useAppDispatch()

  const [levelName, setLevelName] = useState('A1')
  const [actualLevelData, setActualLevelData] = useState<any>(levelsStore.length > 0 ? levelsStore.find((obj: Level) => obj.level === levelName) : {})
  const [topic, setTopic] = useState('')
  const [germanWord, setGermanWord] = useState('')
  const [spanishWord, setSpanishWord] = useState('')
  const [wordCreated, setWordCreated] = useState(false)


  useEffect(() => {
    if (levelsStore.length === 0) {
      getLevelsAndDispatchToStore(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (levelsStore.length > 0 && wordCreated) {
      setActualLevelData(levelsStore.find((obj: Level) => obj.level === levelName))
    } else if (levelsStore.length > 0 && levelName !== actualLevelData.level) {
      setActualLevelData(levelsStore.find((obj: Level) => obj.level === levelName))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelName, levelsStore])

  useEffect(() => {
    if (wordCreated) {
      setWordCreated(false)
    } else if (levelsStore.length > 0) {
      const firstTopic = Object.keys(actualLevelData.topics)[0]
      setTopic(firstTopic)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualLevelData])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    axios.post(process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/words'
      : '/api/words',
      {
        level: levelName,
        topic,
        germanWord,
        spanishWord,
      }
    )
      .then((response) => {
        setSpanishWord('')
        setGermanWord('')
        setWordCreated(true)
        getLevelsAndDispatchToStore(dispatch)
      })
      .catch((error) => {
        console.log(error, 'error')
        throw error
      })
  }

  return (
    <div className="px-fixed desktop:px-fixedDesktop w-full h-fit">
      <div className="flex flex-col max-w-xl mx-auto mt-10 mb-32 gap-7 text-center">
        <Link href={"/admin"} className="w-fit">
          <Image
            src="/icons/leftArrow.png"
            width={30}
            height={30}
            className="text-black"
            alt="Go back to homepage arrow icon"
          />
        </Link>
        <h1 className={`text-2xl text-primaryColor`}>Add new word</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <div className="self-start">
              <label htmlFor="" className="self-start font-semibold">
                Choose the level:&nbsp;&nbsp;&nbsp;
              </label>
              <select className="w-fit" name="levelName" id="select" value={levelName} onChange={(e) => setLevelName(e.target.value)}>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
              </select>
            </div>
            <div className="flex flex-row">
              <label htmlFor="" className="self-start font-semibold">
                Choose the topic:&nbsp;&nbsp;&nbsp;
              </label>
              <select className="w-fit" name="topics" id="select" value={topic} onChange={(e) => setTopic(e.target.value)}>
                {
                  Object.keys(actualLevelData).length > 0
                  &&
                  Object.keys(actualLevelData.topics).length > 0
                  &&
                  Object.keys(actualLevelData.topics).map((topicWord: string, index: number) => {
                    return (
                      <option key={index} value={topicWord}>{topicWord}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className="flex flex-row gap-2">
              <label
                className="block font-bold text-gray-900 self-center whitespace-nowrap"
                htmlFor="germanWord"
              >
                Add German Word:
              </label>
              <input
                id="germanWord"
                type="text"
                name="germanWord"
                placeholder="Spanien"
                value={germanWord}
                onChange={(e) => setGermanWord(e.target.value)}
                className="py-2 px-3"
                required
              />
            </div>
            <div className="flex flex-row gap-2">
              <label
                className="block font-bold text-gray-900 self-center whitespace-nowrap"
                htmlFor="spanishWord"
              >
                Add Spanish Word:
              </label>
              <input
                id="spanishWord"
                type="text"
                name="spanishWord"
                placeholder="Español"
                value={spanishWord}
                onChange={(e) => setSpanishWord(e.target.value)}
                className="py-2 px-3"
                required
              />
            </div>
            <button
              type='submit'
              className='
              flex
              flex-row
              w-56
              gap-2
              px-4
              py-2
              justify-center
              self-center
              font-medium
              rounded-lg
              bg-primaryColor
              hover:bg-primaryDarkColor
              text-black
            '
            >
              Add
            </button>
          </div>
        </form>
        <div className="flex flex-col gap-5">
          <div className='w-auto h-px lg:h-px bg-slate-700' />
          <table>
            <thead>
              <tr>
                <th>Topic</th>
              </tr>
            </thead>
            <tbody>
              <tr className="flex flex-col text-center">
                <td className="mb-5 font-bold text-primaryColor">{topic}</td>
                <td className="font-bold">Words</td>
                {
                  Object.keys(actualLevelData).length > 0
                  &&
                  Object.keys(actualLevelData.topics).length > 0
                  &&
                  actualLevelData.topics[topic]
                  &&
                  actualLevelData.topics[topic]?.map((topicWord: WordsTraduction, index: number) => {
                    if (topicWord !== null && topicWord.word !== null) return (
                      <td key={index} >
                        {topicWord.word[0]} -&gt; {topicWord.word[1]}
                      </td>
                    )
                  })
                }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Page