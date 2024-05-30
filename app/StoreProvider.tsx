'use client'

import { useEffect, useRef, useState } from "react";
import { Provider } from 'react-redux'
import { getLevels } from "./admin/axios/queries";
import { AppStore, makeStore } from "./lib/store";
import { initializeLevels } from "./lib/features/levels/levelsSlice";
import { Levels } from "@/types";

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLevelsAndInitialize() {
      try {
        const levelsData: Levels | any = await getLevels()
        console.log('levelsData', levelsData)
        storeRef.current = makeStore()
        storeRef.current.dispatch(initializeLevels(levelsData))
      } catch (error) {
        console.error('Error fetching levels:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (!storeRef.current) {
      fetchLevelsAndInitialize()
    }
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Provider store={storeRef.current}>
      {children}
    </Provider>
  )
}
