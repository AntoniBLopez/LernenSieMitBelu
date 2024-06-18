'use client'
import SideNav from "./SideNav"
import { useEffect, useState } from "react"
import { PlayCircleIcon } from "@heroicons/react/24/outline"
import SelectedLabels from "@/app/widgets/SelectedLabels"
import { useAppDispatch } from "@/app/lib/hooks"
import { setActiveTab } from "@/app/lib/features/state/stateSlice"

function Page() {

  const dispatch = useAppDispatch()

  const isBrowser = typeof window !== 'undefined'
  const [selectedLevel, setSelectedLevel] = useState(isBrowser ? localStorage.getItem("selectedLevel") : null)
  const [selectedTopic, setSelectedTopic] = useState(isBrowser ? localStorage.getItem("selectedTopic") : null)

  useEffect(() => {
    dispatch(setActiveTab({ name: 'Games', position: 3 }))
    if (selectedLevel === null && selectedTopic === null) {
      setSelectedLevel(localStorage.getItem("selectedLevel"))
      setSelectedTopic(localStorage.getItem("selectedTopic"))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLevel, selectedTopic])

  return (
    <div className="flex flex-col mx-12 laptop:mx-auto laptop:max-w-desktop mt-8 mb-10 gap-5" >
      <header className="flex flex-col gap-10">
        <div className='flex flex-col gap-2 items-start'>
          <SelectedLabels showLevel={true} showTopic={true} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-1 items-center justify-center">
            <PlayCircleIcon className="size-8 text-primaryColor" />
            <h2 className='flex text-2xl text-primaryColor font-medium'>
              <span className="content-end">Wähle das Spiel</span>
            </h2>
          </div>
        </div>
      </header>
      <SideNav />
    </div>
  )
}

export default Page