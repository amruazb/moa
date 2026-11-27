export interface AdSpcActivity {
  code: string
  en: string
  ar: string
}

export interface AdSpcOwner {
  nameEn: string
  nameAr: string
  nationalityEn: string
  nationalityAr: string
  /** Omitted from the memorandum when unset. */
  passport?: string
  eid: string
  dob: string
  residenceEn: string
  residenceAr: string
}

/** Founding memorandum for an Abu Dhabi one-person (sole proprietorship) LLC. */
export interface AdSpcFoundingMoaData {
  legalFormEn: string
  legalFormAr: string
  tradeNameEn: string
  tradeNameAr: string
  /** Omitted from the memorandum when unset. */
  transactionNo?: string
  economicRegistryNo?: string
  reservationDate?: string
  authorityEn?: string
  authorityAr?: string
  owner: AdSpcOwner
  /** Place only, e.g. Abu Dhabi, United Arab Emirates. No street or blank line. */
  addressEn: string
  addressAr: string
  contractDate: string
  activities: AdSpcActivity[]
  capitalAed: number
  capitalWordsEn: string
  capitalWordsAr: string
  shareCount: number
  shareValueAed: number
  shareValueWordsEn: string
  shareValueWordsAr: string
  emirateEn: string
  emirateAr: string
}
