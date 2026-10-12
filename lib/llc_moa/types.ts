import { DocumentData, PartyData, ManagerArticle } from '@/store/documentStore'
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
            possessiveAr: 'ه',
            reflexive: 'himself',
            reflexiveAr: 'بنفسه'
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
            possessiveAr: 'ها',
            reflexive: 'herself',
            reflexiveAr: 'بنفسها'
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
        possessiveAr: 'ها',
        reflexive: 'herself',
        reflexiveAr: 'بنفسها'
    }
}

// Plural pronouns for referring to all partners collectively
export interface PluralPronouns {
    subject: string      // they
    subjectAr: string    // هم
    object: string       // them
    objectAr: string     // لهم
    possessive: string   // their
    possessiveAr: string // هم
    reflexive: string    // themselves
    reflexiveAr: string  // بأنفسهم
}

export function getPluralPronouns(): PluralPronouns {
    return {
        subject: 'they',
        subjectAr: 'هم',
        object: 'them',
        objectAr: 'لهم',
        possessive: 'their',
        possessiveAr: 'هم',
        reflexive: 'themselves',
        reflexiveAr: 'بأنفسهم'
    }
}

// Partner (shareholder) in LLC - supports multiple partners
export interface Partner {
    name: string
    nameAr: string
    salutation: Salutation
    pronouns: Pronouns
    nationality: string
    nationalityAr: string
    eid: string
    passport: string
    eidOrPassport: string  // Computed based on documentType
    documentType: 'eid' | 'passport'  // Which document type is being used
    dob: string
    address: string
    addressAr: string
    shareCount: number     // Number of shares owned
    sharePercent: number   // Percentage of total shares
}

export interface CompanyInfo {
    name: string
    nameAr: string
    emirate: string
    emirateAr: string
    address: string
    addressAr: string
    moaDate: string
    activities: string
    activitiesAr: string
}

export interface ManagerInfo {
    name: string
    nameAr: string
    id: string
    salutation: Salutation
    pronouns: Pronouns
    nationality: string
    nationalityAr: string
    address: string
    addressAr: string
    documentType: 'eid' | 'passport'
}

export interface TextStyle {
    bold?: boolean
    italic?: boolean
    underline?: boolean
    fontSize?: 'small' | 'normal' | 'large'
    letterSpacing?: 'normal' | 'wide' | 'wider'
}

