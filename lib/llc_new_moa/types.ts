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

export function getPronouns(salutation: Salutation = 'mr'): Pronouns {
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

// Authorized representative who signs on behalf of company partner
export interface AuthorizedRepresentative {
    salutation: Salutation
    name: string
    nameAr: string
    eid: string              // Emirates ID number
    dob: string              // Date of birth YYYY-MM-DD
    nationality: string
    nationalityAr: string
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

// Company info for the new LLC being formed
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

// LLC New MOA Context - for company partners
export interface LLCNewMOAContext {
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

// Format date from YYYY-MM-DD to DD/MM/YYYY
export function formatDateDMY(dateStr: string): string {
    if (!dateStr) return ''
    const parts = dateStr.split('-')
    if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`
    }
    return dateStr
}

// Store data structure
export interface LLCNewMOAData {
    company: {
        name: string
        nameAr: string
        emirate: string
        emirateAr: string
        address: string
        addressAr: string
        moaDate: string
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

// Default activities from trade name certificate
export const defaultActivities: Activity[] = [
    { code: '0910018', nameEn: 'Onshore And Offshore Oil And Gas Fields And Facilities Services', nameAr: 'خدمات حقول ومنشآت النفط والغاز البرية والبحرية' },
    { code: '5222005', nameEn: 'Ships Management And Operation', nameAr: 'ادارة السفن وتشغيلها' },
    { code: '7711001', nameEn: 'Commercial Ships Rental', nameAr: 'تأجير السفن التجارية' },
    { code: '7711002', nameEn: 'Ship Renting Intermediate', nameAr: 'وساطة تأجير السفن' },
    { code: '4669014', nameEn: 'Wholesale Of Ships and Boats Trading', nameAr: 'تجارة الجملة للسفن والقوارب' },
    { code: '3315001', nameEn: 'Repair And Maintenance of Ships', nameAr: 'إصلاح وصيانة السفن' },
    { code: '4741001', nameEn: 'Retail Sale of Ships and Boats', nameAr: 'بيع التجزئة للسفن والقوارب' },
    { code: '5012001', nameEn: 'Marine Transportation of Goods Between Countries', nameAr: 'النقل البحري للبضائع بين الدول' },
    { code: '5200009', nameEn: 'Goods Marine Shipment Services', nameAr: 'خدمات الشحن البحري للبضائع' },
    { code: '5210008', nameEn: 'Storehouses and Warehouses Management and Operation', nameAr: 'إدارة وتشغيل المخازن والمستودعات' },
    { code: '5224006', nameEn: 'Shipment Containers Loading and Offloading Services', nameAr: 'خدمات تحميل حاويات الشحن وتفريغها' },
    { code: '8211015', nameEn: 'Project Management Services', nameAr: 'خدمات ادارة المشاريع' },
    { code: '7020028', nameEn: 'Logistics Consultancy', nameAr: 'الإستشارات اللوجستية' }
]

// Extract context from store data
export function extractLLCNewMOAContext(data: LLCNewMOAData): LLCNewMOAContext {
    const companyData = data.company || {}
    const partnersData = data.partners || []
    const managerData = data.manager || {}
    const capitalData = data.capital || {}
    const activitiesData = data.activities || defaultActivities

    const capital = capitalData.totalCapital || 150000
    const totalShares = capitalData.shareCount || 100
    const shareValue = capitalData.shareValue || calculateShareValue(capital, totalShares)

    // Transform partners data
    const partners: CompanyPartner[] = partnersData.map((p, index) => {
        const repSalutation = p.representative?.salutation || 'mr'
        return {
            name: p.name || `Partner ${index + 1}`,
            nameAr: p.nameAr || `الشريك ${index + 1}`,
            country: p.country || '',
            countryAr: p.countryAr || '',
            licenseNo: p.licenseNo || '',
            address: p.address || '',
            addressAr: p.addressAr || '',
            email: p.email,
            shareCount: p.shareCount || 0,
            sharePercent: totalShares > 0 ? Math.round((p.shareCount / totalShares) * 100) : 0,
            representative: {
                salutation: repSalutation,
                name: p.representative?.name || '',
                nameAr: p.representative?.nameAr || '',
                eid: (p.representative?.eid || '').replace(/-/g, ''),
                dob: p.representative?.dob || '',
                nationality: p.representative?.nationality || '',
                nationalityAr: p.representative?.nationalityAr || ''
            }
        }
    })

    // Ensure at least 2 partners
    while (partners.length < 2) {
        partners.push({
            name: `Partner ${partners.length + 1}`,
            nameAr: `الشريك ${partners.length + 1}`,
            country: '',
            countryAr: '',
            licenseNo: '',
            address: '',
            addressAr: '',
            shareCount: 0,
            sharePercent: 0,
            representative: {
                salutation: 'mr',
                name: '',
                nameAr: '',
                eid: '',
                dob: '',
                nationality: '',
                nationalityAr: ''
            }
        })
    }

    // Manager info
    const managerSalutation = (managerData.salutation || 'mr') as Salutation
    const manager: ManagerInfo = {
        name: managerData.name || '',
        nameAr: managerData.nameAr || '',
        eid: (managerData.eid || '').replace(/-/g, ''),
        dob: managerData.dob || '',
        salutation: managerSalutation,
        pronouns: getPronouns(managerSalutation),
        nationality: managerData.nationality || '',
        nationalityAr: managerData.nationalityAr || '',
        address: managerData.address || '',
        addressAr: managerData.addressAr || ''
    }

    return {
        company: {
            name: companyData.name || 'N/A',
            nameAr: companyData.nameAr || 'غير متوفر',
            emirate: companyData.emirate || 'Abu Dhabi',
            emirateAr: companyData.emirateAr || 'أبوظبي',
            address: companyData.address || '',
            addressAr: companyData.addressAr || '',
            moaDate: companyData.moaDate || '____',
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

// Generate page footer with signature and seal areas
export function pageFooter(pageNum: number, isLastPage: boolean = false): string {
    if (isLastPage) {
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
