export interface Company {
    nameEn: string;
    nameAr: string;
    licenseNumber: string;
    addressEn?: string;
    addressAr?: string;
}

export interface Representative {
    nameEn: string;
    nameAr: string;
    nationalityEn: string;
    nationalityAr: string;
    dob: string; // YYYY-MM-DD
    idNumber: string;
    addressEn?: string;
    addressAr?: string;
    capacityEn: string; // e.g., "by virtue of Power of Attorney"
    capacityAr: string; // e.g., "بموجب وكالة"
}

export interface Party {
    nameEn: string;
    nameAr: string;
    nationalityEn: string;
    nationalityAr: string;
    idNumber: string;
    dob: string; // YYYY-MM-DD
    addressEn?: string;
    addressAr?: string;
    representative?: Representative;
    // New fields for Passport support
    documentType?: 'eid' | 'passport';
    expiryDate?: string;
}

export interface ShareAllocation {
    partyIndex: number; // Index of the party in the parties array
    shareCount: number;
    shareValue: number;
    percentage: number;
}

export interface MOAData {
    company: Company;
    parties: Party[];
    totalShares: number;
    totalCapital: number;
    shareAllocations: ShareAllocation[];
    // Metadata for placeholders or specific clauses if needed
    effectiveDate?: string;
    locationEn?: string;
    locationAr?: string;
}
