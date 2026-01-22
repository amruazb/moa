// Sample data for LLC Amendment MOA
import { LLCAmendmentMOAData, defaultActivities } from './types'

export const sampleLLCAmendmentMOAData: LLCAmendmentMOAData = {
    company: {
        name: 'ADVANZ PROJECT LOGISTICS - L.L.C',
        nameAr: 'أدفانز بروجيكد لوجيستيكس - ذ.م.م',
        emirate: 'Abu Dhabi',
        emirateAr: 'أبوظبي',
        address: 'Abu Dhabi, U.A.E',
        addressAr: 'أبوظبي، الإمارات',
        amendmentDate: new Date().toISOString().split('T')[0], // Current date
        licenseNo: 'CN-1234567'
    },
    partners: [
        {
            name: 'GLOBAL LOGISTICS SOLUTIONS LLC',
            nameAr: 'جلوبال لوجيستيكس سوليوشنز ذ.م.م',
            country: 'United Arab Emirates',
            countryAr: 'دولة الإمارات العربية المتحدة',
            licenseNo: 'CN-7654321',
            address: 'Dubai, United Arab Emirates',
            addressAr: 'دبي، دولة الإمارات العربية المتحدة',
            email: 'info@globallogistics.ae',
            shareCount: 75,
            representative: {
                salutation: 'mr',
                name: 'Ahmed Mohammed Al Rashid',
                nameAr: 'أحمد محمد الراشد',
                eid: '784-1985-1234567-8',
                dob: '1985-03-15',
                nationality: 'Emirati',
                nationalityAr: 'إماراتي'
            }
        },
        {
            name: 'INTERNATIONAL TRADE PARTNERS LTD',
            nameAr: 'شركاء التجارة الدولية المحدودة',
            country: 'United Kingdom',
            countryAr: 'المملكة المتحدة',
            licenseNo: 'UK-9876543',
            address: 'London, United Kingdom',
            addressAr: 'لندن، المملكة المتحدة',
            email: 'contact@itpartners.co.uk',
            shareCount: 25,
            representative: {
                salutation: 'ms',
                name: 'Sarah Elizabeth Johnson',
                nameAr: 'سارة إليزابيث جونسون',
                eid: '826-1988-9876543-2',
                dob: '1988-07-22',
                nationality: 'British',
                nationalityAr: 'بريطانية'
            }
        }
    ],
    manager: {
        salutation: 'mr',
        name: 'Mohammed Hassan Al Mansoori',
        nameAr: 'محمد حسن المنصوري',
        eid: '784-1980-5555555-5',
        dob: '1980-12-10',
        nationality: 'Emirati',
        nationalityAr: 'إماراتي',
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
