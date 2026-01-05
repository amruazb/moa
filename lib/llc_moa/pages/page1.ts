import { LLCMOAContext, pageFooter, getOrdinal, formatDateDMY } from '../types'

export function page1(ctx: LLCMOAContext, pageNum: number = 1): string {
  const { company, partners } = ctx

  // Generate partner sections dynamically
  const partnerSectionsHtml = partners.map((partner, index) => {
    const ordinalEn = getOrdinal(index, 'en')
    const ordinalAr = getOrdinal(index, 'ar')
    const formattedDob = formatDateDMY(partner.dob)
    const idLabelEn = partner.documentType === 'passport' ? 'Passport No' : 'Emirates ID Card No'
    const idLabelAr = partner.documentType === 'passport' ? 'جواز السفر رقم' : 'بطاقة هوية رقم'

    return `
      <div class="article-pair">
        <div class="block">
          <h3 class="bold underline">${ordinalEn} Party:</h3>
          <p><strong>${partner.pronouns.title}</strong> <span class="edited">${partner.name}</span>, <span class="edited">${partner.nationality}</span> national, holder of ${idLabelEn}: <span class="edited">${partner.eidOrPassport}</span>, Born On: <span class="edited">${formattedDob}</span>, Address: <span class="edited">${partner.address || company.emirate + ', U.A.E'}</span></p>
        </div>
        <div class="block rtl">
          <h3 class="bold underline">الطرف ${ordinalAr}:</h3>
          <p><strong>${partner.pronouns.titleAr}/</strong> <span class="edited">${partner.nameAr}</span>، <span class="edited">${partner.nationalityAr}</span> الجنسية، يحمل ${idLabelAr}: <span class="edited">${partner.eidOrPassport}</span>، تاريخ الميلاد: <span class="edited">${formattedDob}</span>، العنوان: <span class="edited">${partner.addressAr || company.emirateAr + '، الإمارات'}</span></p>
        </div>
      </div>
    `
  }).join('\n')

  return `
    <div class="page">
      <div class="page-content">
      <div class="bilingual-header">
        <div class="header-left">
          <h1>Memorandum of Association</h1>
          <h2>of a Limited Liability Company</h2>
          <h3>(<span class="edited">${company.name}</span>)</h3>
        </div>
        <div class="header-right">
          <h1>عقد تأسيس</h1>
          <h2>شركة ذات مسؤولية محدودة</h2>
          <h3>(<span class="edited">${company.nameAr}</span>)</h3>
        </div>
      </div>
      
      <div class="law-reference">
        <div class="law-left">(IN ACCORDANCE WITH COMMERCIAL COMPANIES LAW NO (32) OF 2021 AND ITS AMENDMENTS AND MINISTERIAL DECREES THEREOF)</div>
        <div class="law-right">(وفقاً لأحكام القانون الاتحادي رقم (32) لسنة 2021م وتعديلاته ولوائحه الوزارية)</div>
      </div>
      
      <div class="article-pair">
        <div class="block">
          <p>This agreement has been concluded on this day <span class="edited">${company.moaDate}</span> in accordance with the provisions of Federal Commercial Companies Law No. 32/2021 by and between:</p>
        </div>
        <div class="block rtl">
          <p>أبرم هذا العقد في هذا اليوم <span class="edited">${company.moaDate}</span> وفقاً لأحكام قانون الشركات التجارية الاتحادي رقم (32) لسنة 2021 بين كل من:</p>
        </div>
      </div>
      
      ${partnerSectionsHtml}
      
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
