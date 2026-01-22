import { numberToWordsEn, numberToWordsAr, calculateShareValue } from '@/lib/utils/numberToWords'

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
    reflexive: string    // himself / herself
    reflexiveAr: string  // بنفسه / بنفسها
}

// Pronoun mappings
export const pronounMap: Record<Salutation, Pronouns> = {
    mr: {
        title: 'Mr.',
        titleAr: 'السيد',
        subject: 'he',
        subjectAr: 'هو',
        object: 'him',
        objectAr: 'له',
        possessive: 'his',
        possessiveAr: 'ه',
        reflexive: 'himself',
        reflexiveAr: 'بنفسه'
    },
    ms: {
        title: 'Ms.',
        titleAr: 'السيدة',
        subject: 'she',
        subjectAr: 'هي',
        object: 'her',
        objectAr: 'لها',
        possessive: 'her',
        possessiveAr: 'ها',
        reflexive: 'herself',
        reflexiveAr: 'بنفسها'
    },
    mrs: {
        title: 'Mrs.',
        titleAr: 'السيدة',
        subject: 'she',
        subjectAr: 'هي',
        object: 'her',
        objectAr: 'لها',
        possessive: 'her',
        possessiveAr: 'ها',
        reflexive: 'herself',
        reflexiveAr: 'بنفسها'
    }
}

// Authorized Representative for company partners
export interface AuthorizedRepresentative {
    salutation: Salutation
    name: string
    nameAr: string
    eid: string
    dob: string
    nationality: string
    nationalityAr: string
    pronouns: Pronouns
}

// Company Partner (legal entity as shareholder)
export interface CompanyPartner {
    name: string              // Company name in English
    nameAr: string            // Company name in Arabic
    country: string           // Country of incorporation (English)
    countryAr: string         // Country of incorporation (Arabic)
    licenseNo: string         // Commercial license/registration number
    address: string           // Registered address (English)
    addressAr: string         // Registered address (Arabic)
    email?: string            // Email address
    shareCount: number
    sharePercent: number
    representative: AuthorizedRepresentative
}

// Company info for the existing LLC being amended
export interface CompanyInfo {
    name: string
    nameAr: string
    emirate: string
    emirateAr: string
    address: string
    addressAr: string
    amendmentDate: string
    licenseNo: string
    activities: string
    activitiesAr: string
}

// Manager info
export interface ManagerInfo {
    name: string
    nameAr: string
    eid: string
    dob: string
    salutation: Salutation
    pronouns: Pronouns
    nationality: string
    nationalityAr: string
    address: string
    addressAr: string
}

// Activity entry with code
export interface Activity {
    code: string
    nameEn: string
    nameAr: string
}

// LLC Amendment MOA Context
export interface LLCAmendmentMOAContext {
    company: CompanyInfo
    partners: CompanyPartner[]
    manager: ManagerInfo
    activities: Activity[]
    capital: number
    capitalWordsEn: string
    capitalWordsAr: string
    totalShares: number
    shareValue: number
}

// Ordinal labels for parties
const ordinalEn = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth']
const ordinalAr = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر']

export function getOrdinal(index: number, lang: 'en' | 'ar'): string {
    const arr = lang === 'en' ? ordinalEn : ordinalAr
    return arr[index] || `${index + 1}`
}

// Page footer function
export function pageFooter(pageNum: number, isLastPage: boolean = false): string {
    return `
        <div class="page-footer">
            <div class="page-number">Page ${pageNum}</div>
            ${isLastPage ? '<div class="end-mark">*** END OF DOCUMENT ***</div>' : ''}
        </div>
    `
}

// Store data structure for LLC Amendment MOA
export interface LLCAmendmentMOAData {
    company: {
        name: string
        nameAr: string
        emirate: string
        emirateAr: string
        address: string
        addressAr: string
        amendmentDate: string
        licenseNo: string
    }
    partners: Array<{
        name: string
        nameAr: string
        country: string
        countryAr: string
        licenseNo: string
        address: string
        addressAr: string
        email?: string
        shareCount: number
        representative: {
            salutation: Salutation
            name: string
            nameAr: string
            eid: string
            dob: string
            nationality: string
            nationalityAr: string
        }
    }>
    manager: {
        salutation: Salutation
        name: string
        nameAr: string
        eid: string
        dob: string
        nationality: string
        nationalityAr: string
        address: string
        addressAr: string
    }
    capital: {
        totalCapital: number
        shareCount: number
        shareValue: number
    }
    activities: Activity[]
}

