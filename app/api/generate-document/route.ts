import { NextRequest, NextResponse } from 'next/server'
import { generateMOAHTML } from '@/lib/moaGenerator'

export async function POST(request: NextRequest) {
  try {
    const { data, format } = await request.json()
    if (format === 'pdf') {
      // TODO: puppeteer-core route to render HTML → PDF
      return NextResponse.json({ error: 'PDF generation not yet implemented' }, { status: 501 })
    }
    // Default: return HTML
    const html = generateMOAHTML(data)
    return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
