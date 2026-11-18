import { YardLeasePerson } from '../yardLease/types'

export interface WaterSupplyData {
  agreementDate: string
  place: string
  placeAr: string
  supplier: YardLeasePerson
  recipientCompany: string
  recipientCompanyAr: string
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
  pricePerTrip: number
  priceWordsEn: string
  priceWordsAr: string
  commencementDate: string
  endDate: string
  /** Blank when the payment period was not given. */
  paymentPeriod: string
}

export type WaterSupplyContext = WaterSupplyData
