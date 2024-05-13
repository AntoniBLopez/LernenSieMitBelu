'use client'
import { googleLogout, useGoogleLogin, hasGrantedAllScopesGoogle } from '@react-oauth/google'
// googleLogout()
import Image from "next/image"
import { useState } from 'react'
import axios from 'axios'

export default function Main() {

  const [tokenResponse, setTokenResponse] = useState<any>('')

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

  return (
    <main className="h-fit w-full">
      <div className="px-fixed w-full h-fit bg-bluishBlackColor">
        <div className="flex flex-wrap h-screen py-10" id="pricing">
          <div className="w-[50%] h-full">
            <h1>Main 1 - Headline</h1>
            <button className='flex flex-row bg-white gap-2 py-2 px-3 rounded-md text-black hover:opacity-80' onClick={() => login()}>
              <Image className='self-center' src={'/logos/google.png'} alt='Google logo' width={20} height={20} />
              Sign in & Authorize Calendar
            </button>
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