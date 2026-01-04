import { DocumentData, PartyData } from '@/store/documentStore'
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
    eidOrPassport: string  // Computed: eid || passport
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

export function extractLLCContext(data: DocumentData): LLCMOAContext {
    const company = data.company || {}
    const sourceParties = data.sourceParties || []
    const managerData = data.managerArticle || {}
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
            eidOrPassport: eid || passport || 'N/A',
            dob: party.dob || '',
            address: party.address || company.address || '',
            addressAr: party.addressAr || company.addressAr || '',
            shareCount,
            sharePercent: totalShares > 0 ? Math.round((shareCount / totalShares) * 100) : 0
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
            dob: '',
            address: company.address || '',
            addressAr: company.addressAr || '',
            shareCount: 0,
            sharePercent: 0
        })
    }

    // Manager info - defaults to first partner if not specified
    const managerSalutation = (managerData.managerDocType === 'eid' ? 'mr' : 'ms') as Salutation
    const manager: ManagerInfo = {
        name: managerData.managerName || partners[0].name,
        nameAr: managerData.managerNameAr || partners[0].nameAr,
        id: (managerData.managerIdNumber || partners[0].eidOrPassport).replace(/-/g, ''),
        salutation: partners[0].salutation,
        pronouns: partners[0].pronouns
    }

    // Parse activities
    const activitiesEn = (company.activities || '')
        .split(/[,;]/).map((s: string) => s.trim()).filter(Boolean)
    const activitiesAr = (company.activitiesAr || '')
        .split(/[,؛]/).map((s: string) => s.trim()).filter(Boolean)

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
