'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Levels } from '@/types'

interface InitialState {
  levels: Levels
  soundOn: boolean
  activeTab: {
    name: string,
    position: number,
  }
}

const initialState: InitialState = {
  levels: [],
  soundOn: true,
  activeTab: {
    name: '',
    position: 0,
  }
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
    setActiveTab(state, action) {
      state.activeTab.name = action.payload.name
      state.activeTab.position = action.payload.position
    },
    changeSoundStatus(state) {
      state.soundOn = !state.soundOn
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

export const { initializeLevels, setActiveTab, changeSoundStatus } = stateSlice.actions
export default stateSlice.reducer
