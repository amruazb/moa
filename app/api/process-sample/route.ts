import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { sampleSpcFilled } from '@/lib/sampleData'

export async function POST(request: NextRequest) {
  try {
    const { folder = 'spc_moa' } = await request.json().catch(() => ({ folder: 'spc_moa' }))
    const base = path.join(process.cwd(), 'lib', 'sample_Moa', folder)

    // TODO: Wire real OCR (eng+ara) across the sample pages. For now we just prove the files exist and return prepared data.
    const files = fs.readdirSync(base).filter(f => f.toLowerCase().endsWith('.jpg'))
    if (files.length === 0) {
      return NextResponse.json({ error: 'No sample pages found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, pages: files.length, data: sampleSpcFilled })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
