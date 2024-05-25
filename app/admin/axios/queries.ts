import axios from "axios"

export const getTopics = async (setData: any, level: string) => {
  axios.get(process.env.NODE_ENV === 'development'
    ? `http://localhost:3000/api/topics?level=${level}`
    : `/api/topics?level=${level}`,
  )
    .then((response) => {
      console.log(response.data.response[0].topics, 'Dentro de response')
      setData(response.data.response[0].topics)
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

export const getLevels = async (setData: any) => {
  axios.get(process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/levels'
    : '/api/levels')
    .then((response) => {
      setData(response.data.levels)
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}