// OCR Document Types and Extracted Data Interfaces

export type DocumentType = 'emirates_id' | 'passport' | 'trade_certificate';

export interface EmiratesIDData {
  idNumber: string;          // e.g., "784-1992-4856618-6"
  nameEn: string;            // e.g., "LI YIWEN"
  nameAr: string;            // e.g., "لى يوين"
  nationality: string;       // e.g., "CHINA"
  nationalityAr: string;     // e.g., "الصين"
  dateOfBirth: string;       // e.g., "1992-09-25"
  sex: 'M' | 'F';
  issueDate: string;
  expiryDate: string;
  cardNumber?: string;       // Back of card
  occupation?: string;       // e.g., "MANAGING DIRECTOR"
  issuingPlace?: string;     // e.g., "Abu Dhabi"
}

export interface PassportData {
  passportNumber: string;    // e.g., "EF0012318"
  nameEn: string;            // e.g., "LI, YIWEN"
  nameAr?: string;
  nationality: string;       // e.g., "CHINESE"
  nationalityAr?: string;
  dateOfBirth: string;       // e.g., "1992-09-25"
  sex: 'M' | 'F';
  placeOfBirth?: string;     // e.g., "TIANJIN"
  issueDate: string;
  expiryDate: string;
  issuingAuthority?: string;
}

export interface TradeCertificateData {
  receiptNumber?: string;
  tradeName: string;         // e.g., "YUANVERSE CAFE - L.L.C - S.P.C"
  tradeNameAr: string;       // e.g., "يوانفيرس كافيه - ذ.م.م - ش.ش.و"
  transactionNumber?: string;
  legalForm: string;         // e.g., "Limited Liability Company - Sole Proprietorship Company"
  legalFormAr: string;
  issueDate: string;
  expiryDate: string;
  applicationNumber?: string;
  economicRegistryNumber?: string;
  owners: OwnerInfo[];
  activities: ActivityInfo[];
}

export interface OwnerInfo {
  idNumber: string;          // e.g., "42644548"
  nameEn: string;
  nameAr: string;
  role: string;              // e.g., "Owner", "Manager"
  roleAr: string;            // e.g., "مالك", "مدير"
  nationality: string;
  nationalityAr: string;
}

export interface ActivityInfo {
  code: string;              // e.g., "4610008"
  nameEn: string;            // e.g., "Importing"
  nameAr: string;            // e.g., "استيراد"
}

export interface OCRResult {
  success: boolean;
  documentType: DocumentType;
  confidence: number;
  data: EmiratesIDData | PassportData | TradeCertificateData | null;
  rawText?: string;
  error?: string;
}

// Mapping functions to convert OCR data to form data
export interface FormFieldMapping {
  emiratesId: {
    partyFields: Partial<Record<keyof EmiratesIDData, string>>;
  };
  passport: {
    partyFields: Partial<Record<keyof PassportData, string>>;
  };
  tradeCertificate: {
    companyFields: Partial<Record<string, string>>;
  };
}
