import React from 'react'
import UserReviewCard from '@/app/(landingpage)/widgets/UserReviewCard'
import Stars from '@/app/(landingpage)/widgets/Stars'
import Link from 'next/link'
import { IoIosArrowBack } from "react-icons/io"
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";

export default function UserReviews() {

  const reviews = [
    { name: 'Sabine', reviewDate: '22 July 2024', reviewText: 'Am besten fand ich die Teile zum ankreuzen und das es am Ende dann die Fehlerquote anzeigt. Das hat mich motiviert, dass ich es wiederholt habe bis es keine Fehler mehr angezeigt  hat. Ich fand auch die verschiedenen Themen zu Wiederholung mit den Zahlen gut. Dann sind diese wieder etwas ins Kurzzeitgedächtnis zurück gekommen 🫣 Es hat mir echt Spaß gemacht ☺' },
    { name: '', reviewDate: '', reviewText: '' },
    { name: '', reviewDate: '', reviewText: '' },
    { name: '', reviewDate: '', reviewText: '' },
    { name: '', reviewDate: '', reviewText: '' },
    { name: '', reviewDate: '', reviewText: '' },
    { name: '', reviewDate: '', reviewText: '' },
  ]

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex flex-col mt-16 items-center gap-1'>
        <h3 className='font-bold text-2xl'>Excellent</h3>
        <Stars size={8} />
        <p>Based on <Link href={'https://www.trustindex.io/reviews/spanischmitbelu.com'} target='_blank' className='underline font-bold hover:text-primaryColor'>5 reviews</Link></p>
      </div>
      <div className='flex flex-row gap-2'>

        <IoIosArrowBack className='w-16 h-16 mt-[6.5rem] cursor-pointer text-primaryColor hover:text-primaryDarkColor' />
        <section className='flex flex-row gap-10 overflow-x-hidden'>
          {
            reviews.map((review, index) => (
              <UserReviewCard key={index} name={review.name} reviewDate={review.reviewDate} reviewText={review.reviewText} />
            ))
          }
        </section>
          </div>
    </div>
  )
}