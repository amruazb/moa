// LLC to LLC SPC Conversion Types and Interfaces
// For converting a multi-partner LLC to Single Person Company

export type Salutation = 'mr' | 'ms' | 'mrs'

// Activity entry with code (matching trade certificate structure)
export interface Activity {
    code: string
    nameEn: string
    nameAr: string
}

export interface Pronouns {
    title: string        // Mr. / Ms. / Mrs.
    titleAr: string      // السيد / السيدة
    subject: string      // he / she
    subjectAr: string    // هو / هي
    object: string       // him / her
    objectAr: string     // له / لها
    possessive: string   // his / her
    possessiveAr: string // ه / ها
}

export function getPronouns(salutation: Salutation = 'ms'): Pronouns {
    if (salutation === 'mr') {
        return {
            title: 'Mr.',
            titleAr: 'السيد',
            subject: 'he',
            subjectAr: 'هو',
            object: 'him',
            objectAr: 'له',
            possessive: 'his',
            possessiveAr: 'ه'
        }
    }
    if (salutation === 'mrs') {
        return {
            title: 'Mrs.',
            titleAr: 'السيدة',
            subject: 'she',
            subjectAr: 'هي',
            object: 'her',
            objectAr: 'لها',
            possessive: 'her',
            possessiveAr: 'ها'
        }
    }
    return {
        title: 'Ms.',
        titleAr: 'السيدة',
        subject: 'she',
        subjectAr: 'هي',
        object: 'her',
        objectAr: 'لها',
        possessive: 'her',
        possessiveAr: 'ها'
    }
}

// Transfer Party - represents a partner in the transfer
export interface TransferParty {
    name: string
    nameAr: string
    salutation: Salutation
    pronouns: Pronouns
    nationality: string
    nationalityAr: string
    eidOrPassport: string
    documentType: 'eid' | 'passport'
    dob: string           // Date of birth
    address: string
    addressAr: string
    sharesPercent: number // Percentage of shares (0-100)
}

// License/Company Info
export interface LicenseInfo {
    licenseNumber: string
    oldCompanyName: string      // Original LLC company name (before conversion)
    oldCompanyNameAr: string    // Original LLC company name in Arabic
    companyName: string         // New SPC company name (after conversion)
    companyNameAr: string       // New SPC company name in Arabic
    issuingAuthority: string
    issuingAuthorityAr: string
}

// Original MOA reference
export interface OriginalMOA {
    moaNumber: string      // Notary attestation number
    moaDate: string        // Date of original MOA
}

// Capital Information for shares table
export interface CapitalInfo {
    capital: number        // Total capital in AED
    shareCount: number     // Number of shares
    shareValue: number     // Value per share in AED
}

// Manager Info (can be same as Third Party or different)
export interface ManagerInfo {
    isSameAsThirdParty: boolean
    name: string
    nameAr: string
    salutation: Salutation
    pronouns: Pronouns
    eidOrPassport: string
}

// Main context for document generation
export interface LLCToSPCContext {
    agreementDate: string
    firstParty: TransferParty    // First selling partner
    secondParty: TransferParty   // Second selling partner
    thirdParty: TransferParty    // Third selling partner
    newOwner: TransferParty      // New sole owner (buyer)
    manager: ManagerInfo         // Managing Director
    license: LicenseInfo
    originalMOA: OriginalMOA
    capitalInfo: CapitalInfo     // Capital and shares
    activities: Activity[]       // Company activities/objectives
}

// Data stored in document store (partial/optional)
export interface LLCToSPCData {
    agreementDate?: string
    firstParty?: Partial<TransferParty>
    secondParty?: Partial<TransferParty>
    thirdParty?: Partial<TransferParty>
    newOwner?: Partial<TransferParty>
    manager?: Partial<ManagerInfo>
    license?: Partial<LicenseInfo>
    originalMOA?: Partial<OriginalMOA>
    capitalInfo?: Partial<CapitalInfo>
    activities?: Activity[]
}

// Default activities for LLC to SPC conversion
export const defaultLLCToSPCActivities: Activity[] = [
    { code: '8230001', nameEn: 'Event Organizing', nameAr: 'تنظيم الفعاليات' },
    { code: '8230002', nameEn: 'Event Management Services', nameAr: 'خدمات إدارة الفعاليات' },
]

