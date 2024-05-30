import { GetLevels } from '../../lib/db/queries'
// const createError = require('http-errors')
export const dynamic = 'force-dynamic' // defaults to auto SOLO PARA DATOS DINAMICOS, SI SON ESTATICOS Y NO VAN A CAMBIAR, QUITARLO


export async function GET() {
  try {
    const data = await GetLevels()
    return Response.json({ levels: data })
  } catch (error: any) {
    return Response.json({ error: error.message, message: 'here in error' })
  }
  // createError.NotFound()
}
