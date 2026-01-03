import { DocumentData } from '@/store/documentStore'
import { numberToWordsEn, numberToWordsAr, calculateShareValue } from '@/lib/utils/numberToWords'

export type Salutation = 'mr' | 'ms' | 'mrs'

export interface Pronouns {
  title: string        // Mr. / Ms. / Mrs.
  titleAr: string      // السيد / السيدة
  subject: string      // he / she
  subjectAr: string    // هو / هي
  object: string       // him / her
  possessive: string   // his / her
  reflexive: string    // himself / herself
}

export function getPronouns(salutation: Salutation = 'ms'): Pronouns {
  if (salutation === 'mr') {
    return {
      title: 'Mr.',
      titleAr: 'السيد',
      subject: 'he',
      subjectAr: 'هو',
      object: 'him',
      possessive: 'his',
      reflexive: 'himself'
    }
  }
  if (salutation === 'mrs') {
    return {
      title: 'Mrs.',
      titleAr: 'السيدة',
      subject: 'she',
      subjectAr: 'هي',
      object: 'her',
      possessive: 'her',
      reflexive: 'herself'
    }
  }
  return {
    title: 'Ms.',
    titleAr: 'السيدة',
    subject: 'she',
    subjectAr: 'هي',
    object: 'her',
    possessive: 'her',
    reflexive: 'herself'
  }
}

export interface PrimaryParty {
  name: string
  nameAr: string
  salutation: Salutation
  nationality: string
  nationalityAr: string
  eid: string
  passport: string
  dob: string
  address: string
  addressAr: string
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
}

export interface TextStyle {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  fontSize?: 'small' | 'normal' | 'large'
  letterSpacing?: 'normal' | 'wide' | 'wider'
}

export interface MOAContext {
  company: CompanyInfo
  primary: PrimaryParty
  manager: ManagerInfo
  pronouns: Pronouns
  eidOrPassport: string
  activitiesEn: string[]
  activitiesAr: string[]
  capital: number
  capitalWordsEn: string
  capitalWordsAr: string
  shareCount: number
  shareValue: number
}

export function extractContext(data: DocumentData): MOAContext {
  const company = data.company || {}
  const source = data.sourceParties || []
  const manager = data.managerArticle || {}
  const capitalData = data.capital || {}

  const salutation = (source[0]?.salutation as Salutation) || 'ms'
  const pronouns = getPronouns(salutation)

  const primary: PrimaryParty = {
    name: source[0]?.name || 'N/A',
    nameAr: source[0]?.nameAr || 'غير متوفر',
    salutation: salutation,
    nationality: source[0]?.nationality || 'N/A',
    nationalityAr: source[0]?.nationalityAr || 'غير متوفر',
    eid: (source[0]?.eidNumber || '').replace(/-/g, ''),
    passport: source[0]?.passportNumber || '',
    dob: source[0]?.dob || '',
    address: source[0]?.address || company.address || '',
    addressAr: source[0]?.addressAr || company.addressAr || ''
  }

  const eidOrPassport = primary.eid || primary.passport || 'N/A'

  const activitiesEn = (company.activities || '')
    .split(/[,;]/).map((s: string) => s.trim()).filter(Boolean)
  const activitiesAr = (company.activitiesAr || '')
    .split(/[,؛]/).map((s: string) => s.trim()).filter(Boolean)

  // Get capital values from store or use defaults
  const capital = capitalData.totalCapital || 10000
  const shareCount = capitalData.shareCount || 100
  const shareValue = capitalData.shareValue || calculateShareValue(capital, shareCount)

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
    primary,
    manager: {
      name: manager.managerName || primary.name,
      nameAr: manager.managerNameAr || primary.nameAr,
      id: (manager.managerIdNumber || eidOrPassport).replace(/-/g, '')
    },
    pronouns,
    eidOrPassport,
    activitiesEn,
    activitiesAr,
    capital,
    capitalWordsEn: numberToWordsEn(capital),
    capitalWordsAr: numberToWordsAr(capital),
    shareCount,
    shareValue
  }
}

// Generate page footer with signature and seal areas
// Fixed 2-inch (51mm) height for consistent alignment across print/PDF
export function pageFooter(pageNum: number, isLastPage: boolean = false): string {
  if (isLastPage) {
    // Last page only has translator seal in center (signature already in content)
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
