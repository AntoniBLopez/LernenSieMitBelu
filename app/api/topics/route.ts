import { connectDB } from '@/app/lib/db/connection'
import Levels from '@/app/lib/db/models/levels'
import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic' // defaults to auto SOLO PARA DATOS DINAMICOS, SI SON ESTATICOS Y NO VAN A CAMBIAR, QUITARLO

import { promises as fs } from 'fs';

// export async function GET(request: Request) {
//   try {
//     const url = new URL(request.url);
//     const level = url.searchParams.get('level');
//     console.log(level, 'level')
//     const data: any = await GetTopics(level)
//     return Response.json({ response: data })
//   } catch (error: any) {
//     return Response.json({ error: error.message, message: 'here in error' })
//   }
// }
export async function POST(request: Request) {
  try {
    await connectDB()

    const dbLevelData = await Levels.findOne({ level: "A1" })
    console.log(dbLevelData.topics, 'level.topics')

    console.log(process.cwd(), 'process.cwd()');

    // Leer el archivo JSON
    const file = await fs.readFile(process.cwd() + '/app/api/topics/levels.json', 'utf8');
    console.log(file, 'file')

    // Parsear el contenido del archivo JSON
    const data = JSON.parse(file)

    console.log(data.topics["Zahlen"], 'data.topics["Zahlen"]')
    console.log(data.topics["Länder und Nationalitäten"], 'data.topics["Länder und Nationalitäten"]')

    /* Old data está pimero en Español y luego en Alemán */
    /* New data pimero en Alemán y luego en Español */

    let newArray: any = { "Zahlen": [], "Länder und Nationalitäten": [] }
    Object.keys(data.topics).map((topic: any) => {
      if (topic === "Zahlen") {
        data.topics[topic].map((objWord: any) => {
          newArray[topic].push(
            {
              word: [objWord.word[1], objWord.word[0]],
              known_by_0: '',
              known_by_1: '',
              known_by_2: '',
              known_by_3: '',
              known_by_4: ''
            }
          )
        })
      } else {
        data.topics[topic].map((objWord: any) => {
          newArray[topic].push(
            {
              word: [objWord.word[1], objWord.word[0]],
              known_by_0: '',
              known_by_1: '',
              known_by_2: '',
              known_by_3: '',
              known_by_4: ''
            }
          )
        })
      }
    })

    console.log('newArray', newArray)

    const updatedDocument = await Levels.findOneAndUpdate({ level: "A1" }, { $set: { topics: newArray }, updatedAt: new Date() }, { new: true })

    return NextResponse.json({ message: 'Old topics updated', newTopics: data, updatedTopics: updatedDocument })











    // const { level, topic } = await request.json()
    // const levelHaveTopics = await Levels.findOne({ level })
    // const topicExists = await Levels.findOne({ level, [`topics.${topic}`]: { $exists: true } })
    // let updatedDocument

    // if (!levelHaveTopics.topics && !topicExists) {
    //   // create topics object and add topic
    //   updatedDocument = await Levels.findOneAndUpdate({ level }, { $set: { topics: { [topic]: [] } }, updatedAt: new Date() }, { new: true })
    // } else if (topicExists) {
    //   return NextResponse.json({ message: 'Error: Topic already exists', topic: topic, dbTopics: topicExists.topics })
    // } else {
    //   // add topic to topics object
    //   updatedDocument = await Levels.findOneAndUpdate({ level }, { $set: { [`topics.${topic}`]: [] }, updatedAt: new Date() }, { new: true })
    // }

    // return NextResponse.json({ message: 'Topic created', newTopic: topic, updatedTopics: updatedDocument.topics })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, message: 'Error to post level' })
  }
}
