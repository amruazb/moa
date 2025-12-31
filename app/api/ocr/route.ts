import { NextRequest, NextResponse } from 'next/server'
import Tesseract from 'tesseract.js'
import { DocumentType, OCRResult, EmiratesIDData, PassportData, TradeCertificateData } from '@/lib/ocr/types'
import { getArabicNationality, parseDate, normalizeName } from '@/lib/ocr/extractors'

// OCR with English + Arabic - use CDN worker to avoid Next.js bundling issues
async function runOCR(imageBuffer: Buffer): Promise<string> {
  console.log('Starting OCR (English + Arabic)...')
  const startTime = Date.now()
  
  // Use Tesseract.recognize directly - simpler API that handles worker internally
  const { data: { text } } = await Tesseract.recognize(
    imageBuffer,
    'eng+ara',
    {
      logger: (m: { status: string; progress: number }) => {
        if (m.status === 'recognizing text' && m.progress > 0) {
          console.log(`OCR: ${Math.round(m.progress * 100)}%`)
        }
      }
    }
  )
  
  console.log(`OCR completed in ${Date.now() - startTime}ms`)
  return text
}

// Extract Emirates ID - focused patterns
function extractEmiratesID(text: string): EmiratesIDData {
  const fullText = text.replace(/\n/g, ' ').replace(/\s+/g, ' ')
  
  // ID Number: 784-XXXX-XXXXXXX-X
  const idMatch = fullText.match(/784[-\s]?\d{4}[-\s]?\d{7}[-\s]?\d/)
  const idNumber = idMatch ? idMatch[0].replace(/\s/g, '-') : ''
  
  // Name (English) - look near "Name:" label
  let nameEn = ''
  const nameMatch = fullText.match(/Name[:\s]+([A-Z][A-Z\s]{2,25}?)(?=\s*Date|\s*Nat|\s*ID|\s*\d)/i)
  if (nameMatch) nameEn = normalizeName(nameMatch[1].trim())
  
  // Name (Arabic) - look for Arabic text patterns
  let nameAr = ''
  const arabicNamePatterns = [
    /الاسم[:\s]*([؀-ۿ\s]+?)(?=\s*تاريخ|\s*الجنسية|\s*رقم|\d)/,
    /الإسم[:\s]*([؀-ۿ\s]+?)(?=\s*تاريخ|\s*الجنسية|\s*رقم|\d)/,
  ]
  for (const pattern of arabicNamePatterns) {
    const match = fullText.match(pattern)
    if (match && match[1]) {
      nameAr = match[1].trim()
      break
    }
  }
  
  // Nationality (English)
  let nationality = ''
  const natMatch = fullText.match(/Nationality[:\s]*([A-Z]{3,15})/i) ||
                   fullText.match(/(CHINA|CHINESE|INDIA|INDIAN|PAKISTAN|UAE|PHILIPPINES|BANGLADESH|EGYPT)/i)
  if (natMatch) nationality = (natMatch[1] || natMatch[0]).toUpperCase()
  
  // Date of Birth
  let dateOfBirth = ''
  const dobMatch = fullText.match(/(?:Date\s*of\s*Birth|DOB|Birth)[:\s]*(\d{2}[\/\-]\d{2}[\/\-]\d{4})/i)
  if (dobMatch) dateOfBirth = parseDate(dobMatch[1])
  
  // Sex
  const sexMatch = fullText.match(/Sex[:\s]*([MF])/i)
  const sex: 'M' | 'F' = sexMatch?.[1]?.toUpperCase() === 'F' ? 'F' : 'M'
  
  // Expiry Date
  let expiryDate = ''
  const expMatch = fullText.match(/Expiry[:\s]*(\d{2}[\/\-]\d{2}[\/\-]\d{4})/i)
  if (expMatch) expiryDate = parseDate(expMatch[1])
  
  return {
    idNumber,
    nameEn,
    nameAr,
    nationality,
    nationalityAr: getArabicNationality(nationality),
    dateOfBirth,
    sex,
    issueDate: '',
    expiryDate
  }
}

