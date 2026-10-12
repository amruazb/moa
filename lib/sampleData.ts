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
  },
  capital: {
    totalCapital: 10000,
    shareCount: 100,
    shareValue: 100
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
  },
  capital: {
    totalCapital: 10000,
    shareCount: 100,
    shareValue: 100
  }
}

// LLC Sample - LUMA LAB FITNESS, 48 / 47 / 5 partnership from trade name certificate TN-6763361
export const sampleLlcFilled: DocumentData = {
  company: {
    name: 'LUMA LAB FITNESS - L.L.C',
    nameAr: 'لمى لاب للياقة البدنية - ذ.م.م',
    newName: '',
    newNameAr: '',
    licenseNumber: 'TN-6763361',
    moaDate: '2026-09-21',
    activities: 'Women Health Club; Body Building Club; Women Body Fitness Club; Retail Sale of Dietary Supplements; Cold and Hot Beverages; Snack Selling (Cafeteria)',
    activitiesAr: 'نادي صحي نسائي؛ نادي كمال أجسام؛ نادي لياقة بدنية للنساء؛ بيع المكملات الغذائية – بالتجزئة؛ مشروبات باردة و ساخنة؛ بيع الوجبات الخفيفة (كافتيريا)',
    address: 'Abu Dhabi, U.A.E',
    addressAr: 'أبوظبي، الإمارات',
    emirate: 'Abu Dhabi',
    emirateAr: 'أبوظبي',
    notarizationNumber: '',
    notarizationDate: '',
    registrationDate: '2026-09-14'
  },
  sourceParties: [
    {
      name: 'RUTH DE LA TORRE DOMINGUEZ',
      nameAr: 'روث دي لا توري دومينجويس',
      salutation: 'mrs',
      nationality: 'Mexico',
      nationalityAr: 'المكسيك',
      eidNumber: '784197932940642',
      passportNumber: '',
      uidNumber: '41809464',
      dob: '1979-08-13',
      address: 'Abu Dhabi, U.A.E',
      addressAr: 'أبوظبي، الإمارات',
      capacity: 'Partner',
      capacityAr: 'شريك',
      documentType: 'eid',
      expiryDate: '2033-12-17',
      shareCount: 48
    },
    {
      name: 'GERALD SHAUN GRUEN',
      nameAr: 'جيرالد شون جروين',
      salutation: 'mr',
      nationality: 'South Africa',
      nationalityAr: 'جمهورية جنوب أفريقيا',
      eidNumber: '784199042410268',
      passportNumber: '',
      uidNumber: '42735442',
      dob: '1990-10-03',
      address: 'Abu Dhabi, U.A.E',
      addressAr: 'أبوظبي، الإمارات',
      capacity: 'Partner',
      capacityAr: 'شريك',
      documentType: 'eid',
      expiryDate: '2027-09-18',
      shareCount: 47
    },
    {
      name: 'SHARMARKE ABDI MOHAMED',
      nameAr: 'شارماركي عبدي محمد',
      salutation: 'mr',
      nationality: 'United Kingdom',
      nationalityAr: 'المملكة المتحدة',
      eidNumber: '784198579657028',
      passportNumber: '',
      uidNumber: '42757953',
      dob: '1985-03-16',
      address: 'Abu Dhabi, U.A.E',
      addressAr: 'أبوظبي، الإمارات',
      capacity: 'Partner',
      capacityAr: 'شريك',
      documentType: 'eid',
      expiryDate: '2035-03-14',
      shareCount: 5
    }
  ],
  destinationParties: [],
  shares: { source: [48, 47, 5], destination: [] },
  oldMoa: { notarizationNumber: '', notarizationDate: '', originalShares: [] },
  managerArticle: {
    managerName: 'GERALD SHAUN GRUEN',
    managerNameAr: 'جيرالد شون جروين',
    managerNationality: 'South Africa',
    managerNationalityAr: 'جمهورية جنوب أفريقيا',
    managerIdNumber: '784199042410268',
    managerUidNumber: '42735442',
    managerDob: '1990-10-03',
    managerDocType: 'eid',
    managerAddress: 'Abu Dhabi, U.A.E',
    managerAddressAr: 'أبوظبي، الإمارات',
    managerSalutation: 'mr'
  },
  managers: [
    {
      managerName: 'GERALD SHAUN GRUEN',
      managerNameAr: 'جيرالد شون جروين',
      managerNationality: 'South Africa',
      managerNationalityAr: 'جمهورية جنوب أفريقيا',
      managerIdNumber: '784199042410268',
      managerUidNumber: '42735442',
      managerDob: '1990-10-03',
      managerDocType: 'eid',
      managerAddress: 'Abu Dhabi, U.A.E',
      managerAddressAr: 'أبوظبي، الإمارات',
      managerSalutation: 'mr'
    },
    {
      managerName: 'RUTH DE LA TORRE DOMINGUEZ',
      managerNameAr: 'روث دي لا توري دومينجويس',
      managerNationality: 'Mexico',
      managerNationalityAr: 'المكسيك',
      managerIdNumber: '784197932940642',
      managerUidNumber: '41809464',
      managerDob: '1979-08-13',
      managerDocType: 'eid',
      managerAddress: 'Abu Dhabi, U.A.E',
      managerAddressAr: 'أبوظبي، الإمارات',
      managerSalutation: 'mrs'
    }
  ],
  capital: {
    totalCapital: 100000,
    shareCount: 100,
    shareValue: 1000
  }
}

