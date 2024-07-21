'use client'
import { setActiveTab } from '@/app/lib/features/state/stateSlice'
import { getLevelsAndDispatchToStore } from '@/app/lib/features/state/utils'
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks"
import { RootState } from '@/app/lib/store'
import Image from 'next/image'
import { useEffect } from 'react'
import { CldImage, CldUploadButton } from 'next-cloudinary'

export default function Page() {

  const levelsStore = useAppSelector((state: RootState) => state.store.levels)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setActiveTab({ name: 'Profile', position: 0 }))
    if (levelsStore.length === 0) {
      getLevelsAndDispatchToStore(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className='w-full rounded-xl p-5 bg-white'>
      <h1 className='text-5xl w-fit font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#55aeb8] to-[#2cd5a2] text-primaryDarkColor'>Profile</h1>
      <div className='flex flex-row justify-between w-full'>
        <div className='flex flex-col w-full'>
          <span className='font-semibold ml-2'>Username</span>
          <span className='font-semibold ml-2'>Email</span>
          <span className='font-semibold ml-2'>Password</span>
        </div>
        <div className='flex flex-col w-full items-center mt-14'>
          <Image src="/photos/defaultProfilePicture.png" alt="Logo" width={160} height={160} loading='lazy' />
          <CldImage
            src="cld-sample-5" // Use this sample image or upload your own via the Media Explorer
            alt='alt'
            width="500" // Transform the image: auto-crop to square aspect_ratio
            height="500"
            crop={{
              type: 'auto',
              source: true
            }}
          />
          {/* <CldUploadButton uploadPreset='<upload_preset>' /> */}
        </div>
      </div>
    </section>
  )
}
