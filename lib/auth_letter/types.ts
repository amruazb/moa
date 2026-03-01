// Authorization Letter Types and Interfaces

export interface AuthLetterEmployee {
  name: string
  nameAr: string
  eid: string
  jobTitle: string
  jobTitleAr: string
}

export interface AuthLetterVehicle {
  plateNo: string
  registrationCity: string
  registrationCityAr: string
}

export interface AuthLetterContext {
  date: string
  companyName: string
  companyNameAr: string
  employee: AuthLetterEmployee
  vehicle: AuthLetterVehicle
}

export interface AuthLetterData {
  date?: string
  companyName?: string
  companyNameAr?: string
  employee?: Partial<AuthLetterEmployee>
  vehicle?: Partial<AuthLetterVehicle>
}

export function extractAuthLetterContext(data: AuthLetterData): AuthLetterContext {
  return {
    date: data.date || '21st February 2026',
    companyName: data.companyName || 'Sarie Non-Specialized Facilities Management LLC',
    companyNameAr: data.companyNameAr || 'سريع لادارة المنشأت غير المتخصصة ذ.م.م',
    employee: {
      name: data.employee?.name || 'Mohammad Perwez Akhtar Khan',
      nameAr: data.employee?.nameAr || 'محمد برويز اختر خان',
      eid: data.employee?.eid || '784-1987-9730210-0',
      jobTitle: data.employee?.jobTitle || 'Operations Manager',
      jobTitleAr: data.employee?.jobTitleAr || 'مدير عمليات'
    },
    vehicle: {
      plateNo: data.vehicle?.plateNo || 'AD17 / 16475',
      registrationCity: data.vehicle?.registrationCity || 'Abu Dhabi',
      registrationCityAr: data.vehicle?.registrationCityAr || 'أبوظبي'
    }
  }
}

export function authLetterPageFooter(pageNum: number): string {
  return `
    <div class="page-footer">
      <div class="footer-section footer-left">
        <div class="signature-box">
          <span class="signature-line"></span>
          <span class="footer-label">Signature / التوقيع</span>
        </div>
      </div>
      <div class="footer-section footer-center">
        <div class="signature-box">
          <span class="signature-line"></span>
          <span class="footer-label">Seal / الختم</span>
        </div>
      </div>
      <div class="footer-section footer-right">
        <span class="page-num">${pageNum}</span>
      </div>
    </div>`
}
