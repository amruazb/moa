import { DocumentData } from '@/store/documentStore'
import Tesseract from 'tesseract.js'

export async function processDocument(
  file: File,
  type: 'companyLicense' | 'partyDocument',
  partyIndex?: number
): Promise<Partial<DocumentData>> {

  console.log(`Processing ${type} for party ${partyIndex}...`)

  try {
    // 1. Extract text using OCR
    const text = await extractTextFromImage(file)
    console.log('Extracted text:', text)

    // 2. Parse text based on document type
    if (type === 'companyLicense') {
      return parseTradeLicense(text)
    } else if (type === 'partyDocument') {
      return parsePartyDocument(text, partyIndex)
    }

    return {}
  } catch (error) {
    console.error('OCR Processing Error:', error)
    throw new Error('Failed to process document')
  }
}

async function extractTextFromImage(file: File): Promise<string> {
  const { data: { text } } = await Tesseract.recognize(
    file,
    'eng+ara', // English and Arabic
    { logger: m => console.log(m) }
  )
  return text
}

function parseTradeLicense(text: string): Partial<DocumentData> {
  // Normalize text
  const cleanText = text.replace(/\s+/g, ' ').trim()

  // Extract License Number (matches generic formats like CN-123456 or 123456)
  const licenseMatch = cleanText.match(/(?:License No|Lic No|License Number)[:\s]*([CN\-\d]+)/i)
  const licenseNumber = licenseMatch ? licenseMatch[1] : ''

  // Extract Company Name (This is tricky, looking for common prefixes)
  // Heuristic: specific patterns or assume it's one of the first lines if English
  // For now, looking for "Trade Name" or "Company Name"
  const nameMatch = cleanText.match(/(?:Trade Name|Company Name|English Name)[:\s]*([A-Za-z0-9\s\.]+)/i)
  const name = nameMatch ? nameMatch[1].trim() : ''

  return {
    company: {
      name: name,
      newName: '', // User must fill
      licenseNumber: licenseNumber,
      moaDate: new Date().toISOString().split('T')[0]
    }
  }
}

function parsePartyDocument(text: string, partyIndex: number = 0): Partial<DocumentData> {
  const cleanText = text.replace(/\s+/g, ' ').trim()

  // Extract EID (784-XXXX-XXXXXXX-X)
  const eidMatch = cleanText.match(/784-?\d{4}-?\d{7}-?\d{1}/)
  const eidNumber = eidMatch ? eidMatch[0] : ''

  // Extract Name
  // Heuristic: Look for "Name" line
  const nameMatch = cleanText.match(/(?:Name|Full Name)[:\s]*([A-Za-z\s]+)/i)
  let name = nameMatch ? nameMatch[1].trim() : ''

  // Extract DOB (DD/MM/YYYY or YYYY/MM/DD)
  const dobMatch = cleanText.match(/(\d{2}[\/-]\d{2}[\/-]\d{4})|(\d{4}[\/-]\d{2}[\/-]\d{2})/)
  const dob = dobMatch ? dobMatch[0] : ''

  // Extract Nationality
  const nationalityMatch = cleanText.match(/(?:Nationality)[:\s]*([A-Za-z\s]+)/i)
  const nationality = nationalityMatch ? nationalityMatch[1].trim() : ''

  // Construct party data object
  const partyData = {
    name,
    eidNumber,
    dob,
    nationality
  }

  // Determine if it's source or destination based on some logic or pass it down?
  // Current requirement implies we upload for specific party. 
  // Since we don't know if it's source/dest from just 'partyDocument', 
  // we might need to return a generic object that the UI maps to the correct party.
  // However, the interface requires Partial<DocumentData>.
  // We'll return a special object that the store/component needs to handle,
  // OR we assume this function returns the raw extracted data and the COMPONENT updates the specific party.

  // Actually, to fit Partial<DocumentData>, we'd need to know if it's source or destination.
  // BUT, processDocument is called by the UI.
  // Let's modify the signature to return just the PartyData and let the UI handle the store update.
  // But strictly adhering to the interface:

  // For now, let's return a "raw" object that we can cast. 
  // But wait, the previous implementation returned { firstParty: ... }.
  // The new UI will call this for a SPECIFIC party index.
  // So returning { normalizedPartyData: ... } would be better.

  return {
    // We return a non-standard key that the UI will look for, 
    // or we change the return type. 
    // Let's cast it to any for internal passing to UI
    ['partyData' as any]: partyData
  }
}
