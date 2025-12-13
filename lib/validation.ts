export type ConversionType =
    | 'LLC_TO_SPC'
    | 'SPC_TO_LLC'
    | 'EST_TO_LLC'
    | 'LLC_TO_EST'
    | 'EST_TO_SPC'
    | 'SPC_TO_EST'

export type EntityType = 'LLC' | 'SPC' | 'EST'

export interface ValidationError {
    field: string
    message: string
}

export interface ValidationResult {
    isValid: boolean
    errors: ValidationError[]
}

// Conversion type metadata
export const CONVERSION_TYPES = {
    LLC_TO_SPC: {
        id: 'LLC_TO_SPC' as ConversionType,
        from: 'LLC' as EntityType,
        to: 'SPC' as EntityType,
        label: { en: 'LLC to SPC', ar: 'شركة ذات مسؤولية محدودة إلى شركة مساهمة خاصة' },
        description: {
            en: 'Convert Limited Liability Company to Single Person Company',
            ar: 'تحويل من شركة ذات مسؤولية محدودة إلى شركة مساهمة خاصة'
        }
    },
    SPC_TO_LLC: {
        id: 'SPC_TO_LLC' as ConversionType,
        from: 'SPC' as EntityType,
        to: 'LLC' as EntityType,
        label: { en: 'SPC to LLC', ar: 'شركة مساهمة خاصة إلى شركة ذات مسؤولية محدودة' },
        description: {
            en: 'Convert Single Person Company to Limited Liability Company',
            ar: 'تحويل من شركة مساهمة خاصة إلى شركة ذات مسؤولية محدودة'
        }
    },
    EST_TO_LLC: {
        id: 'EST_TO_LLC' as ConversionType,
        from: 'EST' as EntityType,
        to: 'LLC' as EntityType,
        label: { en: 'EST to LLC', ar: 'مؤسسة فردية إلى شركة ذات مسؤولية محدودة' },
        description: {
            en: 'Convert Establishment to Limited Liability Company',
            ar: 'تحويل من مؤسسة فردية إلى شركة ذات مسؤولية محدودة'
        }
    },
    LLC_TO_EST: {
        id: 'LLC_TO_EST' as ConversionType,
        from: 'LLC' as EntityType,
        to: 'EST' as EntityType,
        label: { en: 'LLC to EST', ar: 'شركة ذات مسؤولية محدودة إلى مؤسسة فردية' },
        description: {
            en: 'Convert Limited Liability Company to Establishment',
            ar: 'تحويل من شركة ذات مسؤولية محدودة إلى مؤسسة فردية'
        }
    },
    EST_TO_SPC: {
        id: 'EST_TO_SPC' as ConversionType,
        from: 'EST' as EntityType,
        to: 'SPC' as EntityType,
        label: { en: 'EST to SPC', ar: 'مؤسسة فردية إلى شركة مساهمة خاصة' },
        description: {
            en: 'Convert Establishment to Single Person Company',
            ar: 'تحويل من مؤسسة فردية إلى شركة مساهمة خاصة'
        }
    },
    SPC_TO_EST: {
        id: 'SPC_TO_EST' as ConversionType,
        from: 'SPC' as EntityType,
        to: 'EST' as EntityType,
        label: { en: 'SPC to EST', ar: 'شركة مساهمة خاصة إلى مؤسسة فردية' },
        description: {
            en: 'Convert Single Person Company to Establishment',
            ar: 'تحويل من شركة مساهمة خاصة إلى مؤسسة فردية'
        }
    }
}

// UAE EID format: 784-YYYY-NNNNNNN-C
const EID_REGEX = /^784-\d{4}-\d{7}-\d$/

// Validate UAE EID number format
export function validateEID(eid: string): ValidationError | null {
    if (!eid) {
        return { field: 'eid', message: 'EID number is required' }
    }
    if (!EID_REGEX.test(eid)) {
        return {
            field: 'eid',
            message: 'Invalid EID format. Expected: 784-YYYY-NNNNNNN-C'
        }
    }
    return null
}

// Validate date of birth (must be 18+ years old)
export function validateDOB(dob: string): ValidationError | null {
    if (!dob) {
        return { field: 'dob', message: 'Date of birth is required' }
    }

    const birthDate = new Date(dob)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        // Haven't had birthday this year yet
        if (age - 1 < 18) {
            return { field: 'dob', message: 'Person must be at least 18 years old' }
        }
    } else if (age < 18) {
        return { field: 'dob', message: 'Person must be at least 18 years old' }
    }

    if (birthDate > today) {
        return { field: 'dob', message: 'Date of birth cannot be in the future' }
    }

    return null
}

// Validate share percentages (supports arrays)
export function validateShares(shares: number[]): ValidationError | null {
    const total = shares.reduce((sum, share) => sum + share, 0)

    if (total !== 100) {
        return {
            field: 'shares',
            message: `Total shares must equal 100%. Current total: ${total}%`
        }
    }

    if (shares.some(share => share < 0)) {
        return { field: 'shares', message: 'Share percentages cannot be negative' }
    }

    if (shares.some(share => share > 100)) {
        return { field: 'shares', message: 'Individual share percentage cannot exceed 100%' }
    }

    return null
}

// Validate required field
export function validateRequired(value: string, fieldName: string): ValidationError | null {
    if (!value || value.trim() === '') {
        return { field: fieldName, message: `${fieldName} is required` }
    }
    return null
}

