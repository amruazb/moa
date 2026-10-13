// POA Sample Data
import { POAData } from './types'

export const samplePOAFilled: POAData = {
    principals: [
        {
            name: 'ADEL SAIF AMER HASAN ALJABERI',
            nameAr: 'عادل سيف عامر حسن الجابري',
            salutation: 'mr',
            nationality: 'UAE',
            nationalityAr: 'إماراتي',
            eidOrPassport: '784197984097051',
            documentType: 'eid',
            address: 'Abu Dhabi, UAE',
            addressAr: 'أبوظبي، الإمارات',
            isRepresented: true,
            representative: {
                name: 'MOHAMED SHAMNAS CHAKEERI MOHAMED HASSAN CHAKEERI',
                nameAr: 'محمد شامناس تشاكيري محمد حسن تشاكيري',
                salutation: 'mr',
                nationality: 'Indian',
                nationalityAr: 'هندي',
                dateOfBirth: '30/05/1986',
                eidOrPassport: '784198697519274',
                documentType: 'eid',
                poaNumber: '2599023557',
                poaDate: '14/04/2025',
                poaLocation: 'Abu Dhabi',
                address: 'Abu Dhabi, UAE',
                addressAr: 'أبوظبي، الإمارات'
            }
        },
        {
            name: 'MOHAMED SHAMNAS CHAKEERI MOHAMED HASSAN CHAKEERI',
            nameAr: 'محمد شامناس تشاكيري محمد حسن تشاكيري',
            salutation: 'mr',
            nationality: 'Indian',
            nationalityAr: 'هندي',
            eidOrPassport: '784-1986-9751927-4',
            documentType: 'eid',
            address: 'Abu Dhabi, UAE',
            addressAr: 'أبوظبي، الإمارات'
        }
    ],
    attorney: {
        name: 'AMIR AROLI VEETTIL',
        nameAr: 'امیر ارولی فیتیل',
        salutation: 'mr',
        nationality: 'Indian',
        nationalityAr: 'هندي',
        eidOrPassport: '784197659368092',
        documentType: 'eid',
        address: 'Abu Dhabi, UAE',
        addressAr: 'أبوظبي، الإمارات'
    },
    license: {
        licenseNumber: 'CN-2415224',
        companyName: 'NAS OIL FIELD SERVICE - L.L.C',
        companyNameAr: 'ناس لخدمات حقول النفط ذ.م.م',
        issuingAuthority: 'Department of Economic Development – Abu Dhabi',
        issuingAuthorityAr: 'دائرة التنمية الاقتصادية – أبوظبي'
    },
    sections: {
        executeTransactions: true,
        employees: true,
        utilities: true,
        banks: true,
        banksWithLoan: false,  // Without loan
        contracts: true,
        receivables: true,
        motorVehicles: true,
        approachCourts: true
    },
    validity: {
        years: 3,
        attestationDate: ''
    }
}

export const blankPOASample: POAData = {
    principals: [
        {
            name: '',
            nameAr: '',
            salutation: 'mr',
            nationality: '',
            nationalityAr: '',
            eidOrPassport: '',
            documentType: 'eid',
            address: '',
            addressAr: ''
        },
        {
            name: '',
            nameAr: '',
            salutation: 'mr',
            nationality: '',
            nationalityAr: '',
            eidOrPassport: '',
            documentType: 'eid',
            address: '',
            addressAr: ''
        }
    ],
    attorney: {
        name: '',
        nameAr: '',
        salutation: 'mr',
        nationality: '',
        nationalityAr: '',
        eidOrPassport: '',
        documentType: 'eid',
        address: '',
        addressAr: ''
    },
    license: {
        licenseNumber: '',
        companyName: '',
        companyNameAr: '',
        issuingAuthority: 'Department of Economic Development – Abu Dhabi',
        issuingAuthorityAr: 'دائرة التنمية الاقتصادية – أبوظبي'
    },
    sections: {
        executeTransactions: true,
        employees: true,
        utilities: true,
        banks: true,
        banksWithLoan: false,
        contracts: true,
        receivables: true,
        motorVehicles: true,
        approachCourts: true
    },
    validity: {
        years: 3,
        attestationDate: ''
    }
}

