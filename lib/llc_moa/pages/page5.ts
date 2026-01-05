import { LLCMOAContext, pageFooter, getOrdinal } from '../types'

export function page5(ctx: LLCMOAContext, pageNum: number = 5): string {
  const { partners, capital, capitalWordsEn, capitalWordsAr, totalShares, shareValue, company } = ctx

  // Generate partner share rows for the table (with value column)
  const shareRowsEn = partners.map((partner) => {
    const value = partner.shareCount * shareValue
    return `<tr>
      <td class="edited">${partner.name}</td>
      <td class="edited">${partner.shareCount}</td>
      <td class="edited">${value.toLocaleString()}</td>
      <td class="edited">${partner.sharePercent}%</td>
    </tr>`
  }).join('')

  const shareRowsAr = partners.map((partner) => {
    const value = partner.shareCount * shareValue
    return `<tr>
      <td class="edited">${partner.nameAr}</td>
      <td class="edited">${partner.shareCount}</td>
      <td class="edited">${value.toLocaleString()}</td>
      <td class="edited">${partner.sharePercent}%</td>
    </tr>`
  }).join('')

  return `
    <div class="page">
      <div class="page-content">

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (5)</h3>
          <p>The head office of the Company shall be in <span class="edited">${company.emirate}</span>. The General Assembly of the partners may transfer the head office of the company to another location in the same Emirate or decide to establish branches in the United Arab Emirates. If the head office is transferred to another Emirate, this should be in accordance with a resolution of the General Assembly of the Partners.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (5)</h3>
          <p>يكون مركز الشركة الرئيسي في <span class="edited">${company.emirateAr}</span>، ويجوز بقرار من الجمعية العمومية نقل المركز الرئيسي إلى أية جهة أخرى في نفس الإمارة كما يجوز له أن يقرر إنشاء فروع في دولة الإمارات العربية المتحدة، وإذا تقرر نقل المركز الرئيس إلى إمارة أخرى فيلزم أن يكون بناء على قرار من الجمعية العمومية للشركاء.</p>
        </div>
      </div>

      <div class="section-bar"><span>CHAPTER II</span><span class="rtl">الباب الثاني</span></div>
      <div class="section-bar"><span>Capital and Shares</span><span class="rtl">رأس المال – الحصص</span></div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (6)</h3>
          <p>The Capital of the company is determined to be AED <span class="edited">${capital.toLocaleString()}</span> (<span class="edited">${capitalWordsEn}</span> Dirhams), distributed into one hundred (<span class="edited">${totalShares}</span>) equal shares. The value of each share is AED <span class="edited">${shareValue}</span> (Thousand And Five Hundred Dirhams). These shares are distributed among the partners as follows:</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (6)</h3>
          <p>حدد رأس مال الشركة بمبلغ <span class="edited">${capital.toLocaleString()}</span> درهم (<span class="edited">${capitalWordsAr}</span> درهم) موزعة إلى مائة (<span class="edited">${totalShares}</span>) حصة متساوية قيمة كل حصة <span class="edited">${shareValue}</span> درهم (ألف وخمس مائة درهم) وهذه الحصص تقسم بين الشركاء على الوجه الآتي:</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>نسبة المشاركة</th>
            <th>القيمة</th>
            <th>عدد الحصص</th>
            <th>اسم الشريك</th>
          </tr>
        </thead>
        <tbody>
          ${shareRowsAr}
          <tr>
            <td><strong>100%</strong></td>
            <td><strong class="edited">${capital.toLocaleString()}</strong></td>
            <td><strong class="edited">${totalShares}</strong></td>
            <td><strong>الإجمالي</strong></td>
          </tr>
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th>Name of Partner</th>
            <th>No. of Shares</th>
            <th>Value</th>
            <th>Percentage of Partnership</th>
          </tr>
        </thead>
        <tbody>
          ${shareRowsEn}
          <tr>
            <td><strong>Total</strong></td>
            <td><strong class="edited">${totalShares}</strong></td>
            <td><strong class="edited">${capital.toLocaleString()}</strong></td>
            <td><strong>100%</strong></td>
          </tr>
        </tbody>
      </table>

      <div class="article-pair" style="margin-top: 8px;">
        <div class="block">
          <p>The Partners of the Company Share Capital declare that the value of the cash shares has been paid in full and has been deposited in the company's bank account.</p>
        </div>
        <div class="block rtl">
          <p>ويقر الشركاء في رأس مال الشركة أن قيمة الحصص النقدية دفعت بالكامل وأودعت في حساب البنك للشركة.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
