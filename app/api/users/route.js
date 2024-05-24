import { GetUsers } from '../../../server/db/queries'
// const createError = require('http-errors')


export const dynamic = 'force-dynamic' // defaults to auto SOLO PARA DATOS DINAMICOS, SI SON ESTATICOS Y NO VAN A CAMBIAR, QUITARLO
export async function GET() {
  // createError.NotFound()
  const data = await GetUsers()
  return Response.json({ users: data })
}
