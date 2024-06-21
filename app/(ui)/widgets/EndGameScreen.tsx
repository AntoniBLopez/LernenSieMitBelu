import DonutChart from '@/app/(ui)/widgets/DonutChart'
import FinalGameButtons from './FinalGameButtons'
import Image from 'next/image'

function EndGameScreen({ knownCount, learningCount, topicWords, restart, goToChangeTopic }: { knownCount: number, learningCount: number, topicWords: any[], restart: () => void, goToChangeTopic: () => void }) {
  return (
    <section className='flex flex-col gap-10'>
      <h2 className='text-4xl font-bold'>Way to go! You&apos;ve reviewed all the cards.</h2>
      <div className='flex flex-row gap-10 mt-10'>
        <div className='flex flex-1 flex-col justify-start gap-10'>
          <div className='flex flex-1 flex-row h-fit gap-2 justify-center items-center'>
            <DonutChart value1={knownCount} value2={learningCount} />
            <div className='flex flex-col w-[66%] justify-center h-full gap-1'>
              <div className='flex flex-row justify-between bg-green-200 border-2 rounded-full py-1 px-4'>
                <span className='flex font-medium text-green-800'>Gelernt</span>
                <span className='flex font-medium text-green-800'>{knownCount}</span>
              </div>
              <div className='flex flex-row justify-between bg-slate-200 border-2 rounded-full py-1 px-4'>
                {/* <span className='flex font-medium text-red-600'>Noch nicht ganz gelernt</span> */}
                <span className='flex font-medium text-slate-600'>Zum Lernen</span>
                <span className='flex font-medium text-slate-600'>{learningCount}</span>
              </div>
              {/* <span className='font-semibold'>
              Zum Lernen: {learningCount}
            </span> */}
            </div>
          </div>
          <FinalGameButtons topicWords={topicWords} actualCardNumber={topicWords.length} restart={restart} goToChangeTopic={goToChangeTopic} bgBlue={true} />
        </div>
        <div className='flex flex-1 h-full'>
          <Image
            src='/icons/confetti.png'
            alt='Confetti icon'
            width={100}
            height={100}
            className='ml-10 [transform:rotateY(180deg)]'
          />
        </div>
      </div>

    </section>
  )
}

export default EndGameScreen