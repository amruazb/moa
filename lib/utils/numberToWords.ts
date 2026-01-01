// Convert numbers to words in English and Arabic

const onesEn = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const tensEn = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
const scalesEn = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

const onesAr = ['', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة',
  'عشرة', 'أحد عشر', 'اثنا عشر', 'ثلاثة عشر', 'أربعة عشر', 'خمسة عشر', 'ستة عشر', 'سبعة عشر', 'ثمانية عشر', 'تسعة عشر'];
const tensAr = ['', '', 'عشرون', 'ثلاثون', 'أربعون', 'خمسون', 'ستون', 'سبعون', 'ثمانون', 'تسعون'];
const hundredsAr = ['', 'مائة', 'مائتان', 'ثلاثمائة', 'أربعمائة', 'خمسمائة', 'ستمائة', 'سبعمائة', 'ثمانمائة', 'تسعمائة'];
const scalesAr = ['', 'ألف', 'مليون', 'مليار', 'تريليون'];

// Special Arabic forms for thousands
const thousandsAr: Record<number, string> = {
  1: 'ألف',
  2: 'ألفان',
  3: 'ثلاثة آلاف',
  4: 'أربعة آلاف',
  5: 'خمسة آلاف',
  6: 'ستة آلاف',
  7: 'سبعة آلاف',
  8: 'ثمانية آلاف',
  9: 'تسعة آلاف',
  10: 'عشرة آلاف',
  11: 'أحد عشر ألف',
  12: 'اثنا عشر ألف',
  100: 'مائة ألف',
  200: 'مائتا ألف',
};

function convertHundredsEn(num: number): string {
  if (num === 0) return '';
  
  if (num < 20) {
    return onesEn[num];
  }
  
  if (num < 100) {
    const ten = Math.floor(num / 10);
    const one = num % 10;
    return tensEn[ten] + (one ? ' ' + onesEn[one] : '');
  }
  
  const hundred = Math.floor(num / 100);
  const remainder = num % 100;
  return onesEn[hundred] + ' Hundred' + (remainder ? ' ' + convertHundredsEn(remainder) : '');
}

function convertHundredsAr(num: number): string {
  if (num === 0) return '';
  
  if (num < 20) {
    return onesAr[num];
  }
  
  if (num < 100) {
    const ten = Math.floor(num / 10);
    const one = num % 10;
    if (one === 0) return tensAr[ten];
    return onesAr[one] + ' و' + tensAr[ten];
  }
  
  const hundred = Math.floor(num / 100);
  const remainder = num % 100;
  if (remainder === 0) return hundredsAr[hundred];
  return hundredsAr[hundred] + ' و' + convertHundredsAr(remainder);
}

export function numberToWordsEn(num: number): string {
  if (num === 0) return 'Zero';
  if (num < 0) return 'Negative ' + numberToWordsEn(-num);
  
  // Handle special common cases
  const specialCases: Record<number, string> = {
    10000: 'Ten Thousand',
    100000: 'One Hundred Thousand',
    1000000: 'One Million',
  };
  if (specialCases[num]) return specialCases[num];
  
  const parts: string[] = [];
  let scaleIndex = 0;
  
  while (num > 0) {
    const chunk = num % 1000;
    if (chunk > 0) {
      const chunkWords = convertHundredsEn(chunk);
      if (scaleIndex > 0) {
        parts.unshift(chunkWords + ' ' + scalesEn[scaleIndex]);
      } else {
        parts.unshift(chunkWords);
      }
    }
    num = Math.floor(num / 1000);
    scaleIndex++;
  }
  
  return parts.join(' ');
}

export function numberToWordsAr(num: number): string {
  if (num === 0) return 'صفر';
  if (num < 0) return 'سالب ' + numberToWordsAr(-num);
  
  // Handle special common cases for Arabic
  const specialCases: Record<number, string> = {
    10000: 'عشرة آلاف',
    100000: 'مائة ألف',
    1000000: 'مليون',
    10: 'عشرة',
    100: 'مائة',
    1000: 'ألف',
    2000: 'ألفان',
  };
  if (specialCases[num]) return specialCases[num];
  
  const parts: string[] = [];
  
  // Handle millions
  if (num >= 1000000) {
    const millions = Math.floor(num / 1000000);
    if (millions === 1) {
      parts.push('مليون');
    } else if (millions === 2) {
      parts.push('مليونان');
    } else {
      parts.push(convertHundredsAr(millions) + ' مليون');
    }
    num = num % 1000000;
  }
  
  // Handle thousands
  if (num >= 1000) {
    const thousands = Math.floor(num / 1000);
    if (thousandsAr[thousands]) {
      parts.push(thousandsAr[thousands]);
    } else if (thousands < 100) {
      parts.push(convertHundredsAr(thousands) + ' ألف');
    } else {
      parts.push(convertHundredsAr(thousands) + ' ألف');
    }
    num = num % 1000;
  }
  
  // Handle hundreds, tens, and ones
  if (num > 0) {
    parts.push(convertHundredsAr(num));
  }
  
  return parts.join(' و');
}

// Format capital with words
export function formatCapitalEn(amount: number): string {
  const words = numberToWordsEn(amount);
  return `${amount.toLocaleString()} (${words} Dirhams)`;
}

export function formatCapitalAr(amount: number): string {
  const words = numberToWordsAr(amount);
  return `${amount.toLocaleString()} درهم إماراتي (${words} درهم)`;
}

// Calculate share value from capital and share count
export function calculateShareValue(capital: number, shareCount: number): number {
  if (shareCount === 0) return 0;
  return Math.round((capital / shareCount) * 100) / 100;
}
