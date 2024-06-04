import { connectDB } from '@/app/lib/db/connection'
import Levels from '@/app/lib/db/models/levels'
import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic' // defaults to auto SOLO PARA DATOS DINAMICOS, SI SON ESTATICOS Y NO VAN A CAMBIAR, QUITARLO

export async function POST(request: Request) {
  try {
    await connectDB()
    const { level, topic, germanWord, spanishWord } = await request.json()
    const levelData = await Levels.findOne({ level })

    if (levelData.topics[topic].find((word: any) => word.word[0] === germanWord)) {
      return NextResponse.json({ message: 'Word already exists', error: 'Word already exists' })
    }

    levelData.topics[topic].push(
      {
        word: [germanWord, spanishWord],
        known_by_0: [],
        known_by_1: [],
        known_by_2: [],
        known_by_3: [],
        known_by_4: [],
      }
    )

    console.log(levelData.topics, 'levelData.topics')
    const wordsUpdated = await Levels.updateOne({ level }, { $set: { [`topics.${topic}`]: levelData.topics[topic] } })
    return NextResponse.json({ message: 'Words updated successfully', newWords: wordsUpdated })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, message: 'Error to post level' })
  }
}
