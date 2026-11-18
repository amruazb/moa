import { sampleYardLeaseNas } from '../yardLease/sampleData'
import { WaterSupplyData } from './types'

const lease = sampleYardLeaseNas

/**
 * Party particulars are the Farm 61 yard-lease sample (PR #3, be60214).
 * That sample has no phone and no address, so none are added here.
 * The signing date and the payment period were not given, so they stay blank.
 */
export const sampleWaterSupplyNas: WaterSupplyData = {
  agreementDate: '',
  place: lease.place,
  placeAr: lease.placeAr,
  supplier: lease.lessor,
  recipientCompany: lease.lesseeCompany,
  recipientCompanyAr: lease.lesseeCompanyAr,
  legalForm: lease.legalForm,
  legalFormAr: lease.legalFormAr,
  licenseNo: lease.licenseNo,
  issuingAuthority: lease.issuingAuthority,
  issuingAuthorityAr: lease.issuingAuthorityAr,
  attorney: lease.attorney,
  poaNumber: lease.poaNumber,
  poaAuthority: lease.poaAuthority,
  poaAuthorityAr: lease.poaAuthorityAr,
  propertyLocation: lease.propertyLocation,
  propertyLocationAr: lease.propertyLocationAr,
  lengthM: lease.lengthM,
  widthM: lease.widthM,
  areaSqm: lease.areaSqm,
  blockNo: lease.blockNo,
  pricePerTrip: 400,
  priceWordsEn: 'Four Hundred',
  priceWordsAr: 'أربعمائة',
  commencementDate: '10/11/2026',
  endDate: '09/05/2027',
  paymentPeriod: '',
}
