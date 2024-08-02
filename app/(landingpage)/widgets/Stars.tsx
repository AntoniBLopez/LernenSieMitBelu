import { FaStar } from "react-icons/fa"

export default function Stars({size = 4}: {size?: number}) {
  return (
    <div className='flex flex-row w-fit text-yellow-400 gap-1'>
      <FaStar className={`self-center w-${size} h-auto`} />
      <FaStar className={`self-center w-${size} h-auto`} />
      <FaStar className={`self-center w-${size} h-auto`} />
      <FaStar className={`self-center w-${size} h-auto`} />
      <FaStar className={`self-center w-${size} h-auto`} />
    </div>
  )
}