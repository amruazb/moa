import { LLCNewMOAContext, pageFooter, getOrdinal } from '../types'
import { numberToWordsEn, numberToWordsAr } from '@/lib/utils/numberToWords'

export function page6(ctx: LLCNewMOAContext, pageNum: number = 6): string {
  const { capital, totalShares, shareValue, partners } = ctx

  // Generate partner rows for the capital table
  const partnerRowsEn = partners.map((p, i) => `
    <tr>
      <td>${getOrdinal(i, 'en')} Partner</td>
      <td>${p.country}</td>
      <td>${numberToWordsEn(p.shareCount * shareValue)}</td>
      <td>${p.shareCount}</td>
      <td>${p.sharePercent}%</td>
      <td>${p.shareCount}</td>
      <td>${numberToWordsEn(p.shareCount * shareValue)}</td>
    </tr>
  `).join('')

  const partnerRowsAr = partners.map((p, i) => `
    <tr>
      <td>الشريك ${getOrdinal(i, 'ar')}</td>
      <td>${p.countryAr}</td>
      <td>${numberToWordsAr(p.shareCount * shareValue)}</td>
      <td>${p.shareCount}</td>
      <td>%${p.sharePercent}</td>
      <td>${p.shareCount}</td>
      <td>${numberToWordsAr(p.shareCount * shareValue)}</td>
    </tr>
  `).join('')

  return `
    <div class="page">
      <div class="page-content">

      <!-- Chapter Header -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold center">CHAPTER</h3>
          <h4 class="bold center">Shares and Capital</h4>
        </div>
        <div class="block rtl">
          <h3 class="bold center">فصل</h3>
          <h4 class="bold center">رأس المال – الحصص</h4>
        </div>
      </div>

      <!-- Article: Capital and Shares -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">Article (3)</h3>
          <p>The Capital of the company is determined to be AED <span class="edited">${capital.toLocaleString()}</span> (<span class="edited">${numberToWordsEn(capital)}</span> Dirhams), distributed into <span class="edited">${totalShares}</span> (<span class="edited">${numberToWordsEn(totalShares)}</span>) equal shares. The value of each share is AED <span class="edited">${shareValue.toLocaleString()}</span> (<span class="edited">${numberToWordsEn(shareValue)}</span> Dirhams) These shares are distributed among the partners as follows:</p>
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة (3)</h3>
          <p>حدد رأس مال الشركة بمبلغ <span class="edited">${capital.toLocaleString()}</span> درهم (<span class="edited">${numberToWordsAr(capital)}</span> درهم) موزعة الى <span class="edited">${totalShares}</span> حصة (<span class="edited">${numberToWordsAr(totalShares)}</span>) متساوية قيمة كل حصة <span class="edited">${shareValue.toLocaleString()}</span> درهم (<span class="edited">${numberToWordsAr(shareValue)}</span> درهم) وهذه الحصص تقسم بين الشركاء على الوجه الآتي:</p>
        </div>
      </div>

      <!-- Capital Table - Vertical Layout: Arabic on TOP, English on BOTTOM -->
      <div class="capital-tables-vertical">
        <!-- Arabic Table First (TOP) -->
        <table class="capital-table capital-table-full" dir="rtl">
          <thead>
            <tr>
              <th>الطرف</th>
              <th>الجنسية</th>
              <th>القيمة بالدرهم الإماراتي</th>
              <th>الحصص</th>
              <th>نسبة المشاركة</th>
              <th>الحصص</th>
              <th>القيمة</th>
            </tr>
          </thead>
          <tbody>
            ${partnerRowsAr}
            <tr class="total-row">
              <td colspan="2"><strong>الإجمالي</strong></td>
              <td><strong>${numberToWordsAr(capital)}</strong></td>
              <td><strong>${totalShares}</strong></td>
              <td><strong>%100</strong></td>
              <td><strong>${totalShares}</strong></td>
              <td><strong>${numberToWordsAr(capital)}</strong></td>
            </tr>
          </tbody>
        </table>

        <!-- English Table Second (BOTTOM) -->
        <table class="capital-table capital-table-full">
          <thead>
            <tr>
              <th>Party</th>
              <th>Nationality</th>
              <th>Value in UAE Dirham</th>
              <th>Shares</th>
              <th>Partnership Percentage</th>
              <th>Shares</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            ${partnerRowsEn}
            <tr class="total-row">
              <td colspan="2"><strong>Total</strong></td>
              <td><strong>${numberToWordsEn(capital)}</strong></td>
              <td><strong>${totalShares}</strong></td>
              <td><strong>100%</strong></td>
              <td><strong>${totalShares}</strong></td>
              <td><strong>${numberToWordsEn(capital)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Declaration of Paid-up Capital -->
      <div class="article-pair">
        <div class="block">
          <p>The Partners of the Company Share Capital declare that the value of the cash shares has been paid in full and has been deposited in the company's bank account.</p>
        </div>
        <div class="block rtl">
          <p>ويقر الشركاء في رأس مال الشركة أن قيمة الحصص النقدية دفعت بالكامل واودعت في حساب البنك للشركة.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
