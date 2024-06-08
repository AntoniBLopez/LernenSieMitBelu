import Link from 'next/link'

function SelectCard({ isChooseLevels = false, name, length }: { isChooseLevels?: boolean, name: string, length: number }) {

  const handleClick = () => {
    console.log('handleClick')
    if (isChooseLevels) {
      localStorage.setItem("selectedLevel", name);
    } else {
      localStorage.setItem("selectedTopic", name);
    }
  }

  return (
    <Link
      href={isChooseLevels ? '/ui/levels/topics' : '/games'}
      onClick={handleClick}
      className='flex flex-col w-full h-fit bg-white rounded-md drop-shadow-md hover:cursor-pointer group'
    >
      <div className='flex flex-col w-full h-fit px-5 py-2'>
        <main>
          <span className='font-medium text-xl'>{name}</span>
        </main>
        <footer>
          <span className='text-sm'>{`${length} ${isChooseLevels ? 'Topics' : 'Words'}`}</span>
        </footer>
      </div>
      {/* <div className='w-full h-1 rounded-full bg-gradient-to-r from-green-400 to-blue-400 opacity-60'></div> */}
      <div className='w-full h-1 rounded-br-full rounded-bl-full bg-gradient-to-r from-green-400 to-blue-400 opacity-0 group-hover:opacity-80 transition-opacity duration-200'></div>
    </Link>
  )
}

export default SelectCard