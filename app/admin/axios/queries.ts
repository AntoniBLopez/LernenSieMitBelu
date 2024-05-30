import { Levels } from "@/types"
import axios from "axios"

export const getLevels = async (): Promise<Levels> => {
  try {
    const response = await axios.get(
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api/levels'
        : '/api/levels'
    )

    const initialValue: Levels = {};
    const reducer = (accumulator: Levels, element: any): Levels => {
      return {
        ...accumulator,
        [element.name]: element,
      }
    }

    const result = response.data.levels.reduce(reducer, initialValue)
    console.log(result, 'result')
    return result
  } catch (error) {
    console.log(error, 'error')
    throw error // manage error where getLevels is called
  }
}


// export const getTopics = async (setData: any, level: string) => {
//   axios.get(process.env.NODE_ENV === 'development'
//     ? `http://localhost:3000/api/topics?level=${level}`
//     : `/api/topics?level=${level}`,
//   )
//     .then((response) => {
//       setData(response.data.response[0].topics)
//     })
//     .catch((error) => {
//       console.log(error, 'error')
//     })
// }


export const postWord = async ({ level, topic, spanishWord, germanWord, setSpanishWord, setGermanWord, getLevelsAndDispatchToStore, dispatch }: any) => {
  axios.post(process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/words'
      : '/api/words',
      {
        level,
        topic,
        spanishWord,
        germanWord,
      }
    )
      .then((response) => {
        console.log(response, 'response')
        setSpanishWord('')
        setGermanWord('')
        getLevelsAndDispatchToStore(dispatch)
      })
      .catch((error) => {
        console.log(error, 'error')
        throw error
      })
}