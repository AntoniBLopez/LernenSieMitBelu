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
    <section className='w-full rounded-xl p-5 bg-white'>
      <h1 className='text-5xl w-fit font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#55aeb8] to-[#2cd5a2] text-primaryDarkColor'>Chart</h1>
    </section>
  )
}
