import { MOAContext, pageFooter } from '../types'

export function page8(ctx: MOAContext): string {
  const { primary } = ctx

  return `
    <div class="page">
      <div class="page-content">
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (28)</h3>
          <p>This Company shall have a copy of the Memorandum of Association and The Article of Association of the Limited Liability Company, a register of the names of the shareholders and a register of the managers. The company shall have all books defined in the Commercial Code and registration in the Commercial Register, and the Commercial Companies Law.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (28)</h3>
          <p>يجب أن يحتفظ لدى الشركة بنسخة من عقد تأسيس الشركة ذات المسؤولية المحدودة ونظامها الأساسي, وسجل بأسماء الشركاء وسجل بأسماء المديرين. ويكون لدى الشركة جميع الدفاتر المقررة في قانون المعاملات التجارية والقيد في السجل التجاري, وفي قانون الشركات التجارية.</p>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (29)</h3>
          <p>This contract shall be registered in the commercial register and published in accordance with the law. Ms. ${primary.name} is solely authorized to carry out all necessary procedures in this regard. All costs, expenses, and other amounts incurred for establishing the company shall be deducted from the general expense account.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (29)</h3>
          <p>يقيد هذا العقد في السجل التجاري وينشر طبقاً للقانون، وقد فوض السيدة/ ${primary.nameAr} في اتخاذ كافة الإجراءات اللازمة في هذا الشأن. وتخصم جميع المصروفات والنفقات والتكاليف التي تم إنفاقها في سبيل تأسيس الشركة من حساب المصروفات العامة.</p>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (30)</h3>
          <p>This agreement is made in three copies, with Ms. ${primary.name} retaining one copy, and the remaining copies to be submitted to the relevant authority for necessary action.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (30)</h3>
          <p>حرر هذا العقد من ثلاث نسخ، يحتفظ السيدة/ ${primary.nameAr} بنسخة، وتودع النسختان المتبقيتان لدى جهات الاختصاص للعمل بهما.</p>
        </div>
      </div>
      <div class="article-pair" style="margin-top: 40px;">
        <div class="block" style="min-height: 51mm;">
          <p><strong>Ms. ${primary.name}</strong></p>
          <p style="margin-top: 80px;"><strong>Signature:</strong> ________________________________</p>
        </div>
        <div class="block rtl" style="min-height: 51mm;">
          <p><strong>السيدة/ ${primary.nameAr || primary.name}</strong></p>
          <p style="margin-top: 80px;"><strong>التوقيع:</strong> ________________________________</p>
        </div>
      </div>
      </div>
      ${pageFooter(8, true)}
    </div>`
}
