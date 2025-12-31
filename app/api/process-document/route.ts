import { NextRequest, NextResponse } from 'next/server'
import { processDocument } from '@/lib/documentProcessor'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = (formData.get('type') as string) || 'moa'

    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    const result = await processDocument(file, type as any)
    return NextResponse.json({ success: true, data: result })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
