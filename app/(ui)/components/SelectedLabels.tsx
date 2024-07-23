
export default function SelectedLabels({ levelName = '', topicName = '' }: { levelName?: string, topicName?: string }) {

  return (
    <div className='flex flex-row items-center gap-1'>
      {
        levelName
        &&
        <div
          className={`text-sm font-semibold dark:font-bold py-1 px-5 rounded-full cursor-default text-white dark:text-black bg-gradient-to-r from-green-400 to-blue-400`}>
          {
            levelName.length > 0
              ?
              levelName
              :
              'Ladet...'
          }
        </div>
      }
      {
        topicName
        &&
        <div className={`text-sm font-semibold dark:font-bold py-1 px-5 rounded-full cursor-default text-white dark:text-black bg-gradient-to-r from-green-400 to-blue-400`}>
          {
            topicName.length > 0
              ?
              decodeURI(topicName)
              :
              'Ladet...'
          }
        </div>
      }
    </div>
  )
}