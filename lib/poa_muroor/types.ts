export interface MuroorParty {
  name: string
  nameAr: string
  nationality: string
  nationalityAr: string
  dateOfBirth: string
  emiratesId: string
  emiratesIdNote?: string
  emiratesIdNoteAr?: string
  emiratesIdExpiry: string
  passportNumber: string
  passportIssueDate: string
  passportIssuePlace: string
  passportIssuePlaceAr: string
  passportExpiry: string
  domicile: string
  domicileAr: string
  shares: string
  shareValue: string
  sharePercent: string
}

export interface MuroorCompany {
  name: string
  nameAr: string
  legalForm: string
  legalFormAr: string
  licenceNumber: string
  licenceExpiry: string
  unifiedNumber: string
  headOffice: string
  headOfficeAr: string
  mobile: string
  email: string
  memorandumDate: string
}

export interface MuroorPoaData {
  instrumentDate: string
  placeOfSigning: string
  placeOfSigningAr: string
  notaryName: string
  notaryNumber: string
  attestationParticulars: string
  validityTerm: string
  grantor: MuroorParty
  attorney: MuroorParty
  company: MuroorCompany
}
