import { signatureCard, ordinalParty, splitSignatureCards } from '../../utils/signatureCard'
import { LLCAmendmentMOAContext, pageFooter } from '../types'

/** Third Party acknowledgment (if applicable), then signatures; last page of the LLC Amendment MOA. */
export function page10(ctx: LLCAmendmentMOAContext, pageNum: number = 9): string {
  const { partners } = ctx

  const thirdPartyAck =
    partners.length > 2
      ? `
        <div class="article-pair" style="margin-top: 10px; margin-bottom: 28px;">
          <div class="block">
            <p>The Third Party undertakes that it has received all its entitlements from the company in connection with the assignment of its shares as set out in this addendum.</p>
          </div>
          <div class="block rtl">
            <p>يقر الطرف الثالث بأنه قد استلم كافة حقوقه من الشركة فيما يتعلق بالتنازل عن حصصه المنصوص عليه في هذا الملحق.</p>
          </div>
        </div>`
      : ''

  const cards = partners.map((partner, index) => {
    const o = ordinalParty(index)
    return signatureCard({ roleEn: o.en, roleAr: o.ar, nameEn: partner.name, nameAr: partner.nameAr, dateLabel: true })
  })
  const { first: signatureBlocks, overflow } = splitSignatureCards(cards, partners.length > 2 ? 3 : 4)

  return `
    <div class="page">
      <div class="page-content">

        ${thirdPartyAck}

        <div style="text-align: center; margin-bottom: 40px; margin-top: 10px;">
          <h3 class="underline" style="margin: 0;">Signatures / التوقيعات</h3>
        </div>

        ${signatureBlocks}

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
