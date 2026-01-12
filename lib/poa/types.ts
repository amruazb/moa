// POA (Power of Attorney) Types and Interfaces

export type Salutation = 'mr' | 'ms' | 'mrs'

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

// Principal (Power Giver) - Company owner or partner
export interface POAPrincipal {
    name: string
    nameAr: string
    salutation: Salutation
    pronouns: Pronouns
    nationality: string
    nationalityAr: string
    eidOrPassport: string
    documentType: 'eid' | 'passport'
    address: string
    addressAr: string
}

// Attorney (Power Receiver)
export interface POAAttorney {
    name: string
    nameAr: string
    salutation: Salutation
    pronouns: Pronouns
    nationality: string
    nationalityAr: string
    eidOrPassport: string
    documentType: 'eid' | 'passport'
    address: string
    addressAr: string
}

// License/Company Info
export interface POALicense {
    licenseNumber: string
    companyName: string
    companyNameAr: string
    issuingAuthority: string
    issuingAuthorityAr: string
}

// Section toggles - which powers are granted
export interface POASections {
    executeTransactions: boolean  // Section 1: Contact government departments
    employees: boolean            // Section 2: Appoint/terminate employees
    utilities: boolean            // Section 3: Phone, internet, water, electricity
    banks: boolean                // Section 4: Open/manage bank accounts
    banksWithLoan: boolean        // Sub-toggle: with or without loan facilities
    contracts: boolean            // Section 5: Sign contracts, MOA, tenders
    receivables: boolean          // Section 6: Collect cash/cheques
    motorVehicles: boolean        // Section 7: Register, buy, sell vehicles
    approachCourts: boolean       // Section 8: Lawsuits, complaints, settlements
}

// Validity period
export interface POAValidity {
    years: number                 // 1, 2, or 3 years (or custom)
    attestationDate: string       // Date of attestation by notary
}

// Main POA Context for document generation
export interface POAContext {
    principal: POAPrincipal
    attorney: POAAttorney
    license: POALicense
    sections: POASections
    validity: POAValidity
}

// POA Data stored in document store
export interface POAData {
    principal?: Partial<POAPrincipal>
    attorney?: Partial<POAAttorney>
    license?: Partial<POALicense>
    sections?: Partial<POASections>
    validity?: Partial<POAValidity>
}

// Extract POA context from store data
export function extractPOAContext(data: POAData): POAContext {
    const principalSalutation = (data.principal?.salutation || 'mrs') as Salutation
    const attorneySalutation = (data.attorney?.salutation || 'mr') as Salutation

    const principal: POAPrincipal = {
        name: data.principal?.name || 'N/A',
        nameAr: data.principal?.nameAr || 'غير متوفر',
        salutation: principalSalutation,
        pronouns: getPronouns(principalSalutation),
        nationality: data.principal?.nationality || 'UAE',
        nationalityAr: data.principal?.nationalityAr || 'إماراتية',
        eidOrPassport: data.principal?.eidOrPassport || 'N/A',
        documentType: data.principal?.documentType || 'eid',
        address: data.principal?.address || '',
        addressAr: data.principal?.addressAr || ''
    }

    const attorney: POAAttorney = {
        name: data.attorney?.name || 'N/A',
        nameAr: data.attorney?.nameAr || 'غير متوفر',
        salutation: attorneySalutation,
        pronouns: getPronouns(attorneySalutation),
        nationality: data.attorney?.nationality || 'N/A',
        nationalityAr: data.attorney?.nationalityAr || 'غير متوفر',
        eidOrPassport: data.attorney?.eidOrPassport || 'N/A',
        documentType: data.attorney?.documentType || 'eid',
        address: data.attorney?.address || '',
        addressAr: data.attorney?.addressAr || ''
    }

    const license: POALicense = {
        licenseNumber: data.license?.licenseNumber || 'CN-0000000',
        companyName: data.license?.companyName || 'N/A',
        companyNameAr: data.license?.companyNameAr || 'غير متوفر',
        issuingAuthority: data.license?.issuingAuthority || 'Department of Economic Development – Abu Dhabi',
        issuingAuthorityAr: data.license?.issuingAuthorityAr || 'دائرة التنمية الاقتصادية – أبوظبي'
    }

    const sections: POASections = {
        executeTransactions: data.sections?.executeTransactions ?? true,
        employees: data.sections?.employees ?? true,
        utilities: data.sections?.utilities ?? true,
        banks: data.sections?.banks ?? true,
        banksWithLoan: data.sections?.banksWithLoan ?? false,  // Default: without loan
        contracts: data.sections?.contracts ?? true,
        receivables: data.sections?.receivables ?? true,
        motorVehicles: data.sections?.motorVehicles ?? true,
        approachCourts: data.sections?.approachCourts ?? true
    }

    const validity: POAValidity = {
        years: data.validity?.years || 3,
        attestationDate: data.validity?.attestationDate || ''
    }

    return {
        principal,
        attorney,
        license,
        sections,
        validity
    }
}

// Page footer for POA document
export function poaPageFooter(pageNum: number, isLastPage: boolean = false): string {
    const principalSignature = isLastPage ? '' : `
        <div class="signature-box">
          <span class="signature-line"></span>
          <span class="footer-label">Principal Signature / توقيع الموكل</span>
        </div>`

    return `
    <div class="page-footer">
      <div class="footer-section footer-left">
        ${principalSignature}
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
        1: 'One (1)',
        2: 'Two (2)',
        3: 'Three (3)',
        4: 'Four (4)',
        5: 'Five (5)'
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
