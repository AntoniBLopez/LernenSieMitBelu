import { connectDB } from '@/app/lib/db/connection'
import Levels from '@/app/lib/db/models/levels'
import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic' // defaults to auto SOLO PARA DATOS DINAMICOS, SI SON ESTATICOS Y NO VAN A CAMBIAR, QUITARLO

export async function POST(request: Request) {
  try {
    await connectDB()
    const { level, topic, wordsList } = await request.json()
    const levelData = await Levels.findOne({ level })

    const lines = wordsList.split("\n")

    lines.forEach((line: any) => {
      const oneLineWords = line.trim().split(/\t+/)
      // console.log(oneLineWords, 'oneLineWords')

      if (levelData.topics[topic].find((word: any) => word.word[0] === oneLineWords[1])) { // oneLineWords[1] = German Word
        return NextResponse.json({ message: 'Word already exists', error: 'Word already exists' })
      }

      levelData.topics[topic].push(
        {
          word: [oneLineWords[1], oneLineWords[0]],
          known_by_0: [],
          known_by_1: [],
          known_by_2: [],
          known_by_3: [],
          known_by_4: [],
        }
      )
    })

    const wordsUpdated = await Levels.updateOne({ level }, { $set: { [`topics.${topic}`]: levelData.topics[topic] } })
    return NextResponse.json({ message: 'Words updated successfully', newWords: wordsUpdated })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, message: 'Error to post level' })
  }
}
