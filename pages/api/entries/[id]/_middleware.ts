import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export function middleware (req: NextRequest, ev: NextFetchEvent) {
  const id = req.page.params?.id || ''

  const checkMongoIdRegExp = /^[\da-fA-F]{24}$/

  if (!checkMongoIdRegExp.test(<string>id)) {
    return new Response(JSON.stringify({ message: 'id not valid:' + id }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return NextResponse.next()
}
