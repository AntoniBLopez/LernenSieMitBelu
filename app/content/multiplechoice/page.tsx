'use client'
import axios from 'axios'
import { Key, useEffect, useState } from 'react'
import Option from '@/app/widgets/Option'

function Page() {

  const [data, setData] = useState([])
  const [spainData, setSpainData] = useState('')

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
    <main className='flex flex-col gap-10'>
      <h1 className='text-3xl font-bold text-center'>Multiple Choice</h1>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-2'>
          <p className='opacity-50 font-medium'>Definition</p>
          <div className='font-bold'>Español</div>
        </div>
        <div className='flex flex-col gap-5'>
          <p className='font-bold text-grayColor'>Choose matching term</p>
          <section className='grid grid-cols-2 gap-5'>
            {
              data.map((el: any, index) => {
                if (el['nacionalidades']) {
                  return el.nacionalidades.Español.map((el: string, index: Key) => {
                    return <Option name={el} key={index} />
                  })
                }
                return null
              })
            }
            <Option key='2' name='x' />
            <Option key='1' name='n' />
          </section>
        </div>
      </div>
    </main>
  )
}

export default Page