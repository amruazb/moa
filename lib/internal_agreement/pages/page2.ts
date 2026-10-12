import {
  InternalAgreementContext,
  pageFooter,
  shareValue,
  formatMoney,
} from '../types'

export function page2(ctx: InternalAgreementContext, pageNum: number, totalPages: number): string {
  const rows = ctx.parties
    .map((party, index) => {
      const value = shareValue(ctx.capital, party.sharePercent)
      return `
        <tr>
          <td class="num">${index + 1}</td>
          <td>${party.name}<br/><span style="font-size:7.5pt">${party.nameAr}</span></td>
          <td class="num">${party.eid}</td>
          <td>${party.roleEn}<br/><span style="font-size:7.5pt">${party.roleAr}</span></td>
          <td class="num">${party.sharePercent}%</td>
          <td class="num">AED ${formatMoney(value)}</td>
        </tr>`
    })
    .join('')

  return `
    <div class="page">
      <div class="page-content">
        <div class="article-pair tight">
          <div class="block">
            <h3 class="bold underline">COMPANY</h3>
            <p><strong>Trade Name:</strong> <span class="edited">${ctx.companyName}</span></p>
            <p><strong>Legal Form:</strong> <span class="edited">${ctx.legalForm}</span></p>
            <p><strong>Licence No.:</strong> <span class="edited">${ctx.licenseNo}</span></p>
            <p><strong>Unified Registration No.:</strong> <span class="edited">${ctx.unifiedRegNo}</span></p>
            <p><strong>Unified Licence No.:</strong> <span class="edited">${ctx.unifiedLicenseNo}</span></p>
            <p><strong>Establishment Date:</strong> <span class="edited">${ctx.establishmentDate}</span></p>
            <p><strong>Emirate:</strong> <span class="edited">${ctx.emirate}</span></p>
            <p><strong>Capital:</strong> AED <span class="edited">${formatMoney(ctx.capital)}</span> (${ctx.capitalWordsEn} Dirhams)</p>
          </div>
          <div class="block rtl">
            <h3 class="bold underline">الشركة</h3>
            <p><strong>الاسم التجاري:</strong> <span class="edited">${ctx.companyNameAr}</span></p>
            <p><strong>الشكل القانوني:</strong> <span class="edited">${ctx.legalFormAr}</span></p>
            <p><strong>رقم الرخصة:</strong> <span class="edited">${ctx.licenseNo}</span></p>
            <p><strong>رقم التسجيل الموحد:</strong> <span class="edited">${ctx.unifiedRegNo}</span></p>
            <p><strong>رقم الرخصة الموحد:</strong> <span class="edited">${ctx.unifiedLicenseNo}</span></p>
            <p><strong>تاريخ التأسيس:</strong> <span class="edited">${ctx.establishmentDate}</span></p>
            <p><strong>الإمارة:</strong> <span class="edited">${ctx.emirateAr}</span></p>
            <p><strong>رأس المال:</strong> <span class="edited">${formatMoney(ctx.capital)}</span> درهم (${ctx.capitalWordsAr} درهم)</p>
          </div>
        </div>

        <div class="article-pair tight">
          <div class="block">
            <h3 class="bold underline">ARTICLE (1) — PURPOSE</h3>
            <p>
              The Parties enter into this private Internal Shareholding Agreement to record
              and evidence, among themselves, their agreed internal shareholding in the Company,
              so that this signed document shall serve as written proof of such shares.
            </p>
            <p>
              The First Party and the Second Party are the partners currently recorded on the
              commercial licence. The Third Party's interest is an internal shareholding agreed
              among all Parties and recorded herein as proof among themselves. The commercial
              licence remains as issued by the competent authority.
            </p>
          </div>
          <div class="block rtl">
            <h3 class="bold underline">المادة (1) — الغرض</h3>
            <p>
              أبرم الأطراف اتفاقية الحصص الداخلية الخاصة هذه لتسجيل وإثبات حصصهم الداخلية
              المتفق عليها في الشركة فيما بينهم، لتكون هذه الوثيقة الموقعة دليلاً كتابياً على تلك الحصص.
            </p>
            <p>
              الطرف الأول والطرف الثاني هما الشريكان المقيدان حالياً في الرخصة التجارية.
              وحصة الطرف الثالث حصة داخلية متفق عليها بين جميع الأطراف ومثبتة في هذه الاتفاقية
              كدليل فيما بينهم. وتبقى الرخصة التجارية كما صدرت عن الجهة المختصة.
            </p>
          </div>
        </div>

        <div class="article-pair tight">
          <div class="block">
            <h3 class="bold underline">ARTICLE (2) — INTERNAL SHAREHOLDING</h3>
            <p>
              The Parties agree that the internal shareholding in the Company, and the
              corresponding economic interest in the capital of
              AED <span class="edited">${formatMoney(ctx.capital)}</span>, shall be as follows:
            </p>
          </div>
          <div class="block rtl">
            <h3 class="bold underline">المادة (2) — الحصص الداخلية</h3>
            <p>
              يتفق الأطراف على أن الحصص الداخلية في الشركة، والمصلحة الاقتصادية المقابلة في رأس المال
              البالغ <span class="edited">${formatMoney(ctx.capital)}</span> درهم، تكون على النحو التالي:
            </p>
          </div>
        </div>

        <div class="share-table-wrap">
          <table class="share-table">
            <thead>
              <tr>
                <th class="num">#</th>
                <th>Name / الاسم</th>
                <th class="num">Emirates ID / الهوية</th>
                <th>Capacity / الصفة</th>
                <th class="num">Share / الحصة</th>
                <th class="num">Value / القيمة</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4">Total / الإجمالي</td>
                <td class="num">100%</td>
                <td class="num">AED ${formatMoney(ctx.capital)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      ${pageFooter(pageNum, totalPages)}
    </div>`
}
