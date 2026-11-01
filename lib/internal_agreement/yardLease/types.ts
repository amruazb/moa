import { numberToWordsAr, numberToWordsEn } from '@/lib/utils/numberToWords'

export interface YardLeasePerson {
  name: string
  nameAr: string
  nationality: string
  nationalityAr: string
  eid: string
}

export interface YardLeaseData {
  agreementDate: string
  place: string
  placeAr: string
  lessor: YardLeasePerson
  lesseeCompany: string
  lesseeCompanyAr: string
  legalForm: string
  legalFormAr: string
  licenseNo: string
  issuingAuthority: string
  issuingAuthorityAr: string
  attorney: YardLeasePerson
  poaNumber: string
  poaAuthority: string
  poaAuthorityAr: string
  propertyLocation: string
  propertyLocationAr: string
  /** Blank prints as a marked blank. Square metres. */
  areaSqm: string
  rent: number
  firstInstallment: number
  secondInstallment: number
  /** Blank prints as a marked blank. */
  securityDeposit: string
  /** Blank prints as a marked blank. Public-liability limit per occurrence. */
  liabilityLimit: string
  chequeNo: string
  chequeBank: string
  chequeDate: string
}

export interface YardLeaseContext extends YardLeaseData {
  rentWordsEn: string
  rentWordsAr: string
  firstWordsEn: string
  firstWordsAr: string
  secondWordsEn: string
  secondWordsAr: string
}

const RENT_WORDS_EN: Record<number, string> = {
  33000: 'Thirty-Three Thousand',
  16500: 'Sixteen Thousand Five Hundred',
}

const RENT_WORDS_AR: Record<number, string> = {
  33000: 'ثلاثة وثلاثون ألف',
  16500: 'ستة عشر ألفاً وخمسمائة',
}

export function wordsEn(amount: number): string {
  return RENT_WORDS_EN[amount] ?? numberToWordsEn(amount)
}

export function wordsAr(amount: number): string {
  return RENT_WORDS_AR[amount] ?? numberToWordsAr(amount)
}

function stripEid(value: string | undefined): string {
  return (value ?? '').replace(/-/g, '').trim()
}

export function extractYardLeaseContext(data: YardLeaseData): YardLeaseContext {
  const rent = Number(data.rent) || 0
  const firstInstallment = Number(data.firstInstallment) || 0
  const secondInstallment = Number(data.secondInstallment) || 0

  return {
    ...data,
    agreementDate: data.agreementDate ?? '',
    areaSqm: (data.areaSqm ?? '').trim(),
    securityDeposit: (data.securityDeposit ?? '').trim(),
    liabilityLimit: (data.liabilityLimit ?? '').trim(),
    chequeNo: (data.chequeNo ?? '').trim(),
    chequeBank: (data.chequeBank ?? '').trim(),
    chequeDate: (data.chequeDate ?? '').trim(),
    licenseNo: (data.licenseNo ?? '').trim(),
    poaNumber: (data.poaNumber ?? '').trim(),
    lessor: { ...data.lessor, eid: stripEid(data.lessor?.eid) },
    attorney: { ...data.attorney, eid: stripEid(data.attorney?.eid) },
    rent,
    firstInstallment,
    secondInstallment,
    rentWordsEn: wordsEn(rent),
    rentWordsAr: wordsAr(rent),
    firstWordsEn: wordsEn(firstInstallment),
    firstWordsAr: wordsAr(firstInstallment),
    secondWordsEn: wordsEn(secondInstallment),
    secondWordsAr: wordsAr(secondInstallment),
  }
}

export function formatAed(amount: number): string {
  return amount.toLocaleString('en-AE')
}
