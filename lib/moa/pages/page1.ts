import { MOAContext } from '../types'

export function page1(ctx: MOAContext): string {
  const { company, primary, eidOrPassport } = ctx
  
  return `
    <div class="page">
      <div class="title">
        <h1>Memorandum of Association</h1>
        <h1 class="rtl">عقد تأسيس شركة</h1>
        <h2>of a Limited Liability Company (SPC)</h2>
        <h2 class="rtl">شركة ذات مسؤولية محدودة (ش.ذ.م.م - ش.ت.ق)</h2>
        <div class="subtitle">${company.name}</div>
        <div class="subtitle rtl">${company.nameAr}</div>
      </div>
      
      <div class="section-bar"><span>Preamble</span><span class="rtl">المقدمة</span></div>
      <div class="grid">
        <div class="card">
          <div class="heading">Agreement</div>
          <p style="font-size:9.5pt; line-height:1.55;">This agreement has been concluded on this day ${company.moaDate} in accordance with the provisions of Federal Companies Law.</p>
        </div>
        <div class="card rtl">
          <div class="heading">الاتفاق</div>
          <p style="font-size:9.5pt; line-height:1.7;">أبرم هذا العقد بتاريخ ${company.moaDate} وفقاً لأحكام قانون الشركات الاتحادي.</p>
        </div>
      </div>
      
      <div class="section-bar"><span>First Party</span><span class="rtl">الطرف الأول</span></div>
      <div class="grid">
        <div class="card">
          <div class="row"><span class="label">Name</span><span class="value">${primary.name}</span></div>
          <div class="row"><span class="label">Nationality</span><span class="value">${primary.nationality}</span></div>
          <div class="row"><span class="label">ID / Passport</span><span class="value">${eidOrPassport}</span></div>
          <div class="row"><span class="label">Date of Birth</span><span class="value">${primary.dob || 'N/A'}</span></div>
          <div class="row"><span class="label">Address</span><span class="value">${primary.address || 'N/A'}</span></div>
        </div>
        <div class="card rtl">
          <div class="row rtl"><span class="label">الاسم</span><span class="value">${primary.nameAr}</span></div>
          <div class="row rtl"><span class="label">الجنسية</span><span class="value">${primary.nationalityAr}</span></div>
          <div class="row rtl"><span class="label">الهوية / الجواز</span><span class="value">${eidOrPassport}</span></div>
          <div class="row rtl"><span class="label">تاريخ الميلاد</span><span class="value">${primary.dob || 'غير متوفر'}</span></div>
          <div class="row rtl"><span class="label">العنوان</span><span class="value">${primary.addressAr || 'غير متوفر'}</span></div>
        </div>
      </div>
      
      <div class="section-bar"><span>Definitions</span><span class="rtl">تعريفات</span></div>
      <div class="bilingual">
        <div class="block">
          <ol class="list">
            <li><strong>Company:</strong> The company established under this memorandum.</li>
            <li><strong>Commercial Companies Law:</strong> Federal Law No (32) of 2021.</li>
            <li><strong>Directors:</strong> The director(s) appointed pursuant to this memorandum.</li>
            <li><strong>Ministry:</strong> The Ministry of Economy.</li>
            <li><strong>Competent Authority:</strong> The local authority for corporate affairs.</li>
            <li><strong>Partners:</strong> Parties to this memorandum who become shareholders.</li>
            <li><strong>Commercial Register:</strong> Record handled by the Authority.</li>
          </ol>
        </div>
        <div class="block rtl">
          <ol class="list" style="direction:rtl;">
            <li><strong>الشركة:</strong> الشركة التي تأسست بموجب هذا العقد.</li>
            <li><strong>قانون الشركات:</strong> القانون الاتحادي رقم (32) لسنة 2021.</li>
            <li><strong>المديرون:</strong> المدير أو المديرون المعينون بموجب هذا العقد.</li>
            <li><strong>الوزارة:</strong> وزارة الاقتصاد.</li>
            <li><strong>السلطة المختصة:</strong> الجهة المحلية للشؤون المؤسسية.</li>
            <li><strong>الشركاء:</strong> أطراف هذا العقد ممن يصبحون شركاء.</li>
            <li><strong>السجل التجاري:</strong> سجل تديره السلطة لتقييد التجار.</li>
          </ol>
        </div>
      </div>
      <div class="page-num">1</div>
    </div>`
}
