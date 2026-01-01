import { 
  DocumentType, 
  EmiratesIDData, 
  PassportData, 
  TradeCertificateData,
  OCRResult 
} from './types';

// Nationality mapping (English to Arabic)
const nationalityMap: Record<string, string> = {
  'CHINA': 'الصين',
  'CHINESE': 'الصين',
  'INDIA': 'الهند',
  'INDIAN': 'الهند',
  'PAKISTAN': 'باكستان',
  'PAKISTANI': 'باكستان',
  'UAE': 'الإمارات',
  'EMIRATI': 'الإمارات',
  'USA': 'الولايات المتحدة',
  'AMERICAN': 'الولايات المتحدة',
  'UK': 'المملكة المتحدة',
  'BRITISH': 'المملكة المتحدة',
  'PHILIPPINES': 'الفلبين',
  'FILIPINO': 'الفلبين',
  'EGYPT': 'مصر',
  'EGYPTIAN': 'مصر',
  'JORDAN': 'الأردن',
  'JORDANIAN': 'الأردن',
  'LEBANON': 'لبنان',
  'LEBANESE': 'لبنان',
  'SYRIA': 'سوريا',
  'SYRIAN': 'سوريا',
  'BANGLADESH': 'بنغلاديش',
  'BANGLADESHI': 'بنغلاديش',
  'SRI LANKA': 'سريلانكا',
  'SRI LANKAN': 'سريلانكا',
  'NEPAL': 'نيبال',
  'NEPALESE': 'نيبال',
  'IRAN': 'إيران',
  'IRANIAN': 'إيران',
  'IRAQ': 'العراق',
  'IRAQI': 'العراق',
  'SAUDI ARABIA': 'السعودية',
  'SAUDI': 'السعودية',
};

// Validate date string in YYYY-MM-DD format
function isValidDate(dateStr: string): boolean {
  if (!dateStr) return false;
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return false;
  
  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);
  
  // Basic validation
  if (year < 1900 || year > 2100) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  
  // Check if date is actually valid
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && 
         date.getMonth() === month - 1 && 
         date.getDate() === day;
}

// Parse date from various formats
export function parseDate(dateStr: string): string {
  if (!dateStr) return '';
  
  // Try different date formats
  const formats = [
    /(\d{2})\/(\d{2})\/(\d{4})/, // DD/MM/YYYY
    /(\d{2})-(\d{2})-(\d{4})/,   // DD-MM-YYYY
    /(\d{4})\/(\d{2})\/(\d{2})/, // YYYY/MM/DD
    /(\d{4})-(\d{2})-(\d{2})/,   // YYYY-MM-DD
    /(\d{2})\s+(\d{1,2})\/([A-Z]{3})\/(\d{4})/i, // DD M/MMM/YYYY
    /(\d{1,2})\s+([A-Z]{3})\s+(\d{4})/i, // DD MMM YYYY
  ];
  
  const monthMap: Record<string, string> = {
    'JAN': '01', 'FEB': '02', 'MAR': '03', 'APR': '04',
    'MAY': '05', 'JUN': '06', 'JUL': '07', 'AUG': '08',
    'SEP': '09', 'OCT': '10', 'NOV': '11', 'DEC': '12'
  };
  
  let result = '';
  
  // Check for DD/MM/YYYY or DD-MM-YYYY
  let match = dateStr.match(/(\d{2})[\/\-](\d{2})[\/\-](\d{4})/);
  if (match) {
    result = `${match[3]}-${match[2]}-${match[1]}`;
    return isValidDate(result) ? result : '';
  }
  
  // Check for DD MMM YYYY (e.g., "25 SEP 1992")
  match = dateStr.match(/(\d{1,2})\s+([A-Z]{3})\s+(\d{4})/i);
  if (match) {
    const day = match[1].padStart(2, '0');
    const month = monthMap[match[2].toUpperCase()] || '01';
    result = `${match[3]}-${month}-${day}`;
    return isValidDate(result) ? result : '';
  }
  
  // Check for YYYY-MM-DD or YYYY/MM/DD
  match = dateStr.match(/(\d{4})[\/\-](\d{2})[\/\-](\d{2})/);
  if (match) {
    result = `${match[1]}-${match[2]}-${match[3]}`;
    return isValidDate(result) ? result : '';
  }
  
  return '';
}

// Get Arabic nationality
export function getArabicNationality(nationality: string): string {
  const normalized = nationality.toUpperCase().trim();
  return nationalityMap[normalized] || nationality;
}

