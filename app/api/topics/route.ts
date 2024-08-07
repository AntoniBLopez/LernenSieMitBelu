import { connectDB } from '@/app/lib/db/connection'
import Levels from '@/app/lib/db/models/levels'
import { NextResponse } from 'next/server'
// export const dynamic = 'force-dynamic' // defaults to auto SOLO PARA DATOS DINAMICOS, SI SON ESTATICOS Y NO VAN A CAMBIAR, QUITARLO

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

    const { level, topics }: { level: string, topics: string } = await request.json()
    const levelHaveTopics = await Levels.findOne({ level })

    const topicsList = topics.split("\n")
    let updatedDocument

    for (const topic of topicsList) {
      const topicExists = await Levels.findOne({ level, [`topics.${topic}`]: { $exists: true } })
      if (!levelHaveTopics.topics && !topicExists) {
        // create topics object and add topic
        updatedDocument = await Levels.findOneAndUpdate({ level }, { $set: { topics: { [topic]: [] } }, updatedAt: new Date() }, { new: true })
      } else if (topicExists) {
        return NextResponse.json(
          { message: `Error: Topic already exists`, topic: topic, dbTopics: topicExists.topics },
          { status: 400 }
        )
      } else {
        // add topic to topics object
        updatedDocument = await Levels.findOneAndUpdate({ level }, { $set: { [`topics.${topic}`]: [] }, updatedAt: new Date() }, { new: true })
      }
    }

    return NextResponse.json({ message: 'Topic created', newTopics: topicsList, updatedTopics: updatedDocument?.topics })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, message: 'Error to post level' })
  }
}
