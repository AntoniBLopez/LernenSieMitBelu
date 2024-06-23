import DonutChart from '@/app/(ui)/widgets/DonutChart'
import FinalGameButtons from './FinalGameButtons'
import Image from 'next/image'

function EndGameScreen({ knownCount, learningCount, topicWords, restart, goToChangeTopic }: { knownCount: number, learningCount: number, topicWords: any[], restart: () => void, goToChangeTopic: () => void }) {
  return (
    <section className='flex flex-col gap-4 mobile:gap-10 tablet:gap-4'>
      <h2 className='text-center mobile:text-start text-2xl mobile:text-4xl font-bold'>Gut gemacht! Du hast alle Karten geübt.</h2>
      <div className='flex flex-row max-tablet:items-center gap-10 tablet:mt-10'>
        <div className='flex flex-1 flex-col justify-start gap-10'>
          <div className='flex flex-1 flex-col mobile:flex-row h-fit gap-4 justify-center items-center'>
            <DonutChart value1={knownCount} value2={learningCount} />
            <div className='flex flex-col w-48 mobile:w-[66%] justify-center h-full gap-2'>
              <div className='flex flex-row justify-between bg-green-200 rounded-full py-1 px-4'>
                <span className='flex font-semibold text-green-800'>Gelernt</span>
                <span className='flex font-semibold text-green-800'>{knownCount}</span>
              </div>
              <div className='flex flex-row justify-between bg-slate-200 rounded-full py-1 px-4'>
                <span className='flex font-semibold text-slate-600 whitespace-nowrap'>Zum Lernen</span>
                <span className='flex font-semibold text-slate-600'>{learningCount}</span>
              </div>
            </div>
          </div>
          <FinalGameButtons topicWords={topicWords} actualCardNumber={topicWords.length} restart={restart} goToChangeTopic={goToChangeTopic} bgBlue={true} />
        </div>
        <div className='flex flex-1 h-full max-tablet:hidden'>
          <Image
            src='/icons/confetti.png'
            alt='Confetti icon'
            width={100}
            height={100}
            className='ml-10 laptop:ml-20 [transform:rotateY(180deg)]'
          />
        </div>
      </div>

    </section>
  )
}

export default EndGameScreen