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
  
  // Check for DD/MM/YYYY or DD-MM-YYYY
  let match = dateStr.match(/(\d{2})[\/\-](\d{2})[\/\-](\d{4})/);
  if (match) {
    return `${match[3]}-${match[2]}-${match[1]}`;
  }
  
  // Check for DD MMM YYYY (e.g., "25 SEP 1992")
  match = dateStr.match(/(\d{1,2})\s+([A-Z]{3})\s+(\d{4})/i);
  if (match) {
    const day = match[1].padStart(2, '0');
    const month = monthMap[match[2].toUpperCase()] || '01';
    return `${match[3]}-${month}-${day}`;
  }
  
  // Check for YYYY-MM-DD or YYYY/MM/DD
  match = dateStr.match(/(\d{4})[\/\-](\d{2})[\/\-](\d{2})/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  
  return dateStr;
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
  const idNumber = idMatch ? idMatch[0].replace(/\s/g, '') : '';
  
  // Extract Name (English) - usually after "Name:" or "Name"
  let nameEn = '';
  const nameMatch = fullText.match(/Name[:\s]+([A-Z][A-Z\s]+?)(?=Date|Nationality|ID|$)/i);
  if (nameMatch) {
    nameEn = normalizeName(nameMatch[1]);
  }
  
  // Extract Name (Arabic) - RTL text
  const arabicNameMatch = fullText.match(/الاسم[:\s]*([^\n]+)/);
  const nameAr = arabicNameMatch ? arabicNameMatch[1].trim() : '';
  
  // Extract Nationality
  let nationality = '';
  const natMatch = fullText.match(/Nationality[:\s]*([A-Z]+)/i);
  if (natMatch) {
    nationality = natMatch[1].toUpperCase();
  }
  
  // Extract Date of Birth
  let dateOfBirth = '';
  const dobMatch = fullText.match(/(?:Date\s*(?:Of|of)\s*Birth|DOB)[:\s]*(\d{2}\/\d{2}\/\d{4})/i);
  if (dobMatch) {
    dateOfBirth = parseDate(dobMatch[1]);
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
  
  // Extract Date of Birth
  let dateOfBirth = '';
  const dobMatch = fullText.match(/(?:Date\s*of\s*birth|出生日期)[:\s]*(\d{1,2}\s*[A-Z]{3}\s*\d{4}|\d{2}\/\d{2}\/\d{4})/i);
  if (dobMatch) {
    dateOfBirth = parseDate(dobMatch[1]);
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
  const tradeName = tradeNameMatch ? tradeNameMatch[1].trim() : '';
  
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
  
  // Extract Owners (simplified - would need more complex parsing for tables)
  const owners: TradeCertificateData['owners'] = [];
  const ownerPattern = /(\d+)\s+(Owner|Manager|مالك|مدير)\s+([A-Za-z]+)\s+([A-Z][A-Za-z\s]+?)(?=\d|$)/gi;
  let ownerMatch;
  while ((ownerMatch = ownerPattern.exec(fullText)) !== null) {
    owners.push({
      idNumber: ownerMatch[1],
      nameEn: normalizeName(ownerMatch[4]),
      nameAr: '',
      role: ownerMatch[2],
      roleAr: ownerMatch[2] === 'Owner' ? 'مالك' : 'مدير',
      nationality: ownerMatch[3],
      nationalityAr: getArabicNationality(ownerMatch[3])
    });
  }
  
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