// LLC MOA Context - supports multiple partners
export interface LLCMOAContext {
    company: CompanyInfo
    partners: Partner[]           // Array of 2+ partners
    manager: ManagerInfo
    managers: ManagerInfo[]
    activitiesEn: string[]
    activitiesAr: string[]
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

/** Collective reference to the contracting parties in the preamble. */
export function getPartiesPhrase(partnerCount: number): { en: string; ar: string } {
    if (partnerCount === 2) return { en: 'both parties', ar: 'كلا الطرفين' }
    if (partnerCount === 3) return { en: 'three parties', ar: 'الأطراف الثلاثة' }
    return { en: 'all parties', ar: 'جميع الأطراف' }
}

/** One copy per party plus one for the competent authority. */
export function getCopyCount(partnerCount: number): number {
    return partnerCount + 1
}

export function getCopiesWords(copyCount: number): { en: string; ar: string } {
    const en: Record<number, string> = { 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven' }
    const ar: Record<number, string> = { 3: 'ثلاث', 4: 'أربع', 5: 'خمس', 6: 'ست', 7: 'سبع' }
    return {
        en: en[copyCount] || String(copyCount),
        ar: ar[copyCount] || String(copyCount)
    }
}

/** Percentage with one decimal so 95/200 renders as 47.5, not 48. */
export function calculateSharePercent(shareCount: number, totalShares: number): number {
    if (totalShares <= 0) return 0
    return Math.round((shareCount / totalShares) * 1000) / 10
}

function joinEn(parts: string[]): string {
    if (parts.length <= 1) return parts[0] || ''
    if (parts.length === 2) return `${parts[0]} and ${parts[1]}`
    return `${parts.slice(0, -1).join(', ')}, and ${parts[parts.length - 1]}`
}

function joinAr(parts: string[]): string {
    return parts.join('، و')
}

export function formatManagerIdentityEn(m: ManagerInfo): string {
    const idLabel = m.documentType === 'passport' ? 'Passport No' : 'Emirates ID Card No'
    return `<strong class="edited">${m.pronouns.title} ${m.name}</strong>, <span class="edited">${m.nationality}</span> national, holding ${idLabel}: <span class="edited">${m.id}</span>`
}

export function formatManagerIdentityAr(m: ManagerInfo): string {
    const idLabel = m.documentType === 'passport' ? 'جواز السفر رقم' : 'بطاقة هوية رقم'
    const holds = m.salutation === 'mr' ? 'يحمل' : 'تحمل'
    return `<strong class="edited">${m.pronouns.titleAr}/ ${m.nameAr}</strong>، الجنسية <span class="edited">${m.nationalityAr}</span> ${holds} ${idLabel}: <span class="edited">${m.id}</span>`
}

export function listManagersEn(managers: ManagerInfo[]): string {
    return joinEn(managers.map(formatManagerIdentityEn))
}

export function listManagersAr(managers: ManagerInfo[]): string {
    return joinAr(managers.map(formatManagerIdentityAr))
}

export function listManagersNamesEn(managers: ManagerInfo[]): string {
    return joinEn(managers.map(m => `<span class="edited">${m.pronouns.title} ${m.name}</span>, <span class="edited">${m.nationality}</span> national`))
}

export function listManagersNamesAr(managers: ManagerInfo[]): string {
    return joinAr(managers.map(m => `<span class="edited">${m.pronouns.titleAr}/ ${m.nameAr}</span>، الجنسية <span class="edited">${m.nationalityAr}</span>`))
}

function buildManagerInfo(managerData: ManagerArticle, partners: Partner[]): ManagerInfo {
    let managerPartner = partners[0]
    if (managerData.managerName || managerData.managerIdNumber) {
        const matchedPartner = partners.find(p =>
            (managerData.managerName && p.name === managerData.managerName) ||
            (managerData.managerIdNumber && p.eidOrPassport.replace(/-/g, '') === managerData.managerIdNumber.replace(/-/g, ''))
        )
        if (matchedPartner) managerPartner = matchedPartner
    }
    const salutation = (managerData.managerSalutation as Salutation) || managerPartner.salutation
    return {
        name: managerData.managerName || managerPartner.name,
        nameAr: managerData.managerNameAr || managerPartner.nameAr,
        id: (managerData.managerIdNumber || managerPartner.eidOrPassport).replace(/-/g, ''),
        salutation,
        pronouns: getPronouns(salutation),
        nationality: managerData.managerNationality || managerPartner.nationality,
        nationalityAr: managerData.managerNationalityAr || managerPartner.nationalityAr,
        address: managerData.managerAddress || managerPartner.address,
        addressAr: managerData.managerAddressAr || managerPartner.addressAr,
        documentType: managerData.managerDocType || managerPartner.documentType || 'eid',
    }
}

// Format date from YYYY-MM-DD to DD/MM/YYYY
export function formatDateDMY(dateStr: string): string {
    if (!dateStr) return ''
    // Handle YYYY-MM-DD format
    const parts = dateStr.split('-')
    if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`
    }
    return dateStr
}

export function extractLLCContext(data: DocumentData): LLCMOAContext {
    const company = data.company || {}
    const sourceParties = data.sourceParties || []
    const capitalData = data.capital || {}
    const sharesData = data.shares?.source || []

    // Get capital values from store or use defaults
    const capital = capitalData.totalCapital || 10000
    const totalShares = capitalData.shareCount || 100
    const shareValue = capitalData.shareValue || calculateShareValue(capital, totalShares)

    // Transform source parties to Partners with share info
    const partners: Partner[] = sourceParties.map((party: PartyData & { shareCount?: number }, index: number) => {
        const salutation = (party.salutation as Salutation) || 'ms'
        const pronouns = getPronouns(salutation)
        const eid = (party.eidNumber || '').replace(/-/g, '')
        const passport = party.passportNumber || ''
        const documentType = (party.documentType || (passport && !eid ? 'passport' : 'eid')) as 'eid' | 'passport'
        // Read shareCount from party directly or fall back to even distribution
        const shareCount = party.shareCount || sharesData[index] || Math.floor(totalShares / sourceParties.length)

        return {
            name: party.name || 'N/A',
            nameAr: party.nameAr || 'غير متوفر',
            salutation,
            pronouns,
            nationality: party.nationality || 'N/A',
            nationalityAr: party.nationalityAr || 'غير متوفر',
            eid,
            passport,
            eidOrPassport: documentType === 'passport' ? (passport || 'N/A') : (eid || 'N/A'),
            documentType,
            dob: party.dob || '',
            address: party.address || company.address || '',
            addressAr: party.addressAr || company.addressAr || '',
            shareCount,
            sharePercent: calculateSharePercent(shareCount, totalShares)
        }
    })

    // Ensure at least 2 partners for LLC
    while (partners.length < 2) {
        partners.push({
            name: 'Partner ' + (partners.length + 1),
            nameAr: 'الشريك ' + (partners.length + 1),
            salutation: 'mr',
            pronouns: getPronouns('mr'),
            nationality: 'N/A',
            nationalityAr: 'غير متوفر',
            eid: '',
            passport: '',
            eidOrPassport: 'N/A',
            documentType: 'eid',
            dob: '',
            address: '',
            addressAr: '',
            shareCount: 0,
            sharePercent: 0
        })
    }

    // Manager info — one or more managers (sample: Gerald + Ruth)
    const managerArticles: ManagerArticle[] = (data.managers && data.managers.length > 0)
        ? data.managers
        : [data.managerArticle || {}]
    const managers: ManagerInfo[] = managerArticles.map(article => buildManagerInfo(article, partners))
    const manager = managers[0]

    // Parse activities
    const activitiesEn = (company.activities || '')
        .split(/[,;]/).map((s: string) => s.trim()).filter(Boolean)
    const activitiesAr = (company.activitiesAr || '')
        .split(/[,;؛]/).map((s: string) => s.trim()).filter(Boolean)

    return {
        company: {
            name: company.name || 'N/A',
            nameAr: company.nameAr || 'غير متوفر',
            emirate: company.emirate || 'Abu Dhabi',
            emirateAr: company.emirateAr || 'أبوظبي',
            address: company.address || '',
            addressAr: company.addressAr || '',
            moaDate: company.moaDate || '____',
            activities: company.activities || '',
            activitiesAr: company.activitiesAr || ''
        },
        partners,
        manager,
        managers,
        activitiesEn,
        activitiesAr,
        capital,
        capitalWordsEn: numberToWordsEn(capital),
        capitalWordsAr: numberToWordsAr(capital),
        totalShares,
        shareValue
    }
}

// Generate page footer with signature and seal areas
// For LLC: shows "Partners Signature" instead of single signature
export function pageFooter(pageNum: number, isLastPage: boolean = false): string {
    if (isLastPage) {
        // Last page only has translator seal in center (signatures already in content)
        return `
    <div class="page-footer">
      <div class="footer-section footer-left"></div>
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

    return `
    <div class="page-footer">
      <div class="footer-section footer-left">
        <div class="signature-box">
          <span class="signature-line"></span>
          <span class="footer-label">Partners Signature / توقيع الشركاء</span>
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
