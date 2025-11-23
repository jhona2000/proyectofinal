import { NextResponse } from 'next/server'

export async function GET() {
  const target = 'https://identitytoolkit.googleapis.com'
  const start = Date.now()
  try {
    const res = await fetch(target, { method: 'GET' })
    const duration = Date.now() - start
    return NextResponse.json({
      ok: true,
      url: target,
      status: res.status,
      statusText: res.statusText,
      durationMs: duration
    })
  } catch (err: any) {
    const duration = Date.now() - start
    return NextResponse.json({
      ok: false,
      url: target,
      error: String(err?.message || err),
      durationMs: duration
    }, { status: 502 })
  }
}
