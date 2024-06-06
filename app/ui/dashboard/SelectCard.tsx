import Link from 'next/link'

function SelectCard({ isChooseLevels=false, topic, terms }: { isChooseLevels?: boolean, topic: string, terms: number }) {

  const handleClick = () => {
    console.log('handleClick')
  }

  return (
    <Link href={isChooseLevels ? '/ui/levels/topics' : '/admin/dev'} onClick={handleClick} className='flex flex-col w-full h-20 bg-white rounded-md drop-shadow-md hover:cursor-pointer group'>
      <div className='flex flex-col w-full h-full px-5 py-2'>
        <section className='flex'>
          <span className='font-medium text-xl'>{topic}</span>
        </section>
        <footer>
          <span>{terms} Terms</span>
        </footer>
      </div>
      {/* <div className='w-full h-1 rounded-full bg-gradient-to-r from-green-400 to-blue-400 opacity-60'></div> */}
      <div className='w-full h-1 rounded-br-full rounded-bl-full bg-gradient-to-r from-green-400 to-blue-400 opacity-0 group-hover:opacity-80 transition-opacity duration-200'></div>
    </Link>
  )
}

export default SelectCard