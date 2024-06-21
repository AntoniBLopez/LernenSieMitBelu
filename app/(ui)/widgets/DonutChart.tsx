'use client'
import { CSSPropertiesWithVariables } from '@/types';
import Image from 'next/image';

function DonutChart({ value1, value2 }: { value1: number, value2: number }) {

  const total = value1 + value2;
  const percentage = (value1 / total) * 100;

  const style: CSSPropertiesWithVariables = {
    '--percentage': percentage,
    '--color1': '#4cd98c',
    '--color2': '#dbdbdb',
    background: `conic-gradient(
      var(--color1) calc(var(--percentage) * 1%),
      var(--color2) calc(var(--percentage) * 1%)
    )`,
  }
  return (
    <div className='relative w-20 h-20 mobile:w-24 mobile:h-24'>
      <div
        className='w-full h-full rounded-full bg-[conic-gradient(var(--color1) calc(var(--percentage) * 1%), var(--color2) calc(var(--percentage) * 1%))]'
        style={style}
      />
      <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
        <div className='w-16 h-16 bg-bgColor rounded-full' />
      </div>
      <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
        <span className='text-xl font-medium text-grayColor'>
          {
            percentage === 100
              ?
              <Image src='/icons/correct.png' width={40} height={40} alt='Checkmark' />
              :
              `${Math.round(percentage)}%`
          }
        </span>
      </div>
    </div>
  )
}

export default DonutChart