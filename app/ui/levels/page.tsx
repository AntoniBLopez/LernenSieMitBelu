'use client'

import Image from "next/image"
import Link from "next/link"
import {
  ChartBarIcon,

} from '@heroicons/react/24/outline';
import { RootState } from "@/app/lib/store"
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks"
import { getLevelsAndDispatchToStore } from "@/app/lib/features/state/utils"
import SelectCard from "@/app/ui/dashboard/SelectCard"
import { useEffect, useState } from "react";
import { Level } from "@/types";

function Course() {

  const levelsStore = useAppSelector((state: RootState) => state.store.levels)
  const dispatch = useAppDispatch()
  const [selectedLevel, setSelectedLevel] = useState('A1')
  const [levelData, setlevelData] = useState<any>({})

  useEffect(() => {
    if (levelsStore.length === 0) {
      getLevelsAndDispatchToStore(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (levelsStore.length > 0) {
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
            <ChartBarIcon className="size-7 text-primaryColor" />
            <span className="content-end">&nbsp;Choose a level</span>
          </h1>
        </header>

        <main className="flex flex-col gap-2">
          <span className="text-primaryColor font-medium text-base">Levels</span>
          <section className="flex flex-col gap-2">
            {
              levelsStore.length > 0
              &&
              levelsStore.length > 0
              &&
              levelsStore.map((level: Level | any, index: number) => {
                return <SelectCard key={index} isChooseLevels={true} topic={level.level} terms={Object.keys(level.topics).length} />
              })
            }
          </section>
        </main>
      </div>
    </div>
  )
}

export default Course