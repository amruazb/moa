import { LLCMOAContext, pageFooter, getOrdinal } from '../types'

export function page5(ctx: LLCMOAContext, pageNum: number = 5): string {
  const { partners, capital, capitalWordsEn, capitalWordsAr, totalShares, shareValue } = ctx

  // Generate partner share rows for the table
  const shareRowsEn = partners.map((partner, index) => {
    const ordinal = getOrdinal(index, 'en')
    return `<tr>
      <td>${ordinal} Party</td>
      <td class="edited">${partner.name}</td>
      <td class="edited">${partner.shareCount}</td>
      <td class="edited">${partner.sharePercent}%</td>
    </tr>`
  }).join('')

  const shareRowsAr = partners.map((partner, index) => {
    const ordinal = getOrdinal(index, 'ar')
    return `<tr>
      <td>الطرف ${ordinal}</td>
      <td class="edited">${partner.nameAr}</td>
      <td class="edited">${partner.shareCount}</td>
      <td class="edited">${partner.sharePercent}%</td>
    </tr>`
  }).join('')

  return `
    <div class="page">
      <div class="page-content">

      <div class="section-bar"><span>CHAPTER TWO: CAPITAL</span><span class="rtl">الباب الثاني: رأس المال</span></div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (5)</h3>
          <h3 class="underline center">CAPITAL OF THE COMPANY</h3>
          <p>The capital of the Company shall be AED <span class="edited">${capital.toLocaleString()}</span>/- (<span class="edited">${capitalWordsEn}</span> Dirhams only) divided into <span class="edited">${totalShares}</span> equal shares of AED <span class="edited">${shareValue}</span>/- each, distributed among the partners as follows:</p>
          <table>
            <thead>
              <tr>
                <th>Party</th>
                <th>Partner Name</th>
                <th>No. of Shares</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              ${shareRowsEn}
            </tbody>
          </table>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (5)</h3>
          <h3 class="underline center">رأس مال الشركة</h3>
          <p>يكون رأس مال الشركة <span class="edited">${capital.toLocaleString()}</span>/- درهم (<span class="edited">${capitalWordsAr}</span> درهم فقط) مقسم إلى <span class="edited">${totalShares}</span> حصة متساوية القيمة قيمة كل منها <span class="edited">${shareValue}</span>/- درهم، موزعة على الشركاء كما يلي:</p>
          <table>
            <thead>
              <tr>
                <th>الطرف</th>
                <th>اسم الشريك</th>
                <th>عدد الحصص</th>
                <th>النسبة</th>
              </tr>
            </thead>
            <tbody>
              ${shareRowsAr}
            </tbody>
          </table>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
