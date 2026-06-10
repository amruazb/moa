// Daman Health Insurance Declaration Letter Types

export interface DamanSignatory {
  name: string
  nameAr: string
  title: string
  titleAr: string
}

export interface DamanLetterContext {
  date: string
  companyName: string
  companyNameAr: string
  signatory: DamanSignatory
}

export interface DamanLetterData {
  date?: string
  companyName?: string
  companyNameAr?: string
  signatory?: Partial<DamanSignatory>
}

export function extractDamanLetterContext(data: DamanLetterData): DamanLetterContext {
  return {
    date: data.date || '08/06/2026',
    companyName:
      data.companyName ||
      'AL SAQIYA TRADING - SOLE PROPRIETORSHIP L.L.C. - BRANCH CN-1021313-1',
    companyNameAr:
      data.companyNameAr ||
      'الساقية التجارية - شركة الشخص الواحد ذ م م - فرع CN-1021313-1',
    signatory: {
      name: data.signatory?.name || 'MOHAMED BINKARAMA ALZUBAIDI',
      nameAr: data.signatory?.nameAr || 'محمد بن كرامه الزبيدي',
      title: data.signatory?.title || 'OWNER',
      titleAr: data.signatory?.titleAr || 'مالك',
    },
  }
}
