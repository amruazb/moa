// Sample data for LLC Amendment MOA
import { LLCAmendmentMOAData, defaultActivities } from './types'

export const sampleLLCAmendmentMOAData: LLCAmendmentMOAData = {
    company: {
        name: 'ARCAID EQUIPMENTS L.L.C.',
        nameAr: 'اركيد للمعدات ذ.م.م',
        emirate: 'Abu Dhabi',
        emirateAr: 'أبوظبي',
        address: 'Abu Dhabi, U.A.E',
        addressAr: 'أبوظبي، الإمارات',
        amendmentDate: new Date().toISOString().split('T')[0], // Current date
        licenseNo: 'CN-1666905'
    },
    partners: [
        {
            name: 'Mrs. DALAL SAEED MUHAIR SAEED ALQUBAISI',
            nameAr: 'السيدة/ دلال سعيد مهير سعيد القبيسى',
            country: 'United Arab Emirates',
            countryAr: 'دولة الإمارات العربية المتحدة',
            licenseNo: '784198694987961',
            address: 'Abu Dhabi, United Arab Emirates',
            addressAr: 'أبوظبي، دولة الإمارات العربية المتحدة',
            email: '',
            shareCount: 51,
            hasRepresentative: false,
            representative: {
                salutation: 'mrs',
                name: 'DALAL SAEED MUHAIR SAEED ALQUBAISI',
                nameAr: 'دلال سعيد مهير سعيد القبيسى',
                eid: '784198694987961',
                dob: '12/10/1986',
                nationality: 'U.A.E',
                nationalityAr: 'إماراتي'
            }
        },
        {
            name: 'Mr. Valiyapeediakkal Abu',
            nameAr: 'السيد/ واليابيد كيل ابو',
            country: 'India',
            countryAr: 'الهند',
            licenseNo: '784195363258211',
            address: 'Abu Dhabi, United Arab Emirates',
            addressAr: 'أبوظبي، دولة الإمارات العربية المتحدة',
            email: '',
            shareCount: 39,
            hasRepresentative: false,
            representative: {
                salutation: 'mr',
                name: 'Valiyapeediakkal Abu',
                nameAr: 'واليابيد كيل ابو',
                eid: '784195363258211',
                dob: '1953-01-01',
                nationality: 'India',
                nationalityAr: 'الهند'
            }
        },
        {
            name: 'Mr. Hashim Abu Valiyapeediakkal Abu',
            nameAr: 'السيد/ هاشم ابو فاليابيدياكال ابو',
            country: 'India',
            countryAr: 'الهند',
            licenseNo: '784198106085370',
            address: 'Abu Dhabi, United Arab Emirates',
            addressAr: 'أبوظبي، دولة الإمارات العربية المتحدة',
            email: '',
            shareCount: 10,
            hasRepresentative: false,
            representative: {
                salutation: 'mr',
                name: 'Hashim Abu Valiyapeediakkal Abu',
                nameAr: 'هاشم ابو فاليابيدياكال ابو',
                eid: '784198106085370',
                dob: '01/06/1981',
                nationality: 'India',
                nationalityAr: 'الهند'
            }
        }
    ],
    manager: {
        salutation: 'mr',
        name: 'Hashim Abu Valiyapeediakkal Abu',
        nameAr: 'هاشم ابو فاليابيدياكال ابو',
        eid: '784198106085370',
        dob: '01/06/1981',
        nationality: 'India',
        nationalityAr: 'الهند',
        address: 'Abu Dhabi, United Arab Emirates',
        addressAr: 'أبوظبي، دولة الإمارات العربية المتحدة'
    },
    capital: {
        totalCapital: 200000,
        shareCount: 100,
        shareValue: 2000
    },
    activities: [
        ...defaultActivities,
        { code: '7020015', nameEn: 'Import and Export', nameAr: 'الاستيراد والتصدير' },
        { code: '7020030', nameEn: 'Supply Chain Management', nameAr: 'إدارة سلسلة التوريد' }
    ]
}
