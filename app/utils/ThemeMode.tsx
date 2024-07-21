'use client'
import { Dropdown } from 'flowbite-react'
import React from 'react'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { useTheme } from 'next-themes'

export default function ThemeMode() {

  const { theme, systemTheme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <Dropdown
      label={currentTheme === 'light' ? <MdOutlineLightMode className="rounded-lg hover:cursor-pointer z-50 w-5 h-5" /> : <MdOutlineDarkMode className="rounded-lg hover:cursor-pointer z-50 w-6 h-6" />}
      className='w-24 h-fit p-0 drop-shadow-md rounded-lg border-none bg-white dark:bg-bgColorDark'
      arrowIcon={false}
      dismissOnClick={false}
      inline
    >
      <Dropdown.Item onClick={() => setTheme('light')} className="gap-2 pb-3 font-semibold hover:bg-white dark:hover:bg-bgColorCardDark hover:cursor-pointer">
        Light
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setTheme('dark')} className="gap-2 pb-3 font-semibold hover:bg-white dark:hover:bg-bgColorCardDark hover:cursor-pointer">
        Dark
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setTheme('system')} className="gap-2 pb-3 font-semibold hover:bg-white dark:hover:bg-bgColorCardDark hover:cursor-pointer">
        System
      </Dropdown.Item>
    </Dropdown>
  )
}