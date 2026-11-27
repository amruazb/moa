// Muroor-only Power of Attorney.
// Reuses the bilingual POA column layout, clause boxes, footer and pagination.

import { FontSettings } from '@/store/formattingStore'
import { generatePOAStyles } from '@/lib/poa/styles'
import { poaPageFooter, yearsToWords } from '@/lib/poa/types'
import { MuroorPoaData } from './types'

const MUROOR_FONT: FontSettings = {
  englishFont: 'Noto Sans',
  arabicFont: 'Noto Naskh Arabic',
  englishFontSize: 'xlarge',
  arabicFontSize: 'xxlarge',
  baseFontSize: 'xlarge',
  englishLineSpacing: 1.65,
  arabicLineSpacing: 1.75,
  boldEditedFields: true,
  columnRatio: 0.5,
  pageMargin: 12,
  headerEnTitle: 13,
  headerEnSubtitle: 12,
  headerEnCompany: 12,
  headerArTitle: 13,
  headerArSubtitle: 13,
  headerArCompany: 13,
}

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function field(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return '<span class="poa-blank" dir="ltr">&nbsp;</span>'
  return `<span class="edited">${esc(trimmed)}</span>`
}

function aedAr(value: string): string {
  return ltrField(value.replace(/^AED\s*/i, ''))
}

function ltrField(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return '<span class="poa-blank" dir="ltr">&nbsp;</span>'
  return `<span class="edited no-break" dir="ltr">${esc(trimmed)}</span>`
}

function pair(en: string, ar: string, extraClass = '', textClass = ''): string {
  const cls = textClass ? ` class="${textClass}"` : ''
  return `
    <div class="article-pair intro-section${extraClass ? ` ${extraClass}` : ''}">
      <div class="block"><p${cls}>${en}</p></div>
      <div class="block rtl"><p${cls}>${ar}</p></div>
    </div>`
}

function footerTemplate(isLast: boolean): string {
  return poaPageFooter(0, isLast).replace(
    '<span class="page-num">0</span>',
    '<span class="page-num">__PAGE__</span>'
  )
}

const layoutOverrides = `
  .block, .article-pair.intro-section > .block, .article-pair.intro-section > .block.rtl {
    padding: 10px 11px !important;
  }
  .block { font-size: 11pt !important; line-height: 1.65 !important; }
  .block.rtl { font-size: 12pt !important; line-height: 1.75 !important; }
  .section-title { font-size: 12pt; }
  .block.rtl .section-title { font-size: 13pt; }
  .page-1 .page-content { padding-top: 12mm !important; }
  .page-1 .title-pair { padding: 10px 12px !important; margin: 0 0 12px !important; }
  .title-en, .page-1 .title-en { font-size: 12pt !important; }
  .title-ar, .page-1 .title-ar { font-size: 13pt !important; }
  .poa-blank {
    display: inline-block;
    min-width: 8.5em;
    border-bottom: 1px solid #111;
    height: 1.05em;
    vertical-align: baseline;
  }
  .poa-fields { text-align: left !important; }
  .block.rtl .poa-fields { text-align: right !important; }
  .poa-row { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; margin: 0 0 7px; }
  .block.rtl .poa-row { flex-direction: row-reverse; }
  .signature-line-single {
    margin-top: 92px !important;
    height: 6px !important;
    width: 70% !important;
    min-width: 0 !important;
  }
  .signature-block-single { margin-bottom: 8px !important; }
  .powers-list { margin: 4px 0 0 1.1em; padding: 0; }
  .block.rtl .powers-list { margin: 4px 1.1em 0 0; }
  .powers-list li { margin: 0 0 3px; }
`

