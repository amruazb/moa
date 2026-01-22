import { LLCAmendmentMOAContext, pageFooter } from '../types'

export function page2(ctx: LLCAmendmentMOAContext, pageNum: number = 2): string {
  const { partners } = ctx

  // Generate partner details
  const partnerDetails = partners.map((partner, index) => {
    const ordinalEn = index === 0 ? 'First' : index === 1 ? 'Second' : `${index + 1}th`
    const ordinalAr = index === 0 ? 'الأول' : index === 1 ? 'الثاني' : `${index + 1}`
    
    return `
      <div class="article-pair" style="margin-bottom: 30px;">
        <div class="block">
          <h4 class="bold">${ordinalEn} Party (Assignor/Assignee):</h4>
          <p><strong>Company Name:</strong> <span class="edited">${partner.name}</span></p>
          <p><strong>Country of Incorporation:</strong> <span class="edited">${partner.country}</span></p>
          <p><strong>License/Registration No:</strong> <span class="edited">${partner.licenseNo}</span></p>
          <p><strong>Address:</strong> <span class="edited">${partner.address}</span></p>
          <p><strong>Email:</strong> <span class="edited">${partner.email || 'N/A'}</span></p>
          <p><strong>Share Count:</strong> <span class="edited">${partner.shareCount}</span> shares (${partner.sharePercent}%)</p>
          
          <h5 class="bold" style="margin-top: 15px;">Authorized Representative:</h5>
          <p><strong>Name:</strong> <span class="edited">${partner.representative.pronouns.title} ${partner.representative.name}</span></p>
          <p><strong>Emirates ID:</strong> <span class="edited">${partner.representative.eid}</span></p>
          <p><strong>Date of Birth:</strong> <span class="edited">${partner.representative.dob}</span></p>
          <p><strong>Nationality:</strong> <span class="edited">${partner.representative.nationality}</span></p>
        </div>
        <div class="block rtl">
          <h4 class="bold">الطرف ${ordinalAr} (المتنازل/المتنازل إليه):</h4>
          <p><strong>اسم الشركة:</strong> <span class="edited">${partner.nameAr}</span></p>
          <p><strong>بلد التأسيس:</strong> <span class="edited">${partner.countryAr}</span></p>
          <p><strong>رقم الرخصة/التسجيل:</strong> <span class="edited">${partner.licenseNo}</span></p>
          <p><strong>العنوان:</strong> <span class="edited">${partner.addressAr}</span></p>
          <p><strong>البريد الإلكتروني:</strong> <span class="edited">${partner.email || 'غير متوفر'}</span></p>
          <p><strong>عدد الأسهم:</strong> <span class="edited">${partner.shareCount}</span> سهم (${partner.sharePercent}%)</p>
          
          <h5 class="bold" style="margin-top: 15px;">المفوض بالتوقيع:</h5>
          <p><strong>الاسم:</strong> <span class="edited">${partner.representative.pronouns.titleAr}/ ${partner.representative.nameAr}</span></p>
          <p><strong>الهوية الإماراتية:</strong> <span class="edited">${partner.representative.eid}</span></p>
          <p><strong>تاريخ الميلاد:</strong> <span class="edited">${partner.representative.dob}</span></p>
          <p><strong>الجنسية:</strong> <span class="edited">${partner.representative.nationalityAr}</span></p>
        </div>
      </div>
    `
  }).join('')

  return `
    <div class="page">
      <div class="page-content">
        
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
