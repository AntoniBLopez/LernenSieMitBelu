import { Levels } from "@/types"
import axios from "axios"

export const getLevels = async (): Promise<Levels> => {
  try {
    const response = await axios.get(
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api/levels'
        : '/api/levels'
    )

    return response.data
  } catch (error) {
    console.log(error, 'error')
    throw error // manage error where getLevels is called
  }
}