export default function SpanishKeyboardLetter({
  spanishLetter,
  setSpanishLetterAdded,
  setUserWord,
}: {
  spanishLetter: string
  setSpanishLetterAdded: any
  setUserWord: any
}) {
  return (
    <span
      onClick={() => {
        setSpanishLetterAdded(true)
        setUserWord((prev: string) => prev + spanishLetter)
      }}
      className='w-8 pt-1 px-2 text-center border-2 hover:border-blue-300 hover:text-blue-500 dark:hover:text-blue-300 hover:cursor-pointer font-semibold text-lg select-none'
    >
      {spanishLetter}
    </span>
  )
}