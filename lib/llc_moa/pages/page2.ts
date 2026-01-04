import { LLCMOAContext, pageFooter } from '../types'

export function page2(ctx: LLCMOAContext, pageNum: number = 2): string {
  const { partners, company } = ctx

  // Generate preamble text based on number of partners
  const partnerCount = partners.length
  const partnersText = partnerCount === 2 ? 'both parties' : 'all parties'
  const partnersTextAr = partnerCount === 2 ? 'كلا الطرفين' : 'جميع الأطراف'

  return `
    <div class="page">
      <div class="page-content">
      
      <div class="section-bar"><span>PREAMBLE</span><span class="rtl">المقدمة</span></div>
      <div class="article-pair">
        <div class="block">
          <p>The ${partnersText}, in their lawful sound capacity to contract, have agreed to incorporate a Limited Liability Company in the Emirate of <span class="edited">${company.emirate}</span> in accordance with the provisions of the Federal Law No. 32 of 2021, as amended, concerning commercial companies (the Commercial Companies Law) and provisions of this contract and as per the following conditions:</p>
        </div>
        <div class="block rtl">
          <p>اتفق ${partnersTextAr} وهم بكامل أهليتهم القانونية للتعاقد على تأسيس شركة ذات مسؤولية محدودة في إمارة <span class="edited">${company.emirateAr}</span> وفقاً لأحكام القانون الاتحادي رقم (32) لسنة 2021 وتعديلاته بشأن الشركات التجارية (قانون الشركات التجارية) وأحكام هذا العقد ووفقاً للشروط التالية:</p>
        </div>
      </div>
      
      <div class="section-bar"><span>DEFINITIONS</span><span class="rtl">التعريفات</span></div>
      <div class="article-pair">
        <div class="block">
          <p>In applying this memorandum, the following terms shall have the following meanings, unless the context requires otherwise:</p>
        </div>
        <div class="block rtl">
          <p>يكون للكلمات والعبارات التالية في هذا العقد المعاني المبينة أمام كل منها ما لم يقتض سياق النص بغير ذلك:</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <p><strong><u>1- Company:</u></strong> The Company established under this memorandum and registered in the commercial register.</p>
        </div>
        <div class="block rtl">
          <p><strong><u>1- الشركة:</u></strong> الشركة التي تأسست بموجب هذا العقد والمقيدة في السجل التجاري.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <p><strong><u>2- Commercial Companies Law:</u></strong> Federal Law No. (32) of 2021 on Commercial Companies.</p>
        </div>
        <div class="block rtl">
          <p><strong><u>2- قانون الشركات التجارية:</u></strong> القانون الاتحادي رقم (32) لسنة 2021 في شأن الشركات التجارية.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <p><strong><u>3- Director(s):</u></strong> The director or the directors of the company appointed pursuant to this memorandum.</p>
        </div>
        <div class="block rtl">
          <p><strong><u>3- المدير/المديرون:</u></strong> المدير أو مديرو الشركة المعينون بموجب هذا العقد.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <p><strong><u>4- Ministry:</u></strong> The Ministry of Economy.</p>
        </div>
        <div class="block rtl">
          <p><strong><u>4- الوزارة:</u></strong> وزارة الاقتصاد.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
