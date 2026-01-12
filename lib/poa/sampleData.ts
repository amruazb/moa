// POA Sample Data
import { POAData } from './types'

export const samplePOAFilled: POAData = {
    principal: {
        name: 'DALAL SAEED MUHAIR SAEED ALQUBAISI',
        nameAr: 'دلال سعيد مهير سعيد القبيسي',
        salutation: 'mrs',
        nationality: 'UAE',
        nationalityAr: 'إماراتية',
        eidOrPassport: '784-1986-9498796-1',
        documentType: 'eid',
        address: 'Abu Dhabi, UAE',
        addressAr: 'أبوظبي، الإمارات'
    },
    attorney: {
        name: 'MIHIR BHARAT MEHTA',
        nameAr: 'ميهير بهارات ميهتا',
        salutation: 'mr',
        nationality: 'Indian',
        nationalityAr: 'هندي',
        eidOrPassport: '784-1977-9506471-2',
        documentType: 'eid',
        address: 'Abu Dhabi, UAE',
        addressAr: 'أبوظبي، الإمارات'
    },
    license: {
        licenseNumber: 'CN-2062218',
        companyName: 'SHREE OILFIELD SUPPLY - L.L.C',
        companyNameAr: '"شيري لتوريد معدات حقول النفط ذ.م.م"',
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
    principal: {
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
