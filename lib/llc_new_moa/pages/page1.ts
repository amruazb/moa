import { LLCNewMOAContext, pageFooter, getOrdinal, formatDateDMY, getPronouns } from '../types'

export function page1(ctx: LLCNewMOAContext, pageNum: number = 1): string {
  const { company, partners } = ctx
  const partner1 = partners[0]
  const rep1 = partner1.representative
  const rep1Pronouns = getPronouns(rep1.salutation)
  const formattedDob1 = formatDateDMY(rep1.dob)

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
      
      <!-- First Party - Company Partner -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold underline">${getOrdinal(0, 'en')} Party:</h3>
          <p><span class="edited">${partner1.name}</span>,</p>
          <p><strong>Registration No.:</strong> <span class="edited">${partner1.licenseNo}</span>,</p>
          <p><strong>Address:</strong> <span class="edited">${partner1.address}</span>,</p>
          ${partner1.email ? `<p><strong>Email:</strong> <span class="edited">${partner1.email}</span>,</p>` : ''}
          <p>duly represented by <strong>${rep1Pronouns.title}</strong> <span class="edited">${rep1.name}</span>, holder of Emirates ID No.: <span class="edited">${rep1.eid}</span>, born on <span class="edited">${formattedDob1}</span>, <span class="edited">${rep1.nationality}</span> National, who is authorized to sign on behalf of the Company.</p>
        </div>
        <div class="block rtl">
          <h3 class="bold underline">الطرف ${getOrdinal(0, 'ar')}:</h3>
          <p><span class="edited">${partner1.nameAr}</span>،</p>
          <p><strong>رقم التسجيل:</strong> <span class="edited">${partner1.licenseNo}</span>،</p>
          <p><strong>العنوان:</strong> <span class="edited">${partner1.addressAr}</span>،</p>
          ${partner1.email ? `<p><strong>البريد الإلكتروني:</strong> <span class="edited">${partner1.email}</span>،</p>` : ''}
          <p>ويمثلها قانونًا <strong>${rep1Pronouns.titleAr}/</strong><span class="edited">${rep1.nameAr}</span>، حامل هوية إماراتية رقم: <span class="edited">${rep1.eid}</span>، من مواليد <span class="edited">${formattedDob1}</span>، ${rep1.nationalityAr} الجنسية، والمخوّل بالتوقيع نيابة عن الشركة.</p>
        </div>
      </div>
      
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
