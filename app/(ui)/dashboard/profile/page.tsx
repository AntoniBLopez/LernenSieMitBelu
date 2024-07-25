'use client'
import { useEffect, useRef, useState } from 'react'
import { RootState } from '@/app/lib/store'
import Modal from '@/app/(ui)/dashboard/profile/widgets/Modal'
import ImageCropper from '@/app/(ui)/dashboard/profile/widgets/ImageCropper'
import { getLevelsAndDispatchToStore } from '@/app/lib/features/state/utils'
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks"
import Image from 'next/image'
import { LuCamera } from "react-icons/lu";
import { CldImage, CldUploadButton } from 'next-cloudinary'

export default function Page() {
  const levelsStore = useAppSelector((state: RootState) => state.store.levels)
  const dispatch = useAppDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userData, setUserData] = useState({
    username: 'John Doe',
    email: 'johndoe@gmail.com',
    password: '12345678'
  })

  const avatarUrl = useRef(
    "/photos/defaultProfilePicture.png"
  )

  const updateAvatar = (imgSrc: any) => {
    avatarUrl.current = imgSrc;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  useEffect(() => {
    if (levelsStore.length === 0) {
      getLevelsAndDispatchToStore(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

  useEffect(() => {
    if (avatarUrl.current !== '/photos/defaultProfilePicture.png') {
      /* GESTIONAR EL AVATAR QUE EL USUARIO HA CAMBIADO */
      console.log('avatar changed: ', avatarUrl.current)
    }
  }, [avatarUrl.current])


  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-full p-5 rounded-xl bg-white dark:bg-bgColorCardDark transition-all duration-500'>
      <h1 className='text-5xl w-fit font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#55aeb8] to-[#2cd5a2]'>Profile</h1>
      <section className='flex flex-col-reverse mobile:flex-row w-full mt-6 mobile:mt-10 justify-between'>
        <div className='flex flex-col w-full gap-8 ml-2'>
          <div className='flex flex-col'>
            <span className='font-semibold text-sm text-profileGrayColor'>USER NAME</span>
            <input
              value={userData.username}
              type="text"
              name="username"
              id="username"
              disabled={true}
              style={{ width: `${userData.username.length * 9}px` }}
              className={`
                bg-white
                dark:bg-bgColorCardDark
                border-b-2
                border-[#b4b4b4]
                focus:outline-none
              `}
            />
          </div>
          <div className='flex flex-col'>
            <span className='font-semibold text-sm text-profileGrayColor'>E-MAIL</span>
            <input
              value={userData.email}
              type="email"
              name="userEmail"
              id="userEmail"
              disabled={true}
              style={{ width: `${userData.email.length * 9}px` }}
              className={`
                bg-white
                dark:bg-bgColorCardDark
                border-b-2
                border-[#b4b4b4]
                focus:outline-none
              `}
            />
          </div>
          <div className='flex flex-col'>
            <span className='font-semibold text-sm text-profileGrayColor'>PASSWORD</span>
            <input
              value={userData.password}
              type="password"
              name="userPassword"
              id="userPassword"
              disabled={true}
              style={{ width: `${userData.password.length * 8}px` }}
              className={`
                bg-white
                dark:bg-bgColorCardDark
                border-b-2
                border-[#b4b4b4]
                focus:outline-none
                text-3xl
              `}
            />
          </div>
        </div>
        <div className='flex flex-col w-full items-center max-tablet:justify-center'>
          <Image
            src={avatarUrl.current}
            alt="Logo"
            width={160}
            height={160}
            loading='lazy'
            className='w-28 h-28 tablet:w-40 tablet:h-40 rounded-full'
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className='
            relative
            bottom-8
            left-7
            p-1
            mobile:bottom-11
            mobile:left-12
            mobile:p-2
            rounded-full
            drop-shadow-lg
            cursor-pointer
            bg-white
            hover:bg-gray-200
            border-2
            border-white
            dark:border-gray-700
            dark:bg-gray-700
            dark:hover:bg-bgColorDark
          '>
            <LuCamera className='w-6 h-6 text-black dark:text-white' />
          </button>
          {/* <CldImage
            // src={profile.picture.publicId}
            src="cld-sample-5" // Use this sample image or upload your own via the Media Explorer
            alt='alt'
            width="500" // Transform the image: auto-crop to square aspect_ratio
            height="500"
            crop={{
              type: 'auto',
              source: true
            }}
          /> */}
          {/* <CldUploadButton uploadPreset='<upload_preset>' /> */}
        </div>
      </section>
      <button
        className='
          w-fit
          self-end
          py-3
          px-10
          mt-6
          rounded-xl
          text-lg
          font-bold
          bg-gradient-to-r
          from-[#55aeb8]
          to-[#2cd5a2]
          text-white
          hover:from-[#62c2cd]
          hover:to-[#2bcb9b]
          hover:shadow-md
        '>
        Save
      </button>
      {
        isModalOpen &&
        <Modal updateAvatar={updateAvatar} closeModal={() => setIsModalOpen(false)} />
      }
    </form>
  )
}
