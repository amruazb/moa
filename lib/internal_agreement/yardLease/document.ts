import { FontSettings } from '@/store/formattingStore'
import { generateMoaStyles } from '@/lib/spc_moa/styles'
import { signatureCards } from '@/lib/utils/signatureCard'
import { PaymentMethod, YardLeaseContext, formatAed } from './types'

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

function aedFigure(amount: number): string {
  return ltr(formatAed(amount))
}

function plainMeasure(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return blankOr('')
  const amount = Number(trimmed.replace(/,/g, ''))
  if (!Number.isFinite(amount)) return blankOr(trimmed)
  return ltr(amount.toLocaleString('en-AE'))
}

function areaRun(ctx: YardLeaseContext): string {
  const length = ctx.lengthM.trim() || '________'
  const width = ctx.widthM.trim() || '________'
  const raw = ctx.areaSqm.trim()
  const amount = Number(raw.replace(/,/g, ''))
  const area = !raw ? '________' : Number.isFinite(amount) ? amount.toLocaleString('en-AE') : raw
  return `<span class="ltr-num" dir="ltr">${esc(length)} م × ${esc(width)} م (${esc(area)})</span>`
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

function leaseFooter(pageNum: number, totalPages: number): string {
  return `
    <div class="page-footer">
      <div class="footer-section footer-left">
        <div class="signature-box">
          <span class="signature-line"></span>
          <span class="footer-label">Parties' Initials / الأحرف الأولى للطرفين</span>
        </div>
      </div>
      <div class="footer-section footer-center">
        <span class="footer-label">Yard Lease Agreement / عقد إيجار ساحة</span>
      </div>
      <div class="footer-section footer-right">
        <span class="page-num">${pageNum} / ${totalPages}</span>
      </div>
    </div>`
}

function sheet(inner: string, pageNum: number, totalPages: number, withFooter: boolean): string {
  return `
    <div class="page${withFooter ? '' : ' no-footer'}">
      <div class="page-content">
        ${inner}
      </div>
      ${withFooter ? leaseFooter(pageNum, totalPages) : ''}
    </div>`
}

function paymentClause(
  ctx: YardLeaseContext,
  which: 'first' | 'second',
): { en: string; ar: string } {
  const second = which === 'second'
  const method: PaymentMethod = second ? ctx.secondMethod : ctx.firstMethod
  const amount = second ? ctx.secondInstallment : ctx.firstInstallment
  const wordsEn = second ? ctx.secondWordsEn : ctx.firstWordsEn
  const wordsAr = second ? ctx.secondWordsAr : ctx.firstWordsAr
  const labelEn = second ? 'The second instalment' : 'The first instalment'
  const labelAr = second ? 'القسط الثاني' : 'القسط الأول'
  const sumEn = `AED ${aedFigure(amount)} (${wordsEn} UAE Dirhams)`
  const sumAr = `${aedFigure(amount)} درهم إماراتي (${wordsAr} درهم إماراتي)`

  if (method === 'transfer') {
    const ref = blankOr(second ? ctx.secondTransferRef : ctx.firstTransferRef)
    return {
      en: `<p>${labelEn} of ${sumEn} is payable by direct bank transfer upon signing. Transfer reference: ${ref}. Transfer date: ${blankOr(ctx.agreementDate)}.</p>`,
      ar: `<p>${labelAr} وقدره ${sumAr} يُدفع بالتحويل المصرفي المباشر عند التوقيع. مرجع التحويل: ${ref}. تاريخ التحويل: ${blankOr(ctx.agreementDate)}.</p>`,
    }
  }

  const chequeNo = blankOr(second ? ctx.secondChequeNo : ctx.firstChequeNo)
  const chequeDate = blankOr(second ? ctx.secondChequeDate : ctx.firstChequeDate)
  const chequeBank = blankOr(second ? ctx.secondChequeBank : ctx.firstChequeBank)
  const timingEn = second
    ? 'by post-dated cheque (PDC) due six (6) months from commencement'
    : 'by cheque upon signing'
  const timingAr = second
    ? 'بموجب شيك مؤجل الاستحقاق يحل بعد ستة (6) أشهر من تاريخ البدء'
    : 'بموجب شيك عند التوقيع'

  return {
    en: `<p>${labelEn} of ${sumEn} is payable ${timingEn}. Cheque No. ${chequeNo}. Cheque date: ${chequeDate}. Bank: ${chequeBank}.</p>`,
    ar: `<p>${labelAr} وقدره ${sumAr} يُدفع ${timingAr}. رقم الشيك: ${chequeNo}. تاريخ الشيك: ${chequeDate}. المصرف: ${chequeBank}.</p>`,
  }
}

function buildPages(ctx: YardLeaseContext): string[] {
  const date = blankOr(ctx.agreementDate)
  const block = blankOr(ctx.blockNo)
  const start = blankOr(ctx.commencementDate)
  const end = blankOr(ctx.endDate)
  const firstPay = paymentClause(ctx, 'first')
  const secondPay = paymentClause(ctx, 'second')

  const header = `
    <div class="bilingual-header">
      <div class="header-left">
        <h1>Yard Lease Agreement</h1>
        <h2>Liwa, Al Dhafra</h2>
        <h3>(<span class="edited">${esc(ctx.lesseeCompany)}</span>)</h3>
      </div>
      <div class="header-right">
        <h1>عقد إيجار ساحة</h1>
        <h2>ليوا، الظفرة</h2>
        <h3>(<span class="edited">${esc(ctx.lesseeCompanyAr)}</span>)</h3>
      </div>
    </div>`

  const intro = prose(
    `<p>This Yard Lease Agreement is made on ${date} at ${edited(ctx.place)}, between:</p>`,
    `<p>أُبرم عقد إيجار الساحة هذا بتاريخ ${date} في ${edited(ctx.placeAr)}، بين:</p>`,
  )

  const lessor = prose(
    `<h3 class="bold underline">The Lessor (the Second Party):</h3>
     <p><strong>Mr.</strong> ${edited(ctx.lessor.name)}, ${edited(ctx.lessor.nationality)} national, holder of Emirates ID No. ${ltr(ctx.lessor.eid)}, Date of Birth ${blankOr(ctx.lessor.dob)}.</p>`,
    `<h3 class="bold underline">المؤجر (الطرف الثاني):</h3>
     <p><strong>السيد/</strong> ${edited(ctx.lessor.nameAr)}، مواطن ${edited(ctx.lessor.nationalityAr)}، يحمل بطاقة هوية إماراتية رقم ${ltr(ctx.lessor.eid)}، تاريخ الميلاد ${blankOr(ctx.lessor.dob)}.</p>`,
  )

  const lessee = prose(
    `<h3 class="bold underline">The Lessee (the First Party):</h3>
     <p>${edited(ctx.lesseeCompany)}, a ${edited(ctx.legalForm)} licensed by the ${edited(ctx.issuingAuthority)} under Trade Licence No. ${ltr(ctx.licenseNo)}, represented by its authorized attorney <strong>Mr.</strong> ${edited(ctx.attorney.name)}, ${edited(ctx.attorney.nationality)} national, holder of Emirates ID No. ${ltr(ctx.attorney.eid)}, Date of Birth ${blankOr(ctx.attorney.dob)}, under Special Power of Attorney notarized No. ${ltr(ctx.poaNumber)} (${edited(ctx.poaAuthority)}).</p>`,
    `<h3 class="bold underline">المستأجر (الطرف الأول):</h3>
     <p>${edited(ctx.lesseeCompanyAr)}، ${edited(ctx.legalFormAr)} مرخّصة من ${edited(ctx.issuingAuthorityAr)} بموجب الرخصة التجارية رقم ${ltr(ctx.licenseNo)}، يمثلها وكيلها المفوض <strong>السيد/</strong> ${edited(ctx.attorney.nameAr)}، ${edited(ctx.attorney.nationalityAr)} الجنسية، يحمل بطاقة هوية إماراتية رقم ${ltr(ctx.attorney.eid)}، تاريخ الميلاد ${blankOr(ctx.attorney.dob)}، بموجب وكالة خاصة موثقة رقم ${ltr(ctx.poaNumber)} (${edited(ctx.poaAuthorityAr)}).</p>`,
  )

  const property = article(
    'ARTICLE (1) — THE YARD',
    'المادة (1) — الساحة',
    `<p>The yard is at ${edited(ctx.propertyLocation)}. Its area is ${plainMeasure(ctx.lengthM)} m × ${plainMeasure(ctx.widthM)} m (${plainMeasure(ctx.areaSqm)} sq. m).</p>
     <p>Farm No.: ${block}.</p>`,
    `<p>تقع الساحة في ${edited(ctx.propertyLocationAr)}. ومساحتها ${areaRun(ctx)} متراً مربعاً.</p>
     <p>رقم المزرعة: ${block}.</p>`,
  )

  const use = article(
    'ARTICLE (2) — PERMITTED USE',
    'المادة (2) — الاستعمال المسموح به',
    `<p>The Lessee shall use the yard only for vehicle parking (trucks and water tankers), mechanical maintenance, and water storage management.</p>`,
    `<p>يستعمل المستأجر الساحة فقط لإيقاف المركبات (الشاحنات وصهاريج المياه)، وللصيانة الميكانيكية، ولإدارة تخزين المياه.</p>`,
  )

  const rent = article(
    'ARTICLE (3) — RENT',
    'المادة (3) — الأجرة',
    `<p>The total rent for the year is AED ${aedFigure(ctx.rent)} (${ctx.rentWordsEn} UAE Dirhams), payable as follows:</p>
     ${firstPay.en}
     ${secondPay.en}
     <p>Security deposit: None.</p>`,
    `<p>مجموع الأجرة عن السنة ${aedFigure(ctx.rent)} درهم إماراتي (${ctx.rentWordsAr} درهم إماراتي)، تُدفع على الوجه الآتي:</p>
     ${firstPay.ar}
     ${secondPay.ar}
     <p>مبلغ التأمين: لا يوجد.</p>`,
  )

  const works = article(
    'ARTICLE (4) — WORKS',
    'المادة (4) — الأعمال',
    `<p>The Lessee (the First Party) shall level the ground with gatch fill and install the gate.</p>
     <p>The Lessor (the Second Party) shall construct the perimeter compound boundary fencing.</p>`,
    `<p>يلتزم المستأجر (الطرف الأول) بتسوية الأرض بردم الجاتش وبتركيب البوابة.</p>
     <p>ويلتزم المؤجر (الطرف الثاني) بإنشاء سياج حدود المجمع المحيط.</p>`,
  )

  const term = article(
    'ARTICLE (5) — TERM, VACATING AND RENEWAL',
    'المادة (5) — المدة والإخلاء والتجديد',
    `<p>The term is one (1) year from the date of signing. Commencement date: ${start}. End date: ${end}.</p>
     <p>If the Lessor asks the Lessee to vacate before the end of the term, the unused rent is refunded pro rata to the Lessee.</p>
     <p>The lease may be renewed after the one (1) year by mutual agreement of both parties.</p>`,
    `<p>المدة سنة واحدة (1) من تاريخ التوقيع. تاريخ البدء: ${start}. تاريخ الانتهاء: ${end}.</p>
     <p>إذا طلب المؤجر من المستأجر الإخلاء قبل انتهاء المدة، تُرد إلى المستأجر الأجرة غير المستعملة بالتناسب.</p>
     <p>ويجوز تجديد الإيجار بعد السنة الواحدة (1) باتفاق الطرفين.</p>`,
  )

  const exclusions = article(
    'ARTICLE (6) — EXCLUSIONS',
    'المادة (6) — استثناءات',
    `<p>There is no municipal registration requirement. The Lessee shall not sublet the yard.</p>`,
    `<p>لا يُشترط التسجيل البلدي. ولا يجوز للمستأجر التأجير من الباطن للساحة.</p>`,
  )

  const witness = prose(
    `<p>The parties sign below. Each signature is the name, the signature and the date.</p>`,
    `<p>يوقّع الطرفان أدناه. ويشمل توقيع كل منهما الاسم والتوقيع والتاريخ.</p>`,
  )

  const signatures = `
    <div class="lease-signatures">
      ${signatureCards([
        {
          roleEn: 'The Lessor (Second Party)',
          roleAr: 'المؤجر (الطرف الثاني)',
          nameEn: `Mr. ${ctx.lessor.name}`,
          nameAr: `السيد/ ${ctx.lessor.nameAr}`,
          dateLabel: true,
        },
        {
          roleEn: 'The Lessee (First Party)',
          roleAr: 'المستأجر (الطرف الأول)',
          nameEn: ctx.lesseeCompany,
          nameAr: ctx.lesseeCompanyAr,
          extraLines: [
            {
              en: `Through its authorized attorney, Mr. ${esc(ctx.attorney.name)}`,
              ar: `بواسطة وكيلها المفوض، السيد/ ${esc(ctx.attorney.nameAr)}`,
            },
          ],
          dateLabel: true,
        },
      ])}
    </div>`

  return [
    header + intro + lessor + lessee,
    property + use + rent,
    works + term + exclusions + witness + signatures,
  ]
}

function leaseStyles(settings?: FontSettings): string {
  const arabic = settings?.arabicFont || 'Arabic Transparent'
  const english = settings?.englishFont || 'Noto Sans'
  return `
    ${generateMoaStyles(settings)}
    .yard-lease .article-pair > .block:not(.rtl),
    .yard-lease .header-left,
    .yard-lease .law-left {
      font-family: '${english}', 'Liberation Sans', sans-serif;
    }
    .yard-lease .article-pair > .block.rtl,
    .yard-lease .header-right,
    .yard-lease .law-right,
    .yard-lease .page-footer .footer-center,
    .yard-lease .page-footer .footer-right {
      font-family: '${arabic}', 'Noto Naskh Arabic', 'Noto Sans Arabic', serif;
    }
    .ltr-num {
      direction: ltr;
      unicode-bidi: isolate;
      white-space: nowrap;
    }
    .article-pair.tight p { margin-bottom: 3px; }
    .lease-signatures { margin-top: 4mm; }
    .page.no-footer .page-content {
      height: calc(297mm - 8mm);
      max-height: calc(297mm - 8mm);
    }
    @media print {
      .page.no-footer .page-content {
        height: calc(297mm - 8mm) !important;
        max-height: calc(297mm - 8mm) !important;
      }
    }
  `
}

export function generateYardLease(ctx: YardLeaseContext, settings?: FontSettings): string {
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
        <title>Yard Lease Agreement - ${esc(ctx.lesseeCompany)}</title>
        <style>${leaseStyles(settings)}</style>
      </head>
      <body>
        <div class="doc yard-lease">
          ${pages}
        </div>
      </body>
    </html>
  `
}
