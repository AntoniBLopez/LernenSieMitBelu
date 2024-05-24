import { GetTopicsByLevel } from '../../lib/db/queries'


export const dynamic = 'force-dynamic' // defaults to auto SOLO PARA DATOS DINAMICOS, SI SON ESTATICOS Y NO VAN A CAMBIAR, QUITARLO
export async function GET(request: Request) {
  try {
    const { level, topic } = await request.json()
    const topics = await GetTopicsByLevel(level)
    return Response.json({ users: topics })
  } catch (error: any) {
    return Response.json({ error: error.message, message: 'here in error' })
  }
}