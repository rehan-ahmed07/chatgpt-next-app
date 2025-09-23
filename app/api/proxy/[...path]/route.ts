import { NextRequest, NextResponse } from 'next/server'

const TARGET_BASE = 'https://travelbook-backend.vercel.app/api/v1'

function filterResponseHeaders(headers: Headers) {
  const res: Record<string, string> = {}
  headers.forEach((value, key) => {
    // skip hop-by-hop headers
    if ([
      'transfer-encoding',
      'connection',
      'keep-alive',
      'proxy-authenticate',
      'proxy-authorization',
      'te',
      'trailers',
      'upgrade'
    ].includes(key.toLowerCase())) return
    res[key] = value
  })
  // Ensure we allow same-origin responses — browser will not block since this is same origin
  res['Access-Control-Allow-Origin'] = '*'
  return res
}

async function proxy(request: NextRequest, params: { path?: string[] }) {
  const path = params.path?.join('/') ?? ''
  const url = `${TARGET_BASE}/${path}${request.nextUrl.search}`

  // Build headers and remove conditional caching headers that can cause upstream
  // 304 Not Modified responses (which often do not include Set-Cookie). Also
  // forcing no-store avoids cached responses for mutating endpoints like logout.
  const forwarded = new Headers(request.headers)
  // Remove conditional/request-cache headers
  forwarded.delete('if-none-match')
  forwarded.delete('if-modified-since')
  forwarded.delete('if-range')
  forwarded.delete('if-match')
  forwarded.delete('if-unmodified-since')

  const init: RequestInit = {
    method: request.method,
    headers: Object.fromEntries(forwarded.entries()),
    // forward body for non-GET/HEAD
    body: ['GET', 'HEAD'].includes(request.method) ? undefined : await request.arrayBuffer(),
    // do not follow redirects automatically
    redirect: 'manual',
    // ensure we bypass caches on the fetch to upstream
    cache: 'no-store',
  }

  const res = await fetch(url, init)

  const headers = filterResponseHeaders(res.headers)

  // Per HTTP spec, responses with status codes 1xx, 204, and 304 must not include a body.
  // Construct NextResponse accordingly to avoid the Response constructor TypeError on 304.
  if (res.status === 204 || res.status === 304 || (res.status >= 100 && res.status < 200)) {
    return new NextResponse(null, { status: res.status, headers })
  }

  const body = await res.arrayBuffer()
  return new NextResponse(body, { status: res.status, headers })
}

export async function GET(request: NextRequest, { params }: { params: { path?: string[] } }) {
  return proxy(request, params)
}

export async function POST(request: NextRequest, { params }: { params: { path?: string[] } }) {
  return proxy(request, params)
}

export async function PUT(request: NextRequest, { params }: { params: { path?: string[] } }) {
  return proxy(request, params)
}

export async function PATCH(request: NextRequest, { params }: { params: { path?: string[] } }) {
  return proxy(request, params)
}

export async function DELETE(request: NextRequest, { params }: { params: { path?: string[] } }) {
  return proxy(request, params)
}

export async function OPTIONS(request: NextRequest, { params }: { params: { path?: string[] } }) {
  // Return basic CORS preflight response for browser preflight
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': request.headers.get('access-control-request-headers') || '*',
  }
  return new NextResponse(null, { status: 204, headers })
}
