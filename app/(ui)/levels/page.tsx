'use client'

import {
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { RootState } from "@/app/lib/store"
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks"
import { getLevelsAndDispatchToStore } from "@/app/lib/features/state/utils"
import SelectCard from "@/app/(ui)/components/SelectCard"
import { useEffect, useState } from "react";
import { Level } from "@/types";
import { setActiveTab } from '@/app/lib/features/state/stateSlice';
import CardsLoading from '@/app/(ui)/levels/widgets/CardsLoading';

export default function Levels() {

  const [loading, setLoading] = useState(false)
  const levelsStore = useAppSelector((state: RootState) => state.store.levels)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setActiveTab({ name: 'Levels', position: 1 }))
    if (levelsStore.length === 0) {
      setLoading(true)
      getLevelsAndDispatchToStore(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (levelsStore.length > 0) {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelsStore])


  return (
    <div className="flex flex-col w-full h-fit mt-8 mb-10 gap-5">
      <header className="flex flex-col gap-10">
        <h1 className='flex flex-row text-2xl mobile:text-3xl items-center text-primaryColor font-medium'>
          <ChartBarIcon className="size-6 mobile:size-7 text-primaryColor" />
          <span className="content-end whitespace-nowrap">&nbsp;Wähle dein Niveau</span>
        </h1>
      </header>

      <main className="flex flex-col">
        <section className="flex flex-col gap-2">
          {
            loading
              ?
              <CardsLoading />
              :
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
  )
}