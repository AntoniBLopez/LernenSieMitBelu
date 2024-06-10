'use client'
import { getLevelsAndDispatchToStore } from '../lib/features/state/utils'
import { useAppDispatch, useAppSelector } from '../lib/hooks'
import { RootState } from '../lib/store'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Main() {

  const levelsStore = useAppSelector((state: RootState) => state.store.levels)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (levelsStore.length === 0) {
      getLevelsAndDispatchToStore(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="h-fit w-full">
      <div className="flex flex-col gap-20 px-fixed desktop:px-desktop w-full h-fit">
        <div className="flex flex-col pt-10 text-center" >
          <h1 className='text-6xl text-primaryColor'>Welcome</h1>
        </div>
        <section className='flex justify-center'>
          <Link
            href="/ui/levels"
            className='font-bold bg-primaryColor text-white rounded-md px-4 py-2 hover:bg-primaryColorDark'
          >
            Start
          </Link>
        </section>
      </div>
    </main >
  )
}