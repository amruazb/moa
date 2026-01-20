import { LLCNewMOAContext, pageFooter, getOrdinal, formatDateDMY, getPronouns } from '../types'

export function page1(ctx: LLCNewMOAContext, pageNum: number = 1): string {
  const { company, partners } = ctx

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

      ${partners.map((partner, index) => {
    const rep = partner.representative
    const repPronouns = getPronouns(rep.salutation)
    const formattedDob = formatDateDMY(rep.dob)

    return `
      <!-- ${getOrdinal(index, 'en')} Party -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold underline">${getOrdinal(index, 'en')} Party:</h3>
          <p><span class="edited">${partner.name}</span>,</p>
          <p><strong>Registration No.:</strong> <span class="edited">${partner.licenseNo}</span>,</p>
          <p><strong>Address:</strong> <span class="edited">${partner.address}</span>,</p>
          ${partner.email ? `<p><strong>Email:</strong> <span class="edited">${partner.email}</span>,</p>` : ''}
          <p>duly represented by <strong>${repPronouns.title}</strong> <span class="edited">${rep.name}</span>, holder of Emirates ID No.: <span class="edited">${rep.eid}</span>, born on <span class="edited">${formattedDob}</span>, <span class="edited">${rep.nationality}</span> National, who is authorized to sign on behalf of the Company.</p>
        </div>
        <div class="block rtl">
          <h3 class="bold underline">الطرف ${getOrdinal(index, 'ar')}:</h3>
          <p><span class="edited">${partner.nameAr}</span>،</p>
          <p><strong>رقم التسجيل:</strong> <span class="edited">${partner.licenseNo}</span>،</p>
          <p><strong>العنوان:</strong> <span class="edited">${partner.addressAr}</span>،</p>
          ${partner.email ? `<p><strong>البريد الإلكتروني:</strong> <span class="edited">${partner.email}</span>،</p>` : ''}
          <p>ويمثلها قانونًا <strong>${repPronouns.titleAr}/</strong><span class="edited">${rep.nameAr}</span>، حامل هوية إماراتية رقم: <span class="edited">${rep.eid}</span>، من مواليد <span class="edited">${formattedDob}</span>، ${rep.nationalityAr} الجنسية، والمخوّل بالتوقيع نيابة عن الشركة.</p>
        </div>
      </div>
        `
  }).join('')}

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
