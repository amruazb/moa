import { DocumentData } from '@/store/documentStore'

export const blankSpcSample: DocumentData = {
  company: {
    name: '',
    nameAr: '',
    newName: '',
    newNameAr: '',
    licenseNumber: '',
    moaDate: '',
    activities: '',
    activitiesAr: '',
    address: '',
    addressAr: '',
    emirate: '',
    emirateAr: '',
    notarizationNumber: '',
    notarizationDate: '',
    registrationDate: ''
  },
  sourceParties: [
    {
      name: '',
      nameAr: '',
      nationality: '',
      nationalityAr: '',
      eidNumber: '',
      passportNumber: '',
      dob: '',
      address: '',
      addressAr: '',
      capacity: '',
      capacityAr: '',
      documentType: 'eid',
      expiryDate: ''
    }
  ],
  destinationParties: [
    {
      name: '',
      nameAr: '',
      nationality: '',
      nationalityAr: '',
      eidNumber: '',
      passportNumber: '',
      dob: '',
      address: '',
      addressAr: '',
      capacity: '',
      capacityAr: '',
      documentType: 'eid',
      expiryDate: ''
    }
  ],
  shares: { source: [0], destination: [0] },
  oldMoa: { notarizationNumber: '', notarizationDate: '', originalShares: [0] },
  managerArticle: {
    managerName: '',
    managerNameAr: '',
    managerNationality: '',
    managerNationalityAr: '',
    managerIdNumber: '',
    managerDocType: 'eid'
  }
}

export const sampleSpcFilled: DocumentData = {
  company: {
    name: 'HORIZON COFFEE - L.L.C - S.P.C',
    nameAr: 'هورايزون كوفي - ذ.م.م - ش.ت.ق',
    newName: 'HORIZON COFFEE - L.L.C - S.P.C',
    newNameAr: 'هورايزون كوفي - ذ.م.م - ش.ت.ق',
    licenseNumber: '',
    moaDate: '2025-06-24',
    activities: 'Retail sale of coffee; retail sale of tea; retail sale of juice; importing',
    activitiesAr: 'بيع البن بالتجزئة؛ بيع الشاي بالتجزئة؛ بيع العصائر بالتجزئة؛ استيراد',
    address: 'Abu Dhabi, U.A.E',
    addressAr: 'أبوظبي، الإمارات',
    emirate: 'Abu Dhabi',
    emirateAr: 'أبوظبي',
    notarizationNumber: '',
    notarizationDate: '',
    registrationDate: ''
  },
  sourceParties: [
    {
      name: 'LIXIA SHI',
      nameAr: 'ليكسا شى',
      nationality: 'China',
      nationalityAr: 'جمهورية الصين الشعبية',
      eidNumber: '784198776344974',
      passportNumber: '',
      dob: '1987-06-25',
      address: 'Abu Dhabi, U.A.E',
      addressAr: 'أبوظبي، الإمارات',
      capacity: 'Founding Partner',
      capacityAr: 'شريك مؤسس',
      documentType: 'eid',
      expiryDate: ''
    }
  ],
  destinationParties: [],
  shares: { source: [100], destination: [] },
  oldMoa: { notarizationNumber: '', notarizationDate: '', originalShares: [100] },
  managerArticle: {
    managerName: 'LIXIA SHI',
    managerNameAr: 'ليكسا شى',
    managerNationality: 'China',
    managerNationalityAr: 'صينية',
    managerIdNumber: '784198776344974',
    managerDocType: 'eid'
  }
}
