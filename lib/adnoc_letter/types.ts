export interface AdnocLetterContext {
  date: string;
  name: string;
  eidNumber: string;
  companyName: string;
  companyNumber: string;
  signatureSpacing: number;
}

export interface AdnocLetterData {
  date?: string;
  name?: string;
  eidNumber?: string;
  companyName?: string;
  companyNumber?: string;
  signatureSpacing?: number;
}

export function extractAdnocLetterContext(data: AdnocLetterData): AdnocLetterContext {
  return {
    date: data.date || '10/12/2025',
    name: data.name || 'امير ارولي فيتيل',
    eidNumber: data.eidNumber || '784197659368092',
    companyName: data.companyName || 'ناس لخدمات الحقول النفط - ذ.م.م',
    companyNumber: data.companyNumber || 'CN-2415224',
    signatureSpacing: data.signatureSpacing !== undefined ? data.signatureSpacing : 80,
  }
}
