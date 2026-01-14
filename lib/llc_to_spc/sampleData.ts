// Sample data for LLC to SPC Conversion (from screenshots)
import { LLCToSPCData } from './types'

export const sampleLLCToSPCData: LLCToSPCData = {
    agreementDate: '2024-01-25',
    firstParty: {
        name: 'Damodaran Pillai Leela Santhosh Kumar',
        nameAr: 'دامودارلن بيلاى ليلا سانتوش كومار',
        salutation: 'mr',
        nationality: 'Indian',
        nationalityAr: 'هندي',
        eidOrPassport: '784-1974-5919549-7',
        documentType: 'eid',
        dob: '28/05/1974',
        address: 'Abu Dhabi',
        addressAr: 'أبوظبي',
        sharesPercent: 50
    },
    secondParty: {
        name: 'Ganesh Kumar Janardhananpillai',
        nameAr: 'جانيش كومار جناردهانان بيلاى',
        salutation: 'mr',
        nationality: 'Indian',
        nationalityAr: 'هندي',
        eidOrPassport: '784-1975-8592641-9',
        documentType: 'eid',
        dob: '05/04/1975',
        address: 'Abu Dhabi',
        addressAr: 'أبوظبي',
        sharesPercent: 50
    },
    thirdParty: {
        name: 'Prardhana Ajit Menon',
        nameAr: 'براردهانا اجيت مينون',
        salutation: 'mr',
        nationality: 'Indian',
        nationalityAr: 'جمهورية الهند',
        eidOrPassport: '784-2006-9095930-7',
        documentType: 'eid',
        dob: '03/06/2006',
        address: 'Abu Dhabi',
        addressAr: 'أبوظبي',
        sharesPercent: 100
    },
    license: {
        licenseNumber: 'CN-5444488',
        oldCompanyName: 'SAMARPPANAM EVENTS - L.L.C',
        oldCompanyNameAr: 'سمربنم للفعاليات - ذ.م.م',
        companyName: 'SAMARPPANAM EVENTS - L.L.C - S.P.C',
        companyNameAr: 'سمربنم للفعاليات - ذ.م.م - ش.ش.و',
        issuingAuthority: 'Department of Economic Development Abu Dhabi',
        issuingAuthorityAr: 'دائرة التنمية الاقتصادية بأبوظبي'
    },
    originalMOA: {
        moaNumber: '2405003379',
        moaDate: '25/01/2024'
    },
    capitalInfo: {
        capital: 10000,
        shareCount: 100,
        shareValue: 100
    }
}
