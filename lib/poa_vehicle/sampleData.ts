// POA Vehicle Sample Data
import { POAVehicleData } from './types'

export const samplePOAVehicleFilled: POAVehicleData = {
    owner: {
        name: 'MOHAMED SHAMNAS CHAKEERI MOHAMED HASSAN CHAKEERI',
        nameAr: 'محمد شمناس شاكيرى محمد حسن شاكيرى',
        nationality: 'Indian',
        nationalityAr: 'هندي',
        dateOfBirth: '30/05/1986',
        eidOrPassport: '784198697519274',
        documentType: 'eid',
        companyName: 'NAS OIL FIELD SERVICE - L.L.C',
        companyNameAr: 'ناس لخدمات الحقول النفط - ذ.م.م',
        licenseNumber: 'CN-2415224',
        issuingAuthority: 'Abu Dhabi Department of Economic Development',
        issuingAuthorityAr: 'دائرة التنمية الاقتصادية – أبوظبي'
    },
    bank: {
        name: 'Bank of Baroda',
        nameAr: 'بنك بارودا',
        licenseNumber: 'CN-1002008'
    },
    vehicles: [
        {
            vehicleType: 'SHACMOTO X5000',
            vehicleTypeAr: 'شاكموتو X5000',
            trademark: 'SHACMOTO',
            trademarkAr: 'شاكموتو',
            manufactureYear: '2026',
            countryOfOrigin: 'CHINA',
            countryOfOriginAr: 'الصين',
            engineNumber: '71153078',
            chassisNumber: 'LZGJL4X42TX001232',
            licensePlate: '25484'
        },
        {
            vehicleType: 'SHACMOTO X5000',
            vehicleTypeAr: 'شاكموتو X5000',
            trademark: 'SHACMOTO',
            trademarkAr: 'شاكموتو',
            manufactureYear: '2026',
            countryOfOrigin: 'CHINA',
            countryOfOriginAr: 'الصين',
            engineNumber: '71153100',
            chassisNumber: 'LZGJL4X43TX001207',
            licensePlate: '88086'
        },
        {
            vehicleType: 'SHACMOTO X5000',
            vehicleTypeAr: 'شاكموتو X5000',
            trademark: 'SHACMOTO',
            trademarkAr: 'شاكموتو',
            manufactureYear: '2026',
            countryOfOrigin: 'CHINA',
            countryOfOriginAr: 'الصين',
            engineNumber: '71153076',
            chassisNumber: 'LZGJL4X44TX001233',
            licensePlate: '27432'
        }
    ],
    validityYears: 3,
    attestationDate: '',
    poaNumber: '2599023557',
    poaDate: '14/04/2025'
}

export const blankPOAVehicleSample: POAVehicleData = {
    owner: {
        name: '',
        nameAr: '',
        nationality: '',
        nationalityAr: '',
        dateOfBirth: '',
        eidOrPassport: '',
        documentType: 'eid',
        companyName: '',
        companyNameAr: '',
        licenseNumber: '',
        issuingAuthority: 'Abu Dhabi Department of Economic Development',
        issuingAuthorityAr: 'دائرة التنمية الاقتصادية – أبوظبي'
    },
    bank: {
        name: 'Bank of Baroda',
        nameAr: 'بنك بارودا',
        licenseNumber: 'CN-1002008'
    },
    vehicles: [
        {
            vehicleType: '',
            vehicleTypeAr: '',
            trademark: '',
            trademarkAr: '',
            manufactureYear: '',
            countryOfOrigin: '',
            countryOfOriginAr: '',
            engineNumber: '',
            chassisNumber: '',
            licensePlate: ''
        }
    ],
    validityYears: 3,
    attestationDate: ''
}
