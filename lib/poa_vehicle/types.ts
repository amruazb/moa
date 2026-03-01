// POA Vehicle (Power of Attorney for Selling Mortgaged Vehicle) Types and Interfaces

// Vehicle details interface
export interface VehicleDetails {
    vehicleType: string
    vehicleTypeAr: string
    trademark: string
    trademarkAr: string
    manufactureYear: string
    countryOfOrigin: string
    countryOfOriginAr: string
    engineNumber: string
    chassisNumber: string
    licensePlate: string
}

// Owner/Principal for vehicle POA
export interface POAVehicleOwner {
    name: string
    nameAr: string
    nationality: string
    nationalityAr: string
    dateOfBirth: string
    eidOrPassport: string
    documentType: 'eid' | 'passport'
    // Company/License context (as manager)
    companyName?: string
    companyNameAr?: string
    licenseNumber?: string
    issuingAuthority?: string
    issuingAuthorityAr?: string
}

// Bank/Attorney details
export interface POAVehicleBank {
    name: string
    nameAr: string
    licenseNumber: string
}

// Main context for document generation
export interface POAVehicleContext {
    owner: POAVehicleOwner
    bank: POAVehicleBank
    vehicles: VehicleDetails[]
    validityYears: number
    attestationDate: string
    poaNumber: string
    poaDate: string
}

// POA Vehicle Data stored in document store
export interface POAVehicleData {
    owner?: Partial<POAVehicleOwner>
    bank?: Partial<POAVehicleBank>
    vehicles?: Partial<VehicleDetails>[]
    validityYears?: number
    attestationDate?: string
    poaNumber?: string
    poaDate?: string
}

// Extract POA Vehicle context from store data
export function extractPOAVehicleContext(data: POAVehicleData): POAVehicleContext {
    const owner: POAVehicleOwner = {
        name: data.owner?.name || 'N/A',
        nameAr: data.owner?.nameAr || 'غير متوفر',
        nationality: data.owner?.nationality || 'N/A',
        nationalityAr: data.owner?.nationalityAr || 'غير متوفر',
        dateOfBirth: data.owner?.dateOfBirth || '',
        eidOrPassport: data.owner?.eidOrPassport || 'N/A',
        documentType: data.owner?.documentType || 'eid',
        companyName: data.owner?.companyName || '',
        companyNameAr: data.owner?.companyNameAr || '',
        licenseNumber: data.owner?.licenseNumber || '',
        issuingAuthority: data.owner?.issuingAuthority || 'Abu Dhabi Department of Economic Development',
        issuingAuthorityAr: data.owner?.issuingAuthorityAr || 'دائرة التنمية الاقتصادية – أبوظبي'
    }

    const bank: POAVehicleBank = {
        name: data.bank?.name || 'Bank of Baroda',
        nameAr: data.bank?.nameAr || 'بنك بارودا',
        licenseNumber: data.bank?.licenseNumber || 'CN-1002008'
    }

    const vehicles: VehicleDetails[] = (data.vehicles || []).map((v) => ({
        vehicleType: v.vehicleType || '',
        vehicleTypeAr: v.vehicleTypeAr || '',
        trademark: v.trademark || '',
        trademarkAr: v.trademarkAr || '',
        manufactureYear: v.manufactureYear || '',
        countryOfOrigin: v.countryOfOrigin || '',
        countryOfOriginAr: v.countryOfOriginAr || '',
        engineNumber: v.engineNumber || '',
        chassisNumber: v.chassisNumber || '',
        licensePlate: v.licensePlate || ''
    }))

    return {
        owner,
        bank,
        vehicles,
        validityYears: data.validityYears || 3,
        attestationDate: data.attestationDate || '',
        poaNumber: data.poaNumber || '',
        poaDate: data.poaDate || ''
    }
}

// Page footer for POA Vehicle document
export function poaVehiclePageFooter(pageNum: number): string {
    return `
    <div class="page-footer">
      <div class="footer-section footer-left">
        <div class="signature-box">
          <span class="signature-line"></span>
          <span class="footer-label">Signature / التوقيع</span>
        </div>
      </div>
      <div class="footer-section footer-center">
        <div class="signature-box">
          <span class="signature-line"></span>
          <span class="footer-label">ختم المترجم والتوقيع / Translator Seal & Sign</span>
        </div>
      </div>
      <div class="footer-section footer-right">
        <span class="page-num">${pageNum}</span>
      </div>
    </div>`
}

// Number to words for validity years
export function yearsToWords(years: number): { en: string; ar: string } {
    const wordsEn: Record<number, string> = {
        1: 'one (1)',
        2: 'two (2)',
        3: 'three (3)',
        4: 'four (4)',
        5: 'five (5)'
    }
    const wordsAr: Record<number, string> = {
        1: 'سنة واحدة (1)',
        2: 'سنتين (2)',
        3: 'ثلاث سنوات (3)',
        4: 'أربع سنوات (4)',
        5: 'خمس سنوات (5)'
    }
    return {
        en: wordsEn[years] || `${years}`,
        ar: wordsAr[years] || `${years}`
    }
}
