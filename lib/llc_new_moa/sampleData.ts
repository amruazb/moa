// Sample data for LLC New MOA (Company Partners)
import { LLCNewMOAData, defaultActivities } from './types'

export const sampleLLCNewMOAData: LLCNewMOAData = {
    company: {
        name: 'ADVANZ PROJECT LOGISTICS - L.L.C',
        nameAr: 'أدفانز بروجيكد لوجيستيكس - ذ.م.م',
        emirate: 'Abu Dhabi',
        emirateAr: 'أبوظبي',
        address: 'Abu Dhabi, U.A.E',
        addressAr: 'أبوظبي، الإمارات',
        moaDate: new Date().toISOString().split('T')[0] // Current date
    },
    partners: [
        {
            name: 'ADVANZ PROJECT OFFSHORE LTD',
            nameAr: 'أدفانز بروجيكت أوفشور ليمتد',
            country: 'Republic of the Marshall Islands',
            countryAr: 'جمهورية جزر مارشال',
            licenseNo: '135804',
            address: 'Trust Company Complex, Ajeltake Road, Ajeltake Island, Majuro, Republic of the Marshall Islands, MH 96960',
            addressAr: 'مجمع شركات التراست، طريق أجِلتِيك، جزيرة أجِلتِيك، ماجورو، جمهورية جزر مارشال، MH 96960',
            email: 'fad@allianzmarine.org',
            shareCount: 70,
            representative: {
                salutation: 'mr',
                name: 'Murali Krishna Krishna Kumar',
                nameAr: 'مورلي كريشنا كريشنا كومار',
                eid: '784198183848799',
                dob: '1981-03-24',
                nationality: 'Indian',
                nationalityAr: 'هندي'
            }
        },
        {
            name: 'ALLIANZ MARINE SERVICES L.L.C',
            nameAr: 'أليانز مارين سيرفيسز ذ.م.م',
            country: 'United Arab Emirates',
            countryAr: 'الإمارات العربية المتحدة',
            licenseNo: '616526',
            address: 'Office 1001, Malek The Onyx Four Development Limited – Al Thaniya Third',
            addressAr: 'مكتب 1001، ملك ذا أونيكس فور ديفيلوبمنت ليمتد – الثنية الثالثة',
            email: '',
            shareCount: 30,
            representative: {
                salutation: 'mr',
                name: 'Murali Krishna Krishna Kumar',
                nameAr: 'مورلي كريشنا كريشنا كومار',
                eid: '784198183848799',
                dob: '1981-03-24',
                nationality: 'Indian',
                nationalityAr: 'هندي'
            }
        }
    ],
    manager: {
        salutation: 'mr',
        name: 'Murali Krishna Krishna Kumar',
        nameAr: 'مورلي كريشنا كريشنا كومار',
        eid: '784198183848799',
        dob: '1981-03-24',
        nationality: 'Indian',
        nationalityAr: 'هندي',
        address: 'Abu Dhabi, U.A.E',
        addressAr: 'أبوظبي، الإمارات'
    },
    capital: {
        totalCapital: 150000,
        shareCount: 100,
        shareValue: 1500
    },
    activities: [...defaultActivities]
}

