import { MOAContext, pageFooter } from '../types'

export function page13(ctx: MOAContext, pageNum: number = 13, isLastPage: boolean = true): string {
  const { primary, pronouns } = ctx

  return `
    <div class="page">
      <div class="page-content">
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (28)</h3>
          <p>This agreement is made in three copies, with <strong>${pronouns.title} ${primary.name}</strong> retaining one copy, and the remaining copies to be submitted to the relevant authority for necessary action.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (28)</h3>
          <p>حرر هذا العقد من ثلاث نسخ، يحتفظ <strong>${pronouns.titleAr}/ ${primary.nameAr}</strong> بنسخة، وتودع النسختان المتبقيتان لدى جهات الاختصاص للعمل بهما.</p>
        </div>
      </div>

      <div style="margin-top: 150px; text-align: center;">
        <div style="margin-bottom: 40px;">
          <p style="font-size: 13pt; margin-bottom: 8px;"><strong>${pronouns.title} ${primary.name}</strong></p>
          <p style="font-size: 13pt; direction: rtl;"><strong>${pronouns.titleAr}/ ${primary.nameAr}</strong></p>
        </div>
        
        <div style="margin-top: 150px; margin-bottom: 20px;">
          <div style="border-bottom: 2px solid #000; width: 300px; margin: 0 auto;"></div>
        </div>
        
        <div>
          <p style="font-size: 11pt; margin-bottom: 5px;"><strong>Signature</strong></p>
          <p style="font-size: 11pt; direction: rtl;"><strong>التوقيع</strong></p>
        </div>
      </div>
      </div>
      ${pageFooter(pageNum, isLastPage)}
    </div>`
}
