'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Option from '@/app/widgets/Option'

function Page() {

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4000/api/data')
      .then((response) => {
        setData(response.data)
        console.log(response, 'response')
      })
      .catch((error) => {
        console.log(error, 'error')
      })
    console.log(data, 'data')
  }, [])

  return (
    <main className='flex flex-col gap-5'>
      <h1 className='text-3xl font-bold text-center'>Multiple Choice</h1>
      {
        data.map((el: any, index: number) => {
          if (el['nacionalidades']) {
            return (
              <div key={index}>{el.nacionalidades.Chino[0]}</div>
            )

          }
          return (
            el[index]
          )
        })
      }
      <div className='flex flex-col gap-5'>
        <p className='font-bold'>Choose matching term</p>
        <section className='grid grid-cols-2 gap-5'>
          <Option />
          <Option />
          <Option />
          <Option />
        </section>
      </div>
    </main>
  )
}

export default Page