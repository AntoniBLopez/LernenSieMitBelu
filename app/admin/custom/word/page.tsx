'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { getTopics } from "../../axios/queries"

function Page() {

  const [level, setLevel] = useState('A1')
  const [topic, setTopic] = useState({})
  const [word, setWord] = useState('')

  useEffect(() => {
    getTopics(setTopic, level)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {

    // axios.post(process.env.NODE_ENV === 'development'
    //   ? 'http://localhost:3000/api/topics'
    //   : '/api/topics',
    //   {
    //     level,
    //     topic,
    //   }
    // )
    //   .then((response) => {
    //     console.log(response, 'response')
    //     getTopics(setTopic, level)
    //     console.log(topic, 'topic')
    //   })
    //   .catch((error) => {
    //     console.log(error, 'error')
    //   })
    console.log('Topic', topic, 'Level', level)
  }, [topic])

  const handleSubmit = (e: any) => {
    e.preventDefault()


    console.log('Submitted')
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
              <select className="w-fit" name="level" id="select" value={level} onChange={(e) => setTopic(e.target.value)}>
                {
                  Object.keys(topic).length > 0
                  &&
                  Object.keys(topic).map((topic: string, index: number) => {
                    return (
                      <option key={index} value={topic}>{topic}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className="flex flex-row gap-2">
              <label
                className="block font-bold text-gray-900 self-center whitespace-nowrap"
                htmlFor="topic"
              >
                Spanish Word:
              </label>
              <input
                id="topic"
                type="text"
                name="topic"
                placeholder="A2"
                className="py-2 px-3"
                required
              />
            </div>

            <div className="flex flex-row gap-2">
              <label
                className="block font-bold text-gray-900 self-center whitespace-nowrap"
                htmlFor="topic"
              >
                German Word:
              </label>
              <input
                id="topic"
                type="text"
                name="topic"
                placeholder="A2"
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
                <th>Levels</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>-&gt; A1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Page