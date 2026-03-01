import { TerminationLetterData } from './types'

export const sampleTerminationLetterData: TerminationLetterData = {
    date: '1st March 2026',
    companyName: 'INTERACT TYPING',
    employee: {
        name: 'Salmanul Farisi Aji Ambadan Sulaiman',
        emiratesId: '784-2002-2547050-7',
        dob: '22/10/2002',
        nationality: 'Indian',
        occupation: 'Messenger',
    },
    terminationDate: '1st April 2026',
    noticePeriodMonths: 1,
}

export const blankTerminationLetterData: TerminationLetterData = {
    date: '',
    companyName: '',
    employee: {
        name: '',
        emiratesId: '',
        dob: '',
        nationality: '',
        occupation: '',
    },
    terminationDate: '',
    noticePeriodMonths: 1,
}
