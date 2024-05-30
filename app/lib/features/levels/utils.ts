import { getLevels } from "@/app/admin/axios/queries"
import { initializeLevels } from "./levelsSlice"


export const getLevelsAndDispatchToStore = async (dispatch: any) => {
  try {
    const levels = await getLevels()
    dispatch(initializeLevels(levels))
  } catch (error) {
    console.error('Failed to fetch and initialize levels:', error)
  }
}