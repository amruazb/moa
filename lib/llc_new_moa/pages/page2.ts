import { LLCNewMOAContext, pageFooter, getOrdinal, formatDateDMY, getPronouns } from '../types'

export function page2(ctx: LLCNewMOAContext, pageNum: number = 2): string {
  const { company, partners } = ctx
  const partner2 = partners[1]
  const rep2 = partner2.representative
  const rep2Pronouns = getPronouns(rep2.salutation)
  const formattedDob2 = formatDateDMY(rep2.dob)

  return `
    <div class="page">
      <div class="page-content">
      
      <!-- Second Party - Company Partner -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold underline">${getOrdinal(1, 'en')} Party:</h3>
          <p><span class="edited">${partner2.name}</span>,</p>
          <p><strong>Address:</strong> <span class="edited">${partner2.address}</span>,</p>
          <p>duly represented by <strong>${rep2Pronouns.title}</strong> <span class="edited">${rep2.name}</span>, holder of Emirates ID No.: <span class="edited">${rep2.eid}</span>, born on <span class="edited">${formattedDob2}</span>, <span class="edited">${rep2.nationality}</span> National, who is authorized to sign on behalf of the Company.</p>
        </div>
        <div class="block rtl">
          <h3 class="bold underline">الطرف ${getOrdinal(1, 'ar')}:</h3>
          <p><span class="edited">${partner2.nameAr}</span>،</p>
          <p><strong>العنوان:</strong> <span class="edited">${partner2.addressAr}</span>،</p>
          <p>ويمثلها قانونًا <strong>${rep2Pronouns.titleAr}/</strong><span class="edited">${rep2.nameAr}</span>، حامل هوية إماراتية رقم: <span class="edited">${rep2.eid}</span>، من مواليد <span class="edited">${formattedDob2}</span>، ${rep2.nationalityAr} الجنسية، والمخوّل بالتوقيع نيابة عن الشركة.</p>
        </div>
      </div>
      
      <!-- Preamble -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold underline center">PREAMBLE</h3>
          <p>The first and second parties, in their lawful sound capacity to contract, have agreed to incorporate a Limited Liability Company in the Emirate of <span class="edited">${company.emirate}</span> in accordance with the provisions of the Federal Law No. 32 of 2021, as amended concerning commercial companies (the Commercial Law) and provisions of this contract and as per the following conditions:-</p>
        </div>
        <div class="block rtl">
          <h3 class="bold underline center">المقدمة</h3>
          <p>اتفق الطرف الأول و الثاني وهما بكامل أهليتهما القانونية للتعاقد على تأسيس شركة ذات مسؤولية محدودة في إمارة <span class="edited">${company.emirateAr}</span> وفقا لأحكام القانون الاتحادي رقم (32) لسنة 2021 وتعديلاته بشأن الشركات التجارية (القانون التجاري) وأحكام هذا العقد ووفقا للشروط التالية:</p>
        </div>
      </div>
      
      <!-- Definitions -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold underline">DEFINITIONS:</h3>
          <p>In applying this memorandum, the following terms shall have the following in meanings, unless the context requires otherwise.</p>
          <p><strong><u>1- Company:</u></strong> The Company established under this memorandum and registered in commercial register.</p>
          <p><strong><u>2- Commercial Companies Law:</u></strong> Federal law No (32) of 2021 on Commercial Companies.</p>
          <p><strong><u>3-Directors(S):</u></strong> The director or the directors of the company appointed pursuant to this memorandum.</p>
          <p><strong><u>4-Ministry:</u></strong> The ministry of Economy</p>
          <p><strong><u>5-Competent Authority:</u></strong> The local authority for corporate affairs in the Emirates Concerned.</p>
        </div>
        <div class="block rtl">
          <h3 class="bold underline">تعريفات:</h3>
          <p>يكون للكلمات والعبارات التالية في هذا العقد المعاني والمبينة امام كل منها ما لم يقض سياق النص بغير ذلك:</p>
          <p><strong><u>1-الشركة:</u></strong> الشركة التي تأسست بموجب هذا العقد والمقيدة في السجل التجاري.</p>
          <p><strong><u>2-قانون الشركات التجارية:</u></strong> القانون الاتحادي رقم (32) لسنة 2021 في شأن الشركات التجارية.</p>
          <p><strong><u>3- المدير/ المديرون:</u></strong> المدير او مديري الشركة المعينين بموجب هذا العقد.</p>
          <p><strong><u>4-الوزارة:</u></strong> وزارة الاقتصاد.</p>
          <p><strong><u>5 - السلطة المختصة:</u></strong> السلطة المحلية المختصة بشؤون الشركات في الإمارة المعنية.</p>
        </div>
      </div>
      
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
