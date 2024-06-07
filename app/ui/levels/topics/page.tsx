'use client'

import Image from "next/image"
import Link from "next/link"
import {
  AcademicCapIcon,

} from '@heroicons/react/24/outline';
import { RootState } from "@/app/lib/store"
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks"
import { getLevelsAndDispatchToStore } from "@/app/lib/features/state/utils"
import SelectCard from "@/app/ui/dashboard/SelectCard"
import { useEffect, useState } from "react";
import { Level } from "@/types";

function Topics() {

  const isBrowser = typeof window !== 'undefined'
  const levelsStore = useAppSelector((state: RootState) => state.store.levels)
  const dispatch = useAppDispatch()
  const [selectedLevel, setSelectedLevel] = useState(isBrowser ? localStorage.getItem("selectedLevel") : null)
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
    <div className="px-fixed desktop:px-fixedDesktop w-full h-fit">
      <div className="flex flex-col h-fit my-10 gap-10">
        <header className="flex flex-col gap-5">
          {/* Build a broadcaster here */}


          <h1 className='flex flex-row text-2xl text-primaryColor font-medium'>
            <AcademicCapIcon className="size-8 text-primaryColor" />
            <span className="content-end">&nbsp;Choose the topic</span>
          </h1>
        </header>

        <main className="flex flex-col gap-2">
          <span className="text-primaryColor font-medium text-base">Topics</span>
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