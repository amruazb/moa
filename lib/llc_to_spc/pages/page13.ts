import { signatureCards, ordinalParty } from '../../utils/signatureCard'
import { LLCToSPCContext, conversionPageFooter } from '../types'

export function page13(ctx: LLCToSPCContext, pageNum: number = 13): string {
  const { firstParty, secondParty, newOwner } = ctx

  return `
    <div class="page">
      <div class="page-content">

      <!-- Article 28: Effective Date -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (28): Effective Date</h3>
          <p>This agreement shall become effective upon signature by all parties and attestation by the Notary Public. The conversion of the company from LLC to LLC-SPC shall take effect upon registration with the competent authorities.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (28): تاريخ السريان</h3>
          <p>يصبح هذا الاتفاق نافذاً عند التوقيع من قبل جميع الأطراف والتصديق من قبل الكاتب العدل. ويسري تحويل الشركة من شركة ذات مسؤولية محدودة إلى شركة الشخص الواحد ذ.م.م عند التسجيل لدى الجهات المختصة.</p>
        </div>
      </div>

      <!-- Signature Blocks -->
      <div style="margin-top: 30px;">
        <!-- Single centered heading with underline -->
        <h3 class="underline center" style="text-align: center; width: 100%; margin-bottom: 25px;">Signatures / التوقيعات</h3>

        ${signatureCards([
          ...[firstParty, secondParty].map((p, i) => {
            const o = ordinalParty(i)
            return { roleEn: o.en, roleAr: o.ar, nameEn: `${p.pronouns.title} ${p.name}`, nameAr: `${p.pronouns.titleAr}/ ${p.nameAr}` }
          }),
          { roleEn: 'Third Party (New Owner)', roleAr: 'الطرف الثالث (المالك الجديد)', nameEn: `${newOwner.pronouns.title} ${newOwner.name}`, nameAr: `${newOwner.pronouns.titleAr}/ ${newOwner.nameAr}` },
        ])}
      </div>

      </div>
      ${conversionPageFooter(pageNum, true)}
    </div>`
}
