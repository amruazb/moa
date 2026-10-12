import { numberToWordsEn, numberToWordsAr } from '@/lib/utils/numberToWords'

export interface InternalParty {
  name: string
  nameAr: string
  eid: string
  dob: string
  nationality: string
  nationalityAr: string
  sharePercent: number
  roleEn: string
  roleAr: string
}

export interface InternalAgreementContext {
  agreementDate: string
  place: string
  placeAr: string
  companyName: string
  companyNameAr: string
  legalForm: string
  legalFormAr: string
  licenseNo: string
  unifiedRegNo: string
  unifiedLicenseNo: string
  establishmentDate: string
  emirate: string
  emirateAr: string
  capital: number
  capitalWordsEn: string
  capitalWordsAr: string
  parties: InternalParty[]
}

export interface InternalAgreementData {
  agreementDate?: string
  place?: string
  placeAr?: string
  companyName?: string
  companyNameAr?: string
  legalForm?: string
  legalFormAr?: string
  licenseNo?: string
  unifiedRegNo?: string
  unifiedLicenseNo?: string
  establishmentDate?: string
  emirate?: string
  emirateAr?: string
  capital?: number
  parties?: Partial<InternalParty>[]
}

const defaultParties: InternalParty[] = [
  {
    name: 'Pandarapetty Abdul Latheef Kunhi Moitheen Kutty',
    nameAr: 'بندارابيتي عبد اللطيف كنهي مويدين كوتي',
    eid: '784198141675581',
    dob: '11/05/1981',
    nationality: 'India',
    nationalityAr: 'جمهورية الهند',
    sharePercent: 70,
    roleEn: 'Partner',
    roleAr: 'شريك',
  },
  {
    name: 'Ibrahim Shafeeq Chalilakath Mohmood Chalilakath',
    nameAr: 'ابراهيم شفيق شاليلكات محمود شاليلكات',
    eid: '784197869498812',
    dob: '16/01/1978',
    nationality: 'India',
    nationalityAr: 'جمهورية الهند',
    sharePercent: 20,
    roleEn: 'Partner, Manager and Authorised Signatory',
    roleAr: 'شريك ومدير والمفوض بالتوقيع',
  },
  {
    name: 'Mohamed Shamnas Chakeeri Mohamed Hassan Chakeeri',
    nameAr: 'محمد شمناس شاكيري محمد حسن شاكيري',
    eid: '784198697519274',
    dob: '30/05/1986',
    nationality: 'India',
    nationalityAr: 'جمهورية الهند',
    sharePercent: 10,
    roleEn: 'Internal Shareholder',
    roleAr: 'شريك داخلي',
  },
]

export function extractInternalAgreementContext(
  data: InternalAgreementData = {},
): InternalAgreementContext {
  const capital = data.capital && data.capital > 0 ? data.capital : 1000000
  const parties = defaultParties.map((fallback, index) => {
    const incoming = data.parties?.[index] ?? {}
    return {
      ...fallback,
      ...incoming,
      eid: (incoming.eid ?? fallback.eid).replace(/-/g, ''),
      sharePercent:
        incoming.sharePercent !== undefined ? Number(incoming.sharePercent) : fallback.sharePercent,
    }
  })

  return {
    agreementDate: data.agreementDate || '23/08/2026',
    place: data.place || 'Abu Dhabi, United Arab Emirates',
    placeAr: data.placeAr || 'أبوظبي، الإمارات العربية المتحدة',
    companyName: data.companyName || 'MABEL GENERAL TRADING - L.L.C',
    companyNameAr: data.companyNameAr || 'مابل للتجاره العامة - ذ.م.م',
    legalForm: data.legalForm || 'Limited Liability Company',
    legalFormAr: data.legalFormAr || 'شركة ذات مسؤولية محدودة',
    licenseNo: data.licenseNo || 'CN-6382000',
    unifiedRegNo: data.unifiedRegNo || '101-2026-200091861',
    unifiedLicenseNo: data.unifiedLicenseNo || '501-2026-200062909',
    establishmentDate: data.establishmentDate || '24/02/2026',
    emirate: data.emirate || 'Abu Dhabi',
    emirateAr: data.emirateAr || 'أبوظبي',
    capital,
    capitalWordsEn: numberToWordsEn(capital),
    capitalWordsAr: numberToWordsAr(capital),
    parties,
  }
}

export function shareValue(capital: number, percent: number): number {
  return Math.round((capital * percent) / 100)
}

export function formatMoney(amount: number): string {
  return amount.toLocaleString('en-AE')
}

export function pageFooter(pageNum: number, totalPages: number): string {
  return `
    <div class="page-footer">
      <div class="footer-section footer-left">
        <div class="signature-box">
          <span class="signature-line"></span>
          <span class="footer-label">Parties' Initials / الأحرف الأولى للأطراف</span>
        </div>
      </div>
      <div class="footer-section footer-center">
        <span class="footer-label">Internal Shareholding Agreement / اتفاقية الحصص الداخلية</span>
      </div>
      <div class="footer-section footer-right">
        <span class="page-num">${pageNum} / ${totalPages}</span>
      </div>
    </div>`
}

export function ordinalParty(index: number, lang: 'en' | 'ar'): string {
  const en = ['First Party', 'Second Party', 'Third Party']
  const ar = ['الطرف الأول', 'الطرف الثاني', 'الطرف الثالث']
  return lang === 'ar' ? ar[index] ?? `الطرف ${index + 1}` : en[index] ?? `Party ${index + 1}`
}
