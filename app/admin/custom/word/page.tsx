'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { getTopics } from "../../axios/queries"

interface ObjectWord {
  word: string[] | null;
  known_by_0: string[] | null;
  known_by_1: string[] | null;
  known_by_2: string[] | null;
}

interface TopicsByLevel {
  [key: string]: ObjectWord[] | undefined;
}

function Page() {
  const [level, setLevel] = useState('A1')
  const [topicsByLevel, setTopicsByLevel] = useState<TopicsByLevel>({})
  const [topic, setTopic] = useState('')
  const [spanishWord, setSpanishWord] = useState('')
  const [germanWord, setGermanWord] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getTopics(setTopicsByLevel, level)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (topic) return
    const firstTopic = Object.keys(topicsByLevel)[0]
    setTopic(firstTopic)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicsByLevel])

  useEffect(() => {
    getTopics(setTopicsByLevel, level)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level])

  const handleSubmit = (e: any) => {
    setLoading(true)
    e.preventDefault()

    axios.post(process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/words'
      : '/api/words',
      {
        level,
        topic,
        spanishWord,
        germanWord,
      }
    )
      .then((response) => {
        console.log(response, 'response')
        getTopics(setTopicsByLevel, level)
        setSpanishWord('')
        setGermanWord('')
      })
      .catch((error) => {
        console.log(error, 'error')
      })
    console.log('Submitted')
    setLoading(false)
  }

  return (
    <div className="px-fixed desktop:px-fixedDesktop w-full h-fit">
      <div className="flex flex-col max-w-xl mx-auto h-screen my-10 gap-7 text-center" id="pricing">
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
              <select className="w-fit" name="level" id="select" value={level} onChange={(e) => setLevel(e.target.value)}>
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
                  Object.keys(topicsByLevel).length > 0
                  &&
                  Object.keys(topicsByLevel).map((topicWord: string, index: number) => {
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
              hover:bg-primaryColorDark
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
              <tr className="flex flex-col">
                <td>{topic}</td>
                <td className="underline font-medium">Words</td>
                {
                  Object.keys(topicsByLevel).length > 0
                  &&
                  topicsByLevel[topic]
                  &&
                  topicsByLevel[topic]?.map((topicWord: ObjectWord, index: number) => {
                    if (topicWord !== null && topicWord.word !== null) return (
                      <td key={index}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{topicWord.word[0]} -&gt; {topicWord.word[1]}
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