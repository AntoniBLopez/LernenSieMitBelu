'use client'

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { getLevels } from "../../axios/queries"

interface Level {
  name: string;
  topics: {
    [key: string]: ObjectWord[] | null;
  };
}
interface ObjectWord {
  word: string[] | null;
  known_by_0: string[] | null;
  known_by_1: string[] | null;
  known_by_2: string[] | null;
}

function Page() {
  const [levelsData, setLevelsData] = useState([])
  const [topic, setTopic] = useState('')
  const [level, setLevel] = useState('A1')

  useEffect(() => {
    getLevels(setLevelsData)
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault()

    axios.post(process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/topics'
      : '/api/topics',
      {
        level,
        topic,
      }
    )
      .then((response) => {
        console.log(response, 'response')
        getLevels(setLevelsData)
      })
      .catch((error) => {
        console.log(error, 'error')
      })
    console.log('Topic', topic, 'Level', level)
    setTopic('')
  }

  return (
    <div className="px-fixed desktop:px-fixedDesktop w-full h-fit">
      <div className="flex flex-col max-w-xl mx-auto h-fit mt-10 mb-20 gap-7 text-center" id="pricing">
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
              <option value="C1">C1</option>
              <option value="C2">C2</option>
            </select>
          </div>
          <div className="flex flex-row gap-5">
            <label
              className="block font-bold text-gray-900 self-center whitespace-nowrap"
              htmlFor="topic"
            >
              Topic Name:
            </label>
            <input
              id="topic"
              type="text"
              name="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Naturaleza"
              className="py-2 px-3"
              required
            />
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
              hover:bg-primaryColorDark
              text-black
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
            levelsData.map((level: Level, index: number) => (
              <div key={index} className="text-start">
                <h1 className="font-bold self-start text-primaryColor">{level.name}</h1>
                <table>
                  <thead>
                    <tr className="flex">
                      <th className="self-start">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Topics</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="flex flex-col">
                      {level.topics !== null &&
                        Object.keys(level.topics)
                          .filter((topic): topic is string => topic !== null)
                          .map((topic: string, index: number) => {
                            return (
                              <React.Fragment key={index}>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- {topic}</td>
                                {level.topics[topic] !== null &&
                                  level.topics[topic]!.map((objectWord: ObjectWord, wordIndex: number) => {
                                    if (objectWord === null || objectWord.word === null) return null
                                    return (
                                      <td key={wordIndex}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{objectWord.word[0]} -&gt; {objectWord.word[1]}</td>
                                    )
                                  })
                                }
                              </React.Fragment>
                            )
                          })
                      }
                    </tr>
                  </tbody>
                </table>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Page