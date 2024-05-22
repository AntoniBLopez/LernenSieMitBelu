'use client'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

function Page() {

  const handleData = () => {
    axios.get(process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000/api/data'
      : 'https://lernen-sie-mit-belu.vercel.app/api/data'
    )
      .then((response) => {
        console.log(response, 'response')
      })
      .catch((error) => {
        console.log(error, 'error')
      })
  }

  return (
    <main className='flex flex-col gap-5 '>
      <h1 className='text-3xl font-bold text-center'>Flashcards</h1>
      <button onClick={handleData}>Get Data</button>
    </main>
  )
}

export default Page