import Tesseract from 'tesseract.js'

export interface ParsedResult {
  company?: {
    name?: string
    nameAr?: string
    newName?: string
    newNameAr?: string
    licenseNumber?: string
    moaDate?: string
    activities?: string
    activitiesAr?: string
    address?: string
    addressAr?: string
    emirate?: string
    emirateAr?: string
    notarizationNumber?: string
    notarizationDate?: string
    registrationDate?: string
  }
  sourceParties?: Array<{
    name?: string
    nameAr?: string
    nationality?: string
    nationalityAr?: string
    eidNumber?: string
    passportNumber?: string
    dob?: string
    address?: string
    addressAr?: string
    capacity?: string
    capacityAr?: string
    documentType?: 'eid' | 'passport'
    expiryDate?: string
  }>
  destinationParties?: Array<{
    name?: string
    nameAr?: string
    nationality?: string
    nationalityAr?: string
    eidNumber?: string
    passportNumber?: string
    dob?: string
    address?: string
    addressAr?: string
    capacity?: string
    capacityAr?: string
    documentType?: 'eid' | 'passport'
    expiryDate?: string
  }>
  shares?: { source: number[]; destination: number[] }
  managerArticle?: {
    managerName?: string
    managerNameAr?: string
    managerNationality?: string
    managerIdNumber?: string
    managerDocType?: 'eid' | 'passport'
  }
}

export async function processDocument(file: File, type: 'moa' | 'license' | 'party'): Promise<ParsedResult> {
  try {
    // Extract text using Tesseract with English + Arabic
    const { data: { text } } = await Tesseract.recognize(file, 'eng+ara', {
      logger: (m) => console.log('[OCR]', m)
    })

    console.log('Extracted text:', text)

    // Parse based on document type
    if (type === 'license') {
      return parseTradeLicense(text)
    } else if (type === 'party') {
      return parsePartyDocument(text)
    } else {
      return parseMOADocument(text)
    }
  } catch (error) {
    console.error('OCR error:', error)
    return { company: {}, sourceParties: [], destinationParties: [], shares: { source: [], destination: [] } }
  }
}

function parseTradeLicense(text: string): ParsedResult {
  const clean = text.replace(/\s+/g, ' ').trim()
  
  // Extract license number (CN-XXXXX or similar patterns)
  const licenseMatch = clean.match(/\b(CN|TN|CL)-?\s*(\d{4,})\b/i)
  const licenseNumber = licenseMatch ? `${licenseMatch[1]}-${licenseMatch[2]}` : ''
  
  // Extract company name (look for "Trade Name" or similar)
  const nameMatch = clean.match(/(?:Trade\s+Name|Company\s+Name|Name)[:\s]+([A-Z][A-Za-z\s&,.-]+?)(?:\s+LLC|\s+SPC|\s+L\.L\.C|\s+Establishment|$)/i)
  const name = nameMatch ? nameMatch[1].trim() : ''
  
  // Extract activities
  const actMatch = clean.match(/(?:Activities|Business)[:\s]+([A-Za-z\s,&-]+?)(?:\s+License|\s+Date|$)/i)
  const activities = actMatch ? actMatch[1].trim() : ''
  
  return {
    company: {
      name,
      licenseNumber,
      activities
    }
  }
}

function parsePartyDocument(text: string): ParsedResult {
  const clean = text.replace(/\s+/g, ' ').trim()
  
  // Extract EID (784-YYYY-NNNNNNN-C format)
  const eidMatch = clean.match(/\b(784-\d{4}-\d{7}-\d)\b/)
  const eidNumber = eidMatch ? eidMatch[1] : ''
  
  // Extract passport number if no EID
  const passportMatch = !eidNumber ? clean.match(/\b([A-Z]\d{7,9})\b/) : null
  const passportNumber = passportMatch ? passportMatch[1] : ''
  
  // Extract name (look for capitalized words)
  const nameMatch = clean.match(/\b([A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\b/)
  const name = nameMatch ? nameMatch[1] : ''
  
  // Extract nationality
  const natMatch = clean.match(/\b(UAE|Indian|Pakistani|Filipino|Egyptian|Jordanian|Syrian|Lebanese)\b/i)
  const nationality = natMatch ? natMatch[1] : ''
  
  // Extract DOB
  const dobMatch = clean.match(/\b(\d{2}[\/\-]\d{2}[\/\-]\d{4})\b/)
  const dob = dobMatch ? dobMatch[1].replace(/\//g, '-') : ''
  
  return {
    sourceParties: [{
      name,
      eidNumber,
      passportNumber,
      nationality,
      dob,
      documentType: eidNumber ? 'eid' : 'passport'
    }]
  }
}

function parseMOADocument(text: string): ParsedResult {
  const clean = text.replace(/\s+/g, ' ').trim()
  const lines = text.split('\n').map(l => l.trim())
  
  // Extract company names
  const companyMatch = clean.match(/(?:Company\s+Name|Trade\s+Name)[:\s]*([A-Z][A-Za-z\s&,.-]+?)(?:\s+LLC|\s+SPC|$)/i)
  const name = companyMatch ? companyMatch[1].trim() : ''
  
  // Extract Arabic company name
  const arNameMatch = clean.match(/[\u0600-\u06FF]+\s+[\u0600-\u06FF]+/)
  const nameAr = arNameMatch ? arNameMatch[0] : ''
  
  // Extract license number
  const licMatch = clean.match(/\b(CN|TN|CL)-?\s*(\d{4,})\b/i)
  const licenseNumber = licMatch ? `${licMatch[1]}-${licMatch[2]}` : ''
  
  // Extract notarization number
  const notMatch = clean.match(/(?:Notarization|Notary|Certificate)\s+(?:No|Number)[:\s]*([A-Z0-9-]+)/i)
  const notarizationNumber = notMatch ? notMatch[1] : ''
  
  // Extract dates
  const dateMatch = clean.match(/\b(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})\b/)
  const moaDate = dateMatch ? dateMatch[1].replace(/\//g, '-') : ''
  
  // Extract activities
  const actMatch = clean.match(/(?:Activities|Objects|Business)[:\s]+([A-Za-z\s,&-]+?)(?:\.|$)/i)
  const activities = actMatch ? actMatch[1].trim().substring(0, 200) : ''
  
  // Extract parties - look for names with nationalities
  const parties: any[] = []
  const partyRegex = /(?:MR\.|Mr\.|السيد)\s*([A-Z][A-Za-z\s]+?)(?:\s*,|\s+)([\u0600-\u06FF\s]*?)(?:Nationality|الجنسية)[:\s]*([\w\s]+?)(?:ID|EID|Passport|بطاقة)/gi
  let match
  while ((match = partyRegex.exec(clean)) !== null) {
    parties.push({
      name: match[1].trim(),
      nameAr: match[2] ? match[2].trim() : '',
      nationality: match[3].trim()
    })
  }
  
  // Extract share percentages
  const shareRegex = /(\d+(?:\.\d+)?)\s*%/g
  const shareMatches: number[] = []
  while ((match = shareRegex.exec(clean)) !== null) {
    shareMatches.push(parseFloat(match[1]))
  }
  
  return {
    company: {
      name,
      nameAr,
      licenseNumber,
      moaDate,
      activities,
      notarizationNumber
    },
    sourceParties: parties.slice(0, 1),
    destinationParties: parties.slice(1),
    shares: {
      source: shareMatches.slice(0, 1),
      destination: shareMatches.slice(1)
    }
  }
}
