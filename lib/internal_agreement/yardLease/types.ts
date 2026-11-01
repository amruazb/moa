import { numberToWordsAr, numberToWordsEn } from '@/lib/utils/numberToWords'

export type PaymentMethod = 'transfer' | 'cheque'

export interface YardLeasePerson {
  name: string
  nameAr: string
  nationality: string
  nationalityAr: string
  eid: string
  dob: string
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
  lengthM: string
  widthM: string
  areaSqm: string
  blockNo: string
  rent: number
  firstInstallment: number
  firstMethod: PaymentMethod
  firstTransferRef: string
  firstChequeNo: string
  firstChequeDate: string
  firstChequeBank: string
  secondInstallment: number
  secondMethod: PaymentMethod
  secondTransferRef: string
  secondChequeNo: string
  secondChequeDate: string
  secondChequeBank: string
  commencementDate: string
  endDate: string
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

function clean(value: string | undefined): string {
  return (value ?? '').trim()
}

export function extractYardLeaseContext(data: YardLeaseData): YardLeaseContext {
  const rent = Number(data.rent) || 0
  const firstInstallment = Number(data.firstInstallment) || 0
  const secondInstallment = Number(data.secondInstallment) || 0

  return {
    ...data,
    agreementDate: clean(data.agreementDate),
    blockNo: clean(data.blockNo),
    lengthM: clean(data.lengthM),
    widthM: clean(data.widthM),
    areaSqm: clean(data.areaSqm),
    firstMethod: data.firstMethod === 'cheque' ? 'cheque' : 'transfer',
    firstTransferRef: clean(data.firstTransferRef),
    firstChequeNo: clean(data.firstChequeNo),
    firstChequeDate: clean(data.firstChequeDate),
    firstChequeBank: clean(data.firstChequeBank),
    secondMethod: data.secondMethod === 'cheque' ? 'cheque' : 'transfer',
    secondTransferRef: clean(data.secondTransferRef),
    secondChequeNo: clean(data.secondChequeNo),
    secondChequeDate: clean(data.secondChequeDate),
    secondChequeBank: clean(data.secondChequeBank),
    commencementDate: clean(data.commencementDate),
    endDate: clean(data.endDate),
    licenseNo: clean(data.licenseNo),
    poaNumber: clean(data.poaNumber),
    lessor: {
      ...data.lessor,
      eid: stripEid(data.lessor?.eid),
      dob: clean(data.lessor?.dob),
    },
    attorney: {
      ...data.attorney,
      eid: stripEid(data.attorney?.eid),
      dob: clean(data.attorney?.dob),
    },
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
