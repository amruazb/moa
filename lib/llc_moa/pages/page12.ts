import { LLCMOAContext, pageFooter, getOrdinal } from '../types'

export function page12(ctx: LLCMOAContext, pageNum: number = 12): string {
  const { partners } = ctx

  // Generate signature blocks for each partner
  const signatureBlocksEn = partners.map((partner, index) => {
    const ordinal = getOrdinal(index, 'en')
    return `
      <div style="margin-bottom: 20px;">
        <p><strong>${ordinal} Party:</strong></p>
        <p class="edited">${partner.pronouns.title} ${partner.name}</p>
        <p style="margin-top: 25px;">Signature: ___________________</p>
      </div>
    `
  }).join('')

  const signatureBlocksAr = partners.map((partner, index) => {
    const ordinal = getOrdinal(index, 'ar')
    return `
      <div style="margin-bottom: 20px;">
        <p><strong>الطرف ${ordinal}:</strong></p>
        <p class="edited">${partner.pronouns.titleAr}/ ${partner.nameAr}</p>
        <p style="margin-top: 25px;">التوقيع: ___________________</p>
      </div>
    `
  }).join('')

  return `
    <div class="page">
      <div class="page-content">

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (25)</h3>
          <h3 class="underline center">CONCLUDING PROVISIONS</h3>
          <p>The provisions of Federal Law No. (32) of 2021 concerning Commercial Companies and its amendments and executive regulations shall apply to whatever is not covered by a specific provision in this Memorandum.</p>
          <p>This Memorandum shall be registered in the Commercial Register and published in accordance with the law. The partners hereby authorize the Managing Director to carry out all necessary procedures in this regard. All costs, expenses, and other amounts incurred for establishing the Company shall be deducted from the general expense account.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (25)</h3>
          <h3 class="underline center">أحكام ختامية</h3>
          <p>تسري أحكام القانون الاتحادي رقم (32) لسنة 2021 بشأن الشركات التجارية وتعديلاته ولوائحه التنفيذية فيما لم يرد بشأنه نص خاص في هذا العقد.</p>
          <p>يقيد هذا العقد في السجل التجاري وينشر طبقاً للقانون، وقد فوض الشركاء المدير في اتخاذ كافة الإجراءات اللازمة في هذا الشأن. وتخصم جميع المصروفات والنفقات والتكاليف التي تم إنفاقها في سبيل تأسيس الشركة من حساب المصروفات العامة.</p>
        </div>
      </div>

      <div class="section-bar"><span>PARTNERS SIGNATURES</span><span class="rtl">توقيعات الشركاء</span></div>

      <div class="article-pair">
        <div class="block">
          ${signatureBlocksEn}
        </div>
        <div class="block rtl">
          ${signatureBlocksAr}
        </div>
      </div>

      </div>
      ${pageFooter(pageNum, true)}
    </div>`
}
