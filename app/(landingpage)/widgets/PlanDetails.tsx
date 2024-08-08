import Image from 'next/image'
import { CheckIcon } from "@heroicons/react/24/outline"


function PlanDetails({ text }: { text: string }) {
  return (
    <ul>
      <CheckIcon
        width={15}
        height={15}
        className='inline-block text-primaryDarkColor'
        strokeWidth={2}
      />
      &nbsp;&nbsp;{text}
    </ul>
  )
}

export default PlanDetails