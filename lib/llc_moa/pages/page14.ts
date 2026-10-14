import { signatureCard, ordinalParty, splitSignatureCards } from '../../utils/signatureCard'
import { LLCMOAContext, pageFooter, getOrdinal, getCopyCount, getCopiesWords, listManagersNamesEn, listManagersNamesAr } from '../types'

export function page14(ctx: LLCMOAContext, pageNum: number = 14): string {
  const { partners } = ctx
  const managers = ctx.managers?.length ? ctx.managers : [ctx.manager]
  const copies = getCopiesWords(getCopyCount(partners.length))
  const authorizedEn = listManagersNamesEn(managers)
  const authorizedAr = listManagersNamesAr(managers)

  // One centered bilingual signature card per partner, flowing onto extra pages if needed
  const cards = partners.map((partner, index) => {
    const o = ordinalParty(index)
    return signatureCard({ roleEn: o.en, roleAr: o.ar, nameEn: `${partner.pronouns.title} ${partner.name}`, nameAr: `${partner.pronouns.titleAr}/ ${partner.nameAr}` })
  })
  const { first: signatureBlocks, overflow } = splitSignatureCards(cards, 2)

  return `
    <div class="page">
      <div class="page-content">

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (27): Registration and Publication</h3>
          <p>This contract shall be registered in the commercial register and the same shall be published as per law. Partners have authorized ${authorizedEn} to carry out the required procedures in this regard. All costs, expenses and things incurred for establishing the company shall be deducted from general expense account. If the second party leave the country for more than six months by not renewing the trade license the first party will held all power and rights on the company.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (27): القيد والنشر</h3>
          <p>يقيد هذا العقد في السجل التجاري وينشر طبقا للقانون وقد فوض الشركاء ${authorizedAr}، في اتخاذ كافة الإجراءات اللازمة في هذا الشأن وتخصم المصروفات والنفقات والأشياء والتكاليف التي تم إنفاقها في سبيل تأسيس الشركة من حساب المصروفات العامة. وإذا ترك الطرف الثاني الدولة أكثر من ستة أشهر بدون تجديد الرخصة التجارية ويتولى الطرف الاول كافة حقوق وسلطات الشركة.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (28): Copies of Contract</h3>
          <p>This agreement is made of ${copies.en} copies, of which each party received one copy; remaining copy to act accordingly with the concerned authority.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (28): نسخ العقد</h3>
          <p>حرر هذا العقد من ${copies.ar} نسخ، بيد كل طرف نسخة والنسخة المتبقية للعمل بها لدى جهات الاختصاص.</p>
        </div>
      </div>

      <div style="margin-top: 30px;">
        ${signatureBlocks}
      </div>

      </div>
      ${pageFooter(pageNum, overflow.length === 0)}
    </div>${overflow.map((html, i) => `
    <div class="page">
      <div class="page-content">
      <div style="margin-top: 30px;">${html}</div>
      </div>
      ${pageFooter(pageNum + i + 1, i === overflow.length - 1)}
    </div>`).join('')}`
}
