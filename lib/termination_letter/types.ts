// Termination Letter Types and Interfaces

export interface TerminationLetterEmployee {
    name: string
    emiratesId: string
    dob: string
    nationality: string
    occupation: string
}

export interface TerminationLetterContext {
    date: string
    companyName: string
    employee: TerminationLetterEmployee
    terminationDate: string
    noticePeriodMonths: number
}

export interface TerminationLetterData {
    date?: string
    companyName?: string
    employee?: Partial<TerminationLetterEmployee>
    terminationDate?: string
    noticePeriodMonths?: number
}

export function extractTerminationLetterContext(data: TerminationLetterData): TerminationLetterContext {
    return {
        date: data.date || '1st March 2026',
        companyName: data.companyName || 'INTERACT TYPING',
        employee: {
            name: data.employee?.name || 'Salmanul Farisi Aji Ambadan Sulaiman',
            emiratesId: data.employee?.emiratesId || '784-2002-2547050-7',
            dob: data.employee?.dob || '22/10/2002',
            nationality: data.employee?.nationality || 'Indian',
            occupation: data.employee?.occupation || 'Messenger',
        },
        terminationDate: data.terminationDate || '1st April 2026',
        noticePeriodMonths: data.noticePeriodMonths ?? 1,
    }
}
