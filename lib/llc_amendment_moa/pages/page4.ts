import { LLCAmendmentMOAContext, pageFooter } from '../types'

export function page4(ctx: LLCAmendmentMOAContext, pageNum: number = 4): string {
  const { partners, capital, capitalWordsEn, capitalWordsAr, totalShares, shareValue } = ctx

  // Generate partner rows for share distribution table (filter out partners with 0 shares)
  const activePartners = partners.filter(p => p.shareCount > 0)

  const partnerRowsEn = activePartners.map((partner, index) => {
    const ordinal = index === 0 ? 'First' : index === 1 ? 'Second' : `${index + 1}th`
    return `
      <tr>
        <td>${ordinal} Party</td>
        <td class="edited">${partner.name}</td>
        <td class="edited">${partner.shareCount}</td>
        <td class="edited">${partner.sharePercent}%</td>
      </tr>
    `
  }).join('')

  const partnerRowsAr = activePartners.map((partner, index) => {
    let ordinal = '';
    if (index === 0) ordinal = 'الأول';
    else if (index === 1) ordinal = 'الثاني';
    else if (index === 2) ordinal = 'الثالث';
    else ordinal = `${index + 1}`;
    return `
      <tr>
        <td>الطرف ${ordinal}</td>
        <td class="edited" style="font-size: 14pt;">${partner.nameAr}</td>
        <td class="edited">${partner.shareCount}</td>
        <td class="edited">${partner.sharePercent}%</td>
      </tr>
    `
  }).join('')

  const partiesConsentAddendum = `
        <!-- Preamble (continued): parties' consent to addendum -->
        <div class="article-pair">
          <div class="block">
            <p>• The above said parties have agreed to the foregoing addendum with full consent.</p>
          </div>
          <div class="block rtl">
            <p>• يقر الأطراف المذكورون أعلاه بموافقتهم الكاملة على الملحق سالف الذكر.</p>
          </div>
        </div>
`

  return `
    <div class="page">
      <div class="page-content">
        
        ${partiesConsentAddendum}
        
        <!-- Post-assignment ownership (from preamble conclusions) -->
        <div class="article-pair">
          <div class="block">
            <p>With these assignments, the Third Party exits the company and the First Party and Second Party shall become the sole owners of the company in equal partnership, and the shares of the company shall be divided among the partners as following: First Party <span class="edited">50%</span> and Second Party <span class="edited">50%</span>.</p>
          </div>
          <div class="block rtl">
            <p>بهذه التنازلات، يخرج الطرف الثالث من الشركة ويكون الطرف الأول والطرف الثاني المالكان الوحيدان للشركة بشراكة متساوية، وحصص الشركة موزعة بين الشركاء على الوجه التالي: الطرف الأول <span class="edited">50%</span> والطرف الثاني <span class="edited">50%</span>.</p>
          </div>
        </div>

        <!-- Share Distribution Section -->
        <div class="article-pair">
          <div class="block">
            <h3 class="bold underline">ARTICLE 1: SHARE DISTRIBUTION</h3>
            <p>Following the assignment of shares as described in the preamble, the capital of the Company amounting to <span class="edited">${capital.toLocaleString()}</span> AED (<span class="edited">${capitalWordsEn}</span> Dirhams) shall be divided among the partners as follows:</p>
          </div>
          <div class="block rtl">
            <h3 class="bold underline">المادة 1: توزيع الحصص</h3>
            <p>بعد التنازل عن الأسهم كما هو موضح في التمهيد، يتم تقسيم رأس مال الشركة البالغ <span class="edited">${capital.toLocaleString()}</span> درهم (<span class="edited">${capitalWordsAr}</span> درهم) بين الشركاء على النحو التالي:</p>
          </div>
        </div>

        <!-- English Share Table -->
        <div style="margin-bottom: 30px;">
          <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="border: 1px solid #000; padding: 8px; text-align: left;">Party</th>
                <th style="border: 1px solid #000; padding: 8px; text-align: left;">Partner Name</th>
                <th style="border: 1px solid #000; padding: 8px; text-align: center;">Number of Shares</th>
                <th style="border: 1px solid #000; padding: 8px; text-align: center;">Percentage</th>
              </tr>
            </thead>
            <tbody>
              ${partnerRowsEn}
              <tr style="font-weight: bold; background-color: #f9f9f9;">
                <td style="border: 1px solid #000; padding: 8px;" colspan="2">TOTAL</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;" class="edited">${totalShares}</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;">100%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Arabic Share Table -->
        <div dir="rtl">
          <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="border: 1px solid #000; padding: 8px; text-align: right;">الطرف</th>
                <th style="border: 1px solid #000; padding: 8px; text-align: right;">اسم الشريك</th>
                <th style="border: 1px solid #000; padding: 8px; text-align: center;">عدد الأسهم</th>
                <th style="border: 1px solid #000; padding: 8px; text-align: center;">النسبة المئوية</th>
              </tr>
            </thead>
            <tbody>
              ${partnerRowsAr}
              <tr style="font-weight: bold; background-color: #f9f9f9;">
                <td style="border: 1px solid #000; padding: 8px; text-align: right;" colspan="2">المجموع</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;" class="edited">${totalShares}</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;">100%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Capital Information -->
        <div class="article-pair">
          <div class="block">
            <h3 class="bold underline">ARTICLE 2: CAPITAL</h3>
            <p>The capital of the Company remains at <span class="edited">${capital.toLocaleString()}</span> AED (<span class="edited">${capitalWordsEn}</span> Dirhams), divided into <span class="edited">${totalShares}</span> shares, with a value of <span class="edited">${shareValue.toLocaleString()}</span> AED per share.</p>
            <p>Each partner's contribution to the capital is as specified in the share distribution table above.</p>
          </div>
          <div class="block rtl">
            <h3 class="bold underline">المادة 2: رأس المال</h3>
            <p>يبقى رأس مال الشركة عند <span class="edited">${capital.toLocaleString()}</span> درهم (<span class="edited">${capitalWordsAr}</span> درهم)، مقسم إلى <span class="edited">${totalShares}</span> سهم، بقيمة <span class="edited">${shareValue.toLocaleString()}</span> درهم للسهم الواحد.</p>
            <p>مساهمة كل شريك في رأس المال كما هو محدد في جدول توزيع الأسهم أعلاه.</p>
          </div>
        </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}

