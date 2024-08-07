'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Levels } from '@/types'

interface InitialState {
  levels: Levels
}

const initialState: InitialState = {
  levels: [],
}

const stateSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    /* LEVELS */
    initializeLevels(state, action: PayloadAction<Levels>) {
      state.levels = action.payload
    },
    setLevels(state, action: PayloadAction<Levels>) {
      state.levels = action.payload
    },
    // addLevel(state, action: PayloadAction<Level>) {
    //   state.levels[action.payload.name] = action.payload
    // },
    // removeLevel(state, action: PayloadAction<string>) {
    //   delete state.levels[action.payload]
    // },
    // updateLevel(state, action: PayloadAction<Level>) {
    //   const { name, ...updatedData } = action.payload
    //   if (state.levels[name]) {
    //     state.levels[name] = { ...state.levels[name], ...updatedData }
    //   }
    // },
  },
})

export const { initializeLevels } = stateSlice.actions
export default stateSlice.reducer