export const samplePOAGoldenDesert: POAData = {
    principals: [
        {
            name: 'MOHAMED SHAMNAS CHAKEERI MOHAMED HASSAN CHAKEERI',
            nameAr: 'محمد شمناس شاكيرى محمد حسن شاكيرى',
            salutation: 'mr',
            nationality: 'Indian',
            nationalityAr: 'هندي',
            eidOrPassport: '784-1986-9751927-4',
            documentType: 'eid',
            address: 'Abu Dhabi, UAE',
            addressAr: 'أبوظبي، الإمارات',
            role: 'owner',
            isRepresented: false
        }
    ],
    attorney: {
        name: 'AMIR AROLI VEETTIL',
        nameAr: 'امیر ارولی فیتیل',
        salutation: 'mr',
        nationality: 'Indian',
        nationalityAr: 'هندي',
        eidOrPassport: '784-1976-5936809-2',
        documentType: 'eid',
        address: 'Abu Dhabi, UAE',
        addressAr: 'أبوظبي، الإمارات'
    },
    license: {
        licenseNumber: 'CN-5831453',
        companyName: 'GOLDEN DESERT WELDING AND SMITHERY - L.L.C - S.P.C',
        companyNameAr: 'جولدن ديسرت للحام والحدادة - ذ.م.م - ش.ش.و',
        issuingAuthority: 'Department of Economic Development – Abu Dhabi',
        issuingAuthorityAr: 'دائرة التنمية الاقتصادية – أبوظبي'
    },
    sections: {
        executeTransactions: true,
        employees: true,
        utilities: true,
        banks: true,
        banksWithLoan: false,
        contracts: true,
        receivables: true,
        motorVehicles: true,
        approachCourts: true
    },
    validity: {
        years: 3,
        attestationDate: ''
    }
}

export const samplePOAFusion: POAData = {
    principals: [
        {
            name: 'THEERTHANANTHAN SIVALINGAM SIVALINGAM',
            nameAr: 'ثيرثانانثن سيفالينغام سيفالينغام',
            salutation: 'mr',
            nationality: 'Indian',
            nationalityAr: 'هندي',
            eidOrPassport: '784197896929037',
            documentType: 'eid',
            address: 'Abu Dhabi, UAE',
            addressAr: 'أبوظبي، الإمارات',
            isRepresented: false
        }
    ],
    attorney: {
        name: 'Mugesh Balakrishnan Marisamy',
        nameAr: 'موجيش بالاكريشنان ماريسامى',
        salutation: 'mr',
        nationality: 'Indian',
        nationalityAr: 'هندي',
        eidOrPassport: '784197859181527',
        documentType: 'eid',
        address: 'Abu Dhabi, UAE',
        addressAr: 'أبوظبي، الإمارات'
    },
    license: {
        licenseNumber: 'CN-1755941',
        companyName: 'FUSION ENGINEERING SUPPLIERS - L.L.C - S.P.C',
        companyNameAr: 'فيوشن انجينيرينغ سبلايرز - ذ.م.م - ش.ش.و',
        issuingAuthority: 'Department of Economic Development – Abu Dhabi',
        issuingAuthorityAr: 'دائرة التنمية الاقتصادية – أبوظبي'
    },
    sections: {
        executeTransactions: true,
        employees: true,
        utilities: true,
        banks: true,
        banksWithLoan: false,
        contracts: true,
        receivables: true,
        motorVehicles: true,
        approachCourts: true
    },
    validity: {
        years: 3,
        attestationDate: ''
    }
}

export const samplePOAIceLabCafe: POAData = {
    principals: [
        {
            name: 'JIN ZHENG',
            nameAr: 'جين زهينج',
            salutation: 'mr',
            nationality: 'Chinese',
            nationalityAr: 'صيني',
            eidOrPassport: '784-1987-9374986-6',
            documentType: 'eid',
            address: 'Abu Dhabi, UAE',
            addressAr: 'أبوظبي، الإمارات',
            role: 'partner',
            isRepresented: false
        }
    ],
    attorney: {
        name: 'LIXIA SHI',
        nameAr: 'ليكسيا شى',
        salutation: 'ms',
        nationality: 'Chinese',
        nationalityAr: 'صينية',
        eidOrPassport: '784-1987-7634497-4',
        documentType: 'eid',
        address: 'Abu Dhabi, UAE',
        addressAr: 'أبوظبي، الإمارات'
    },
    license: {
        licenseNumber: 'CN-5625371',
        companyName: 'ICE LAB CAFE - L.L.C',
        companyNameAr: 'كافيه ايس لاب - ذ.م.م',
        issuingAuthority: 'Department of Economic Development – Abu Dhabi',
        issuingAuthorityAr: 'دائرة التنمية الاقتصادية – أبوظبي'
    },
    sections: {
        executeTransactions: true,
        employees: true,
        utilities: true,
        banks: true,
        banksWithLoan: true,
        contracts: true,
        receivables: true,
        motorVehicles: true,
        approachCourts: true,
        smartHub: true
    },
    validity: {
        years: 3,
        attestationDate: ''
    }
}

export const POA_SAMPLES: { label: string; data: POAData }[] = [
    {
        label: 'Sample POA (Filled)',
        data: samplePOAFilled,
    },
    {
        label: 'Sample POA (Golden Desert Welding)',
        data: samplePOAGoldenDesert,
    },
    {
        label: 'Sample POA (Fusion Engineering)',
        data: samplePOAFusion,
    },
    {
        label: 'Sample POA (Ice Lab Cafe)',
        data: samplePOAIceLabCafe,
    },
    {
        label: 'Blank POA Template',
        data: blankPOASample,
    },
]
