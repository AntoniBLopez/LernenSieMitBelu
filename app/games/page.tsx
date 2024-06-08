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
        <h1 className='flex text-2xl text-primaryColor font-medium'>
          <InformationCircleIcon className="size-8 text-primaryColor" />
          <span className="content-end">&nbsp;{selectedLevel}: {selectedTopic}</span>
        </h1>
      </header>
      <SideNav />
    </div>
  )
}

export default Page