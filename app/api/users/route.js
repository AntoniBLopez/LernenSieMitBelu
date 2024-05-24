import { GetUsers } from '@/server/db/queries'
// const createError = require('http-errors')


export const dynamic = 'force-dynamic' // defaults to auto
export async function GET() {
  // createError.NotFound()
  const data = await GetUsers()
  return Response.json({ users: data })
}