// Clean and normalize name
export function normalizeName(name: string): string {
  return name
    .replace(/,/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Extract Emirates ID data from OCR text
export function extractEmiratesID(text: string): EmiratesIDData | null {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const fullText = lines.join(' ');
  
  // Extract ID Number (format: 784-XXXX-XXXXXXX-X)
  const idMatch = fullText.match(/784[-\s]?\d{4}[-\s]?\d{7}[-\s]?\d/);
  let idNumber = '';
  if (idMatch) {
    // Normalize to format: 784-XXXX-XXXXXXX-X
    const digits = idMatch[0].replace(/[-\s]/g, ''); // Get pure digits
    if (digits.length === 15) {
      idNumber = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 14)}-${digits.slice(14)}`;
    } else {
      idNumber = digits;
    }
  }
  
  // Extract Name (English) - usually after "Name:" or "Name"
  let nameEn = '';
  // Try to match "Name: LI YIWEN" pattern more precisely
  const namePatterns = [
    /Name[:\s]+([A-Z]{2,}(?:\s+[A-Z]{2,})+)(?=\s*Date|\s*Nationality|\s*ID|\s*\d|$)/i,
    /Name[:\s]+([A-Z][A-Z\s]{2,30})(?=Date|Nationality|ID|$)/i,
  ];
  for (const pattern of namePatterns) {
    const match = fullText.match(pattern);
    if (match && match[1]) {
      const cleaned = match[1].trim().replace(/\s+/g, ' ');
      // Ensure it looks like a name (not labels)
      if (cleaned.length >= 3 && !cleaned.match(/^(Date|Of|Birth|Nationality|ID|Number)$/i)) {
        nameEn = normalizeName(cleaned);
        break;
      }
    }
  }
  
  // Extract Name (Arabic) - multiple approaches
  let nameAr = '';
  
  // Common Arabic labels to exclude from name matching
  const arabicLabels = [
    'الاسم', 'الإسم', 'تاريخ', 'الجنسية', 'رقم', 'الميلاد', 'الصلاحية', 
    'الهوية', 'بطاقة', 'ذهبية', 'الإصدار', 'الانتهاء', 'الجنس', 'أنثى', 'ذكر',
    'الإمارات', 'العربية', 'المتحدة', 'الاتحادية', 'للهوية', 'والجنسية', 'المئة',
    'الصين', 'الهند', 'مصر', 'باكستان', 'السعودية', 'الأردن', 'لبنان', 'سوريا'
  ];
  
  // Approach 1: Look for Arabic label followed by name
  const arabicNamePatterns = [
    /الاسم[:\s]*([\u0600-\u06FF]+(?:\s+[\u0600-\u06FF]+){0,3})(?=\s*تاريخ|\s*الجنسية|\s*رقم|\s*\d|$)/,
    /الإسم[:\s]*([\u0600-\u06FF]+(?:\s+[\u0600-\u06FF]+){0,3})(?=\s*تاريخ|\s*الجنسية|\s*رقم|\s*\d|$)/,
  ];
  for (const pattern of arabicNamePatterns) {
    const match = fullText.match(pattern);
    if (match && match[1]) {
      const candidate = match[1].trim();
      if (!arabicLabels.some(label => candidate === label)) {
        nameAr = candidate;
        break;
      }
    }
  }
  
  // Approach 2: Look for short Arabic text that appears to be a name (2-4 words, not a label)
  if (!nameAr) {
    for (const line of lines) {
      // Match Arabic words only
      const arabicMatch = line.match(/^([\u0600-\u06FF]+(?:\s+[\u0600-\u06FF]+){1,3})$/g);
      if (arabicMatch) {
        for (const match of arabicMatch) {
          const cleanMatch = match.trim();
          const words = cleanMatch.split(/\s+/);
          // A name should be 2-4 words, not too long, and not contain labels
          if (words.length >= 2 && words.length <= 4 && 
              cleanMatch.length >= 4 && cleanMatch.length <= 30 &&
              !arabicLabels.some(label => cleanMatch.includes(label))) {
            nameAr = cleanMatch;
            break;
          }
        }
        if (nameAr) break;
      }
    }
  }
  
  // Approach 3: If still not found, look for any reasonable Arabic name candidate
  if (!nameAr) {
    const arabicSegments = fullText.match(/[\u0600-\u06FF]+(?:\s+[\u0600-\u06FF]+){1,3}/g) || [];
    for (const segment of arabicSegments) {
      const cleanSegment = segment.trim();
      const words = cleanSegment.split(/\s+/).filter(w => w.length > 0);
      // Look for segments that look like names: 2-4 words, reasonable length
      if (words.length >= 2 && words.length <= 4 && 
          cleanSegment.length >= 4 && cleanSegment.length <= 30 &&
          !arabicLabels.some(label => words.includes(label) || cleanSegment.includes(label))) {
        nameAr = cleanSegment;
        break;
      }
    }
  }
  
  // Extract Nationality
  let nationality = '';
  const natMatch = fullText.match(/Nationality[:\s]*([A-Z]+)/i);
  if (natMatch) {
    nationality = natMatch[1].toUpperCase();
  }
  
  // Extract Date of Birth - try multiple patterns
  let dateOfBirth = '';
  const dobPatterns = [
    // Standard format: Date Of Birth: DD/MM/YYYY
    /(?:Date\s*(?:Of|of)\s*Birth|DOB)[:\s]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/i,
    // Format with spaces: Date Of Birth 25 09 1992
    /(?:Date\s*(?:Of|of)\s*Birth|DOB)[:\s]*(\d{1,2})\s+(\d{1,2})\s+(\d{4})/i,
    // Format: DD MMM YYYY (e.g., 25 SEP 1992)
    /(?:Date\s*(?:Of|of)\s*Birth|DOB)[:\s]*(\d{1,2}\s+[A-Z]{3}\s+\d{4})/i,
    // Look for date near "Birth" keyword
    /Birth[:\s]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/i,
    // Standalone date format after DOB label
    /DOB[:\s]*(\d{4}[\/\-\.]\d{1,2}[\/\-\.]\d{1,2})/i,
  ];
  
  for (const pattern of dobPatterns) {
    const match = fullText.match(pattern);
    if (match) {
      // Handle the space-separated format specially
      if (match[2] && match[3]) {
        // Format: DD MM YYYY
        const day = match[1].padStart(2, '0');
        const month = match[2].padStart(2, '0');
        const year = match[3];
        dateOfBirth = parseDate(`${day}/${month}/${year}`);
      } else {
        dateOfBirth = parseDate(match[1]);
      }
      if (dateOfBirth) break; // Found a valid date
    }
  }
  
  // If still no DOB, try to find any date that looks like a birth date (reasonable year range)
  if (!dateOfBirth) {
    const anyDateMatch = fullText.match(/(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})/g);
    if (anyDateMatch) {
      for (const dateStr of anyDateMatch) {
        const parsed = parseDate(dateStr);
        if (parsed) {
          // Check if it's a reasonable birth year (1920-2020)
          const year = parseInt(parsed.split('-')[0], 10);
          if (year >= 1920 && year <= 2020) {
            dateOfBirth = parsed;
            break;
          }
        }
      }
    }
  }
  
  // Extract Sex
  const sexMatch = fullText.match(/Sex[:\s]*([MF])/i);
  const sex = (sexMatch?.[1]?.toUpperCase() === 'M' ? 'M' : 'F') as 'M' | 'F';
  
  // Extract Issue Date
  const issueMatch = fullText.match(/(?:Issuing|Issue)\s*Date[:\s]*(\d{2}\/\d{2}\/\d{4})/i);
  const issueDate = issueMatch ? parseDate(issueMatch[1]) : '';
  
  // Extract Expiry Date
  const expiryMatch = fullText.match(/Expiry\s*Date[:\s]*(\d{2}\/\d{2}\/\d{4})/i);
  const expiryDate = expiryMatch ? parseDate(expiryMatch[1]) : '';
  
  // Extract Card Number (back of card)
  const cardMatch = fullText.match(/Card\s*Number[:\s]*(\d+)/i);
  const cardNumber = cardMatch ? cardMatch[1] : undefined;
  
  // Extract Occupation
  const occMatch = fullText.match(/Occupation[:\s]*([A-Z\s]+?)(?=Issuing|$)/i);
  const occupation = occMatch ? occMatch[1].trim() : undefined;
  
  // Extract Issuing Place
  const placeMatch = fullText.match(/Issuing\s*Place[:\s]*([A-Za-z\s]+)/i);
  const issuingPlace = placeMatch ? placeMatch[1].trim() : undefined;
  
  return {
    idNumber,
    nameEn,
    nameAr,
    nationality,
    nationalityAr: getArabicNationality(nationality),
    dateOfBirth,
    sex,
    issueDate,
    expiryDate,
    cardNumber,
    occupation,
    issuingPlace
  };
}

// Extract Passport data from OCR text
export function extractPassport(text: string): PassportData | null {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const fullText = lines.join(' ');
  
  // Extract Passport Number
  const passportMatch = fullText.match(/(?:Passport\s*No\.?|护照号)[:\s]*([A-Z]{1,2}\d{7,8})/i);
  const passportNumber = passportMatch ? passportMatch[1].toUpperCase() : '';
  
  // Extract Name
  let nameEn = '';
  const nameMatch = fullText.match(/(?:Name|姓名)[\/\s]*([A-Z][A-Z,\s]+?)(?=性别|Sex|Date|Nationality|$)/i);
  if (nameMatch) {
    nameEn = normalizeName(nameMatch[1]);
  }
  
  // Extract Nationality
  let nationality = '';
  const natMatch = fullText.match(/Nationality[:\s]*([A-Z]+)/i);
  if (natMatch) {
    nationality = natMatch[1].toUpperCase();
  }
  
  // Extract Date of Birth - try multiple patterns
  let dateOfBirth = '';
  const dobPatterns = [
    // Standard format: DD MMM YYYY (e.g., 25 SEP 1992)
    /(?:Date\s*of\s*birth|出生日期)[:\s]*(\d{1,2}\s*[A-Z]{3}\s*\d{4})/i,
    // Format: DD/MM/YYYY or DD-MM-YYYY
    /(?:Date\s*of\s*birth|出生日期)[:\s]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/i,
    // Format with spaces
    /(?:Date\s*of\s*birth|出生日期)[:\s]*(\d{1,2})\s+(\d{1,2})\s+(\d{4})/i,
    // Look for date near "birth" keyword
    /birth[:\s]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/i,
    /birth[:\s]*(\d{1,2}\s*[A-Z]{3}\s*\d{4})/i,
  ];
  
  for (const pattern of dobPatterns) {
    const match = fullText.match(pattern);
    if (match) {
      // Handle the space-separated format specially
      if (match[2] && match[3]) {
        const day = match[1].padStart(2, '0');
        const month = match[2].padStart(2, '0');
        const year = match[3];
        dateOfBirth = parseDate(`${day}/${month}/${year}`);
      } else {
        dateOfBirth = parseDate(match[1]);
      }
      if (dateOfBirth) break;
    }
  }
  
  // Fallback: find any reasonable birth date
  if (!dateOfBirth) {
    const anyDateMatch = fullText.match(/(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})/g);
    if (anyDateMatch) {
      for (const dateStr of anyDateMatch) {
        const parsed = parseDate(dateStr);
        if (parsed) {
          const year = parseInt(parsed.split('-')[0], 10);
          if (year >= 1920 && year <= 2020) {
            dateOfBirth = parsed;
            break;
          }
        }
      }
    }
  }
  
  // Extract Sex
  const sexMatch = fullText.match(/Sex[:\s]*([MF男女])/i);
  let sex: 'M' | 'F' = 'M';
  if (sexMatch) {
    const s = sexMatch[1].toUpperCase();
    sex = (s === 'F' || s === '女') ? 'F' : 'M';
  }
  
  // Extract Place of Birth
  const pobMatch = fullText.match(/Place\s*of\s*birth[:\s]*([A-Z\/]+)/i);
  const placeOfBirth = pobMatch ? pobMatch[1] : undefined;
  
  // Extract Issue Date
  const issueMatch = fullText.match(/(?:Date\s*of\s*issue|签发日期)[:\s]*(\d{1,2}\s*[A-Z]{3}\s*\d{4}|\d{2}\/\d{2}\/\d{4})/i);
  const issueDate = issueMatch ? parseDate(issueMatch[1]) : '';
  
  // Extract Expiry Date
  const expiryMatch = fullText.match(/(?:Date\s*of\s*expiry|有效期至)[:\s]*(\d{1,2}\s*[A-Z]{3}\s*\d{4}|\d{2}\/\d{2}\/\d{4})/i);
  const expiryDate = expiryMatch ? parseDate(expiryMatch[1]) : '';
  
  return {
    passportNumber,
    nameEn,
    nationality,
    nationalityAr: getArabicNationality(nationality),
    dateOfBirth,
    sex,
    placeOfBirth,
    issueDate,
    expiryDate
  };
}

// Extract Trade Certificate data from OCR text
export function extractTradeCertificate(text: string): TradeCertificateData | null {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const fullText = lines.join(' ');
  
  // Extract Trade Name (English)
  const tradeNameMatch = fullText.match(/Trade\s*Name[:\s]*([A-Z][A-Za-z\s\-\.]+(?:L\.?L\.?C|S\.?P\.?C|LLC|SPC)[^\n]*)/i);
  // Clean up: remove any "Trade Name" prefix that might have been captured
  const tradeName = tradeNameMatch 
    ? tradeNameMatch[1].trim().replace(/^Trade\s*Name[:\s]*/i, '').trim() 
    : '';
  
  // Extract Trade Name (Arabic)
  const tradeNameArMatch = fullText.match(/(?:الاسم\s*التجاري|الإسم\s*التجاري)[:\s]*([^\n]+)/);
  const tradeNameAr = tradeNameArMatch ? tradeNameArMatch[1].trim() : '';
  
  // Extract Receipt Number
  const receiptMatch = fullText.match(/Receipt\s*No\.?[:\s]*(\d+)/i);
  const receiptNumber = receiptMatch ? receiptMatch[1] : undefined;
  
  // Extract Transaction Number
  const transMatch = fullText.match(/Transaction\s*No\.?[:\s]*([A-Z]{2}-\d+)/i);
  const transactionNumber = transMatch ? transMatch[1] : undefined;
  
  // Extract Legal Form
  const legalMatch = fullText.match(/Legal\s*Form[:\s]*([^\n]+)/i);
  const legalForm = legalMatch ? legalMatch[1].trim() : '';
  
  // Extract Legal Form (Arabic)
  const legalArMatch = fullText.match(/الشكل\s*القانوني[:\s]*([^\n]+)/);
  const legalFormAr = legalArMatch ? legalArMatch[1].trim() : '';
  
  // Extract Issue Date
  const issueMatch = fullText.match(/Issue\s*Date[:\s]*(\d{2}\/\d{2}\/\d{4})/i);
  const issueDate = issueMatch ? parseDate(issueMatch[1]) : '';
  
  // Extract Expiry Date
  const expiryMatch = fullText.match(/Expiry\s*Date[:\s]*(\d{2}\/\d{2}\/\d{4})/i);
  const expiryDate = expiryMatch ? parseDate(expiryMatch[1]) : '';
  
  // Extract Application Number
  const appMatch = fullText.match(/Application\s*No\.?[:\s]*(\d+)/i);
  const applicationNumber = appMatch ? appMatch[1] : undefined;
  
  // Extract Economic Registry Number
  const ecoMatch = fullText.match(/Economic\s*Registry\s*Number[:\s]*(\d+)/i);
  const economicRegistryNumber = ecoMatch ? ecoMatch[1] : undefined;
  
  // Extract Owners with both English and Arabic names
  const owners: TradeCertificateData['owners'] = [];
  
  // Pattern 1: Standard format with role, nationality, English name
  const ownerPattern = /(\d+)\s+(Owner|Manager|مالك|مدير)\s+([A-Za-z]+)\s+([A-Z][A-Za-z\s]+?)(?=\d|$)/gi;
  let ownerMatch;
  while ((ownerMatch = ownerPattern.exec(fullText)) !== null) {
    owners.push({
      idNumber: ownerMatch[1],
      nameEn: normalizeName(ownerMatch[4]),
      nameAr: '',
      role: ownerMatch[2],
      roleAr: ownerMatch[2].toLowerCase() === 'owner' || ownerMatch[2] === 'مالك' ? 'مالك' : 'مدير',
      nationality: ownerMatch[3],
      nationalityAr: getArabicNationality(ownerMatch[3])
    });
  }
  
  // Pattern 2: Try to find Arabic names associated with owners
  // Look for Arabic name patterns near owner information
  const arabicNamePatterns = [
    // Look for Arabic names after role designation
    /(?:مالك|مدير|Owner|Manager)[:\s]*([\u0600-\u06FF]+(?:\s+[\u0600-\u06FF]+){1,4})/gi,
    // Look for Arabic name lines (2-4 Arabic words together)
    /^([\u0600-\u06FF]+(?:\s+[\u0600-\u06FF]+){1,3})$/gm,
  ];
  
  // Common Arabic labels/words to exclude from names
  const arabicExcludeWords = [
    'الاسم', 'الإسم', 'التجاري', 'القانوني', 'الشكل', 'تاريخ', 'رقم',
    'الترخيص', 'النشاط', 'العنوان', 'الإمارات', 'المتحدة', 'العربية',
    'أبوظبي', 'دبي', 'الشارقة', 'عجمان', 'الفجيرة', 'أم', 'القيوين',
    'رأس', 'الخيمة', 'مالك', 'مدير', 'المائة', 'بالمائة', 'حصة',
    'ذات', 'مسؤولية', 'محدودة', 'شركة', 'المصدر', 'الصادر'
  ];
  
  // Extract potential Arabic names from the text
  const arabicNames: string[] = [];
  for (const line of lines) {
    const arabicOnlyMatch = line.match(/^([\u0600-\u06FF]+(?:\s+[\u0600-\u06FF]+){1,3})$/);
    if (arabicOnlyMatch) {
      const candidate = arabicOnlyMatch[1].trim();
      const words = candidate.split(/\s+/);
      // Check if it looks like a name (2-4 words, not containing excluded words)
      if (words.length >= 2 && words.length <= 4 &&
          !arabicExcludeWords.some(w => candidate.includes(w))) {
        arabicNames.push(candidate);
      }
    }
  }
  
  // Try to match Arabic names with owners by position/index
  if (arabicNames.length > 0 && owners.length > 0) {
    owners.forEach((owner, idx) => {
      if (!owner.nameAr && arabicNames[idx]) {
        owner.nameAr = arabicNames[idx];
      }
    });
  }
  
  // If we still don't have Arabic names but have English names, try to find nearby Arabic text
  owners.forEach((owner) => {
    if (!owner.nameAr && owner.nameEn) {
      // Look for Arabic text near the English name in the original text
      const nameIndex = fullText.indexOf(owner.nameEn);
      if (nameIndex !== -1) {
        // Search in a window around the name
        const windowStart = Math.max(0, nameIndex - 100);
        const windowEnd = Math.min(fullText.length, nameIndex + 100);
        const window = fullText.substring(windowStart, windowEnd);
        
        // Find Arabic names in this window
        const nearbyArabic = window.match(/[\u0600-\u06FF]+(?:\s+[\u0600-\u06FF]+){1,3}/g);
        if (nearbyArabic) {
          for (const candidate of nearbyArabic) {
            const words = candidate.split(/\s+/);
            if (words.length >= 2 && words.length <= 4 &&
                !arabicExcludeWords.some(w => candidate.includes(w))) {
              owner.nameAr = candidate;
              break;
            }
          }
        }
      }
    }
  });
  
  // Extract Activities
  const activities: TradeCertificateData['activities'] = [];
  const activityPattern = /([A-Za-z][A-Za-z\s\(\)]+?)\s+(\d{7})\s+([^\n]+)/g;
  let actMatch;
  while ((actMatch = activityPattern.exec(fullText)) !== null) {
    activities.push({
      code: actMatch[2],
      nameEn: actMatch[1].trim(),
      nameAr: actMatch[3].trim()
    });
  }
  
  return {
    receiptNumber,
    tradeName,
    tradeNameAr,
    transactionNumber,
    legalForm,
    legalFormAr,
    issueDate,
    expiryDate,
    applicationNumber,
    economicRegistryNumber,
    owners,
    activities
  };
}

// Main extraction function
export function extractDocumentData(text: string, documentType: DocumentType): OCRResult {
  try {
    let data: EmiratesIDData | PassportData | TradeCertificateData | null = null;
    let confidence = 0;
    
    switch (documentType) {
      case 'emirates_id':
        data = extractEmiratesID(text);
        // Calculate confidence based on extracted fields
        if (data) {
          const fields = [data.idNumber, data.nameEn, data.nationality, data.dateOfBirth];
          confidence = fields.filter(Boolean).length / fields.length;
        }
        break;
        
      case 'passport':
        data = extractPassport(text);
        if (data) {
          const fields = [data.passportNumber, data.nameEn, data.nationality, data.dateOfBirth];
          confidence = fields.filter(Boolean).length / fields.length;
        }
        break;
        
      case 'trade_certificate':
        data = extractTradeCertificate(text);
        if (data) {
          const fields = [data.tradeName, data.tradeNameAr, data.legalForm];
          confidence = fields.filter(Boolean).length / fields.length;
        }
        break;
    }
    
    return {
      success: confidence > 0.3,
      documentType,
      confidence,
      data,
      rawText: text
    };
  } catch (error) {
    return {
      success: false,
      documentType,
      confidence: 0,
      data: null,
      error: error instanceof Error ? error.message : 'Unknown extraction error'
    };
  }
}
