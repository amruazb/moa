// Sample data for LLC Amendment MOA
import { LLCAmendmentMOAData, defaultActivities } from './types'

export const sampleLLCAmendmentMOAData: LLCAmendmentMOAData = {
    company: {
        name: 'KHALID ALI RASHED ALI CAFETERIA L.L.C.',
        nameAr: 'كافتيريا خالد علي راشد علي ذ.م.م',
        emirate: 'Abu Dhabi',
        emirateAr: 'أبوظبي',
        address: 'Abu Dhabi, U.A.E',
        addressAr: 'أبوظبي، الإمارات',
        amendmentDate: new Date().toISOString().split('T')[0], // Current date
        licenseNo: 'CN-1017639'
    },
    partners: [
        {
            name: 'Mr. Khalid Ali Rashed Ali Almarri',
            nameAr: 'السيد/ خالد على راشد على المري',
            country: 'United Arab Emirates',
            countryAr: 'دولة الإمارات العربية المتحدة',
            licenseNo: '784198020646414',
            address: 'Abu Dhabi, United Arab Emirates',
            addressAr: 'أبوظبي، دولة الإمارات العربية المتحدة',
            email: '',
            shareCount: 50,
            hasRepresentative: false,
            representative: {
                salutation: 'mr',
                name: 'Khalid Ali Rashed Ali Almarri',
                nameAr: 'خالد على راشد على المري',
                eid: '784198020646414',
                dob: '03/07/1980',
                nationality: 'United Arab Emirates',
                nationalityAr: 'دولة الإمارات العربية المتحدة'
            }
        },
        {
            name: 'Mr. Sarfudheen Palengal Veeran Palengal',
            nameAr: 'السيد/ سرف الدين بالبنجال فيران بالينجال',
            country: 'India',
            countryAr: 'جمهورية الهند',
            licenseNo: '784198065136875',
            address: 'Abu Dhabi, United Arab Emirates',
            addressAr: 'أبوظبي، دولة الإمارات العربية المتحدة',
            email: '',
            shareCount: 50,
            hasRepresentative: false,
            representative: {
                salutation: 'mr',
                name: 'Sarfudheen Palengal Veeran Palengal',
                nameAr: 'سرف الدين بالبنجال فيران بالينجال',
                eid: '784198065136875',
                dob: '25/01/1980',
                nationality: 'India',
                nationalityAr: 'جمهورية الهند'
            }
        },
        {
            name: 'Mr. Saleemudeen Thowfeek',
            nameAr: 'السيد/ سليم الدين توفيق',
            country: 'India',
            countryAr: 'جمهورية الهند',
            licenseNo: '784198146872688',
            address: 'Abu Dhabi, United Arab Emirates',
            addressAr: 'أبوظبي، دولة الإمارات العربية المتحدة',
            email: '',
            shareCount: 0,
            hasRepresentative: false,
            representative: {
                salutation: 'mr',
                name: 'Saleemudeen Thowfeek',
                nameAr: 'سليم الدين توفيق',
                eid: '784198146872688',
                dob: '30/03/1981',
                nationality: 'India',
                nationalityAr: 'جمهورية الهند'
            }
        }
    ],
    manager: {
        salutation: 'mr',
        name: 'Sarfudheen Palengal Veeran Palengal',
        nameAr: 'سرف الدين بالبنجال فيران بالينجال',
        eid: '784198065136875',
        dob: '25/01/1980',
        nationality: 'India',
        nationalityAr: 'جمهورية الهند',
        address: 'Abu Dhabi, United Arab Emirates',
        addressAr: 'أبوظبي، دولة الإمارات العربية المتحدة'
    },
    capital: {
        totalCapital: 150000,
        shareCount: 100,
        shareValue: 1500
    },
    activities: [
        ...defaultActivities,
        { code: '7020015', nameEn: 'Import and Export', nameAr: 'الاستيراد والتصدير' },
        { code: '7020030', nameEn: 'Supply Chain Management', nameAr: 'إدارة سلسلة التوريد' }
    ]
}
