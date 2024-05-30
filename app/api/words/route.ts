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
    const { level, topic, spanishWord, germanWord } = await request.json()
    const topics: any = await GetTopics(level)
    topics[0].topics[topic].push(
      {
        word: [spanishWord, germanWord],
        known_by_0: [],
        known_by_1: [],
        known_by_2: [],
      }
    )
    const data = await PostTopic(level, topics[0].topics)
    return Response.json({ response: data })
  } catch (error: any) {
    return Response.json({ error: error.message, message: 'Error to post level' })
  }
}
