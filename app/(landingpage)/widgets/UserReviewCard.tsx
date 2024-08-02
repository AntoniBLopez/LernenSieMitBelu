'use client'
import Image from 'next/image'
import { useState } from 'react'
import Stars from '@/app/(landingpage)/widgets/Stars'

export default function UserReviewCard({name, reviewDate, reviewText}: {name: string, reviewDate: string, reviewText: string}) {

  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className='flex flex-col p-4 w-56 h-fit gap-5 bg-bgColorLight dark:bg-bgColorDark'>
      <div className='flex flex-row gap-5 items-center'>
        <Image src='/photos/defaultProfilePicture.png' width={40} height={40} alt='user review photo' className='rounded-full' />
        <div className='flex flex-col'>
          <h3 className='font-bold text-base'>{name}</h3>
          <span className='text-sm'>{reviewDate}</span>
        </div>
        <Image src='/icons/landingpage/star.png' width={20} height={20} alt='star icon' className='self-center' />
      </div>
      <Stars />
      <div className='flex flex-col gap-1'>
        <p className={`${isExpanded ? 'max-h-full overflow-auto' : 'max-h-[4.5rem] overflow-hidden'}`}>{reviewText}</p>
        <button onClick={toggleExpanded} className='text-blue-500 text-sm self-start'>
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
      </div>
    </div>
  )
}