'use client'
import Breadcrumbs from "@/app/widgets/Breadcrumbs"
import SideNav from "./SideNav"
import { useEffect, useState } from "react"
import { InformationCircleIcon } from "@heroicons/react/24/outline"

function Page() {

  const isBrowser = typeof window !== 'undefined'
  const [selectedLevel, setSelectedLevel] = useState(isBrowser ? localStorage.getItem("selectedLevel") : null)
  const [selectedTopic, setSelectedTopic] = useState(isBrowser ? localStorage.getItem("selectedTopic") : null)

  useEffect(() => {
    if (selectedLevel === null && selectedTopic === null) {
      setSelectedLevel(localStorage.getItem("selectedLevel"))
      setSelectedTopic(localStorage.getItem("selectedTopic"))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLevel, selectedTopic])

  return (
    <div className="flex flex-col mx-12 h-fit mt-8 mb-10 gap-5" >
      <header className="flex flex-col gap-10">
        <Breadcrumbs actualTab="Games" />
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-1 items-center">
            <InformationCircleIcon className="size-6 text-primaryColor" />
            <h2 className='flex text-xl text-primaryColor font-medium'>
              <span className="content-end">{selectedLevel}: {selectedTopic}</span>
            </h2>
          </div>
        </div>
      </header>
      <SideNav />
    </div>
  )
}

export default Page