'use client'
import { getLevelsAndDispatchToStore } from '@/app/lib/features/state/utils'
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks"
import { RootState } from '@/app/lib/store'
import { useEffect } from 'react'

export default function Page() {
  const levelsStore = useAppSelector((state: RootState) => state.store.levels)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (levelsStore.length === 0) {
      getLevelsAndDispatchToStore(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className='w-full rounded-xl p-5 bg-white dark:bg-bgColorCardDark transition-all duration-500'>
      <h1 className='text-5xl w-fit font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#55aeb8] to-[#2cd5a2]'>Chart</h1>
    </section>
  )
}
