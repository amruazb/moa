import { FontSettings } from '@/store/formattingStore'
import { generateMoaStyles } from '@/lib/spc_moa/styles'
import { signatureCards } from '@/lib/utils/signatureCard'
import { formatAed } from '../yardLease/types'
import { WaterSupplyContext } from './types'

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function ltr(value: string): string {
  return `<span class="ltr-num" dir="ltr">${esc(value)}</span>`
}

function edited(value: string): string {
  return `<span class="edited">${esc(value)}</span>`
}

function blankOr(value: string, blank = '________'): string {
  const trimmed = value.trim()
  return ltr(trimmed || blank)
}

function article(titleEn: string, titleAr: string, bodyEn: string, bodyAr: string): string {
  return `
    <div class="article-pair tight">
      <div class="block">
        <h3 class="bold underline">${titleEn}</h3>
        ${bodyEn}
      </div>
      <div class="block rtl">
        <h3 class="bold underline">${titleAr}</h3>
        ${bodyAr}
      </div>
    </div>`
}

function prose(bodyEn: string, bodyAr: string): string {
  return `
    <div class="article-pair tight">
      <div class="block">${bodyEn}</div>
      <div class="block rtl">${bodyAr}</div>
    </div>`
}

function footer(pageNum: number, totalPages: number): string {
  return `
    <div class="page-footer">
      <div class="footer-section footer-left">
        <div class="signature-box">
          <span class="signature-line"></span>
          <span class="footer-label">Parties' Initials / الأحرف الأولى للطرفين</span>
        </div>
      </div>
      <div class="footer-section footer-center">
        <span class="footer-label">Water Supply Agreement / عقد توريد مياه</span>
      </div>
      <div class="footer-section footer-right">
        <span class="page-num">${pageNum} / ${totalPages}</span>
      </div>
    </div>`
}

function sheet(inner: string, pageNum: number, totalPages: number, withFooter: boolean): string {
  const tone = withFooter ? (pageNum === 1 ? ' roomy lead' : ' roomy') : ' no-footer'
  return `
    <div class="page${tone}">
      <div class="page-content">
        ${inner}
      </div>
      ${withFooter ? footer(pageNum, totalPages) : ''}
    </div>`
}

