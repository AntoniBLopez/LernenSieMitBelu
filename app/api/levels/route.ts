import { connectDB } from '@/app/lib/db/connection'
import Levels from '@/app/lib/db/models/levels'
import { NextResponse } from 'next/server'

// import { GetLevels } from '../../lib/db/queries'
// const createError = require('http-errors')
// export const dynamic = 'force-dynamic' // defaults to auto SOLO PARA DATOS DINAMICOS, SI SON ESTATICOS Y NO VAN A CAMBIAR, QUITARLO


export async function GET() {
  try {
    await connectDB()
    console.log('inside api/levels/route.ts GET')
    const levels = await Levels.find()
    console.log('levels: ', levels)

    return NextResponse.json(levels)
  } catch (error: any) {
    return NextResponse.json({ error: error.message, message: 'error getting levels' })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const { level } = await request.json()
    const newLevel = await Levels.create({ level, })
    console.log(newLevel, 'new level')

    return NextResponse.json({ message: 'Level created', newLevel })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, message: 'error creating level' })
  }
}
export async function DELETE(request: any) {
  try {
    await connectDB()
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 })
    }
    /* DANGER: DELETE ALL LEVELS */
    const response = await Levels.deleteMany()
    // const response = await Levels.deleteOne({ _id: id }) // Delete one
    if (response.deletedCount === 0) {
      return NextResponse.json({ message: 'Request succeed but no level was deleted, check the ID' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Level deleted', response, })

  } catch (error: any) {
    return NextResponse.json({ error: error.message, message: 'error deleting level' })
  }
}