// Validate date is not in the future
export function validateNotFutureDate(date: string, fieldName: string): ValidationError | null {
    if (!date) {
        return { field: fieldName, message: `${fieldName} is required` }
    }

    const inputDate = new Date(date)
    const today = new Date()

    if (inputDate > today) {
        return { field: fieldName, message: `${fieldName} cannot be in the future` }
    }

    return null
}

// Validate complete document data
export function validateDocumentData(data: any, conversionType: ConversionType): ValidationResult {
    const errors: ValidationError[] = []
    const conversionInfo = CONVERSION_TYPES[conversionType]

    // Company validation
    if (!data.company?.name) {
        errors.push({ field: 'company.name', message: 'Company name is required' })
    }
    if (!data.company?.newName) {
        errors.push({ field: 'company.newName', message: 'New company name is required' })
    }
    if (!data.company?.licenseNumber) {
        errors.push({ field: 'company.licenseNumber', message: 'License number is required' })
    }

    const dateError = validateNotFutureDate(data.company?.moaDate, 'MOA date')
    if (dateError) errors.push(dateError)

    // Source parties validation
    const sourceParties = data.sourceParties || []
    const destParties = data.destinationParties || []

    // Max party limit (5 parties)
    if (sourceParties.length > 5) {
        errors.push({ field: 'sourceParties', message: 'Maximum 5 source parties allowed' })
    }
    if (destParties.length > 5) {
        errors.push({ field: 'destinationParties', message: 'Maximum 5 destination parties allowed' })
    }

    // Conversion-type-specific validation
    // For conversions FROM SPC/EST: source must have exactly 1 party at 100%
    if (conversionInfo.from === 'SPC' || conversionInfo.from === 'EST') {
        if (sourceParties.length !== 1) {
            errors.push({
                field: 'sourceParties',
                message: `${conversionInfo.from} must have exactly 1 party`
            })
        }
        if (data.shares?.source?.[0] !== 100) {
            errors.push({
                field: 'shares.source',
                message: `${conversionInfo.from} owner must have 100% ownership`
            })
        }
    }

    // For conversions TO SPC/EST: destination must have exactly 1 party at 100%
    if (conversionInfo.to === 'SPC' || conversionInfo.to === 'EST') {
        if (destParties.length !== 1) {
            errors.push({
                field: 'destinationParties',
                message: `${conversionInfo.to} must have exactly 1 party`
            })
        }
        if (data.shares?.destination?.[0] !== 100) {
            errors.push({
                field: 'shares.destination',
                message: `${conversionInfo.to} owner must have 100% ownership`
            })
        }
    }

    // Validate each source party
    sourceParties.forEach((party: any, index: number) => {
        if (!party?.name) {
            errors.push({ field: `sourceParties[${index}].name`, message: `Source party ${index + 1} name is required` })
        }
        const eidError = validateEID(party?.eidNumber)
        if (eidError) errors.push({ ...eidError, field: `sourceParties[${index}].eidNumber` })

        const dobError = validateDOB(party?.dob)
        if (dobError) errors.push({ ...dobError, field: `sourceParties[${index}].dob` })

        if (!party?.nationality) {
            errors.push({ field: `sourceParties[${index}].nationality`, message: `Source party ${index + 1} nationality is required` })
        }
    })

    // Validate each destination party
    destParties.forEach((party: any, index: number) => {
        if (!party?.name) {
            errors.push({ field: `destinationParties[${index}].name`, message: `Destination party ${index + 1} name is required` })
        }
        const eidError = validateEID(party?.eidNumber)
        if (eidError) errors.push({ ...eidError, field: `destinationParties[${index}].eidNumber` })

        const dobError = validateDOB(party?.dob)
        if (dobError) errors.push({ ...dobError, field: `destinationParties[${index}].dob` })

        if (!party?.nationality) {
            errors.push({ field: `destinationParties[${index}].nationality`, message: `Destination party ${index + 1} nationality is required` })
        }
    })

    // Share validation for source parties
    if (data.shares?.source && data.shares.source.length > 0) {
        const shareError = validateShares(data.shares.source)
        if (shareError) errors.push({ ...shareError, field: 'shares.source' })

        // Ensure shares array matches party count
        if (data.shares.source.length !== sourceParties.length) {
            errors.push({
                field: 'shares.source',
                message: `Number of source shares (${data.shares.source.length}) must match number of source parties (${sourceParties.length})`
            })
        }
    }

    // Share validation for destination parties
    if (data.shares?.destination && data.shares.destination.length > 0) {
        const shareError = validateShares(data.shares.destination)
        if (shareError) errors.push({ ...shareError, field: 'shares.destination' })

        // Ensure shares array matches party count
        if (data.shares.destination.length !== destParties.length) {
            errors.push({
                field: 'shares.destination',
                message: `Number of destination shares (${data.shares.destination.length}) must match number of destination parties (${destParties.length})`
            })
        }
    }

    // Old MOA validation
    if (!data.oldMoa?.notarizationNumber) {
        errors.push({ field: 'oldMoa.notarizationNumber', message: 'Notarization number is required' })
    }

    const notarizationDateError = validateNotFutureDate(data.oldMoa?.notarizationDate, 'Notarization date')
    if (notarizationDateError) errors.push(notarizationDateError)

    return {
        isValid: errors.length === 0,
        errors
    }
}