function buildPages(ctx: WaterSupplyContext): string[] {
  const date = blankOr(ctx.agreementDate)
  const start = blankOr(ctx.commencementDate)
  const end = blankOr(ctx.endDate)
  const priceFigure = ltr(formatAed(ctx.pricePerTrip))

  const header = `
    <div class="bilingual-header">
      <div class="header-left">
        <h1>Water Supply Agreement</h1>
        <h2>Liwa, Al Dhafra</h2>
        <h3>(<span class="edited">${esc(ctx.recipientCompany)}</span>)</h3>
      </div>
      <div class="header-right">
        <h1>عقد توريد مياه</h1>
        <h2>ليوا، الظفرة</h2>
        <h3>(<span class="edited">${esc(ctx.recipientCompanyAr)}</span>)</h3>
      </div>
    </div>`

  const intro = prose(
    `<p>This Water Supply Agreement is made on ${date} at ${edited(ctx.place)}, between:</p>`,
    `<p>أُبرم عقد توريد المياه هذا بتاريخ ${date} في ${edited(ctx.placeAr)}، بين:</p>`,
  )

  const supplier = prose(
    `<h3 class="bold underline">The Supplier (the First Party):</h3>
     <p>${edited(ctx.recipientCompany)}, a ${edited(ctx.legalForm)} licensed by the ${edited(ctx.issuingAuthority)} under Trade Licence No. ${ltr(ctx.licenseNo)}, represented by its authorized attorney <strong>Mr.</strong> ${edited(ctx.attorney.name)}, ${edited(ctx.attorney.nationality)} national, holder of Emirates ID No. ${ltr(ctx.attorney.eid)}, Date of Birth ${blankOr(ctx.attorney.dob)}, under Special Power of Attorney notarized No. ${ltr(ctx.poaNumber)} (${edited(ctx.poaAuthority)}).</p>`,
    `<h3 class="bold underline">المورد (الطرف الأول):</h3>
     <p>${edited(ctx.recipientCompanyAr)}، ${edited(ctx.legalFormAr)} مرخّصة من ${edited(ctx.issuingAuthorityAr)} بموجب الرخصة التجارية رقم ${ltr(ctx.licenseNo)}، يمثلها وكيلها المفوض <strong>السيد/</strong> ${edited(ctx.attorney.nameAr)}، ${edited(ctx.attorney.nationalityAr)} الجنسية، يحمل بطاقة هوية إماراتية رقم ${ltr(ctx.attorney.eid)}، تاريخ الميلاد ${blankOr(ctx.attorney.dob)}، بموجب وكالة خاصة موثقة رقم ${ltr(ctx.poaNumber)} (${edited(ctx.poaAuthorityAr)}).</p>`,
  )

  const recipient = prose(
    `<h3 class="bold underline">The Recipient (the Second Party):</h3>
     <p><strong>Mr.</strong> ${edited(ctx.supplier.name)}, ${edited(ctx.supplier.nationality)} national, holder of Emirates ID No. ${ltr(ctx.supplier.eid)}, Date of Birth ${blankOr(ctx.supplier.dob)}.</p>`,
    `<h3 class="bold underline">المستلم (الطرف الثاني):</h3>
     <p><strong>السيد/</strong> ${edited(ctx.supplier.nameAr)}، مواطن ${edited(ctx.supplier.nationalityAr)}، يحمل بطاقة هوية إماراتية رقم ${ltr(ctx.supplier.eid)}، تاريخ الميلاد ${blankOr(ctx.supplier.dob)}.</p>`,
  )

  const subject = article(
    'ARTICLE (1) — SUPPLY',
    'المادة (1) — التوريد',
    `<p>The Supplier (the First Party) shall supply drinking fresh water (potable), transported and delivered into the Recipient's storage tank at ${edited(ctx.propertyLocation)}, as requested by the Recipient.</p>`,
    `<p>يورد المورد (الطرف الأول) مياه شرب عذبة، تُنقل وتُسلّم إلى خزان تخزين المستلم في ${edited(ctx.propertyLocationAr)}، بناءً على طلب المستلم.</p>`,
  )

  const term = article(
    'ARTICLE (2) — TERM',
    'المادة (2) — المدة',
    `<p>The term is six (6) months during the winter season. Commencement date: ${start}. End date: ${end}.</p>
     <p>The agreement may be renewed by mutual agreement of both parties.</p>`,
    `<p>المدة ستة (6) أشهر خلال فصل الشتاء. تاريخ البدء: ${start}. تاريخ الانتهاء: ${end}.</p>
     <p>ويجوز تجديد هذا الاتفاق باتفاق الطرفين.</p>`,
  )

  const price = article(
    'ARTICLE (3) — PRICE AND PAYMENT',
    'المادة (3) — السعر والسداد',
    `<p>The price is AED ${priceFigure} (${edited(ctx.priceWordsEn)} UAE Dirhams) per trip (one tank load of drinking fresh water (potable) delivered), covering the drinking fresh water and transport.</p>
     <p>Trips are recorded and paid by the Recipient. Payment shall be made in cash.</p>`,
    `<p>السعر ${priceFigure} درهم إماراتي (${edited(ctx.priceWordsAr)} درهم إماراتي) عن كل رحلة (حمولة خزان واحدة من مياه شرب عذبة تُسلّم)، ويشمل مياه الشرب العذبة والنقل.</p>
     <p>تُسجّل الرحلات ويدفعها المستلم. يتم السداد نقداً.</p>`,
  )

  const signatures = `
    <div class="lease-signatures">
      ${signatureCards([
        {
          roleEn: 'The Supplier (First Party)',
          roleAr: 'المورد (الطرف الأول)',
          nameEn: ctx.recipientCompany,
          nameAr: ctx.recipientCompanyAr,
          extraLines: [
            {
              en: `Through its authorized attorney, Mr. ${esc(ctx.attorney.name)}`,
              ar: `بواسطة وكيلها المفوض، السيد/ ${esc(ctx.attorney.nameAr)}`,
            },
          ],
          dateLabel: true,
        },
        {
          roleEn: 'The Recipient (Second Party)',
          roleAr: 'المستلم (الطرف الثاني)',
          nameEn: `Mr. ${ctx.supplier.name}`,
          nameAr: `السيد/ ${ctx.supplier.nameAr}`,
          dateLabel: true,
        },
      ])}
    </div>`

  return [
    header + intro + supplier + recipient,
    subject + term + price + signatures,
  ]
}

