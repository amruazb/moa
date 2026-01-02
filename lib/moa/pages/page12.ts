import { MOAContext, pageFooter } from '../types'

export function page12(ctx: MOAContext): string {
  const { primary } = ctx

  return `
    <div class="page">
      <div class="page-content">
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (27)</h3>
          <p>This contract shall be registered in the commercial register and published in accordance with the law. Ms. ${primary.name} is solely authorized to carry out all necessary procedures in this regard. All costs, expenses, and other amounts incurred for establishing the company shall be deducted from the general expense account. As the sole owner, Ms. ${primary.name} retains full rights and authority over the company at all times, including in the event of any absence or failure to renew the trade license.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (27)</h3>
          <p>يقيد هذا العقد في السجل التجاري وينشر طبقاً للقانون، وقد فوض السيدة/ ${primary.nameAr} في اتخاذ كافة الإجراءات اللازمة في هذا الشأن. وتخصم جميع المصروفات والنفقات والتكاليف التي تم إنفاقها في سبيل تأسيس الشركة من حساب المصروفات العامة. وبصفته المالك الوحيد، يحتفظ السيدة/ ${primary.nameAr} بكامل الحقوق والسلطات على الشركة في جميع الأوقات، بما في ذلك في حال الغياب أو عدم تجديد الرخصة التجارية.</p>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (28)</h3>
          <p>This agreement is made in three copies, with Ms. ${primary.name} retaining one copy, and the remaining copies to be submitted to the relevant authority for necessary action.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (28)</h3>
          <p>حرر هذا العقد من ثلاث نسخ، يحتفظ السيدة/ ${primary.nameAr} بنسخة، وتودع النسختان المتبقيتان لدى جهات الاختصاص للعمل بهما.</p>
        </div>
      </div>
      <div class="article-pair" style="margin-top: 60px;">
        <div class="block">
          <p><strong>Ms. ${primary.name}</strong></p>
          <p style="margin-top: 30px;"><strong>Signature:</strong> ________________________________</p>
        </div>
        <div class="block rtl">
          <p><strong>السيدة/ ${primary.nameAr}</strong></p>
          <p style="margin-top: 30px;"><strong>التوقيع:</strong> ________________________________</p>
        </div>
      </div>
      </div>
      ${pageFooter(12, true)}
    </div>`
}
