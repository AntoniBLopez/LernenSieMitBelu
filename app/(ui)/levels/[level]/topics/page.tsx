'use client'
import {
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import { RootState } from "@/app/lib/store"
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks"
import { getLevelsAndDispatchToStore } from "@/app/lib/features/state/utils"
import SelectCard from "@/app/(ui)/components/SelectCard"
import { useEffect, useState } from "react";
import { Level } from "@/types";
import SelectedLabels from '@/app/(ui)/components/SelectedLabels';
import CardsLoading from '@/app/(ui)/levels/widgets/CardsLoading';
// import { useRouter } from 'next/router'

export default function Page({ params }: { params: { level: string } }) {
  // const router = useRouter()
  // const isBrowser = typeof window !== 'undefined'
  const [loading, setLoading] = useState(false)
  const levelsStore = useAppSelector((state: RootState) => state.store.levels)
  // const chosenLevel = useAppSelector((state: RootState) => state.store.chosenLevel)
  // const [selectedLevel, setSelectedLevel] = useState<string | null>(params.level)
  const dispatch = useAppDispatch()
  const [levelTopics, setLevelTopics] = useState<any>({})

  useEffect(() => {
    if (levelsStore.length === 0) {
      setLoading(true)
      getLevelsAndDispatchToStore(dispatch)
    }
    // if (!selectedLevel) {
    //   setSelectedLevel(localStorage.getItem("selectedLevel"))
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (levelsStore.length > 0) {
      setLoading(false)
      const level = levelsStore.find((obj: Level) => obj.level === params.level)
      if (!level) {
        console.error('level not found (not in store)')
        return
      }
      setLevelTopics(level.topics)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelsStore])


  return (
    <div className="flex flex-col w-full h-fit mt-1 mb-10 gap-5">
      <header className="flex flex-col gap-5">
        <div className='flex flex-col gap-2 items-start'>
          <SelectedLabels levelName={params.level} />
        </div>

        <h1 className='flex flex-row text-2xl mobile:text-3xl items-center text-primaryColor font-medium'>
          <AcademicCapIcon className="size-6 mobile:size-8 text-primaryColor" />
          <span className="content-end whitespace-nowrap">&nbsp;Wähle das Thema</span>
        </h1>
      </header>

      <main className="flex flex-col">
        {
          loading
            ?
            <CardsLoading />
            :
            <section className="flex flex-col gap-2">
              {
                levelsStore.length > 0
                &&
                Object.keys(levelTopics).length > 0
                &&
                Object.keys(levelTopics).map((topic: string, index: number) => {
                  if (levelTopics[topic].length) {
                    return <SelectCard key={index} levelName={params.level} topicName={topic} length={levelTopics[topic].length} />
                  }
                })
              }
            </section>
        }
      </main>
    </div>
  )
}