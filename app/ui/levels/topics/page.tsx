'use client'

import {
  AcademicCapIcon,

} from '@heroicons/react/24/outline';
import { RootState } from "@/app/lib/store"
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks"
import { getLevelsAndDispatchToStore } from "@/app/lib/features/state/utils"
import SelectCard from "@/app/ui/dashboard/SelectCard"
import { useEffect, useState } from "react";
import { Level } from "@/types";
import Breadcrumbs from "@/app/widgets/Breadcrumbs";
import SelectedLabels from '@/app/widgets/SelectedLabels';

function Topics() {

  const isBrowser = typeof window !== 'undefined'
  const [selectedLevel, setSelectedLevel] = useState(isBrowser ? localStorage.getItem("selectedLevel") : null)
  const levelsStore = useAppSelector((state: RootState) => state.store.levels)
  const dispatch = useAppDispatch()
  const [levelTopics, setLevelTopics] = useState<any>({})

  useEffect(() => {
    if (levelsStore.length === 0) {
      getLevelsAndDispatchToStore(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (levelsStore.length > 0) {
      const level = levelsStore.find((obj: Level) => obj.level === selectedLevel)
      setLevelTopics(level)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelsStore])


  return (
    <div className="px-12 desktop:px-desktop w-full h-fit">
      <div className="flex flex-col h-fit mt-8 mb-10 gap-5">
        <header className="flex flex-col gap-10">
          <div className='flex flex-col gap-2 items-start'>
            <Breadcrumbs actualTab="Topics" />
            <SelectedLabels showLevel={true} />
          </div>

          <h1 className='flex flex-row text-2xl text-primaryColor font-medium'>
            <AcademicCapIcon className="size-8 text-primaryColor" />
            <span className="content-end">&nbsp;Choose the topic </span>
          </h1>
        </header>

        <main className="flex flex-col">
          <section className="flex flex-col gap-2">
            {
              levelsStore.length > 0
              &&
              Object.keys(levelTopics).length > 0
              &&
              Object.keys(levelTopics.topics).map((topic: string, index: number) => {
                if (levelTopics.topics[topic].length > 0) {
                  return <SelectCard key={index} name={topic} length={levelTopics.topics[topic].length} />
                }
              })
            }
          </section>
        </main>
      </div>
    </div>
  )
}

export default Topics