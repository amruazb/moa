// Muroor-only Power of Attorney samples.
import { MuroorPoaData } from './types'

const blank = ''

export const pawelMuroorPoaSample: MuroorPoaData = {
  instrumentDate: blank,
  placeOfSigning: blank,
  placeOfSigningAr: blank,
  notaryName: blank,
  notaryNumber: blank,
  attestationParticulars: blank,
  validityTerm: blank,
  grantor: {
    name: 'MOHAMED SAEED FARES SAEED ALMAZROUEI',
    nameAr: 'محمد سعيد فارس سعيد المزروعي',
    nationality: 'United Arab Emirates',
    nationalityAr: 'الإمارات العربية المتحدة',
    dateOfBirth: '11/02/1978',
    emiratesId: '784197842180644',
    emiratesIdExpiry: '22/01/2034',
    passportNumber: '',
    passportIssueDate: '',
    passportIssuePlace: '',
    passportIssuePlaceAr: '',
    passportExpiry: '',
    domicile: 'Abu Dhabi, United Arab Emirates',
    domicileAr: 'أبوظبي، الإمارات العربية المتحدة',
    shares: '10',
    shareValue: 'AED 4,000',
    sharePercent: '10%',
  },
  attorney: {
    name: 'PRAMOD PUTHIYA VALAPPIL',
    nameAr: 'برامود بوثيا فلابيل',
    nationality: 'India',
    nationalityAr: 'الهند',
    dateOfBirth: '28/05/1970',
    emiratesId: '784197084028717',
    emiratesIdExpiry: '02/08/2033',
    passportNumber: '',
    passportIssueDate: '',
    passportIssuePlace: '',
    passportIssuePlaceAr: '',
    passportExpiry: '',
    domicile: 'Abu Dhabi, United Arab Emirates',
    domicileAr: 'أبوظبي، الإمارات العربية المتحدة',
    shares: '90',
    shareValue: 'AED 36,000',
    sharePercent: '90%',
  },
  company: {
    name: 'PAWEL GENERAL TRANSPORT - L.L.C',
    nameAr: 'باول للنقليات العامة - ذ.م.م',
    legalForm: 'Limited Liability Company',
    legalFormAr: 'شركة ذات مسؤولية محدودة',
    licenceNumber: 'CN-5283305',
    licenceExpiry: '29/03/2027',
    unifiedNumber: '101-2024-100177916',
    headOffice: 'Abu Dhabi, United Arab Emirates',
    headOfficeAr: 'أبوظبي، الإمارات العربية المتحدة',
    mobile: '',
    email: '',
    memorandumDate: '12/05/2025',
  },
}

export const MUROOR_POA_SAMPLES: { id: string; label: string; data: MuroorPoaData }[] = [
  {
    id: 'pawel-muroor',
    label: 'Pawel General Transport — Muroor only',
    data: pawelMuroorPoaSample,
  },
]
