
import * as fs from 'fs';
import * as path from 'path';
import { MOAData, Party, ShareAllocation } from './lib/moa/types';
import { generateMOA } from './lib/moa/moaGenerator';

// Data from Reference Images
const party1: Party = {
    nameEn: 'ADEL SAIF AMER HASAN ALJABERI',
    nameAr: 'عادل سيف عامر حسن الجابري',
    nationalityEn: 'U.A.E',
    nationalityAr: 'إماراتي',
    idNumber: '784197984097051',
    dob: '07/07/1979',
    addressEn: 'Abu Dhabi, UAE',
    addressAr: 'أبو ظبي، الإمارات العربية المتحدة',
    representative: {
        nameEn: 'Mohamed Shamnas Chakeeri Mohamed Hassan Chakeeri',
        nameAr: 'محمد شمناس شاكيري محمد حسن شاكيري',
        nationalityEn: 'Indian',
        nationalityAr: 'الهند',
        dob: '30/05/1986',
        idNumber: '784198697519274',
        capacityEn: 'Power of Attorney attested by Notary Public, Abu Dhabi, under No.: 2599023557 dated 14/04/2025',
        capacityAr: 'توكيل رسمي موثق لدى كاتب العدل، أبوظبي برقم 2599023557 بتاريخ 14/04/2025'
    }
};

const party2: Party = {
    nameEn: 'MOHAMED SHAMNAS CHAKEERI MOHAMED HASSAN CHAKEERI',
    nameAr: 'محمد شمناس شاكيري محمد حسن شاكيري كوني ما نها', // Matching image text style roughly
    nationalityEn: 'India',
    nationalityAr: 'الهند',
    idNumber: '784198697519274',
    dob: '30/05/1986',
    addressEn: 'Abu Dhabi',
    addressAr: 'أبو ظبي'
};

const party3: Party = {
    nameEn: 'AMIR AROLI VEETTIL',
    nameAr: 'امير ارولي فيتيل',
    nationalityEn: 'India',
    nationalityAr: 'الهند',
    idNumber: '784197659368092',
    dob: '14/01/1976',
    addressEn: 'UAE',
    addressAr: 'الإمارات'
};

const allocations: ShareAllocation[] = [
    { partyIndex: 0, shareCount: 1, shareValue: 1000, percentage: 1 },
    { partyIndex: 1, shareCount: 90, shareValue: 90000, percentage: 90 },
    { partyIndex: 2, shareCount: 9, shareValue: 9000, percentage: 9 }
];

const moaData: MOAData = {
    company: {
        nameEn: 'NAS OIL FIELD SERVICE L.L.C',
        nameAr: 'ناس لخدمات حقول النفط - ذ.م.م',
        licenseNumber: 'CN-2415224',
        addressEn: 'Abu Dhabi',
        addressAr: 'أبو ظبي'
    },
    parties: [party1, party2, party3],
    totalShares: 100,
    totalCapital: 100000,
    shareAllocations: allocations,
    effectiveDate: '19/12/2024',
    locationEn: 'Abu Dhabi',
    locationAr: 'أبو ظبي'
};

// Generate
const html = generateMOA(moaData);

// Save to file
const outputPath = path.join(__dirname, 'preview.html');
fs.writeFileSync(outputPath, html, 'utf8');

console.log(`Preview generated successfully at: ${outputPath}`);
