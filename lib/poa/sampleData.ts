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
        approachCourts: true,
        noSaleVehiclesAssets: false,
        noLoansFacilities: false,
        noChequeBooks: false,
        noSignCheques: false,
        noTransferShares: false
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
        approachCourts: true,
        noSaleVehiclesAssets: false,
        noLoansFacilities: false,
        noChequeBooks: false,
        noSignCheques: false,
        noTransferShares: false
    },
    validity: {
        years: 3,
        attestationDate: ''
    }
}
