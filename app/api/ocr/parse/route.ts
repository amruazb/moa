import { NextRequest, NextResponse } from 'next/server'
import { DocumentType, OCRResult } from '@/lib/ocr/types'

export async function POST(request: NextRequest) {
  try {
    const { englishText, arabicText, documentType } = await request.json()

    if (!documentType || !englishText) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // For now, return the raw text - we'll need to import extractors properly
    // or move them to a shared location
    const result: OCRResult = {
      success: true,
      documentType: documentType as DocumentType,
      confidence: 0.5,
      data: null,
      rawText: (englishText + '\n' + arabicText).substring(0, 1000)
    }

    return NextResponse.json(result)

  } catch (error) {
    console.error('Parse Error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Parsing failed' },
      { status: 500 }
    )
  }
}
