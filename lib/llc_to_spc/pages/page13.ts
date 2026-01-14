import { LLCToSPCContext, conversionPageFooter } from '../types'

export function page13(ctx: LLCToSPCContext, pageNum: number = 13): string {
    const { firstParty, secondParty, thirdParty } = ctx

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

        <div class="article-pair" style="margin-top: 25px;">
          <div class="block" style="text-align: center; padding: 15px;">
            <p style="margin-bottom: 10px; font-weight: bold;">First Party / الطرف الأول</p>
            <p class="edited" style="margin: 5px 0; font-size: 11pt;">${firstParty.pronouns.title} ${firstParty.name}</p>
            <p class="edited" style="direction: rtl; margin: 5px 0; font-size: 11pt;">${firstParty.pronouns.titleAr}/ ${firstParty.nameAr}</p>
            <div style="border-bottom: 1px solid #000; width: 220px; margin: 60px auto 8px;"></div>
            <p style="font-size: 9pt; margin: 0;">Signature / التوقيع</p>
          </div>
          <div class="block" style="text-align: center; padding: 15px;">
            <p style="margin-bottom: 10px; font-weight: bold;">Second Party / الطرف الثاني</p>
            <p class="edited" style="margin: 5px 0; font-size: 11pt;">${secondParty.pronouns.title} ${secondParty.name}</p>
            <p class="edited" style="direction: rtl; margin: 5px 0; font-size: 11pt;">${secondParty.pronouns.titleAr}/ ${secondParty.nameAr}</p>
            <div style="border-bottom: 1px solid #000; width: 220px; margin: 60px auto 8px;"></div>
            <p style="font-size: 9pt; margin: 0;">Signature / التوقيع</p>
          </div>
        </div>

        <div style="margin-top: 25px; text-align: center;">
          <div style="display: inline-block; text-align: center; padding: 15px; min-width: 300px;">
            <p style="margin-bottom: 10px; font-weight: bold;">Third Party (New Owner) / الطرف الثالث (المالك الجديد)</p>
            <p class="edited" style="margin: 5px 0; font-size: 11pt;">${thirdParty.pronouns.title} ${thirdParty.name}</p>
            <p class="edited" style="direction: rtl; margin: 5px 0; font-size: 11pt;">${thirdParty.pronouns.titleAr}/ ${thirdParty.nameAr}</p>
            <div style="border-bottom: 1px solid #000; width: 220px; margin: 60px auto 8px;"></div>
            <p style="font-size: 9pt; margin: 0;">Signature / التوقيع</p>
          </div>
        </div>
      </div>

      </div>
      ${conversionPageFooter(pageNum, true)}
    </div>`
}
