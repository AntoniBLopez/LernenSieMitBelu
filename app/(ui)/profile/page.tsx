'use client'
import { setActiveTab } from '@/app/lib/features/state/stateSlice'
import { getLevelsAndDispatchToStore } from '@/app/lib/features/state/utils'
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks"
import { RootState } from '@/app/lib/store'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Page() {

  const levelsStore = useAppSelector((state: RootState) => state.store.levels)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setActiveTab({ name: 'Profile', position: 0 }))
    if (levelsStore.length === 0) {
      getLevelsAndDispatchToStore(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="mx-6 laptop:mx-auto laptop:max-w-desktop mt-10">
      <div className='w-fit h-fit mb-10'>
        <Link href={"/levels"} className="w-fit h-fit py-2 px-3 font-semibold rounded-md bg-primaryColor hover:font-semibold hover:text-white hover:bg-primaryDarkColor">
          START
        </Link>
      </div>
      <div>
        <Image src="/photos/defaultProfilePicture.png" alt="Logo" width={80} height={80} />
        <span className='font-semibold ml-2'>Username</span>
      </div>
    </main>
  )
}