// Extract context from store data with defaults
export function extractLLCToSPCContext(data: LLCToSPCData): LLCToSPCContext {
    const firstSalutation = (data.firstParty?.salutation || 'mr') as Salutation
    const secondSalutation = (data.secondParty?.salutation || 'mr') as Salutation
    const thirdSalutation = (data.thirdParty?.salutation || 'mr') as Salutation

    const firstParty: TransferParty = {
        name: data.firstParty?.name || 'N/A',
        nameAr: data.firstParty?.nameAr || 'غير متوفر',
        salutation: firstSalutation,
        pronouns: getPronouns(firstSalutation),
        nationality: data.firstParty?.nationality || 'Indian',
        nationalityAr: data.firstParty?.nationalityAr || 'هندي',
        eidOrPassport: data.firstParty?.eidOrPassport || 'N/A',
        documentType: data.firstParty?.documentType || 'eid',
        dob: data.firstParty?.dob || '',
        address: data.firstParty?.address || 'Abu Dhabi',
        addressAr: data.firstParty?.addressAr || 'أبوظبي',
        sharesPercent: data.firstParty?.sharesPercent ?? 50
    }

    const secondParty: TransferParty = {
        name: data.secondParty?.name || 'N/A',
        nameAr: data.secondParty?.nameAr || 'غير متوفر',
        salutation: secondSalutation,
        pronouns: getPronouns(secondSalutation),
        nationality: data.secondParty?.nationality || 'Indian',
        nationalityAr: data.secondParty?.nationalityAr || 'هندي',
        eidOrPassport: data.secondParty?.eidOrPassport || 'N/A',
        documentType: data.secondParty?.documentType || 'eid',
        dob: data.secondParty?.dob || '',
        address: data.secondParty?.address || 'Abu Dhabi',
        addressAr: data.secondParty?.addressAr || 'أبوظبي',
        sharesPercent: data.secondParty?.sharesPercent ?? 50
    }

    const thirdParty: TransferParty = {
        name: data.thirdParty?.name || 'N/A',
        nameAr: data.thirdParty?.nameAr || 'غير متوفر',
        salutation: thirdSalutation,
        pronouns: getPronouns(thirdSalutation),
        nationality: data.thirdParty?.nationality || 'N/A',
        nationalityAr: data.thirdParty?.nationalityAr || 'غير متوفر',
        eidOrPassport: data.thirdParty?.eidOrPassport || 'N/A',
        documentType: data.thirdParty?.documentType || 'eid',
        dob: data.thirdParty?.dob || '',
        address: data.thirdParty?.address || 'Abu Dhabi',
        addressAr: data.thirdParty?.addressAr || 'أبوظبي',
        sharesPercent: data.thirdParty?.sharesPercent ?? 0
    }

    // New Owner (buyer) - the 4th party who buys all shares
    const newOwnerSalutation = (data.newOwner?.salutation || 'ms') as Salutation
    const newOwner: TransferParty = {
        name: data.newOwner?.name || 'N/A',
        nameAr: data.newOwner?.nameAr || 'غير متوفر',
        salutation: newOwnerSalutation,
        pronouns: getPronouns(newOwnerSalutation),
        nationality: data.newOwner?.nationality || 'Indian',
        nationalityAr: data.newOwner?.nationalityAr || 'هندي',
        eidOrPassport: data.newOwner?.eidOrPassport || 'N/A',
        documentType: data.newOwner?.documentType || 'eid',
        dob: data.newOwner?.dob || '',
        address: data.newOwner?.address || 'Abu Dhabi',
        addressAr: data.newOwner?.addressAr || 'أبوظبي',
        sharesPercent: 100 // New owner gets 100%
    }

    const license: LicenseInfo = {
        licenseNumber: data.license?.licenseNumber || 'CN-0000000',
        oldCompanyName: data.license?.oldCompanyName || 'N/A',
        oldCompanyNameAr: data.license?.oldCompanyNameAr || 'غير متوفر',
        companyName: data.license?.companyName || 'N/A',
        companyNameAr: data.license?.companyNameAr || 'غير متوفر',
        issuingAuthority: data.license?.issuingAuthority || 'Department of Economic Development – Abu Dhabi',
        issuingAuthorityAr: data.license?.issuingAuthorityAr || 'دائرة التنمية الاقتصادية – أبوظبي'
    }

    const originalMOA: OriginalMOA = {
        moaNumber: data.originalMOA?.moaNumber || '',
        moaDate: data.originalMOA?.moaDate || ''
    }

    // Manager - defaults to New Owner if isSameAsNewOwner is true
    const isSameAsNewOwner = data.manager?.isSameAsThirdParty !== false // Using same flag name for backwards compatibility
    const managerSalutation = isSameAsNewOwner ? newOwnerSalutation : (data.manager?.salutation || 'mr') as Salutation
    const manager: ManagerInfo = {
        isSameAsThirdParty: isSameAsNewOwner,
        name: isSameAsNewOwner ? newOwner.name : (data.manager?.name || 'N/A'),
        nameAr: isSameAsNewOwner ? newOwner.nameAr : (data.manager?.nameAr || 'غير متوفر'),
        salutation: managerSalutation,
        pronouns: getPronouns(managerSalutation),
        eidOrPassport: isSameAsNewOwner ? newOwner.eidOrPassport : (data.manager?.eidOrPassport || 'N/A')
    }
    const capitalInfo: CapitalInfo = {
        capital: data.capitalInfo?.capital || 10000,
        shareCount: data.capitalInfo?.shareCount || 100,
        shareValue: data.capitalInfo?.shareValue || 100
    }

    // Activities - use provided or default
    const activities: Activity[] = data.activities?.length
        ? data.activities
        : defaultLLCToSPCActivities

    return {
        agreementDate: data.agreementDate || new Date().toISOString().split('T')[0],
        firstParty,
        secondParty,
        thirdParty,
        newOwner,
        manager,
        license,
        originalMOA,
        capitalInfo,
        activities
    }
}

// Page footer for conversion document
export function conversionPageFooter(pageNum: number, isLastPage: boolean = false): string {
    const signatures = isLastPage ? '' : `
        <div class="signature-box">
          <span class="signature-line"></span>
          <span class="footer-label">Signatures / التوقيعات</span>
        </div>`

    return `
    <div class="page-footer">
      <div class="footer-section footer-left">
        ${signatures}
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
