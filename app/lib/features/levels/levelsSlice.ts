'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Levels, Level } from '@/types'

interface InitialState {
  data: Levels
}

const initialState: InitialState = {
  data: {},
}

const levelsSlice = createSlice({
  name: 'levels',
  initialState,
  reducers: {
    initializeLevels(state, action: PayloadAction<Levels>) {
      state.data = action.payload
    },
    addLevel(state, action: PayloadAction<Level>) {
      state.data[action.payload.name] = action.payload
    },
    removeLevel(state, action: PayloadAction<string>) {
      delete state.data[action.payload]
    },
    updateLevel(state, action: PayloadAction<Level>) {
      const { name, ...updatedData } = action.payload
      if (state.data[name]) {
        state.data[name] = { ...state.data[name], ...updatedData }
      }
    },
  },
})

export const { initializeLevels, addLevel, removeLevel, updateLevel } = levelsSlice.actions
export default levelsSlice.reducer
