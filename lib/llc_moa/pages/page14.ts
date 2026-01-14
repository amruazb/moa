import { LLCMOAContext, pageFooter, getOrdinal } from '../types'

export function page14(ctx: LLCMOAContext, pageNum: number = 14): string {
  const { partners, manager } = ctx

  // Generate unified signature blocks with both languages side by side
  const signatureBlocks = partners.map((partner, index) => {
    const ordinalEn = getOrdinal(index, 'en')
    const ordinalAr = getOrdinal(index, 'ar')
    return `
      <div class="signature-block-unified" style="margin-bottom: 50px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 20px;">
          <div style="flex: 1;">
            <p style="margin-bottom: 5px;"><strong>${ordinalEn} Party:</strong></p>
            <p class="edited" style="margin-bottom: 0;">${partner.pronouns.title} ${partner.name}</p>
          </div>
          <div style="flex: 1; text-align: right;" dir="rtl">
            <p style="margin-bottom: 5px;"><strong>الطرف ${ordinalAr}:</strong></p>
            <p class="edited" style="margin-bottom: 0;">${partner.pronouns.titleAr}/ ${partner.nameAr}</p>
          </div>
        </div>
        <p style="text-align: center; margin-top: 70px;">Signature / التوقيع: _______________________________</p>
      </div>
    `
  }).join('')

  return `
    <div class="page">
      <div class="page-content">

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (27): Registration and Publication</h3>
          <p>This contract shall be registered in the commercial register and the same shall be published as per law. Partners have authorized <span class="edited">${manager.pronouns.title} ${manager.name}</span>, <span class="edited">${manager.nationality}</span> national to carry out the required procedures in this regard. All costs, expenses and things incurred for establishing the company shall be deducted from general expense account. If the second party leave the country for more than six months by not renewing the trade license the first party will held all power and rights on the company.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (27): القيد والنشر</h3>
          <p>يقيد هذا العقد في السجل التجاري وينشر طبقا للقانون وقد فوض الشركاء <span class="edited">${manager.pronouns.titleAr}/ ${manager.nameAr}</span>، الجنسية <span class="edited">${manager.nationalityAr}</span>، في اتخاذ كافة الإجراءات اللازمة في هذا الشأن وتخصم المصروفات والنفقات والأشياء والتكاليف التي تم إنفاقها في سبيل تأسيس الشركة من حساب المصروفات العامة. وإذا ترك الطرف الثاني الدولة أكثر من ستة أشهر بدون تجديد الرخصة التجارية ويتولى الطرف الاول كافة حقوق وسلطات الشركة.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (28): Copies of Contract</h3>
          <p>This agreement is made of three copies, of which each party received one copy; remaining copy to act accordingly with the concerned authority.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (28): نسخ العقد</h3>
          <p>حرر هذا العقد من ثلاث نسخ، بيد كل طرف نسخة والنسخة المتبقية للعمل بها لدى جهات الاختصاص.</p>
        </div>
      </div>

      <div style="margin-top: 30px;">
        ${signatureBlocks}
      </div>

      </div>
      ${pageFooter(pageNum, true)}
    </div>`
}
