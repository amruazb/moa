import { LLCToSPCContext, conversionPageFooter } from '../types'

export function page12(ctx: LLCToSPCContext, pageNum: number = 12): string {
  const { newOwner } = ctx

  return `
    <div class="page">
      <div class="page-content">

      <!-- Chapter VIII: Concluding Provisions -->
      <div class="article-pair">
        <div class="block chapter">
          <h3 class="underline center">CHAPTER VIII</h3>
          <h3 class="center">Concluding Provisions</h3>
        </div>
        <div class="block rtl chapter">
          <h3 class="underline center">الباب الثامن</h3>
          <h3 class="center">أحكام ختامية</h3>
        </div>
      </div>

      <!-- Article 25: Applicable Law -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (25): Applicable Law</h3>
          <p>The provisions of Federal Law No. (32) Of 2021 concerning Commercial Companies and its amendments and executive regulations shall apply to whatever not covered by a specific provision in this Memorandum.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (25): القانون الواجب التطبيق</h3>
          <p>تسري أحكام القانون الاتحادي رقم (32) لسنة 2021 في شأن الشركات التجارية وتعديلاته ولوائحه التنفيذية في شأن يرد بشأنها نص خاص في هذا العقد.</p>
        </div>
      </div>

      <!-- Article 26: Registration and Publication -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (26): Registration and Publication</h3>
          <p>This contract shall be registered in the commercial register and published in accordance with the law. <strong>${newOwner.pronouns.title} ${newOwner.name}</strong> is solely authorized to carry out all necessary procedures in this regard. All costs, expenses, and other amounts incurred for establishing the company shall be deducted from the general expense account. As the sole owner, <strong>${newOwner.pronouns.title} ${newOwner.name}</strong> retains full rights and authority over the company at all times, including in the event of any absence or failure to renew the trade license.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (26): القيد والنشر</h3>
          <p>يقيد هذا العقد في السجل التجاري وينشر طبقاً للقانون، وقد فوض <strong>${newOwner.pronouns.titleAr}/ ${newOwner.nameAr}</strong> في اتخاذ كافة الإجراءات اللازمة في هذا الشأن. وتخصم جميع المصروفات والنفقات والتكاليف التي تم إنفاقها في سبيل تأسيس الشركة من حساب المصروفات العامة. وبصفت${newOwner.pronouns.possessiveAr} المالك الوحيد، يحتفظ <strong>${newOwner.pronouns.titleAr}/ ${newOwner.nameAr}</strong> بكامل الحقوق والسلطات على الشركة في جميع الأوقات، بما في ذلك في حال الغياب أو عدم تجديد الرخصة التجارية.</p>
        </div>
      </div>

      <!-- Article 27: Copies of Contract -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (27): Copies of Contract</h3>
          <p>This agreement is made in four copies, with each party retaining one copy, and the remaining copy to be submitted to the relevant authority for necessary action.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (27): نسخ العقد</h3>
          <p>حرر هذا العقد من أربع نسخ، يحتفظ كل طرف بنسخة، وتودع النسخة المتبقية لدى جهات الاختصاص للعمل بها.</p>
        </div>
      </div>

      </div>
      ${conversionPageFooter(pageNum)}
    </div>`
}
