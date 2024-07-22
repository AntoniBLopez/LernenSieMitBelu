import ThemeMode from '@/app/utils/ThemeMode'

export default function Header() {
  return (
    <div className='flex my-6 mx-8 laptop:mx-auto laptop:max-w-desktop justify-end'>
      <ThemeMode />
    </div>
  )
}