import { InternalAgreementContext, pageFooter, ordinalParty } from '../types'

export function page4(ctx: InternalAgreementContext, pageNum: number, totalPages: number): string {
  const signatureCards = ctx.parties
    .map((party, index) => {
      return `
        <div class="signature-card">
          <div class="party-label">${ordinalParty(index, 'en')} / ${ordinalParty(index, 'ar')}</div>
          <div class="party-name">${party.name}</div>
          <div class="meta">
            Share: <strong>${party.sharePercent}%</strong><br/>
            EID: ${party.eid}<br/>
            ${party.roleEn}
          </div>
          <div class="sign-space"></div>
          <div class="sign-line"></div>
          <div class="sign-label">Signature / التوقيع</div>
          <div class="sign-space sign-space-date"></div>
          <div class="sign-line"></div>
          <div class="sign-label">Date / التاريخ</div>
        </div>`
    })
    .join('')

  return `
    <div class="page">
      <div class="page-content">
        <div class="article-pair tight">
          <div class="block">
            <h3 class="bold underline">ARTICLE (9) — ENTIRE UNDERSTANDING</h3>
            <p>
              This Agreement constitutes the entire understanding among the Parties with
              respect to the internal shareholding of the Company and supersedes any prior
              oral understanding on the same subject.
            </p>
            <p>
              IN WITNESS WHEREOF, the Parties have signed this Internal Shareholding
              Agreement on the date first written above, in <span class="edited">${ctx.place}</span>.
            </p>
          </div>
          <div class="block rtl">
            <h3 class="bold underline">المادة (9) — كامل التفاهم</h3>
            <p>
              تشكل هذه الاتفاقية كامل التفاهم بين الأطراف فيما يتعلق بالحصص الداخلية في الشركة
              وتحل محل أي تفاهم شفهي سابق في هذا الشأن.
            </p>
            <p>
              وإثباتاً لما تقدم، وقع الأطراف اتفاقية الحصص الداخلية هذه في التاريخ المذكور أعلاه،
              في <span class="edited">${ctx.placeAr}</span>.
            </p>
          </div>
        </div>

        <div class="signature-grid">
          ${signatureCards}
        </div>

        <div class="stamp-box">
          Company Stamp / ختم الشركة<br/>
          <span class="edited">${ctx.companyName}</span><br/>
          <span class="edited">${ctx.companyNameAr}</span>
        </div>
      </div>
      ${pageFooter(pageNum, totalPages)}
    </div>`
}
