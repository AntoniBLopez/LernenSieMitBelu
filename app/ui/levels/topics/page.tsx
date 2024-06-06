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

function Course() {

  const levelsStore = useAppSelector((state: RootState) => state.store.levels)
  const dispatch = useAppDispatch()
  const [userLevel, setUserLevel] = useState('A1')
  const [levelData, setlevelData] = useState<any>({})

  useEffect(() => {
    if (levelsStore.length === 0) {
      getLevelsAndDispatchToStore(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (levelsStore.length > 0) {
      const level = levelsStore.find(obj => obj.level === userLevel)
      setlevelData(level)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelsStore])


  return (
    <div className="px-fixed desktop:px-fixedDesktop w-full h-fit">
      <div className="flex flex-col h-fit my-10 gap-10">
        <header className="flex flex-col gap-5">
          <Link href={"/"} className="w-fit">
            <Image
              src="/icons/leftArrow.png"
              width={30}
              height={30}
              className="text-black"
              alt="Go back to homepage arrow icon"
            />
          </Link>
          <h1 className='flex flex-row text-2xl text-primaryColor font-medium'>
            <AcademicCapIcon className="size-8 text-primaryColor" />
            <span className="content-end">&nbsp;A1 course</span>
          </h1>
        </header>

        <main className="flex flex-col gap-2">
          <span className="text-primaryColor font-medium text-base">Topics</span>
          <section className="flex flex-col gap-2">
            {
              levelsStore.length > 0
              &&
              levelData.length > 0
              &&
              Object.keys(levelData.topics).map((topic: string, index: number) => {
                if (levelData.topics[topic].length > 0) {
                  return <SelectCard key={index} topic={topic} terms={levelData.topics[topic].length} />
                }
              })
            }
          </section>
        </main>
      </div>
    </div>
  )
}

export default Course