import { Levels } from "@/types"
import axios from "axios"

export const getTopics = async (setData: any, level: string) => {
  axios.get(process.env.NODE_ENV === 'development'
    ? `http://localhost:3000/api/topics?level=${level}`
    : `/api/topics?level=${level}`,
  )
    .then((response) => {
      setData(response.data.response[0].topics)
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

export const getLevels = async () => {
  axios.get(process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/levels'
    : '/api/levels')
    .then((response) => {
      const initialValue = {};
      const reducer = function (accumulator: any, element: any, index: any) {
        return {
          ...accumulator,
          [ element.name ]: element
        }
      }
      const result = response.data.levels.reduce(reducer, initialValue)
      console.log(result, 'result')
      return result
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}