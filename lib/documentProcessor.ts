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

  // Extract License Number
  // Priority 1: Specific CN identifiers (User requirement: always look for CN- or TN-)
  const cnMatch = cleanText.match(/\b((?:CN|TN)-[\d]+)\b/i)
  let licenseNumber = ''

  if (cnMatch) {
    licenseNumber = cnMatch[1] // Use the text exactly as matched with prefix
  } else {
    // Priority 2: Label-based fallback (Licence/License)
    // Removed "Registration No" to avoid capturing Unified Registration No
    const labelMatch = cleanText.match(/(?:Licence No|License No|Lic No|رقم الرخصة|رقم الرخصه)[:\s\.\-]*([\d]+)/i)
    licenseNumber = labelMatch ? labelMatch[1] : ''
  }

  // Extract Company Name
  // Support: "Trade Name", "Commercial Name", "Company Name", "Licensee", "English Name", "الاسم التجاري"
  let name = ''

  // Pattern 1: Look for label followed by text until a keyword or number
  // Added \u0600-\u06FF for Arabic support
  const nameMatch = cleanText.match(/(?:Trade Name|Commercial Name|Company Name|Licensee|English Name|الاسم التجاري)[:\s\.\-]*(?:\(En\))?[:\s]*([A-Za-z0-9\s\.\,\(\)\-\u0600-\u06FF]+?)(?=(?:License|Lic|Expiry|Date|Activities|Owner|Partner|Member|\d{2,}))/i)

  if (nameMatch && nameMatch[1].length > 3) {
    name = nameMatch[1].trim()
  } else {
    // Pattern 2: Fallback to capturing a fixed length if lookahead fails
    const simpleMatch = cleanText.match(/(?:Trade Name|Commercial Name|Company Name|Licensee|English Name|الاسم التجاري)[:\s\.\-]*([A-Za-z0-9\s\.\,\(\)\-\u0600-\u06FF]{5,60})/i)
    name = simpleMatch ? simpleMatch[1].trim() : ''
  }

  // Clean up common noise
  name = name.replace(/[:\.\-]$/, '').trim()

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
  // More robust regex to handle spaces, dashes, or just sequences starting with 784
  // Extract EID (784-XXXX-XXXXXXX-X)
  // Logic: Find '784', take a chunk of following text, strip non-digits, check length.
  let eidNumber = ''
  const eidIndex = cleanText.indexOf('784')
  if (eidIndex !== -1) {
    // Take a window of characters starting from 784
    const chunk = cleanText.substring(eidIndex, eidIndex + 25)
    // Keep only digits
    const digits = chunk.replace(/\D/g, '')
    // EID must be 15 digits
    if (digits.length >= 15) {
      eidNumber = digits.substring(0, 15).replace(/(\d{3})(\d{4})(\d{7})(\d{1})/, '$1-$2-$3-$4')
    }
  }

  // Extract English Name
  const nameMatch = cleanText.match(/(?:Name|Full Name)\s*[:\.]?\s*([A-Za-z\s\.]+)/i)
  let name = nameMatch ? nameMatch[1].trim() : ''

  // Extract Arabic Name
  const nameArMatch = cleanText.match(/(?:الاسم|الاسم الكامل)\s*[:\.]?\s*([\u0600-\u06FF\s]+)/)
  let nameAr = nameArMatch ? nameArMatch[1].trim() : ''

  // Extract DOB (DD/MM/YYYY or YYYY/MM/DD)
  // Context-aware: Look for label first to avoid garbage matches like 2724/0-0
  let dob = ''
  let dobText = ''

  let documentType: 'eid' | 'passport' = 'eid'; // Default to EID
  let expiryDate = '';

  // Priority 1: MRZ Extraction (Machine Readable Zone - Passports)
  // MRZ Format for TD3 (Standard passport):
  // Line 1: P<ISSUINGCOUNTRY<LASTNAME<<FIRSTNAME<<<<<<<<<<<<<<<<<<<
  // Line 2: PASSPORTNUMBER<NATIONALITY<YYMMDD(DOB)#SEX#YYMMDD(EXPIRY)#<<<<<<<<<<<<<<##
  // Example from Indian passport:
  // Line 1: P<INDABDUL<LATHEEF<PANDARAPETTY<<<<<<<<<<<<
  // Line 2: S3098752<0IND8105118M2801061<<<<<<<<<<<<<<<0
  
  // First, try to extract passport number from MRZ Line 2
  // OCR often misreads some characters, so we try multiple patterns
  // Pattern 1: Standard MRZ with proper formatting
  let mrzLine2Match = cleanText.match(/([A-Z$][A-Z0-9]{5,8})<[\dOo]([A-Z]{3})(\d{6})[\dOo]([MF<])(\d{6})/i);
  
  // Pattern 2: More lenient - allow special chars that OCR might confuse
  if (!mrzLine2Match) {
    mrzLine2Match = cleanText.match(/([A-Z$#@][A-Z0-9]{5,8})[<\s][\dOo]([A-Z]{3})(\d{6})[\dOo]([MF<])(\d{6})/i);
  }
  
  // Pattern 3: Even more lenient for noisy OCR
  if (!mrzLine2Match) {
    mrzLine2Match = cleanText.match(/([A-Z$#@!][0-9]{6,7})[<\s]+[\dOo]([A-Z]{3})(\d{6})[\dOo]([MF<])(\d{6})/i);
  }
  
  if (mrzLine2Match) {
    documentType = 'passport';
    
    // Extract passport number (first capture group)
    // Clean up OCR errors: $ often means S, @ or # might be misread characters
    let passportNum = mrzLine2Match[1].toUpperCase();
    passportNum = passportNum.replace(/\$/g, 'S').replace(/@/g, 'A').replace(/#/g, '').replace(/!/g, 'I');
    eidNumber = passportNum;
    
    // Extract nationality from MRZ
    const mrzNationality = mrzLine2Match[2];
    
    // Extract DOB (YYMMDD format)
    const mrzDob = mrzLine2Match[3];
    
    // Extract Expiry (YYMMDD format)
    const mrzExpiry = mrzLine2Match[5];

    // YYMMDD -> YYYY-MM-DD for DOB
    // Assume 19xx for > current year, 20xx for < current year
    const currentYearShort = new Date().getFullYear() % 100;
    const dobYearPrefix = parseInt(mrzDob.substring(0, 2)) > currentYearShort ? '19' : '20';
    dobText = `${dobYearPrefix}${mrzDob.substring(0, 2)}-${mrzDob.substring(2, 4)}-${mrzDob.substring(4, 6)}`;

    // YYMMDD -> YYYY-MM-DD for Expiry
    // Heuristic: if YY < 50 assume 20YY, else 19YY (unlikely for valid passport)
    const expiryYearPrefix = parseInt(mrzExpiry.substring(0, 2)) < 50 ? '20' : '19';
    expiryDate = `${expiryYearPrefix}${mrzExpiry.substring(0, 2)}-${mrzExpiry.substring(2, 4)}-${mrzExpiry.substring(4, 6)}`;
    
    console.log('MRZ extracted passport:', eidNumber, 'DOB:', dobText, 'Expiry:', expiryDate);
  }
  
  // Fallback: Try to find passport number from visual text if MRZ failed
  if (!eidNumber) {
    // First try with strict pattern
    let passportMatch = cleanText.match(/(?:Passport No|Passport Number|पासपोर्ट न\.?|Document No)[:\s\.]*([A-Z][A-Z0-9]{6,11})/i);
    
    // If not found, try searching for the visual passport number field in Indian passports
    if (!passportMatch) {
      // Indian passports show "Passport No." label clearly
      passportMatch = cleanText.match(/(?:No\.?|Number)[:\s\.]*([A-Z$][0-9]{6,8})/i);
    }
    
    if (passportMatch) {
      let passportNum = passportMatch[1].trim().toUpperCase();
      // Clean OCR errors
      passportNum = passportNum.replace(/\$/g, 'S').replace(/@/g, 'A').replace(/!/g, 'I');
      eidNumber = passportNum;
      documentType = 'passport';
      console.log('Visual text extracted passport:', eidNumber);
    }
  }
  
  // If we detected passport indicators but haven't set document type yet
  if (!eidNumber && cleanText.match(/(?:Passport No|Passport Number|REPUBLIC OF INDIA|पासपोर्ट|Document No)/i)) {
    documentType = 'passport';
  }

  // Priority 2: Label-based extraction
  if (!dobText) {
    const dobContextMatch = cleanText.match(/(?:Date of Birth|Birth Date|DOB)\s*[:\.]?\s*(\d{2}[\/\-\.]\d{2}[\/\-\.]\d{4}|\d{4}[\/\-\.]\d{2}[\/\-\.]\d{2})/i)
    if (dobContextMatch) {
      dobText = dobContextMatch[1]
    } else {
      // Fallback to strict regex if no label found
      const strictDobMatch = cleanText.match(/(\d{2}[\/\-\.]\d{2}[\/\-\.]\d{4})|(\d{4}[\/\-\.]\d{2}[\/\-\.]\d{2})/)
      if (strictDobMatch) {
        dobText = strictDobMatch[0]
      }
    }
  }

  // Normalize to YYYY-MM-DD for HTML input
  if (dobText) {
    // Handle YYYY-MM-DD (Already formatted from MRZ)
    if (dobText.match(/^\d{4}-\d{2}-\d{2}$/)) {
      dob = dobText;
    }
    // Handle DD/MM/YYYY
    else if (dobText.match(/^\d{2}[\/\-\.]\d{2}[\/\-\.]\d{4}$/)) {
      const parts = dobText.split(/[\/\-\.]/)
      // Assume DD-MM-YYYY
      dob = `${parts[2]}-${parts[1]}-${parts[0]}`
    }
    // Handle YYYY/MM/DD
    else if (dobText.match(/^\d{4}[\/\-\.]\d{2}[\/\-\.]\d{2}$/)) {
      dob = dobText.replace(/[\/\.]/g, '-')
    }
  }

  // Extract Nationality (English)
  // 1. Try standard English label with loose separator (allow | - . etc)
  // Use non-greedy match and valid stop words
  let nationalityMatch = cleanText.match(/(?:Nationality|\bCitizen\b)\s*[^A-Za-z0-9]*\s*([A-Za-z\.\-\s]+?)(?=\s*(?:ID|Passport|Doc|Date|DoB|No\.|Issuing|Signature|Sex|[0-9]|$))/i)

  // 2. Fallback: Try Arabic label pointing to English text (failed OCR of English label)
  if (!nationalityMatch) {
    nationalityMatch = cleanText.match(/(?:الجنسية)\s*[^A-Za-z0-9\u0600-\u06FF]*\s*([A-Za-z\.\-\s]+?)(?=\s*(?:ID|Passport|Doc|Date|DoB|No\.|Issuing|Signature|Sex|[0-9]|$))/)
  }

  let nationality = nationalityMatch ? nationalityMatch[1].trim() : ''

  // 3. Fallback: Dictionary Search (last resort if labels are missing/garbled)
  if (!nationality) {
    const commonNationalities = [
      'Emirati', // Keep this, as "United Arab Emirates" is in the header of every ID
      'India', 'Indian',
      'Pakistan', 'Pakistani',
      'Egypt', 'Egyptian',
      'Saudi Arabia', 'Saudi',
      'Jordan', 'Jordanian',
      'Syria', 'Syrian',
      'Lebanon', 'Lebanese',
      'Philippines', 'Filipino',
      'Bangladesh', 'Bangladeshi',
      'Sri Lanka', 'Sri Lankan',
      'UK', 'United Kingdom', 'British',
      'USA', 'United States', 'American',
      'Canada', 'Canadian',
      'China', 'Chinese',
      'Russia', 'Russian'
    ]

    for (const nation of commonNationalities) {
      // Look for the country name as a whole word
      const regex = new RegExp(`\\b${nation}\\b`, 'i')
      if (cleanText.match(regex)) {
        nationality = nation
        break
      }
    }
  }

  // Extract Nationality (Arabic)
  // Stop at English characters, digits, or next field
  const nationalityArMatch = cleanText.match(/(?:الجنسية)\s*[:\.]?\s*([\u0600-\u06FF\-\s]+?)(?=\s*(?:ID|Passport|[A-Za-z0-9]|$))/)
  const nationalityAr = nationalityArMatch ? nationalityArMatch[1].trim() : ''

  // Construct party data object
  const partyData = {
    name,
    nameAr,
    eidNumber,
    dob,
    nationality,
    nationalityAr,
    documentType,
    expiryDate
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
