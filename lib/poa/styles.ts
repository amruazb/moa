// POA Document Styles
// Uses the same font settings infrastructure as MOA documents

import { FontSettings, FONT_SIZES } from '@/store/formattingStore'

export const getBaseFontSize = (size: FontSettings['baseFontSize']) => {
  return FONT_SIZES.find(s => s.value === size)?.basePt || 9
}

export function generatePOAStyles(settings?: FontSettings): string {
  const englishFont = settings?.englishFont || 'Noto Sans'
  const arabicFont = settings?.arabicFont || 'Arabic Transparent'
  const englishPt = getBaseFontSize(settings?.englishFontSize || settings?.baseFontSize || 'medium')
  const arabicPt = getBaseFontSize(settings?.arabicFontSize || settings?.baseFontSize || 'medium')
  const basePt = englishPt
  const boldEdited = settings?.boldEditedFields ?? true
  const columnRatio = settings?.columnRatio ?? 0.5
  const englishLineHeight = settings?.englishLineSpacing ?? 1.5
  const arabicLineHeight = settings?.arabicLineSpacing ?? 1.6
  const pageMargin = settings?.pageMargin ?? 10

  // Convert ratio to percentage for CSS
  const englishPercent = Math.round(columnRatio * 100)
  const arabicPercent = 100 - englishPercent

  // Font imports
  const fontImports = `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;600;700&family=Amiri:wght@400;700&family=Cairo:wght@400;600;700&family=Tajawal:wght@400;500;700&family=Scheherazade+New:wght@400;700&family=Noto+Naskh+Arabic:wght@400;700&display=swap');
  `

  return `
  ${fontImports}

  * { box-sizing: border-box; margin: 0; padding: 0; }

  @page {
    size: A4 portrait;
    margin: 0;
  }

  body {
    font-family: '${englishFont}', '${arabicFont}', sans-serif;
    font-size: ${basePt}pt;
    color: #111;
    background: #f8f8f8;
    padding: 20px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Edited/Dynamic content styling */
  .edited { font-weight: ${boldEdited ? '700' : '400'}; }

  /* Document container */
  .doc {
    width: 210mm;
    max-width: 210mm;
    margin: 0 auto;
    background: #fff;
    box-shadow: 0 18px 42px rgba(0,0,0,0.08);
  }

  /* Each page is exactly A4 height */
  .page {
    width: 210mm;
    height: 297mm;
    max-height: 297mm;
    display: flex;
    flex-direction: column;
    background: #fff;
    box-sizing: border-box;
    margin-bottom: 40px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    border: 1px solid #ccc;
  }
  .page:last-child {
    margin-bottom: 0;
  }

  /* Page break indicator */
  .page::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #999, transparent);
  }
  .page:last-child::after {
    display: none;
  }

  /* Page content wrapper */
  .page-content {
    flex: 1 1 auto;
    height: calc(297mm - 46mm - 15mm);
    max-height: calc(297mm - 46mm - 15mm);
    padding: 15mm ${pageMargin}mm 5mm ${pageMargin}mm;
    box-sizing: border-box;
    overflow: visible;
  }

  /* Page footer - fixed 46mm at bottom */
  .page-footer {
    flex-shrink: 0;
    height: 46mm;
    min-height: 46mm;
    max-height: 46mm;
    padding: 5mm ${pageMargin}mm;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    background: #fff;
    box-sizing: border-box;
    width: 100%;
  }

  .page-footer .footer-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    font-size: ${basePt - 2}pt;
  }

  .page-footer .footer-left {
    align-items: flex-start;
    font-family: '${englishFont}', sans-serif;
  }

  .page-footer .footer-center {
    align-items: center;
  }

  .page-footer .footer-right {
    align-items: flex-end;
    justify-content: flex-end;
    font-family: '${arabicFont}', sans-serif;
  }

  .page-footer .signature-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2mm;
  }

  .page-footer .signature-line {
    display: none;
  }

  .page-footer .footer-label {
    display: block;
    margin-top: 3mm;
    color: #555;
    font-size: ${basePt - 2}pt;
    text-align: center;
    white-space: nowrap;
  }

  .page-footer .page-num {
    font-size: ${basePt - 1}pt;
    color: #6b7280;
  }

  /* Print Styles */
  @media print {
    html, body {
      background: #fff !important;
      padding: 0 !important;
      margin: 0 !important;
    }

    .doc {
      box-shadow: none !important;
      width: 210mm !important;
      max-width: 210mm !important;
      margin: 0 !important;
    }

    .page {
      width: 210mm !important;
      height: 297mm !important;
      max-height: 297mm !important;
      margin: 0 !important;
      padding: 0 !important;
      display: flex !important;
      flex-direction: column !important;
      page-break-after: always !important;
      page-break-inside: avoid !important;
      overflow: hidden !important;
      box-sizing: border-box !important;
      box-shadow: none !important;
      border: none !important;
    }

    .page::after {
      display: none !important;
    }

    .page:last-child {
      page-break-after: auto !important;
    }

    .page-content {
      flex: 1 1 auto !important;
      height: calc(297mm - 46mm - 15mm) !important;
      max-height: calc(297mm - 46mm - 15mm) !important;
      padding: 15mm ${pageMargin}mm 5mm ${pageMargin}mm !important;
      overflow: hidden !important;
      box-sizing: border-box !important;
    }

    .page-footer {
      flex-shrink: 0 !important;
      height: 46mm !important;
      min-height: 46mm !important;
      max-height: 46mm !important;
      padding: 5mm ${pageMargin}mm !important;
      display: flex !important;
      box-sizing: border-box !important;
    }

    .article-pair, .numbered-section {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }

    .block {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
  }

  /* PDF-specific styles */
  .pdf-mode .doc {
    box-shadow: none !important;
    width: 210mm !important;
  }

  .pdf-mode .page {
    width: 210mm !important;
    height: 297mm !important;
    border-bottom: none !important;
    margin-bottom: 0 !important;
  }

  .pdf-mode .page-footer {
    display: flex !important;
    height: 46mm !important;
    min-height: 46mm !important;
  }

  /* Title Styles */
  .title-pair {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 15px 20px;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border: 2px solid #1e3a5f;
    border-radius: 6px;
    position: relative;
    width: 100%;
  }
  .title-pair::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    right: 4px;
    bottom: 4px;
    border: 1px solid #cbd5e1;
    border-radius: 3px;
    pointer-events: none;
  }

  .title-en {
    flex: 0 0 calc(${englishPercent}% - 20px);
    width: calc(${englishPercent}% - 20px);
    font-size: ${basePt + 4}pt;
    font-weight: bold;
    text-decoration: underline;
    text-align: center;
    font-family: '${englishFont}', sans-serif;
    color: #1e3a5f;
    padding-right: 15px;
  }

  .title-ar {
    flex: 0 0 calc(${arabicPercent}% - 20px);
    width: calc(${arabicPercent}% - 20px);
    font-size: ${basePt + 4}pt;
    font-weight: bold;
    text-decoration: underline;
    text-align: center;
    font-family: '${arabicFont}', sans-serif;
    color: #1e3a5f;
    padding-left: 15px;
  }

  /* Text Utilities */
  .center { text-align: center; }
  .underline { text-decoration: underline; }
  .bold { font-weight: 700; }

  /* LTR & RTL Font Families */
  .ltr { font-family: '${englishFont}', sans-serif; }
  .rtl { direction: rtl; font-family: '${arabicFont}', sans-serif; }

  /* Block Styles - with borders */
  .block {
    border: 1px solid #d0d0d0;
    padding: ${Math.max(6, basePt * 0.6)}px ${Math.max(8, basePt * 0.8)}px;
    border-radius: 3px;
    background: #fff;
    font-size: ${englishPt}pt;
    line-height: ${englishLineHeight};
    min-width: 0;
    text-align: justify;
  }
  .block.rtl {
    font-size: ${arabicPt}pt;
    line-height: ${arabicLineHeight};
    direction: rtl;
    text-align: justify;
  }
  .block h3 { font-size: ${englishPt + 0.5}pt; font-weight: 700; margin-bottom: ${Math.max(4, basePt * 0.4)}px; }
  .block.rtl h3 { font-size: ${arabicPt + 0.5}pt; }
  .block p { margin-bottom: ${Math.max(4, basePt * 0.4)}px; word-wrap: break-word; }

  /* Article Pair Grid - Dynamic column ratio */
  .article-pair {
    display: flex;
    gap: 10px;
    margin-bottom: ${Math.max(6, basePt * 0.6)}px;
    align-items: stretch;
    width: 100%;
  }
  .article-pair > .ltr,
  .article-pair > .block:not(.rtl) { 
    flex: 0 0 calc(${englishPercent}% - 5px);
    width: calc(${englishPercent}% - 5px);
    font-family: '${englishFont}', sans-serif;
    min-width: 0;
  }
  .article-pair > .rtl,
  .article-pair > .block.rtl { 
    flex: 0 0 calc(${arabicPercent}% - 5px);
    width: calc(${arabicPercent}% - 5px);
    font-family: '${arabicFont}', sans-serif;
    min-width: 0;
  }
  .article-pair > div { min-height: 100%; }

  /* Numbered sections */
  .numbered-section {
    display: flex;
    gap: 10px;
    margin-bottom: ${Math.max(6, basePt * 0.6)}px;
    align-items: stretch;
    width: 100%;
  }
  .numbered-section > .ltr,
  .numbered-section > .block:not(.rtl) { 
    flex: 0 0 calc(${englishPercent}% - 5px);
    width: calc(${englishPercent}% - 5px);
    font-family: '${englishFont}', sans-serif;
    min-width: 0;
  }
  .numbered-section > .rtl,
  .numbered-section > .block.rtl { 
    flex: 0 0 calc(${arabicPercent}% - 5px);
    width: calc(${arabicPercent}% - 5px);
    font-family: '${arabicFont}', sans-serif;
    min-width: 0;
  }
  .numbered-section > div { min-height: 100%; }

  .section-title {
    font-weight: bold;
    text-decoration: underline;
  }

  /* Info blocks */
  .info-block {
    margin-bottom: 12px;
  }

  .info-pair {
    display: flex;
    gap: 10px;
    margin-bottom: ${Math.max(6, basePt * 0.6)}px;
    width: 100%;
  }
  .info-pair > .ltr,
  .info-pair > .block:not(.rtl) { 
    flex: 0 0 calc(${englishPercent}% - 5px);
    width: calc(${englishPercent}% - 5px);
    font-family: '${englishFont}', sans-serif;
  }
  .info-pair > .rtl,
  .info-pair > .block.rtl { 
    flex: 0 0 calc(${arabicPercent}% - 5px);
    width: calc(${arabicPercent}% - 5px);
    font-family: '${arabicFont}', sans-serif;
  }

  /* Signature area */
  .signature-block {
    display: flex;
    gap: 10px;
    margin-top: 30px;
    width: 100%;
    align-items: stretch;
  }

  .signature-area {
    flex: 0 0 calc(${englishPercent}% - 5px);
    width: calc(${englishPercent}% - 5px);
    font-family: '${englishFont}', sans-serif;
    border: 1px solid #d0d0d0;
    padding: ${Math.max(6, basePt * 0.6)}px ${Math.max(8, basePt * 0.8)}px;
    border-radius: 3px;
    background: #fff;
    font-size: ${englishPt}pt;
    line-height: ${englishLineHeight};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 180px;
  }

  .signature-area.rtl {
    flex: 0 0 calc(${arabicPercent}% - 5px);
    width: calc(${arabicPercent}% - 5px);
    font-family: '${arabicFont}', sans-serif;
    direction: rtl;
    text-align: right;
    font-size: ${arabicPt}pt;
    line-height: ${arabicLineHeight};
  }

  .signature-content {
    flex: 0 0 auto;
  }

  .signature-line-block {
    border-top: 1px solid #000;
    padding-top: 5px;
    margin-top: auto;
  }

  /* Avoid page breaks inside elements */
  .article-pair, .numbered-section, .block, .signature-block { page-break-inside: avoid; }
`
}

// For backward compatibility, export a default style
export const poaStyles = generatePOAStyles()
