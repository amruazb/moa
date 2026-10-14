import { signatureCard } from '../../utils/signatureCard'
import { MOAContext, pageFooter } from '../types'

export function page13(ctx: MOAContext, pageNum: number = 13, isLastPage: boolean = true): string {
  const { primary, pronouns } = ctx

  return `
    <div class="page">
      <div class="page-content">
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (28): Copies of Contract</h3>
          <p>This agreement is made in three copies, with <strong>${pronouns.title} ${primary.name}</strong> retaining one copy, and the remaining copies to be submitted to the relevant authority for necessary action.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (28): نسخ العقد</h3>
          <p>حرر هذا العقد من ثلاث نسخ، يحتفظ <strong>${pronouns.titleAr}/ ${primary.nameAr}</strong> بنسخة، وتودع النسختان المتبقيتان لدى جهات الاختصاص للعمل بهما.</p>
        </div>
      </div>

      <div style="margin-top: 60px;">
        ${signatureCard({ roleEn: 'The Owner', roleAr: 'المالك', nameEn: `${pronouns.title} ${primary.name}`, nameAr: `${pronouns.titleAr}/ ${primary.nameAr}` })}
      </div>
      </div>
      ${pageFooter(pageNum, isLastPage)}
    </div>`
}
