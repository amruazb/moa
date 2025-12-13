import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Simulate document processing
    const extractedData = await processDocument(file, type)

    return NextResponse.json({ success: true, data: extractedData })
  } catch (error) {
    console.error('Document processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process document' },
      { status: 500 }
    )
  }
}

async function processDocument(file: File, type: string) {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  switch (type) {
    case 'oldMoa':
      return {
        oldMoa: {
          notarizationNumber: 'NOT-2024-' + Math.floor(Math.random() * 10000),
          notarizationDate: '2024-01-15',
          originalShares: {
            firstParty: 49,
            secondParty: 51
          }
        }
      }
    case 'tradeLicense':
      return {
        company: {
          name: 'ABC Trading LLC',
          newName: 'ABC Trading SPC',
          licenseNumber: 'TL-2024-' + Math.floor(Math.random() * 100000),
          moaDate: new Date().toISOString().split('T')[0]
        }
      }
    case 'firstPartyEid':
    case 'secondPartyEid':
      return {
        [type]: {
          name: type === 'firstPartyEid' ? 'Ahmed Al Mansouri' : 'Mohammed Al Rashidi',
          eidNumber: '784-' + (1970 + Math.floor(Math.random() * 30)) + '-' + 
                     Math.floor(Math.random() * 10000000) + '-' + 
                     Math.floor(Math.random() * 10),
          dob: type === 'firstPartyEid' ? '1985-06-15' : '1990-03-22',
          nationality: 'UAE'
        }
      }
    default:
      return {}
  }
}




