'use client'
import { Dropdown } from 'flowbite-react'
import { useEffect } from 'react'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'

export default function ThemeMode() {
  const pathName = usePathname()
  const { theme, systemTheme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {
    console.log('pathName', pathName)
  }, [pathName])

  return (
    <Dropdown
      label={currentTheme === 'dark' ? <MdOutlineDarkMode className="rounded-lg hover:cursor-pointer w-6 h-6" /> : <MdOutlineLightMode className="rounded-lg hover:cursor-pointer w-5 h-5" />}
      className={`w-24 h-fit p-0 drop-shadow-md rounded-lg bg-white dark:bg-bgColorCardDark dark:border-2 dark:border-gray-800 ${pathName === '/' ? 'dark:bg-bgColorCardDark dark:border-slate-500' : ''}`}
      arrowIcon={false}
      dismissOnClick={true}
      inline
    >
      <Dropdown.Item onClick={() => setTheme('light')} className={`gap-2 pb-3 font-semibold dark:hover:bg-selectedColorDark`}>
        Light
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setTheme('dark')} className={`gap-2 pb-3 font-semibold dark:hover:bg-selectedColorDark`}>
        Dark
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setTheme('system')} className={`gap-2 pb-3 font-semibold dark:hover:bg-selectedColorDark`}>
        System
      </Dropdown.Item>
    </Dropdown>
  )
}