'use client'
import SideNav from "./SideNav"
import { PlayCircleIcon } from "@heroicons/react/24/outline"
import SelectedLabels from "@/app/(ui)/components/SelectedLabels"

export default function Page({ params }: { params: { level: string, topic: string } }) {

  return (
    <div className="flex flex-col w-full mt-1 mb-10 gap-5" >
      <header className="flex flex-col gap-10">
        <div className='flex flex-col gap-2 items-start'>
          <SelectedLabels levelName={params.level} topicName={params.topic} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-1 items-center justify-center">
            <PlayCircleIcon className="size-8 mobile:size-10 text-primaryColor" />
            <h2 className='flex text-2xl mobile:text-4xl text-primaryColor font-medium'>
              <span className="content-end whitespace-nowrap">Wähle das Spiel</span>
            </h2>
          </div>
        </div>
      </header>
      <SideNav />
    </div>
  )
}