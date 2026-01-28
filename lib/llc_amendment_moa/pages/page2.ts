import { LLCAmendmentMOAContext, pageFooter } from '../types'

export function page2(ctx: LLCAmendmentMOAContext, pageNum: number = 2): string {
  const { partners } = ctx

  // Generate partner details
  const partnerDetails = partners.map((partner, index) => {
    const ordinalEn = index === 0 ? 'First' : index === 1 ? 'Second' : index === 2 ? 'Third' : `${index + 1}th`
    const ordinalAr = index === 0 ? 'الأول' : index === 1 ? 'الثاني' : index === 2 ? 'الثالث' : `${index + 1}`
    const hasEmail = partner.email && partner.email.trim() !== '' && partner.email !== 'N/A'

    return `
      <div class="article-pair" style="margin-bottom: 30px;">
        <div class="block">
          <h4 class="bold">${ordinalEn} Party (Assignor/Assignee):</h4>
          <p><strong>Company Name:</strong> <span class="edited">${partner.name}</span></p>
          <p><strong>Country of Incorporation:</strong> <span class="edited">${partner.country}</span></p>
          <p><strong>License/Registration No:</strong> <span class="edited">${partner.licenseNo}</span></p>
          <p><strong>Address:</strong> <span class="edited">${partner.address}</span></p>
          ${hasEmail ? `<p><strong>Email:</strong> <span class="edited">${partner.email}</span></p>` : ''}

          ${partner.hasRepresentative ? `
          <h5 class="bold" style="margin-top: 15px;">Authorized Representative:</h5>
          <p><strong>Name:</strong> <span class="edited">${partner.representative.name}</span></p>
          <p><strong>Emirates ID:</strong> <span class="edited">${partner.representative.eid}</span></p>
          <p><strong>Date of Birth:</strong> <span class="edited">${partner.representative.dob}</span></p>
          <p><strong>Nationality:</strong> <span class="edited">${partner.representative.nationality}</span></p>
          ` : ''}
        </div>
        <div class="block rtl">
          <h4 class="bold">الطرف ${ordinalAr} (المتنازل/المتنازل إليه):</h4>
          <p><strong>اسم الشركة:</strong> <span class="edited">${partner.nameAr}</span></p>
          <p><strong>بلد التأسيس:</strong> <span class="edited">${partner.countryAr}</span></p>
          <p><strong>رقم الرخصة/التسجيل:</strong> <span class="edited">${partner.licenseNo}</span></p>
          <p><strong>العنوان:</strong> <span class="edited">${partner.addressAr}</span></p>
          ${hasEmail ? `<p><strong>البريد الإلكتروني:</strong> <span class="edited">${partner.email}</span></p>` : ''}

          ${partner.hasRepresentative ? `
          <h5 class="bold" style="margin-top: 15px;">المفوض بالتوقيع:</h5>
          <p><strong>الاسم:</strong> <span class="edited">${partner.representative.nameAr}</span></p>
          <p><strong>الهوية الإماراتية:</strong> <span class="edited">${partner.representative.eid}</span></p>
          <p><strong>تاريخ الميلاد:</strong> <span class="edited">${partner.representative.dob}</span></p>
          <p><strong>الجنسية:</strong> <span class="edited">${partner.representative.nationalityAr}</span></p>
          ` : ''}
        </div>
      </div>
    `
  }).join('')

  return `
    <div class="page">
      <div class="page-content">
        
        <!-- Legal Framework (Continuation) -->
        <div class="article-pair">
          <div class="block">
            <ul style="margin-top: 0; padding-left: 20px;">
              <li>The original Memorandum of Association of the Company</li>
              <li>The Articles of Association of the Company</li>
              <li>All applicable UAE laws and regulations</li>
            </ul>
          </div>
          <div class="block rtl">
            <ul style="margin-top: 0; padding-right: 20px; direction: rtl; text-align: right;">
              <li>عقد التأسيس الأصلي للشركة</li>
              <li>النظام الأساسي للشركة</li>
              <li>جميع القوانين واللوائح الإماراتية المعمول بها</li>
            </ul>
          </div>
        </div>

        <!-- Parties Section -->
        <div class="article-pair">
          <div class="block">
            <h3 class="bold underline">PARTIES TO THE ADDENDUM</h3>
            <p>The following parties hereby enter into this addendum to modify the shareholding structure of the Company:</p>
          </div>
          <div class="block rtl">
            <h3 class="bold underline">أطراف الملحق</h3>
            <p>يدخل الأطراف التالون في هذا الملحق لتعديل هيكل المساهمة في الشركة:</p>
          </div>
        </div>

        ${partnerDetails}

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
