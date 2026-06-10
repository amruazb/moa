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
    sellers?: Partial<TransferParty>[]
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
    const firstPartyData = data.sellers?.[0] || data.firstParty || {}
    const secondPartyData = data.sellers?.[1] || data.secondParty || {}
    const thirdPartyData = data.sellers?.[2] || data.thirdParty || {}

    const firstSalutation = (firstPartyData.salutation || 'mr') as Salutation
    const secondSalutation = (secondPartyData.salutation || 'mr') as Salutation
    const thirdSalutation = (thirdPartyData.salutation || 'mr') as Salutation

    const firstParty: TransferParty = {
        name: firstPartyData.name || 'N/A',
        nameAr: firstPartyData.nameAr || 'غير متوفر',
        salutation: firstSalutation,
        pronouns: getPronouns(firstSalutation),
        nationality: firstPartyData.nationality || 'Indian',
        nationalityAr: firstPartyData.nationalityAr || 'هندي',
        eidOrPassport: firstPartyData.eidOrPassport || 'N/A',
        documentType: firstPartyData.documentType || 'eid',
        dob: firstPartyData.dob || '',
        address: firstPartyData.address || 'Abu Dhabi',
        addressAr: firstPartyData.addressAr || 'أبوظبي',
        sharesPercent: firstPartyData.sharesPercent ?? 50
    }

    const secondParty: TransferParty = {
        name: secondPartyData.name || 'N/A',
        nameAr: secondPartyData.nameAr || 'غير متوفر',
        salutation: secondSalutation,
        pronouns: getPronouns(secondSalutation),
        nationality: secondPartyData.nationality || 'Indian',
        nationalityAr: secondPartyData.nationalityAr || 'هندي',
        eidOrPassport: secondPartyData.eidOrPassport || 'N/A',
        documentType: secondPartyData.documentType || 'eid',
        dob: secondPartyData.dob || '',
        address: secondPartyData.address || 'Abu Dhabi',
        addressAr: secondPartyData.addressAr || 'أبوظبي',
        sharesPercent: secondPartyData.sharesPercent ?? 50
    }

    const thirdParty: TransferParty = {
        name: thirdPartyData.name || '',
        nameAr: thirdPartyData.nameAr || '',
        salutation: thirdSalutation,
        pronouns: getPronouns(thirdSalutation),
        nationality: thirdPartyData.nationality || 'Indian',
        nationalityAr: thirdPartyData.nationalityAr || 'هندي',
        eidOrPassport: thirdPartyData.eidOrPassport || '',
        documentType: thirdPartyData.documentType || 'eid',
        dob: thirdPartyData.dob || '',
        address: thirdPartyData.address || 'Abu Dhabi',
        addressAr: thirdPartyData.addressAr || 'أبوظبي',
        sharesPercent: thirdPartyData.sharesPercent ?? 0
    }

    // New Owner (buyer - Prardhana)
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
