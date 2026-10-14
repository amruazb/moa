import { signatureCards, ordinalParty } from '../../utils/signatureCard'
import { LLCAmendmentMOAContext, pageFooter } from '../types'

/** Third Party acknowledgment (if applicable), then signatures; last page of the LLC Amendment MOA. */
export function page10(ctx: LLCAmendmentMOAContext, pageNum: number = 9): string {
  const { partners } = ctx

  // Partners' acknowledgment (carried over from the previous page so the signature page always has clause content)
  const partnersAcknowledgment = `
        <!-- Partners' Acknowledgment -->
        <div class="article-pair" style="margin-top: 10px;">
          <div class="block">
            <p>The First and Second Party undertake that they had received all their entitlements from the company.</p>
          </div>
          <div class="block rtl">
            <p>يقر الطرف الأول والثاني بأنهما قد استلما كافة حقوقهما من الشركة.</p>
          </div>
        </div>`

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

  // All signature cards stay together on this page (2 per row for 3+ parties)
  const signatureBlocks = signatureCards(partners.map((partner, index) => {
    const o = ordinalParty(index)
    return { roleEn: o.en, roleAr: o.ar, nameEn: partner.name, nameAr: partner.nameAr, dateLabel: true }
  }))

  return `
    <div class="page">
      <div class="page-content">

        ${partnersAcknowledgment}

        ${thirdPartyAck}

        <div style="text-align: center; margin-bottom: 40px; margin-top: 10px;">
          <h3 class="underline" style="margin: 0;">Signatures / التوقيعات</h3>
        </div>

        ${signatureBlocks}

      </div>
      ${pageFooter(pageNum, true)}
    </div>`
}
