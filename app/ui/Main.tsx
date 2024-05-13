'use client'
import { googleLogout, useGoogleLogin, hasGrantedAllScopesGoogle } from '@react-oauth/google'
// googleLogout()
import Image from "next/image"
import { useState } from 'react'
import axios from 'axios'

export default function Main() {

  const [tokenResponse, setTokenResponse] = useState<any>('')
  const [summary, setSummary] = useState<string>('') // use FORMIK or USE FORM HOOK for the form
  const [description, setDescription] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  const login = useGoogleLogin({
    onSuccess: response => {
      console.log(response)
      const { code } = response
      axios.post('http://localhost:4000/api/create-tokens', { code })
        .then(res => console.log(res.data))
        .catch(err => console.log(err.message))
      setTokenResponse(response)
    },
    onError: error => console.log(error),
    flow: 'auth-code',
    scope: 'openid email profile https://www.googleapis.com/auth/calendar.app.created',
  })

  const hasAccess = hasGrantedAllScopesGoogle(
    tokenResponse,
    'openid',
    'email',
    'profile',
    'https://www.googleapis.com/auth/calendar.app.created',
  )

  console.log(hasAccess, 'hasAccess')


  const handleSubmit = async (event: any) => {
    event.preventDefault()
    // const { title } = e.target
    // console.log(title.value)
  }

  return (
    <main className="h-fit w-full">
      <div className="px-fixed w-full h-fit bg-bluishBlackColor">
        <div className="flex flex-wrap h-screen py-10" id="pricing">
          <div className="w-[50%] h-full">
            <h1>Main 1 - Headline</h1>
            <button className='flex flex-row bg-white gap-2 py-2 px-3 rounded-md text-black hover:opacity-80' onClick={() => login()}>
              {/* Sign in to Google and authorize the calendar */}
              <Image className='self-center' src={'/logos/google.png'} alt='Google logo' width={20} height={20} />
              Sign in & Authorize calendar
            </button>
            {/* Simple form to add a data to a Google Calendar */}
            <div>
              <form onSubmit={handleSubmit} className='flex flex-col gap-2 pt-5 rounded-md'>
                <label htmlFor="summary">Summary</label>
                <input
                  type="text"
                  name=""
                  id="summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
                <br />
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name=""
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <br />
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  name=""
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <br />
                <label htmlFor="startDate">startDate</label>
                <input
                  type="date"
                  name=""
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <br />
                <label htmlFor="endDate">endDate</label>
                <input
                  type="date"
                  name=""
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <br />
              </form>
            </div>
          </div>
          <div className="w-[50%] h-full">
            <h1>Main 1 - Demo</h1>

          </div>
        </div>
      </div>

      <div className="px-fixed w-full h-fit bg-black2Color">
        <div className="h-screen py-10">

          <h1>Main 2</h1>
        </div>
      </div>

      <div className="px-fixed w-full h-fit bg-bluishBlackColor">
        <div className="h-screen py-10">

          <h1>Main 3</h1>
        </div>
      </div>
    </main>
  )
}