import React from 'react'

function GameButton({ name, Icon, isLastCard, changeTopicButton = false, goToChangeTopic = undefined, nextCard = undefined, restart = undefined }: { name: string, Icon: any, isLastCard: boolean, changeTopicButton?: boolean, goToChangeTopic?: () => void, nextCard?: () => void, restart?: () => void }) {
  return (
    <button
      className={`
            flex
            flex-row
            gap-2
            items-center
            ${isLastCard || changeTopicButton ? 'self-start place-content-start w-48 ml-3' : 'self-center place-content-center w-[50%] m-0'}
            font-semibold
            text-white
            hover:cursor-pointer
            ${restart !== undefined ? 'bg-primaryColor hover:bg-primaryDarkColor' : 'bg-primaryColor hover:bg-primaryDarkColor'}
            ${changeTopicButton ? 'bg-blue-500 hover:bg-blue-600' : 'bg-primaryColor hover:bg-primaryDarkColor'}
            rounded-md
            py-2
            px-4
            slide-in
            `}
      onClick={isLastCard ? changeTopicButton ? goToChangeTopic : restart : nextCard}
    >
      <Icon className='w-4 h-4' />
      <div>{name}</div>
    </button>
  )
}

export default GameButton