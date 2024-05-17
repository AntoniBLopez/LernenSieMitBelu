'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import axios from 'axios'

function page() {

  const handleData = () => {
    axios.get('http://localhost:4000/api/data')
      .then((response) => {
        console.log(response, 'response')
      })
      .catch((error) => {
        console.log(error, 'error')
      })
  }

  return (
    <main className='flex flex-col w-full h-full gap-5'>
      <h1 className='text-3xl font-bold text-center'>Flashcards</h1>
      <button onClick={handleData}>Get Data</button>
    </main>
  )
}

export default page