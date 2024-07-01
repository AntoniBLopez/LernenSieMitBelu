import Image from 'next/image'

function PlanDetails({text}: {text: string}) {
  return (
    <ul className='whitespace-nowrap'>
      <Image
        src="/icons/landingpage/check.png"
        width={15}
        height={15}
        alt="Check icon"
        className='inline-block'
      />
      &nbsp;&nbsp;{text}
    </ul>
  )
}

export default PlanDetails