function supplyStyles(settings?: FontSettings): string {
  const arabic = settings?.arabicFont || 'Arabic Transparent'
  const english = settings?.englishFont || 'Noto Sans'
  return `
    ${generateMoaStyles(settings)}
    .water-supply .article-pair > .block:not(.rtl),
    .water-supply .header-left,
    .water-supply .law-left {
      font-family: '${english}', 'Liberation Sans', sans-serif;
    }
    .water-supply .article-pair > .block.rtl,
    .water-supply .header-right,
    .water-supply .law-right,
    .water-supply .page-footer .footer-center,
    .water-supply .page-footer .footer-right {
      font-family: '${arabic}', 'Noto Naskh Arabic', 'Noto Sans Arabic', serif;
    }
    .ltr-num {
      direction: ltr;
      unicode-bidi: isolate;
      white-space: nowrap;
    }
    .article-pair.tight p { margin-bottom: 3px; }
    .water-supply .page.roomy .bilingual-header {
      margin-bottom: 10mm;
      padding: 18px 18px;
    }
    .water-supply .page.roomy .article-pair {
      margin-bottom: 6.5mm;
    }
    .water-supply .page.roomy .block {
      font-size: 11pt;
      line-height: 1.65;
      padding: 10px 11px;
    }
    .water-supply .page.roomy .block.rtl {
      font-size: 12pt;
      line-height: 1.75;
    }
    .water-supply .page.roomy .block h3 {
      font-size: 12pt;
      padding: 8px 12px;
    }
    .water-supply .page.roomy .block.rtl h3 {
      font-size: 13pt;
    }
    .water-supply .page.lead .bilingual-header {
      margin-bottom: 11mm;
    }
    .water-supply .page.lead .article-pair {
      margin-bottom: 10mm;
    }
    .water-supply .page.lead .block {
      line-height: 1.75;
      padding: 12px 12px;
    }
    .water-supply .page.lead .block.rtl {
      line-height: 1.95;
    }
    .water-supply .page.no-footer .block {
      font-size: 11pt;
      line-height: 1.45;
      padding: 10px 11px;
    }
    .water-supply .page.no-footer .block.rtl {
      font-size: 12pt;
      line-height: 1.55;
    }
    .water-supply .page.no-footer .article-pair {
      margin-bottom: 2.5mm;
    }
    .water-supply .page.no-footer .block h3 {
      font-size: 12pt;
      padding: 8px 12px;
    }
    .water-supply .page.no-footer .block.rtl h3 {
      font-size: 13pt;
    }
    .lease-signatures { margin-top: 2mm; }
    .lease-signatures .signature-card {
      margin-bottom: 8px !important;
      padding: 8px 16px !important;
    }
    .lease-signatures .signature-card > div {
      margin-top: 92px !important;
    }
    .page.no-footer .page-content {
      height: calc(297mm - 4mm);
      max-height: calc(297mm - 4mm);
      padding: 6mm 10mm 2mm;
    }
    @media print {
      .page.no-footer .page-content {
        height: calc(297mm - 4mm) !important;
        max-height: calc(297mm - 4mm) !important;
        padding: 6mm 10mm 2mm !important;
      }
    }
  `
}

export function generateWaterSupply(ctx: WaterSupplyContext, settings?: FontSettings): string {
  const bodies = buildPages(ctx)
  const totalPages = bodies.length
  const last = totalPages - 1
  const pages = bodies
    .map((body, index) => sheet(body, index + 1, totalPages, index !== last))
    .join('\n')

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Water Supply Agreement - ${esc(ctx.recipientCompany)}</title>
        <style>${supplyStyles(settings)}</style>
      </head>
      <body>
        <div class="doc water-supply">
          ${pages}
        </div>
      </body>
    </html>
  `
}