export const sampleLumaLlcFilled = sampleLlcFilled

// LLC Sample — LA GAZELLE, trade name TN-6791618. Joynal 90% and manager; Md Shrif 10%.
export const sampleLaGazelleLlcFilled: DocumentData = {
  company: {
    name: 'LA GAZELLE FACILITIES MANAGEMENT SERVICES LLC - L.L.C',
    nameAr: 'لا كازيل لخدمات ادارة المنشآت ذ.م.م - ذ.م.م',
    newName: '',
    newNameAr: '',
    licenseNumber: 'TN-6791618',
    moaDate: '2026-09-25',
    activities: 'Facilities Management Services; Interior Buildings Cleaning Services; Exterior cleaning services (fronts) of buildings; Buildings Maintenance',
    activitiesAr: 'خدمات ادارة المنشآت؛ خدمات التنظيف الداخلية للمباني؛ خدمات التنظيف الخارجي ( واجهات ) المباني؛ صيانة المباني',
    address: 'Abu Dhabi, U.A.E',
    addressAr: 'أبوظبي، الإمارات',
    emirate: 'Abu Dhabi',
    emirateAr: 'أبوظبي',
    notarizationNumber: '',
    notarizationDate: '',
    registrationDate: '2026-09-25'
  },
  sourceParties: [
    {
      name: 'JOYNAL ABEDIN ABU KALAM',
      nameAr: 'زين العابدين ابو الكلام',
      salutation: 'mr',
      nationality: 'Bangladesh',
      nationalityAr: 'بنجلاديش',
      eidNumber: '784198735063582',
      passportNumber: '',
      uidNumber: '42375048',
      dob: '1987-03-01',
      address: 'Abu Dhabi, U.A.E',
      addressAr: 'أبوظبي، الإمارات',
      capacity: 'Partner',
      capacityAr: 'شريك',
      documentType: 'eid',
      expiryDate: '2026-12-10',
      shareCount: 90
    },
    {
      name: 'MD SHRIF AHAMED SAKIB MD SHAFIKUL ISLAM',
      nameAr: 'محمد شريف احمد ثاقب محمد شفيق الاسلام',
      salutation: 'mr',
      nationality: 'Bangladesh',
      nationalityAr: 'بنجلاديش',
      eidNumber: '784200013874514',
      passportNumber: '',
      uidNumber: '42761041',
      dob: '2000-07-08',
      address: 'Abu Dhabi, U.A.E',
      addressAr: 'أبوظبي، الإمارات',
      capacity: 'Partner',
      capacityAr: 'شريك',
      documentType: 'eid',
      expiryDate: '2026-12-07',
      shareCount: 10
    }
  ],
  destinationParties: [],
  shares: { source: [90, 10], destination: [] },
  oldMoa: { notarizationNumber: '', notarizationDate: '', originalShares: [] },
  managerArticle: {
    managerName: 'JOYNAL ABEDIN ABU KALAM',
    managerNameAr: 'زين العابدين ابو الكلام',
    managerNationality: 'Bangladesh',
    managerNationalityAr: 'بنجلاديش',
    managerIdNumber: '784198735063582',
    managerUidNumber: '42375048',
    managerDob: '1987-03-01',
    managerDocType: 'eid',
    managerAddress: 'Abu Dhabi, U.A.E',
    managerAddressAr: 'أبوظبي، الإمارات',
    managerSalutation: 'mr'
  },
  managers: [
    {
      managerName: 'JOYNAL ABEDIN ABU KALAM',
      managerNameAr: 'زين العابدين ابو الكلام',
      managerNationality: 'Bangladesh',
      managerNationalityAr: 'بنجلاديش',
      managerIdNumber: '784198735063582',
      managerUidNumber: '42375048',
      managerDob: '1987-03-01',
      managerDocType: 'eid',
      managerAddress: 'Abu Dhabi, U.A.E',
      managerAddressAr: 'أبوظبي، الإمارات',
      managerSalutation: 'mr'
    }
  ],
  capital: {
    totalCapital: 100000,
    shareCount: 100,
    shareValue: 1000
  }
}

export const LLC_SAMPLES: { label: string; data: DocumentData }[] = [
  { label: 'LUMA LAB FITNESS (3 partners)', data: sampleLlcFilled },
  { label: 'LA GAZELLE — Joynal 90% / Md Shrif 10%', data: sampleLaGazelleLlcFilled }
]
