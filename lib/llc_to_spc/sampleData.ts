// Sample data for LLC to SPC Conversion (from screenshots)
import { LLCToSPCData } from './types'

export const sampleLLCToSPCData: LLCToSPCData = {
    agreementDate: '2024-09-03', // This will be overridden with current date by the store
    // Sellers (2 selling partners)
    firstParty: {
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
        sharesPercent: 50
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
        sharesPercent: 50
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
        oldCompanyName: 'SAMARPPANAM YOGA CLUB - L.L.C',
        oldCompanyNameAr: 'نادي سمربنم لليوجا - ذ.م.م',
        companyName: 'SAMARPPANAM YOGA CLUB - L.L.C - S.P.C',
        companyNameAr: 'نادي سمربنم لليوجا - ذ.م.م - ش.ش.و',
        issuingAuthority: 'Department of Economic Development Abu Dhabi',
        issuingAuthorityAr: 'دائرة التنمية الاقتصادية بأبوظبي'
    },
    originalMOA: {
        moaNumber: '2405037410',
        moaDate: '17/09/2024'
    },
    capitalInfo: {
        capital: 80000,
        shareCount: 800,
        shareValue: 100
    },
    activities: [
        { code: '9312020', nameEn: 'Yoga Club', nameAr: 'نادي يوجا' },
        { code: '9312030', nameEn: 'Self-Defense Arts Training Club', nameAr: 'نادي للتدريب على فنون الدفاع عن النفس' }
    ]
}
