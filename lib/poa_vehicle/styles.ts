// POA Vehicle Document Styles
// Reuses the POA styles infrastructure with vehicle-specific additions

import { FontSettings, FONT_SIZES } from '@/store/formattingStore'

export const getBaseFontSize = (size: FontSettings['baseFontSize']) => {
  return FONT_SIZES.find(s => s.value === size)?.basePt || 9
}

export function generatePOAVehicleStyles(settings?: FontSettings): string {
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
    text-align: justify;
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
    text-align: justify;
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
    height: calc(297mm - 20mm - 15mm);
    max-height: calc(297mm - 20mm - 15mm);
    padding: 15mm ${pageMargin}mm 5mm ${pageMargin}mm;
    box-sizing: border-box;
    overflow: visible;
    text-align: justify;
  }

  /* Page footer - fixed 20mm at bottom */
  .page-footer {
    flex-shrink: 0;
    height: 20mm;
    min-height: 20mm;
    max-height: 20mm;
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

  /* Title Styles */
  .title-pair {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
    padding: 12px 16px;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border: 1px solid #94a3b8;
    border-radius: 4px;
    width: 100%;
  }

  .page-1 .page-content {
    padding-top: 20mm;
  }
  .page-1 .title-pair {
    padding: 20px 24px;
    margin-bottom: 28px;
    margin-top: 4px;
  }
  .page-1 .title-en {
    font-size: ${basePt + 5}pt;
  }
  .page-1 .title-ar {
    font-size: ${basePt + 5}pt;
  }

  .title-en {
    flex: 0 0 calc(${englishPercent}% - 12px);
    width: calc(${englishPercent}% - 12px);
    font-size: ${basePt + 3}pt;
    font-weight: 700;
    text-decoration: underline;
    text-align: center;
    font-family: '${englishFont}', sans-serif;
    color: #1e3a5f;
    padding-right: 10px;
  }

  .title-ar {
    flex: 0 0 calc(${arabicPercent}% - 12px);
    width: calc(${arabicPercent}% - 12px);
    font-size: ${basePt + 3}pt;
    font-weight: 700;
    text-decoration: underline;
    text-align: center;
    font-family: '${arabicFont}', sans-serif;
    color: #1e3a5f;
    padding-left: 10px;
  }

  /* Text Utilities */
  .center { text-align: center; }
  .underline { text-decoration: underline; }
  .bold { font-weight: 700; }

  /* LTR & RTL Font Families */
  .ltr { font-family: '${englishFont}', sans-serif; }
  .rtl { direction: rtl; font-family: '${arabicFont}', sans-serif; }

  /* Block Styles */
  .block {
    border: 1px solid #cbd5e1;
    padding: ${Math.max(10, basePt * 0.8)}px ${Math.max(12, basePt * 1)}px;
    border-radius: 4px;
    background: #ffffff;
    font-size: ${englishPt}pt;
    line-height: ${englishLineHeight};
    min-width: 0;
    text-align: justify;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  .block.rtl {
    font-size: ${arabicPt}pt;
    line-height: ${arabicLineHeight};
    direction: rtl;
    text-align: justify;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
  .block h3 { font-size: ${englishPt + 0.5}pt; font-weight: 700; margin-bottom: ${Math.max(4, basePt * 0.4)}px; }
  .block.rtl h3 { font-size: ${arabicPt + 0.5}pt; }
  .block p { margin-bottom: ${Math.max(4, basePt * 0.4)}px; word-wrap: break-word; }

  /* Intro sections */
  .article-pair.intro-section {
    margin-bottom: ${Math.max(12, basePt * 0.8)}px;
  }
  .article-pair.intro-section > .block {
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    background: #ffffff;
    padding: ${Math.max(10, basePt * 0.8)}px ${Math.max(12, basePt * 1)}px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  /* Keep IDs and key phrases from breaking awkwardly */
  .no-break { white-space: nowrap; }
  .phrase-keep { white-space: nowrap; }

  /* Article Pair Grid */
  .article-pair {
    display: grid;
    grid-template-columns: calc(${englishPercent}% - 7px) calc(${arabicPercent}% - 7px);
    grid-template-rows: 1fr;
    gap: 14px;
    margin-bottom: ${Math.max(10, basePt * 0.7)}px;
    width: 100%;
    align-items: stretch;
  }
  .article-pair > .ltr,
  .article-pair > .block:not(.rtl) { 
    min-width: 0;
    font-family: '${englishFont}', sans-serif;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  .article-pair > .rtl,
  .article-pair > .block.rtl { 
    min-width: 0;
    font-family: '${arabicFont}', sans-serif;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  .article-pair > .block p:first-child { margin-top: 0; }
  .article-pair > .block.rtl p:first-child { margin-top: 0; }

  /* Vehicle details list */
  .vehicle-list {
    margin-top: ${Math.max(8, basePt * 0.6)}px;
  }

  .vehicle-item {
    margin-bottom: ${Math.max(14, basePt * 1)}px;
    padding: ${Math.max(8, basePt * 0.7)}px 0;
    border-bottom: 1px solid #e2e8f0;
  }
  .vehicle-item:last-child {
    border-bottom: none;
  }

  .vehicle-number {
    font-weight: 700;
    margin-bottom: ${Math.max(6, basePt * 0.5)}px;
    color: #1e3a5f;
  }

  .vehicle-detail {
    margin-bottom: ${Math.max(3, basePt * 0.3)}px;
    line-height: 1.4;
  }

  /* Signature row in content */
  .signature-block {
    min-height: 50mm;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .signature-centered-box {
    width: 100%;
    margin-top: 15px;
    padding: 25px 25px 0px 25px; /* Minimal bottom padding to close the box tight */
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    background: #ffffff;
    min-height: auto;
    text-align: center;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 15px;
  }

  .sig-name-line {
    font-size: ${basePt + 2}pt;
    font-weight: 700;
    color: #1e3a5f;
    margin-bottom: 30mm; /* Increased to 3cm as requested */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .sig-name-en {
    font-family: '${englishFont}', sans-serif;
  }

  .sig-name-ar {
    font-family: '${arabicFont}', sans-serif;
    direction: rtl;
  }

  .sig-line-container {
    width: 60%;
    border-top: 1px dashed #94a3b8;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0;
  }

  .sig-label-bilingual {
    font-size: ${basePt + 1}pt;
    font-weight: 700;
    color: #1e3a5f;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 15px; /* Space after labels before box ends */
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
      height: calc(297mm - 20mm - 15mm) !important;
      max-height: calc(297mm - 20mm - 15mm) !important;
      padding: 15mm ${pageMargin}mm 5mm ${pageMargin}mm !important;
      overflow: hidden !important;
      box-sizing: border-box !important;
    }
    .page-1 .page-content {
      padding-top: 20mm !important;
    }

    .page-footer {
      flex-shrink: 0 !important;
      height: 20mm !important;
      min-height: 20mm !important;
      max-height: 20mm !important;
      padding: 5mm ${pageMargin}mm !important;
      display: flex !important;
      box-sizing: border-box !important;
    }

    .article-pair, .block, .vehicle-item {
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
    height: 20mm !important;
    min-height: 20mm !important;
  }

  /* Avoid page breaks inside elements */
  .article-pair, .block, .vehicle-item { page-break-inside: avoid; }
`
}

// For backward compatibility, export a default style
export const poaVehicleStyles = generatePOAVehicleStyles()
