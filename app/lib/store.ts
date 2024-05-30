'use client'

import { configureStore } from '@reduxjs/toolkit'
import levelsReducer from './features/levels/levelsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      levels: levelsReducer
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']