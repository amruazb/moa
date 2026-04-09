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

  const signatureBlocks = partners.map((partner, index) => {
    const ordinalEn = index === 0 ? 'First' : index === 1 ? 'Second' : index === 2 ? 'Third' : `${index + 1}th`
    const ordinalAr = index === 0 ? 'الأول' : index === 1 ? 'الثاني' : index === 2 ? 'الثالث' : `${index + 1}`

    return `
      <div style="text-align: center; margin-bottom: 40px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 15px;">
          <div>
            <p style="margin-bottom: 5px;"><strong>${ordinalEn} Party:</strong></p>
            <p class="edited" style="margin-bottom: 0;">${partner.name}</p>
          </div>
          <div dir="rtl">
            <p style="margin-bottom: 5px;"><strong>الطرف ${ordinalAr}:</strong></p>
            <p class="edited" style="margin-bottom: 0;">${partner.nameAr}</p>
          </div>
        </div>
        <div style="margin-top: 80px;">
          <span style="display: inline-block; width: 200px; border-bottom: 1px solid #000;"></span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 5px;">
          <p style="margin: 0; font-size: 10pt;">Signature / التوقيع</p>
          <p style="margin: 0; font-size: 10pt;">Date / التاريخ</p>
        </div>
      </div>
    `
  }).join('')

  return `
    <div class="page">
      <div class="page-content">

        ${thirdPartyAck}

        <div style="text-align: center; margin-bottom: 40px; margin-top: 10px;">
          <h3 class="underline" style="margin: 0;">Signatures / التوقيعات</h3>
        </div>

        ${signatureBlocks}

      </div>
      ${pageFooter(pageNum, true)}
    </div>`
}
