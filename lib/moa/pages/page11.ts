import { MOAContext, pageFooter } from '../types'

export function page11(ctx: MOAContext, pageNum: number = 11, isLastPage: boolean = true): string {
  const { primary } = ctx

  return `
    <div class="page">
      <div class="page-content">
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

      <div style="margin-top: 80px; display: flex; justify-content: space-between; gap: 40px; padding: 0 20px;">
        <div style="flex: 1; text-align: center; padding: 20px 30px;">
          <p style="font-size: 11pt; margin-bottom: 0;"><strong>Ms. ${primary.name}</strong></p>
          <div style="margin-top: 80px; border-bottom: 1px solid #333; width: 200px; margin-left: auto; margin-right: auto;"></div>
          <p style="margin-top: 8px; font-size: 10pt;"><strong>Signature</strong></p>
        </div>
        <div style="flex: 1; text-align: center; padding: 20px 30px; direction: rtl;">
          <p style="font-size: 11pt; margin-bottom: 0;"><strong>السيدة/ ${primary.nameAr || primary.name}</strong></p>
          <div style="margin-top: 80px; border-bottom: 1px solid #333; width: 200px; margin-left: auto; margin-right: auto;"></div>
          <p style="margin-top: 8px; font-size: 10pt;"><strong>التوقيع</strong></p>
        </div>
      </div>
      </div>
      ${pageFooter(pageNum, isLastPage)}
    </div>`
}
