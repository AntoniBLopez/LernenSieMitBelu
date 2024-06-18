'use client'
import { getLevelsAndDispatchToStore } from '@/app/lib/features/state/utils'
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks'
import { RootState } from '@/app/lib/store'
import { useEffect } from 'react'
import Link from 'next/link'
import { setActiveTab } from '@/app/lib/features/state/stateSlice'

export default function Main() {

  const levelsStore = useAppSelector((state: RootState) => state.store.levels)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setActiveTab({ name: 'Home', position: 0 }))
    if (levelsStore.length === 0) {
      getLevelsAndDispatchToStore(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="flex flex-col gap-10 mobile:gap-20 mx-fixed laptop:max-w-desktop laptop:mx-auto h-fit">
      <div className="flex flex-col pt-10 text-center" >
        <h1 className='text-4xl mobile:text-6xl text-primaryColor'>¡Bienvenidos!</h1>
      </div>
      <section className='flex justify-center'>
        <Link
          href="/levels"
          className='font-bold bg-primaryColor text-white rounded-md px-4 py-2 hover:bg-primaryColorDark'
        >
          Starten
        </Link>
      </section>
    </main >
  )
}