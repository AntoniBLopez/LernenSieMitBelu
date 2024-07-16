'use client'
import React, { use, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { getLevelsAndDispatchToStore } from "@/app/lib/features/state/utils"
import { useAppSelector, useAppDispatch } from "@/app/lib/hooks"
import { RootState } from "@/app/lib/store"
import { Level, WordsTraduction } from "@/types"
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline"

function Page() {
  const [topics, setTopics] = useState('')
  const [level, setLevel] = useState('A1')
  const [openLevels, setOpenLevels] = useState<{ [key: string]: boolean }>({})
  const [openTopics, setOpenTopics] = useState<{ [key: string]: boolean }>({})

  const levelsStore = useAppSelector((state: RootState) => state.store.levels)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (levelsStore.length === 0) {
      getLevelsAndDispatchToStore(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    axios.post(process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/topics'
      : '/api/topics',
      {
        level,
        topics,
      }
    )
      .then((response) => {
        console.log(response, 'response')
        getLevelsAndDispatchToStore(dispatch)
      })
      .catch((error) => {
        console.log(error, 'error')
      })
    setTopics('')
  }

  const toggleLevel = (level: string) => {
    setOpenLevels(prev => ({ ...prev, [level]: !prev[level] }))
  }

  const toggleTopic = (topics: string) => {
    setOpenTopics(prev => ({ ...prev, [topics]: !prev[topics] }))
  }

  useEffect(() => {
    console.log('openLevels', openLevels)
  }, [openLevels])

  return (
    <div className="px-fixed desktop:px-fixedDesktop w-full h-fit">
      <div className="flex flex-col max-w-3xl mx-auto h-fit mt-10 mb-20 gap-7 text-center">
        <Link href={"/admin"} className="w-fit">
          <Image
            src="/icons/leftArrow.png"
            width={30}
            height={30}
            className="text-black"
            alt="Go back to homepage arrow icon"
          />
        </Link>
        <h1 className={`text-2xl text-primaryColor`}>Add new Topic</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-row">
            <label htmlFor="" className="self-start font-semibold">
              Choose the level:&nbsp;&nbsp;&nbsp;
            </label>
            <select className="w-fit" name="level" id="select" value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              {/* <option value="C1">C1</option> */}
              {/* <option value="C2">C2</option> */}
            </select>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col tablet:flex-row tablet:gap-5 gap-2">
              <label
                className="block font-semibold self-start text-gray-900 whitespace-nowrap"
                htmlFor="topics"
              >
                Topic Name:
              </label>
              <textarea
                id="topics"
                name="topics"
                value={topics}
                onChange={(e) => setTopics(e.target.value)}
                placeholder={`Natur\nLänder\netc...`}
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
              self-start
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
        <div>
          <div className='w-full h-px bg-slate-700' />
        </div>
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-5">
          {
            levelsStore.length > 0
            &&
            levelsStore.map((level: Level, index: number) => {
              const isLevelOpen = openLevels[level.level] || false
              return (
                <div key={index} className="text-start">
                  <table>
                    <thead>
                      <tr className="flex" onClick={() => toggleLevel(level.level)}>
                        <th className="self-start">
                          <div className="flex flex-row w-fit items-center font-semibold hover:cursor-pointer">
                            <span className="font-bold text-primaryColor">{level.level}&nbsp;&nbsp;</span>
                            {isLevelOpen
                              ? <ChevronDownIcon className="w-4 h-4 stroke-black" strokeWidth={2.2} />
                              : <ChevronRightIcon className="w-4 h-4 stroke-black" strokeWidth={2.2} />}
                            Topics<span className="font-normal">&nbsp;({Object.keys(level.topics).length})</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLevelOpen && Object.keys(level.topics).length > 0 &&
                        Object.keys(level.topics)
                          .filter((topics): topics is string => topics !== null)
                          .map((topics: string, index: number) => {
                            const isTopicOpen = openTopics[topics] || false
                            return (
                              <React.Fragment key={index}>
                                <tr className="flex" onClick={() => toggleTopic(topics)}>
                                  <td>
                                    <div className="flex flex-row w-fit items-center hover:cursor-pointer">
                                      &nbsp;&nbsp;&nbsp;
                                      {isTopicOpen
                                        ? <ChevronDownIcon className="w-4 h-4" strokeWidth={2.2} />
                                        : <ChevronRightIcon className="w-4 h-4" strokeWidth={2.2} />}
                                      <span className="font-semibold text-primaryDarkColor">
                                        {topics}
                                        <span className="font-normal"> ({level.topics[topics].length})</span>
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                                {isTopicOpen && level.topics[topics].length > 0 &&
                                  level.topics[topics]
                                    .map((objectWord: WordsTraduction, wordIndex: number) => {
                                      if (objectWord === null || objectWord.word === null) return null
                                      return (
                                        <tr key={wordIndex}>
                                          <td>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            {objectWord.word[0]} - {objectWord.word[1]}
                                          </td>
                                        </tr>
                                      )
                                    })
                                }
                              </React.Fragment>
                            )
                          })
                      }
                    </tbody>
                  </table>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Page