export function generateMuroorPoaHTML(data: MuroorPoaData, fontSettings?: FontSettings): string {
  const styles = generatePOAStyles({ ...MUROOR_FONT, ...fontSettings, englishLineSpacing: 1.65, arabicLineSpacing: 1.75 })
  const g = data.grantor
  const a = data.attorney
  const c = data.company

  const grantorEn = `I, the undersigned, Mr. ${field(g.name)}, a national of the ${field(g.nationality)}, domiciled in ${field(g.domicile)}, holder of Emirates ID No. ${ltrField(g.emiratesId)}, date of birth ${ltrField(g.dateOfBirth)}.`
  const grantorAr = `أنا الموقع أدناه، السيد/ ${field(g.nameAr)}، من مواطني ${field(g.nationalityAr)}، والمقيم في ${field(g.domicileAr)}، حامل هوية الإمارات رقم ${ltrField(g.emiratesId)}، تاريخ الميلاد ${ltrField(g.dateOfBirth)}.`

  const capacityEn = `Acting on my own behalf and in my capacity as a partner and Establishment Card authorized signatory of ${field(c.name)}, a ${field(c.legalForm)}, holding ${field(g.shares)} shares (${field(g.shareValue)}, ${field(g.sharePercent)}) under the notarised memorandum dated ${ltrField(c.memorandumDate)}. Licence No. ${ltrField(c.licenceNumber)}. Unified Registration No. ${ltrField(c.unifiedNumber)}. Head office: ${field(c.headOffice)}.`
  const capacityAr = `أصالةً عن نفسي وبصفتي شريكاً والمفوض بالتوقيع لبطاقة المنشأة في ${field(c.nameAr)}، وهي ${field(c.legalFormAr)}، ومالكاً لعدد ${ltrField(g.shares)} حصص بقيمة ${aedAr(g.shareValue)} درهماً إماراتياً بنسبة ${ltrField(g.sharePercent)} بموجب المذكرة الموثقة بتاريخ ${ltrField(c.memorandumDate)}. رقم الرخصة ${ltrField(c.licenceNumber)}. رقم التسجيل الموحد ${ltrField(c.unifiedNumber)}. المركز الرئيسي: ${field(c.headOfficeAr)}.`

  const attorneyEn = `I do hereby appoint as my attorney Mr. ${field(a.name)}, a national of ${field(a.nationality)}, domiciled in ${field(a.domicile)}, holder of Emirates ID No. ${ltrField(a.emiratesId)}, date of birth ${ltrField(a.dateOfBirth)}, who is a partner and manager (Managing Director) of the company, holding ${field(a.shares)} shares (${field(a.shareValue)}, ${field(a.sharePercent)}).`
  const attorneyAr = `أوكل بموجب هذه الوكالة السيد/ ${field(a.nameAr)}، من مواطني ${field(a.nationalityAr)}، والمقيم في ${field(a.domicileAr)}، حامل هوية الإمارات رقم ${ltrField(a.emiratesId)}، تاريخ الميلاد ${ltrField(a.dateOfBirth)}، وهو شريك ومدير (مدير عام) في الشركة، ومالك لعدد ${ltrField(a.shares)} حصص بقيمة ${aedAr(a.shareValue)} درهماً إماراتياً بنسبة ${ltrField(a.sharePercent)}.`

  const scopeEn = `This Power of Attorney is limited to the vehicles of ${field(c.name)} and the vehicles of the grantor himself, and only before the Abu Dhabi Police General Command (Traffic and Licensing Department), TAMM and the related service centres. The attorney may sign the related forms and collect the related documents, and may do only the following:`
  const scopeAr = `تقتصر هذه الوكالة على مركبات ${field(c.nameAr)} ومركبات الموكل نفسه، وأمام القيادة العامة لشرطة أبوظبي (إدارة المرور والترخيص) ومنصة تم ومراكز الخدمة ذات الصلة فقط. وللوكيل التوقيع على النماذج ذات الصلة واستلام المستندات ذات الصلة، ولا يجوز له إلا ما يلي:`

  const powerItems: [string, string][] = [
    ['register, renew, transfer, buy and sell those vehicles', 'تسجيل تلك المركبات وتجديدها ونقل ملكيتها وشراؤها وبيعها'],
    ['issue and cancel number plates for those vehicles', 'إصدار لوحات الأرقام لتلك المركبات وإلغاؤها'],
    ['open, follow up and close traffic files for those vehicles', 'فتح ملفات المرور لتلك المركبات ومتابعتها وإغلاقها'],
    ['pay and object to traffic fines relating to those vehicles', 'سداد المخالفات المرورية المتعلقة بتلك المركبات والاعتراض عليها'],
    ['arrange the insurance required for registration of those vehicles', 'ترتيب التأمين اللازم لتسجيل تلك المركبات'],
    ['present those vehicles for testing and inspection', 'تقديم تلك المركبات للفحص والمعاينة'],
    ['obtain and follow up accident reports for those vehicles', 'استخراج تقارير الحوادث لتلك المركبات ومتابعتها'],
    ['collect the documents, cards and plates relating to those vehicles', 'استلام المستندات والبطاقات واللوحات المتعلقة بتلك المركبات'],
    ['sign all applications, forms and undertakings that relate only to the powers written above', 'التوقيع على جميع الطلبات والنماذج والتعهدات التي تتعلق فقط بالصلاحيات المكتوبة أعلاه'],
  ]
  const list = (items: [string, string][], start: number) => ({
    en: `<ol class="powers-list" start="${start}">${items.map(([en]) => `<li>${en}.</li>`).join('')}</ol>`,
    ar: `<ol class="powers-list" start="${start}">${items.map(([, ar]) => `<li>${ar}.</li>`).join('')}</ol>`,
  })
  const firstPowers = list(powerItems.slice(0, 5), 1)
  const lastPowers = list(powerItems.slice(5), 6)

  const signature = `
    <div class="signature-flow">
      <div class="signature-block-single-wrap">
        <div class="signature-block-single">
          <div class="signature-block-single-content">
            <p class="signature-block-single-title"><strong>The Grantor</strong><span class="signature-block-single-sep">|</span><strong dir="rtl">الموكل</strong></p>
            <p><span class="edited">Mr. ${esc(g.name)}</span></p>
            <p dir="rtl"><span class="edited">السيد/ ${esc(g.nameAr)}</span></p>
          </div>
          <div class="signature-line-single"></div>
          <p class="signature-block-single-content"><strong>Signature</strong><span class="signature-block-single-sep">|</span><strong dir="rtl">التوقيع</strong></p>
        </div>
      </div>
    </div>`

  const powers = `<div class="numbered-section"><div class="block"><p><span class="section-title">Powers</span></p><p>${scopeEn}</p>${firstPowers.en}</div><div class="block rtl"><p><span class="section-title">الصلاحيات</span></p><p>${scopeAr}</p>${firstPowers.ar}</div></div>`
  const powersContinued = `<div class="numbered-section"><div class="block"><p><span class="section-title">Powers (continued)</span></p>${lastPowers.en}</div><div class="block rtl"><p><span class="section-title">الصلاحيات (تابع)</span></p>${lastPowers.ar}</div></div>`
  const term = yearsToWords(3)
  const validity = `
    <div class="numbered-section">
      <div class="block">
        <p>This power attorney shall be valid up to <span class="edited">${term.en} years</span> from the date of attestation of the same by the notary public, unless it becomes invalid before that date for any other reason.</p>
      </div>
      <div class="block rtl">
        <p>يسـري هـذا التوكيـل لمـدة <span class="edited">${term.ar}</span> من تاريخ تصديقه لدى كاتب العدل مـا لم ينتهي قبـل ذلـك بسـبب أخـر ، وهيـ ة رجـوع اعتمـاد توقيعها لديكم</p>
      </div>
    </div>`

  const page = (inner: string, pageNum: number, isLast: boolean, lead = false) => `
    <div class="page${lead ? ' page-1' : ''}">
      <div class="page-content">${inner}</div>
      ${footerTemplate(isLast).replace(/__PAGE__/g, String(pageNum))}
    </div>`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>POA - ${esc(c.name)}</title>
  <style>${styles}${layoutOverrides}</style>
</head>
<body>
  <div class="doc" id="poa-doc">
    ${page(`<div class="title-pair"><div class="title-en">SPECIAL POWER OF ATTORNEY</div><div class="title-ar rtl">وكـــالة خاصـــة</div></div>${pair(grantorEn, grantorAr)}${pair(capacityEn, capacityAr)}${pair(attorneyEn, attorneyAr)}`, 1, false, true)}
    ${page(powers, 2, false)}
    ${page(`${powersContinued}${validity}${signature}`, 3, true)}
  </div>
</body>
</html>`
}
