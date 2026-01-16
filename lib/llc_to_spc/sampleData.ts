// Sample data for LLC to SPC Conversion (from screenshots)
import { LLCToSPCData } from './types'

export const sampleLLCToSPCData: LLCToSPCData = {
    agreementDate: '2024-09-03', // This will be overridden with current date by the store
    // OLD LLC Partners (3 selling partners)
    firstParty: {
        name: 'Santhosh Kumar Maniyan Nair',
        nameAr: 'سانتوش كومار مانيان ناير',
        salutation: 'mr',
        nationality: 'Indian',
        nationalityAr: 'هندي',
        eidOrPassport: '784197575143686',
        documentType: 'eid',
        dob: '20/05/1975',
        address: 'Abu Dhabi',
        addressAr: 'أبوظبي',
        sharesPercent: 33
    },
    secondParty: {
        name: 'Damodaran Pillai Leela Santhosh Kumar',
        nameAr: 'داموداران بيلاي ليلا سانتوش كومار',
        salutation: 'mr',
        nationality: 'Indian',
        nationalityAr: 'هندي',
        eidOrPassport: '784197459195497',
        documentType: 'eid',
        dob: '28/05/1974',
        address: 'Abu Dhabi',
        addressAr: 'أبوظبي',
        sharesPercent: 33
    },
    thirdParty: {
        name: 'Ganesh Kumar Janardhananpillai',
        nameAr: 'جانيش كومار جاناردهانان بيلاي',
        salutation: 'mr',
        nationality: 'Indian',
        nationalityAr: 'هندي',
        eidOrPassport: '784197585926419',
        documentType: 'eid',
        dob: '05/04/1975',
        address: 'Abu Dhabi',
        addressAr: 'أبوظبي',
        sharesPercent: 34
    },
    // NEW OWNER (buyer - Prardhana)
    newOwner: {
        name: 'Prardhana Ajit Menon',
        nameAr: 'براردهانا اجيت مينون',
        salutation: 'ms',
        nationality: 'Indian',
        nationalityAr: 'جمهورية الهند',
        eidOrPassport: '784200690959307',
        documentType: 'eid',
        dob: '03/06/2006',
        address: 'Abu Dhabi',
        addressAr: 'أبوظبي',
        sharesPercent: 100
    },
    // MANAGER (Managing Director - Suja)
    manager: {
        isSameAsThirdParty: false,
        name: 'Suja Aravindaksha Menon',
        nameAr: 'سوجا ارافینداکشا مینون',
        salutation: 'mrs',
        eidOrPassport: '784198143095143'
    },
    license: {
        licenseNumber: 'CN-5444488',
        oldCompanyName: 'CAPSS SAMARPPANAM DANCE EVENTS - L.L.C',
        oldCompanyNameAr: 'كابس سمربنم للرقص و الفعاليات - ذ.م.م',
        companyName: 'SAMATVA SAMARPANAM YOGA CLUB - L.L.C - S.P.C',
        companyNameAr: 'نادي سمطوى سمربنم لليوجا - ذ.م.م - ش.ش.و',
        issuingAuthority: 'Department of Economic Development Abu Dhabi',
        issuingAuthorityAr: 'دائرة التنمية الاقتصادية بأبوظبي'
    },
    originalMOA: {
        moaNumber: '2405034475',
        moaDate: '03/09/2024'
    },
    capitalInfo: {
        capital: 50000,
        shareCount: 500,
        shareValue: 100
    },
    activities: [
        { code: '9000102', nameEn: 'Parties and Events organizing', nameAr: 'تنظيم الحفلات والمناسبات' },
        { code: '9312020', nameEn: 'Yoga Club', nameAr: 'نادي یوجا' },
        { code: '8542002', nameEn: 'Music Training', nameAr: 'التدريب على الموسيقى' },
        { code: '8542001', nameEn: 'Dance Training', nameAr: 'تعليم الرقص' }
    ]
}