// Extract Passport - focused patterns
function extractPassport(text: string): PassportData {
  const fullText = text.replace(/\n/g, ' ').replace(/\s+/g, ' ')
  
  // Passport Number: 1-2 letters + 7-8 digits
  let passportNumber = ''
  const passMatch = fullText.match(/(?:Passport\s*No\.?)?[:\s]*([A-Z]{1,2}\d{7,8})/i)
  if (passMatch) passportNumber = passMatch[1].toUpperCase()
  
  // Name - LASTNAME, FIRSTNAME or near Name label
  let nameEn = ''
  const nameMatch = fullText.match(/(?:Name|Surname)[:\s\/]*([A-Z][A-Z,\s]{3,30}?)(?=\s*Sex|\s*Date|\s*Nat|\s*Place)/i) ||
                    fullText.match(/([A-Z]{2,},\s*[A-Z]{2,})/)
  if (nameMatch) nameEn = normalizeName(nameMatch[1].trim())
  
  // Nationality
  let nationality = ''
  const natMatch = fullText.match(/Nationality[:\s\/]*([A-Z]{3,15})/i) ||
                   fullText.match(/(CHINESE|CHINA|INDIAN|INDIA|PAKISTANI|PAKISTAN)/i)
  if (natMatch) nationality = (natMatch[1] || natMatch[0]).toUpperCase()
  
  // Date of Birth
  let dateOfBirth = ''
  const dobMatch = fullText.match(/(?:Date\s*of\s*birth|DOB)[:\s\/]*(\d{1,2}\s*[A-Z]{3}\s*\d{4}|\d{2}[\/\-]\d{2}[\/\-]\d{4})/i)
  if (dobMatch) dateOfBirth = parseDate(dobMatch[1])
  
  // Sex
  const sexMatch = fullText.match(/Sex[:\s\/]*([MF])/i)
  const sex: 'M' | 'F' = sexMatch?.[1]?.toUpperCase() === 'F' ? 'F' : 'M'
  
  // Expiry
  let expiryDate = ''
  const expMatch = fullText.match(/(?:Date\s*of\s*expiry|Expiry)[:\s\/]*(\d{1,2}\s*[A-Z]{3}\s*\d{4}|\d{2}[\/\-]\d{2}[\/\-]\d{4})/i)
  if (expMatch) expiryDate = parseDate(expMatch[1])
  
  return {
    passportNumber,
    nameEn,
    nationality,
    nationalityAr: getArabicNationality(nationality),
    dateOfBirth,
    sex,
    issueDate: '',
    expiryDate
  }
}

