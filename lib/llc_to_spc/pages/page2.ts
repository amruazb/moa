import { LLCToSPCContext, conversionPageFooter } from '../types'

export function page2(ctx: LLCToSPCContext, pageNum: number = 2): string {
  const { firstParty, secondParty, thirdParty, license, originalMOA } = ctx

  return `
    <div class="page">
      <div class="page-content">

      <!-- Preamble -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Preamble</h3>
          <p>Whereas the First Party and Second Party own the Business License No: <strong class="edited">${license.licenseNumber}</strong>, issued by the <span class="edited">${license.issuingAuthority}</span> named: <strong class="edited">${license.oldCompanyName}</strong> under the LLC MOA attested by Notary Public under No. <strong class="edited">${originalMOA.moaNumber}</strong> dated <strong class="edited">${originalMOA.moaDate}</strong>.</p>
          <p>And the First Party owns <strong class="edited">${firstParty.sharesPercent}%</strong> shares and the Second Party owns <strong class="edited">${secondParty.sharesPercent}%</strong> shares from the total shares in the company's capital.</p>
          <p>Now the First Party and Second Party have agreed to assign and transfer all their shares (<strong class="edited">100%</strong>) to the Third Party, who shall become the sole owner of the company, converting it to a Sole Proprietorship LLC (LLC-SPC).</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">تمهيد</h3>
          <p>بما أن الطرف الأول والطرف الثاني يملكان الرخصة التجارية رقم: <strong class="edited">${license.licenseNumber}</strong>، الصادرة من <span class="edited">${license.issuingAuthorityAr}</span>، باسم: <strong class="edited">${license.oldCompanyNameAr}</strong> بموجب عقد التأسيس لشركة ذات مسؤولية محدودة المصدق من قبل الكاتب العدل برقم: <strong class="edited">${originalMOA.moaNumber}</strong> بتاريخ <strong class="edited">${originalMOA.moaDate}</strong>.</p>
          <p>والطرف الأول يملك <strong class="edited">${firstParty.sharesPercent}%</strong> من الحصص والطرف الثاني يملك <strong class="edited">${secondParty.sharesPercent}%</strong> من الحصص من إجمالي حصص رأس مال الشركة.</p>
          <p>والآن قد اتفق الطرف الأول والطرف الثاني على التنازل ونقل جميع حصصهما (<strong class="edited">100%</strong>) إلى الطرف الثالث، الذي سيصبح المالك الوحيد للشركة، محولاً إياها إلى شركة الشخص الواحد ذات مسؤولية محدودة (ذ.م.م - ش.ش.و).</p>
        </div>
      </div>

      <!-- Article 1: Assignment of Shares -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (1): Assignment of Shares</h3>
          <p>The First Party hereby assigns and transfers <strong class="edited">${firstParty.sharesPercent}%</strong> of the total shares in the company's capital to the Third Party.</p>
          <p>The Second Party hereby assigns and transfers <strong class="edited">${secondParty.sharesPercent}%</strong> of the total shares in the company's capital to the Third Party.</p>
          <p>The Third Party accepts this assignment and transfer, becoming the sole owner of <strong class="edited">100%</strong> of the company's capital.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (1): التنازل عن الحصص</h3>
          <p>يتنازل الطرف الأول بموجب هذا العقد عن <strong class="edited">${firstParty.sharesPercent}%</strong> من إجمالي حصص رأس مال الشركة للطرف الثالث.</p>
          <p>يتنازل الطرف الثاني بموجب هذا العقد عن <strong class="edited">${secondParty.sharesPercent}%</strong> من إجمالي حصص رأس مال الشركة للطرف الثالث.</p>
          <p>يقبل الطرف الثالث هذا التنازل والنقل، ليصبح المالك الوحيد لـ <strong class="edited">100%</strong> من رأس مال الشركة.</p>
        </div>
      </div>

      <!-- Article 2: Consideration -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (2): Consideration</h3>
          <p>The assignment and transfer of shares is made for the agreed consideration between the parties, which the First Party and Second Party acknowledge receipt of in full prior to the execution of this agreement.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (2): المقابل</h3>
          <p>يتم التنازل ونقل الحصص مقابل المبلغ المتفق عليه بين الأطراف، والذي يقر الطرف الأول والطرف الثاني باستلامه كاملاً قبل توقيع هذا الاتفاق.</p>
        </div>
      </div>

      </div>
      ${conversionPageFooter(pageNum)}
    </div>`
}
