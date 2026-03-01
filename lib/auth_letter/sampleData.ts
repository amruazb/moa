import { AuthLetterData, AuthLetterContext, extractAuthLetterContext } from './types'

export const sampleAuthLetterData: AuthLetterData = {
    date: '21st February 2026',
    companyName: 'Sarie Non-Specialized Facilities Management LLC',
    companyNameAr: 'سريع لادارة المنشأت غير المتخصصة ذ.م.م',
    employee: {
        name: 'Mohammad Perwez Akhtar Khan',
        nameAr: 'محمد برويز اختر خان',
        eid: '784198797302100',
        jobTitle: 'Operations Manager',
        jobTitleAr: 'مدير عمليات'
    },
    vehicle: {
        plateNo: 'AD17 / 16475',
        registrationCity: 'Abu Dhabi',
        registrationCityAr: 'أبوظبي'
    }
}

export const blankAuthLetterData: AuthLetterData = {
    date: '',
    companyName: '',
    companyNameAr: '',
    employee: {
        name: '',
        nameAr: '',
        eid: '',
        jobTitle: '',
        jobTitleAr: ''
    },
    vehicle: {
        plateNo: '',
        registrationCity: '',
        registrationCityAr: ''
    }
}