// Store interface
export interface LLCAmendmentMOAStore {
    data: LLCAmendmentMOAData
    updateCompany: (field: keyof LLCAmendmentMOAData['company'], value: string) => void
    updatePartner: (index: number, field: string, value: any) => void
    updatePartnerRepresentative: (index: number, field: string, value: any) => void
    updateManager: (field: string, value: any) => void
    updateCapital: (field: keyof LLCAmendmentMOAData['capital'], value: number) => void
    updateActivities: (activities: Activity[]) => void
    resetData: () => void
    loadSampleData: () => void
    saveToCache: () => void
    initializeFromCache: () => void
}

// Transform store data to context
export function transformToContext(data: LLCAmendmentMOAData): LLCAmendmentMOAContext {
    const companyData = data.company
    const partnersData = data.partners
    const managerData = data.manager
    const activitiesData = data.activities
    const capital = data.capital.totalCapital
    const totalShares = data.capital.shareCount
    const shareValue = data.capital.shareValue

    // Transform partners with pronouns
    const partners: CompanyPartner[] = partnersData.map((p, index) => {
        const pronouns = pronounMap[p.representative.salutation]
        const sharePercent = totalShares > 0 ? Math.round((p.shareCount / totalShares) * 100) : 0

        return {
            name: p.name || 'N/A',
            nameAr: p.nameAr || 'غير متوفر',
            country: p.country || '',
            countryAr: p.countryAr || '',
            licenseNo: p.licenseNo || '',
            address: p.address || '',
            addressAr: p.addressAr || '',
            email: p.email || '',
            shareCount: p.shareCount,
            sharePercent,
            representative: {
                salutation: p.representative.salutation,
                name: p.representative.name || 'N/A',
                nameAr: p.representative.nameAr || 'غير متوفر',
                eid: p.representative.eid || '',
                dob: p.representative.dob || '',
                nationality: p.representative.nationality || '',
                nationalityAr: p.representative.nationalityAr || '',
                pronouns
            }
        }
    })

    // Transform manager with pronouns
    const manager: ManagerInfo = {
        salutation: managerData.salutation,
        name: managerData.name || 'N/A',
        nameAr: managerData.nameAr || 'غير متوفر',
        eid: managerData.eid || '',
        dob: managerData.dob || '',
        nationality: managerData.nationality || '',
        nationalityAr: managerData.nationalityAr || '',
        address: managerData.address || '',
        addressAr: managerData.addressAr || '',
        pronouns: pronounMap[managerData.salutation]
    }

    return {
        company: {
            name: companyData.name || 'N/A',
            nameAr: companyData.nameAr || 'غير متوفر',
            emirate: companyData.emirate || 'Abu Dhabi',
            emirateAr: companyData.emirateAr || 'أبوظبي',
            address: companyData.address || '',
            addressAr: companyData.addressAr || '',
            amendmentDate: companyData.amendmentDate || '____',
            licenseNo: companyData.licenseNo || '',
            activities: activitiesData.map(a => a.nameEn).join(', '),
            activitiesAr: activitiesData.map(a => a.nameAr).join('، ')
        },
        partners,
        manager,
        activities: activitiesData,
        capital,
        capitalWordsEn: numberToWordsEn(capital),
        capitalWordsAr: numberToWordsAr(capital),
        totalShares,
        shareValue
    }
}

// Default activities for LLC Amendment
export const defaultActivities: Activity[] = [
    { code: '7020001', nameEn: 'General Trading', nameAr: 'التجارة العامة' },
    { code: '7020028', nameEn: 'Logistics Consultancy', nameAr: 'الإستشارات اللوجستية' }
]
