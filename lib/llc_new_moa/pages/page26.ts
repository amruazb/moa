import { LLCNewMOAContext, pageFooter, getOrdinal, getPronouns } from '../types'

export function page25(ctx: LLCNewMOAContext, pageNum: number = 25): string {
    const { company, partners } = ctx

    // Generate signature blocks for each partner
    const signatureBlocksEn = partners.map((partner, index) => `
    <div class="signature-block">
      <p class="signature-label">(${getOrdinal(index, 'en')} Partner)</p>
      <p class="company-name"><strong>${partner.name}</strong></p>
      <p class="rep-name">Represented by: ${getPronouns(partner.representative.salutation).title} ${partner.representative.name}</p>
      <div class="signature-line-container">
        <span class="signature-line-long"></span>
      </div>
    </div>
  `).join('\n')

    const signatureBlocksAr = partners.map((partner, index) => `
    <div class="signature-block">
      <p class="signature-label">(الشريك ${getOrdinal(index, 'ar')})</p>
      <p class="company-name"><strong>${partner.nameAr}</strong></p>
      <p class="rep-name">ويمثلها: ${getPronouns(partner.representative.salutation).titleAr}/ ${partner.representative.nameAr}</p>
      <div class="signature-line-container">
        <span class="signature-line-long"></span>
      </div>
    </div>
  `).join('\n')

    return `
    <div class="page">
      <div class="page-content">
      
      <!-- Witness Statement -->
      <div class="article-pair">
        <div class="block">
          <p><strong>IN WITNESS WHEREOF</strong>, the Partners have signed and executed this Memorandum on the day, month and year specified in the seal of the notary public.</p>
        </div>
        <div class="block rtl">
          <p><strong>وإشهاداً على ذلك</strong>، قام الشركاء بتوقيع هذا العقد في اليوم والشهر والسنة المحددة في ختم كاتب العدل.</p>
        </div>
      </div>
      
      <!-- Signature Blocks -->
      <div class="article-pair signature-section">
        <div class="block">
          <p><strong>Signed by:</strong></p>
          ${signatureBlocksEn}
        </div>
        <div class="block rtl">
          <p><strong>وقّعت من قِبَل:</strong></p>
          ${signatureBlocksAr}
        </div>
      </div>
      
      </div>
      ${pageFooter(pageNum, true)}
    </div>`
}
