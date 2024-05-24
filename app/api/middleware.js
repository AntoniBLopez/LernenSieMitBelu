import { NextResponse } from 'next/server'

export function middleware(req) {
  /* Peticiones de administrador */
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // lógica para admin
    return NextResponse.next()
  }

  /* Peticiones al server components */
  if (req.nextUrl.pathname.startsWith('/api')) {
    // lógica para api
    return NextResponse.next()
  }

  /* Peticiones al dashboard */
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    // lógica para dashboard (log in por ejemplo)
    return NextResponse.next()
  }
  // Aquí puedes agregar lógica de manejo de errores personalizada para rutas no existentes
  return NextResponse.next()
}