// Extract Trade Certificate - targeted for ADRA format
function extractTradeCertificate(text: string): TradeCertificateData {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  const fullText = text // Keep original with newlines for better matching
  
  console.log('=== Trade Certificate OCR Text ===')
  console.log(text.substring(0, 500))
  console.log('=================================')
  
  // Trade Name (English) - look for company name with L.L.C or S.P.C
  let tradeName = ''
  
  // Pattern 1: COMPANY NAME -L.L.C-S.P.C or similar variations
  const tradePatterns = [
    // Match: COMPANY NAME -L.L.C-S.P.C (with separators)
    /([A-Z][A-Z\s]+(?:CAFE|COFFEE|TRADING|RESTAURANT|SHOP)?)\s*[\-\.]*\s*L\.?L\.?C[\.\-\s]*S\.?P\.?C/i,
    // Match: COMPANY NAME L.L.C - S.P.C
    /([A-Z][A-Z\s]{3,30})\s*[\-\s]*L\.?L\.?C/i,
    // Match: Trade Name followed by company name
    /Trade\s*Name[:\s]+([A-Z][A-Za-z\s\-]{3,40}?)(?:\s+\d|\s+L\.?L\.?C|\s+Payment)/i,
  ]
  
  for (const pattern of tradePatterns) {
    const match = fullText.match(pattern)
    if (match && match[1]) {
      tradeName = match[1].trim()
        .replace(/\s+/g, ' ')
        .replace(/[\-\s]+$/, '') // Remove trailing dashes/spaces
      if (tradeName.length >= 3 && tradeName.length <= 50) {
        // Add L.L.C - S.P.C suffix if not present
        if (!tradeName.match(/L\.?L\.?C/i)) {
          tradeName = tradeName + ' - L.L.C - S.P.C'
        }
        break
      }
      tradeName = ''
    }
  }
  
  // Fallback: scan lines for company name pattern
  if (!tradeName) {
    for (const line of lines) {
      const lineMatch = line.match(/^([A-Z][A-Z\s]{5,35})\s*[\-\s]*(?:L\.?L\.?C|S\.?P\.?C)/i)
      if (lineMatch && lineMatch[1]) {
        tradeName = lineMatch[1].trim() + ' - L.L.C - S.P.C'
        break
      }
    }
  }
  
  // Trade Name (Arabic) - look for Arabic company name with ذ.م.م or ش.ش.و
  let tradeNameAr = ''
  const arabicPatterns = [
    // Arabic: الإسم التجاري followed by name
    /الا?سم\s*التجاري[:\s]*([؀-ۿ\s]+?)\s*[\-\s]*(?:ذ\.?م\.?م|ش\.?ش\.?و)/,
    // Arabic company name ending with ذ.م.م - ش.ش.و
    /([؀-ۿ][؀-ۿ\s]{3,30}?)\s*[\-\s]*ذ\.?م\.?م[\s\-]*ش\.?ش\.?و/,
    // Just find Arabic text with company suffix
    /([؀-ۿ\s]{5,40}?)[\s\-]*(?:ذ\.م\.م|ذمم)/,
  ]
  
  for (const pattern of arabicPatterns) {
    const match = fullText.match(pattern)
    if (match && match[1]) {
      tradeNameAr = match[1].trim()
      if (tradeNameAr.length >= 3) {
        // Add suffix if needed
        if (!tradeNameAr.match(/ذ\.?م\.?م/)) {
          tradeNameAr = tradeNameAr + ' - ذ.م.م - ش.ش.و'
        }
        break
      }
      tradeNameAr = ''
    }
  }
  
  // Legal Form (English)
  let legalForm = ''
  const legalMatch = fullText.match(/Legal\s*Form\s+([A-Za-z\s\-]+Company[A-Za-z\s\-]*)/i)
  if (legalMatch) legalForm = legalMatch[1].trim()
  
  // Legal Form (Arabic)
  let legalFormAr = ''
  const legalArMatch = fullText.match(/الشكل\s*القانوني[:\s]*([؀-ۿ\s\-]+)/)
  if (legalArMatch) legalFormAr = legalArMatch[1].trim()
  if (!legalFormAr && legalForm) legalFormAr = 'شركة ذات مسؤولية محدودة - شركة الشخص الواحد'
  
  // Issue Date
  let issueDate = ''
  const issueMatch = fullText.match(/Issue\s*Date\s+(\d{2}[\/\-]\d{2}[\/\-]\d{4})/i)
  if (issueMatch) issueDate = parseDate(issueMatch[1])
  
  // Expiry Date
  let expiryDate = ''
  const expMatch = fullText.match(/Expiry\s*Date\s+(\d{2}[\/\-]\d{2}[\/\-]\d{4})/i)
  if (expMatch) expiryDate = parseDate(expMatch[1])
  
  // Economic Registry Number
  let economicRegistryNumber: string | undefined
  const ecoMatch = fullText.match(/Economic\s*Registry\s*Number\s+(\d+)/i)
  if (ecoMatch) economicRegistryNumber = ecoMatch[1]
  
  // Transaction Number
  let transactionNumber: string | undefined
  const transMatch = fullText.match(/Transaction\s*No\.?\s+([A-Z]{2}-\d+)/i)
  if (transMatch) transactionNumber = transMatch[1]
  
  // Owner names - look for patterns like "Owner China NAME" or "Manager China NAME"
  const owners: TradeCertificateData['owners'] = []
  
  // Pattern: Number Role Nationality Name
  const ownerPattern = /(\d+)\s+(Owner|Manager|مالك|مدير)\s+(China|India|UAE|Pakistan|[A-Za-z]+)\s+([A-Z][A-Z\s]+?)(?=\d|Owner|Manager|$)/gi
  let ownerMatch
  while ((ownerMatch = ownerPattern.exec(fullText)) !== null) {
    const name = ownerMatch[4].trim()
    if (name.length > 2) {
      owners.push({
        idNumber: ownerMatch[1],
        nameEn: normalizeName(name),
        nameAr: '',
        role: ownerMatch[2],
        roleAr: ownerMatch[2].toLowerCase().includes('owner') ? 'مالك' : 'مدير',
        nationality: ownerMatch[3],
        nationalityAr: getArabicNationality(ownerMatch[3])
      })
    }
  }
  
  // If no owners found, try simpler pattern - look for names after China/India etc
  if (owners.length === 0) {
    const simpleOwner = fullText.match(/(?:Owner|Manager)\s+(China|India|[A-Za-z]+)\s+([A-Z][A-Z\s]+)/i)
    if (simpleOwner) {
      owners.push({
        idNumber: '',
        nameEn: normalizeName(simpleOwner[2].trim()),
        nameAr: '',
        role: 'Owner',
        roleAr: 'مالك',
        nationality: simpleOwner[1],
        nationalityAr: getArabicNationality(simpleOwner[1])
      })
    }
  }
  
  // Activities - look for common activity keywords
  const activities: TradeCertificateData['activities'] = []
  const activityKeywords = [
    { en: 'Importing', ar: 'استيراد' },
    { en: 'Cold and Hot Beverages', ar: 'مشروبات باردة و ساخنة' },
    { en: 'Snack Selling', ar: 'بيع الوجبات الخفيفة' },
    { en: 'Cafeteria', ar: 'كافتيريا' },
    { en: 'Retail Sale of Tea', ar: 'بيع الشاي بالتجزئة' },
    { en: 'Retail Sale of Coffee', ar: 'بيع القهوة بالتجزئة' },
    { en: 'Restaurant', ar: 'مطعم' },
    { en: 'Trading', ar: 'تجارة' },
    { en: 'General Trading', ar: 'تجارة عامة' },
    { en: 'Consultancy', ar: 'استشارات' },
  ]
  
  for (const act of activityKeywords) {
    if (fullText.toLowerCase().includes(act.en.toLowerCase())) {
      // Try to find activity code
      const codeMatch = fullText.match(new RegExp(act.en + '[\\s\\S]{0,20}(\\d{7})', 'i'))
      activities.push({
        code: codeMatch ? codeMatch[1] : '',
        nameEn: act.en,
        nameAr: act.ar
      })
    }
  }
  
  console.log('Extracted:', { tradeName, tradeNameAr, legalForm, owners: owners.length, activities: activities.length })
  
  return {
    receiptNumber: undefined,
    tradeName,
    tradeNameAr,
    transactionNumber,
    legalForm,
    legalFormAr,
    issueDate,
    expiryDate,
    applicationNumber: undefined,
    economicRegistryNumber,
    owners,
    activities
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const documentType = formData.get('documentType') as DocumentType | null

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 })
    }

    if (!documentType) {
      return NextResponse.json({ success: false, error: 'No document type specified' }, { status: 400 })
    }

    console.log(`\n=== OCR Request: ${documentType} ===`)
    console.log(`File: ${file.name}, Size: ${(file.size / 1024).toFixed(1)}KB`)

    // Convert to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Run OCR (English + Arabic)
    const rawText = await runOCR(buffer)
    
    console.log('Raw text sample:', rawText.substring(0, 300).replace(/\n/g, ' '))

    // Extract based on document type
    let data: EmiratesIDData | PassportData | TradeCertificateData | null = null
    let confidence = 0

    switch (documentType) {
      case 'emirates_id':
        data = extractEmiratesID(rawText)
        const eidFields = [data.idNumber, data.nameEn, data.nationality, data.dateOfBirth]
        confidence = eidFields.filter(Boolean).length / eidFields.length
        break
        
      case 'passport':
        data = extractPassport(rawText)
        const passFields = [data.passportNumber, data.nameEn, data.nationality, data.dateOfBirth]
        confidence = passFields.filter(Boolean).length / passFields.length
        break
        
      case 'trade_certificate':
        data = extractTradeCertificate(rawText)
        const tradeFields = [data.tradeName, data.legalForm, data.owners.length > 0]
        confidence = tradeFields.filter(Boolean).length / tradeFields.length
        break
    }

    const totalTime = Date.now() - startTime
    console.log(`=== OCR Complete in ${totalTime}ms, confidence: ${(confidence * 100).toFixed(0)}% ===\n`)

    const result: OCRResult = {
      success: confidence > 0.2,
      documentType,
      confidence,
      data,
      rawText: rawText.substring(0, 1000)
    }

    return NextResponse.json(result)

  } catch (error) {
    console.error('OCR Error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'OCR failed' },
      { status: 500 }
    )
  }
}
