'use client'

import {
  ChartBarIcon,

} from '@heroicons/react/24/outline';
import { RootState } from "@/app/lib/store"
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks"
import { getLevelsAndDispatchToStore } from "@/app/lib/features/state/utils"
import SelectCard from "@/app/(ui)/dashboard/SelectCard"
import { useEffect } from "react";
import { Level } from "@/types";
import { setActiveTab } from '@/app/lib/features/state/stateSlice';

function Levels() {

  const levelsStore = useAppSelector((state: RootState) => state.store.levels)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setActiveTab({ name: 'Levels', position: 1 }))
    if (levelsStore.length === 0) {
      getLevelsAndDispatchToStore(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className="mx-12 laptop:mx-auto laptop:max-w-desktop">
      <div className="flex flex-col h-fit mt-8 mb-10 gap-5">
        <header className="flex flex-col gap-10">
          <h1 className='flex flex-row text-2xl mobile:text-3xl items-center text-primaryColor font-medium'>
            <ChartBarIcon className="size-6 mobile:size-7 text-primaryColor" />
            <span className="content-end whitespace-nowrap">&nbsp;Wähle dein Niveau</span>
          </h1>
        </header>

        <main className="flex flex-col">
          <section className="flex flex-col gap-2">
            {
              levelsStore.length > 0
              &&
              levelsStore.length > 0
              &&
              levelsStore.map((obj: Level | any, index: number) => {
                return <SelectCard key={index} isChooseLevels={true} name={obj.level} length={Object.keys(obj.topics).length} />
              })
            }
          </section>
        </main>
      </div>
    </div>
  )
}

export default Levels