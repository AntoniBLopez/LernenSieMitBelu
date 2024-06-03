import { GetTopics, PostTopic } from '../../lib/db/queries'
export const dynamic = 'force-dynamic' // defaults to auto SOLO PARA DATOS DINAMICOS, SI SON ESTATICOS Y NO VAN A CAMBIAR, QUITARLO

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
    const { level, topic } = await request.json()
    console.log(level, 'level')
    console.log(topic, 'en POST')
    const topics: any = await GetTopics(level)

    if (topics[0].topics === null) {
      topics[0].topics = {
        [topic]: []
      }
    } else {
      topics[0].topics[topic] = []
    }
    console.log(topics[0].topics)
    const data = await PostTopic(level, topics[0].topics)
    return Response.json({ response: data })
  } catch (error: any) {
    return Response.json({ error: error.message, message: 'Error to post level' })
  }
}
