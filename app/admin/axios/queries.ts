import { Levels } from "@/types"
import axios from "axios"

export const getLevels = async (): Promise<Levels> => {
  try {
    const response = await axios.get(
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api/levels'
        : '/api/levels'
    )

    console.log(response.data, 'GET levels query')
    // const initialValue: Levels = {};
    // const reducer = (accumulator: Levels, element: any): Levels => {
    //   return {
    //     ...accumulator,
    //     [element.name]: element,
    //   }
    // }

    // const result = response.data.levels.reduce(reducer, initialValue)
    // console.log(result, 'GET levels query')
    return response.data
  } catch (error) {
    console.log(error, 'error')
    throw error // manage error where getLevels is called
  }
}