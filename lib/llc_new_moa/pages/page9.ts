import { LLCNewMOAContext, pageFooter } from '../types'
import { numberToWordsEn, numberToWordsAr } from '@/lib/utils/numberToWords'

export function page9(ctx: LLCNewMOAContext, pageNum: number = 9): string {
  const { capital, capitalWordsEn, capitalWordsAr, totalShares, shareValue, partners } = ctx

  // Generate partner rows for the capital table
  const partnerRowsEn = partners.map((p, i) => `
    <tr>
      <td>${i === 0 ? 'First Partner' : 'Second Partner'}</td>
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
      <td>${i === 0 ? 'الشريك الأول' : 'الشريك الثاني'}</td>
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
      
      <!-- Article 8 -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">ARTICLE 8</h3>
          <h4 class="bold underline">THE CAPITAL OF THE COMPANY</h4>
          <p>8-1 The capital of the Company shall be AED <span class="edited">${capital.toLocaleString()}</span> (AED <span class="edited">${capitalWordsEn}</span>). The capital of the Company shall be divided into one hundred (${totalShares}) Shares, the value of each Share being AED ${shareValue.toLocaleString()} (AED ${numberToWordsEn(shareValue)}). All Shares of the Company shall rank equally with each other in all respects.</p>
          <p>8-2 The capital of the Company is divided among the Partners in the following manner:</p>
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة 8</h3>
          <h4 class="bold underline">رأس مال الشركة</h4>
          <p>8-1 يبلغ رأس مال الشركة <span class="edited">${capital.toLocaleString()}</span> درهم إماراتي (<span class="edited">${capitalWordsAr}</span> درهم إماراتي). وينقسم رأس مال الشركة إلى مائة (${totalShares}) حصة، قيمة كل حصة ${shareValue.toLocaleString()} درهم إماراتي (${numberToWordsAr(shareValue)} درهم إماراتي). وتتساوى جميع حصص الشركة مع بعضها البعض في جميع النواحي.</p>
          <p>8-2 يتم توزيع رأس مال الشركة بين الشركاء على النحو التالي:</p>
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
              <td><strong>${capital.toLocaleString()}</strong></td>
              <td><strong>${totalShares}</strong></td>
              <td><strong>%100</strong></td>
              <td><strong>${totalShares}</strong></td>
              <td><strong>${capital.toLocaleString()}</strong></td>
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
              <td><strong>${capital.toLocaleString()}</strong></td>
              <td><strong>${totalShares}</strong></td>
              <td><strong>100%</strong></td>
              <td><strong>${totalShares}</strong></td>
              <td><strong>${capital.toLocaleString()}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="article-pair">
        <div class="block">
          <p>8-3 The value of all the Shares has been paid in full.</p>
        </div>
        <div class="block rtl">
          <p>8-3 قيمة الحصص التابعة قد دفعت بالكامل.</p>
        </div>
      </div>
      
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
