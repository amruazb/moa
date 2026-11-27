/** Founding memorandum for an Abu Dhabi one-person (sole proprietorship) LLC. */

export interface AdSpcActivity {
  code: string
  en: string
  ar: string
}

export interface AdSpcFoundingMoaData {
  legalFormEn: string
  legalFormAr: string
  tradeNameEn: string
  tradeNameAr: string
  reservation: {
    transactionNo: string
    economicRegistryNo: string
    issueDate: string
    authorityEn: string
    authorityAr: string
  }
  owner: {
    nameEn: string
    nameAr: string
    nationalityEn: string
    nationalityAr: string
    passportNo: string
    emiratesId: string
    dateOfBirth: string
    residenceEn: string
    residenceAr: string
  }
  activities: AdSpcActivity[]
  /** Blank lines are intentional when the premises are not yet known. */
  addressEn: string
  addressAr: string
  headOfficeEn: string
  headOfficeAr: string
  capitalAed: number
  capitalWordsEn: string
  capitalWordsAr: string
  shareCount: number
  shareValueAed: number
  shareValueWordsEn: string
  shareValueWordsAr: string
  /** Displayed as-is. Use a placeholder when the execution date is unknown. */
  contractDate: string
  durationYears: number
  governingLawEn: string
  governingLawAr: string
  licensingAuthorityEn: string
  licensingAuthorityAr: string
  courtsEn: string
  courtsAr: string
}
