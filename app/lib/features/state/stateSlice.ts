'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Levels } from '@/types'

interface InitialState {
  levels: Levels
  activeTab: {
    name: string,
    position: number,
  }
  chosenLevel: string,
  chosenTopic: string,
}

const initialState: InitialState = {
  levels: [],
  activeTab: { // breadcrumb
    name: '',
    position: 0,
  },
  chosenLevel: '',
  chosenTopic: '',
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
    setChosenLevel(state, action: PayloadAction<string>) {
      state.chosenLevel = action.payload
      localStorage.setItem("selectedLevel", action.payload)
    },
    setChosenTopic(state, action: PayloadAction<string>) {
      state.chosenTopic = action.payload
      localStorage.setItem("selectedTopic", action.payload)
    },
    setActiveTab(state, action) {
      state.activeTab.name = action.payload.name
      state.activeTab.position = action.payload.position
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

export const { initializeLevels, setChosenLevel, setChosenTopic, setActiveTab } = stateSlice.actions
export default stateSlice.reducer
