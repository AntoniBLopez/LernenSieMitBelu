import { getLevels } from "@/app/admin/axios/clientQueries"
import { initializeLevels } from "@/app/lib/features/state/stateSlice"


export const getLevelsAndDispatchToStore = async (dispatch: any) => {
  try {
    const levels = await getLevels()
    dispatch(initializeLevels(levels))
  } catch (error) {
    console.error('Failed to fetch and initialize levels:', error)
  }
}