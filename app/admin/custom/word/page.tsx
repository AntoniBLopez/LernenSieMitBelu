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
  // const [germanWord, setGermanWord] = useState('')
  // const [spanishWord, setSpanishWord] = useState('')
  const [wordsList, setWordsList] = useState('')
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
      console.log(firstTopic, 'firstTopic')
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
        wordsList
      }
    )
      .then((response) => {
        setWordsList('')
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
                {/* <option value="C1">C1</option> */}
                {/* <option value="C2">C2</option> */}
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
                className="block self-start font-semibold text-gray-900 whitespace-nowrap"
                htmlFor="wordsList"
              >
                Add Words:
              </label>
              <textarea
                id="wordsList"
                name="wordsList"
                placeholder={`Español Spanien\nFrancia Frankreich\netc...`}
                value={wordsList}
                onChange={(e) => setWordsList(e.target.value)}
                className="w-full min-h-24 py-2 px-3"
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
              text-black
              bg-primaryColor
              hover:text-white
              hover:bg-primaryDarkColor
            '
            >
              Add
            </button>
          </div>
        </form>
        <div className="flex flex-col items-start gap-7">
          <div className="w-full items-center">
            <div className='w-auto h-px lg:h-px bg-slate-700' />
          </div>
          <table>
            <thead>
              <tr>
                <th className="font-semibold">
                  Topic:
                  <span className="font-semibold text-primaryDarkColor">
                    &nbsp;{topic}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="flex flex-col text-start">
                <td className="font-semibold">
                  Words:
                  <span className="font-normal">
                    &nbsp;{Object.keys(actualLevelData).length > 0 && Object.keys(actualLevelData.topics).length > 0 && actualLevelData.topics[topic] && actualLevelData.topics[topic].length}
                    <br />
                    -
                  </span>
                </td>
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
                        {topicWord.word[0]} - {topicWord.word[1]}
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