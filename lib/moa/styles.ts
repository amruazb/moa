import { FontSettings, FONT_SIZES } from '@/store/formattingStore'

export const getBaseFontSize = (size: FontSettings['baseFontSize']) => {
  return FONT_SIZES.find(s => s.value === size)?.basePt || 9
}

export const generateMoaStyles = (settings?: FontSettings): string => {
  const englishFont = settings?.englishFont || 'Noto Sans'
  const arabicFont = settings?.arabicFont || 'Arabic Transparent'
  const englishPt = getBaseFontSize(settings?.englishFontSize || settings?.baseFontSize || 'medium')
  const arabicPt = getBaseFontSize(settings?.arabicFontSize || settings?.baseFontSize || 'medium')
  const basePt = englishPt // Use English as base for general elements
  const boldEdited = settings?.boldEditedFields ?? true
  const columnRatio = settings?.columnRatio ?? 0.5
  const englishLineHeight = settings?.englishLineSpacing ?? 1.5
  const arabicLineHeight = settings?.arabicLineSpacing ?? 1.6
  const pageMargin = settings?.pageMargin ?? 10 // left/right margin in mm

  // Convert ratio to percentage for CSS
  const englishPercent = Math.round(columnRatio * 100)
  const arabicPercent = 100 - englishPercent

  // Font imports for Google Fonts (Arabic Transparent is a system font)
  const fontImports = `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;600;700&family=Amiri:wght@400;700&family=Cairo:wght@400;600;700&family=Tajawal:wght@400;500;700&family=Scheherazade+New:wght@400;700&family=Noto+Naskh+Arabic:wght@400;700&display=swap');
  `

  return `
  ${fontImports}

  * { box-sizing: border-box; margin: 0; padding: 0; }

  /* A4 Paper: 210mm x 297mm
   * Each page is exactly A4 size with footer at bottom
   * Content that overflows will be visible (not hidden) on screen
   * Print will paginate content properly
   */
  @page {
    size: A4 portrait;
    margin: 0; /* User sets margins to None in print dialog */
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
    overflow: hidden; /* Hide overflow to show exact page boundary */
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    border: 1px solid #ccc;
  }
  .page:last-child {
    margin-bottom: 0;
  }

  /* Page break indicator - visible gap between pages */
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

  /* Page content wrapper - calculated height = 297mm - footer (46mm) - top padding */
  .page-content {
    flex: 1 1 auto;
    height: calc(297mm - 46mm - 15mm); /* Available content height */
    max-height: calc(297mm - 46mm - 15mm);
    padding: 15mm ${pageMargin}mm 5mm ${pageMargin}mm;
    box-sizing: border-box;
    overflow: visible; /* Show overflow visually */
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
  }

  .page-footer .footer-left {
    align-items: flex-start;
  }

  .page-footer .footer-center {
    align-items: center;
  }

  .page-footer .footer-right {
    align-items: flex-end;
    justify-content: flex-end;
  }

  .page-footer .signature-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2mm;
  }

  /* Print Styles - Fixed pages, each exactly A4 */
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

    /* Each page is exactly A4, prints one per physical page */
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

    /* Content area - match live view exactly */
    .page-content {
      flex: 1 1 auto !important;
      height: calc(297mm - 46mm - 15mm) !important;
      max-height: calc(297mm - 46mm - 15mm) !important;
      padding: 15mm ${pageMargin}mm 5mm ${pageMargin}mm !important;
      overflow: hidden !important;
      box-sizing: border-box !important;
    }

    /* Per-page footer at bottom - match live view exactly */
    .page-footer {
      flex-shrink: 0 !important;
      height: 46mm !important;
      min-height: 46mm !important;
      max-height: 46mm !important;
      padding: 5mm ${pageMargin}mm !important;
      display: flex !important;
      box-sizing: border-box !important;
    }

    /* Hide the global print footer */
    .print-footer {
      display: none !important;
    }

    /* Keep related content together */
    .article-pair {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }

    .block {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }

    .section-bar {
      page-break-after: avoid !important;
      break-after: avoid !important;
    }

    /* Horizontal overflow prevention */
    .bilingual, .article-pair, .grid, .bilingual-header, .law-reference, .bilingual-content {
      width: 100% !important;
      max-width: 100% !important;
    }
  }

  /* Global print footer - not used */
  .print-footer {
    display: none;
  }

  /* PDF-specific styles - applied via class when generating PDF */
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

  .pdf-mode .print-footer {
    display: none !important;
  }
  
  /* Title Styles */
  .title { text-align: center; margin-bottom: 12px; }
  .title h1 { font-size: ${basePt + 4}pt; font-weight: 700; line-height: 1.3; }
  .title h2 { font-size: ${basePt + 1}pt; font-weight: 700; margin-top: 3px; }
  .subtitle { font-size: ${basePt}pt; font-weight: 600; margin-top: 4px; }
  
  /* Text Utilities */
  .center { text-align: center; }
  .underline { text-decoration: underline; }
  .bold { font-weight: 700; }
  .italic { font-style: italic; }
  
  /* Text Size Classes - relative to base */
  .text-xs { font-size: ${basePt - 2}pt; }
  .text-sm { font-size: ${basePt - 1}pt; }
  .text-md { font-size: ${basePt}pt; }
  .text-lg { font-size: ${basePt + 1}pt; }
  .text-xl { font-size: ${basePt + 2}pt; }
  
  /* Letter Spacing */
  .tracking-normal { letter-spacing: normal; }
  .tracking-wide { letter-spacing: 0.025em; }
  .tracking-wider { letter-spacing: 0.05em; }
  
  /* Bilingual Layout - Dynamic column ratio */
  .bilingual { 
    display: flex; 
    gap: 10px; 
    align-items: stretch;
    width: 100%;
  }
  .bilingual > .block { 
    display: flex; 
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  .bilingual > .block.ltr,
  .bilingual > .block:not(.rtl) { 
    flex: 0 0 calc(${englishPercent}% - 5px);
    width: calc(${englishPercent}% - 5px);
    font-family: '${englishFont}', sans-serif; 
  }
  .bilingual > .block.rtl { 
    flex: 0 0 calc(${arabicPercent}% - 5px);
    width: calc(${arabicPercent}% - 5px);
    font-family: '${arabicFont}', sans-serif; 
  }
  
  /* Block Styles */
  .block {
    border: 1px solid #d0d0d0;
    padding: ${Math.max(6, basePt * 0.6)}px ${Math.max(8, basePt * 0.8)}px;
    border-radius: 3px;
    background: #fff;
    font-size: ${englishPt}pt;
    line-height: ${englishLineHeight};
    min-width: 0;
  }
  .block.rtl {
    font-size: ${arabicPt}pt;
    line-height: ${arabicLineHeight};
  }
  .block h3 { font-size: ${englishPt + 0.5}pt; font-weight: 700; margin-bottom: ${Math.max(4, basePt * 0.4)}px; }
  .block.rtl h3 { font-size: ${arabicPt + 0.5}pt; }
  .block p { margin-bottom: ${Math.max(4, basePt * 0.4)}px; word-wrap: break-word; }
  .block ol, .block ul { padding-left: 18px; margin: ${Math.max(4, basePt * 0.4)}px 0; list-style-type: disc; }
  .block.rtl ol, .block.rtl ul { padding-right: 18px; padding-left: 0; }
  .block li { margin-bottom: 2px; list-style-type: disc; }
  .block.rtl li { list-style-type: disc; }
  
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
  
  /* Grid & Cards */
  .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .card { border: 1px solid #d7d7d7; background: #fafafa; padding: 6px 8px; border-radius: 3px; }
  .heading { font-weight: 700; font-size: ${basePt}pt; margin-bottom: 6px; display: flex; justify-content: space-between; }
  
  /* Row Layout */
  .row { display: flex; justify-content: space-between; gap: 8px; padding: 2px 0; font-size: ${basePt - 1}pt; }
  .row .label { font-weight: 600; color: #333; min-width: 100px; }
  .row .value { flex: 1; text-align: left; }
  .row.rtl { direction: rtl; text-align: right; font-family: '${arabicFont}', sans-serif; }
  
  /* Section & Table */
  .section-bar { background: #e5e7eb; color: #111827; padding: 4px 8px; font-weight: 700; font-size: ${basePt - 1}pt; margin: 10px 0 8px; display: flex; justify-content: space-between; }
  .list { padding-left: 18px; font-size: ${englishPt - 1}pt; line-height: 1.5; list-style-type: disc; }
  .list li { margin-bottom: 2px; list-style-type: disc; display: list-item; }
  .rtl .list, .block.rtl .list { padding-left: 0; padding-right: 18px; font-size: ${arabicPt - 1}pt; }
  
  table { width: 100%; border-collapse: collapse; margin-top: 6px; font-size: ${basePt - 1.5}pt; }
  th, td { border: 1px solid #c9c9c9; padding: 3px 5px; text-align: center; }
  th { background: #f0f0f0; }
  
  /* LTR & RTL Font Families */
  .ltr { font-family: '${englishFont}', sans-serif; }
  .rtl { direction: rtl; font-family: '${arabicFont}', sans-serif; }
  .page-num { position: absolute; bottom: 10mm; right: 10mm; font-size: ${basePt - 1}pt; color: #6b7280; }
  strong.underline { text-decoration: underline; }
  
  /* Avoid page breaks inside elements */
  .article-pair, .card, .block, table { page-break-inside: avoid; }
  
  /* Bilingual Two-Column Layout - Premium Header Design */
  .bilingual-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 15px 20px;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border: 2px solid #1e3a5f;
    border-radius: 6px;
    position: relative;
    width: 100%;
  }
  .bilingual-header::before {
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
  .bilingual-header .header-left {
    flex: 0 0 calc(${englishPercent}% - 20px);
    width: calc(${englishPercent}% - 20px);
    text-align: center;
    font-family: '${englishFont}', sans-serif;
    padding-right: 15px;
    border-right: 2px solid #1e3a5f;
  }
  .bilingual-header .header-right {
    flex: 0 0 calc(${arabicPercent}% - 20px);
    width: calc(${arabicPercent}% - 20px);
    text-align: center;
    font-family: '${arabicFont}', sans-serif;
    padding-left: 15px;
  }
  .bilingual-header h1 { 
    font-size: ${basePt + 4}pt; 
    font-weight: 700; 
    margin-bottom: 6px; 
    color: #1e3a5f;
    letter-spacing: 0.5px;
    text-transform: capitalize;
  }
  .bilingual-header h2 { 
    font-size: ${basePt + 1}pt; 
    font-weight: 600; 
    margin-bottom: 5px; 
    color: #334155;
  }
  .bilingual-header h3 { 
    font-size: ${basePt}pt; 
    font-weight: 600; 
    color: #475569;
    background: rgba(30, 58, 95, 0.08);
    padding: 3px 10px;
    border-radius: 3px;
    display: inline-block;
  }
  
  .law-reference {
    display: flex;
    justify-content: space-between;
    margin-bottom: 18px;
    font-size: ${basePt - 1}pt;
    width: 100%;
    padding: 8px 15px;
    background: #fafafa;
    border-left: 3px solid #1e3a5f;
    border-right: 3px solid #1e3a5f;
  }
  .law-reference .law-left {
    flex: 0 0 calc(${englishPercent}% - 5px);
    width: calc(${englishPercent}% - 5px);
    text-align: center;
    font-style: italic;
    font-family: '${englishFont}', sans-serif;
    color: #475569;
  }
  .law-reference .law-right {
    flex: 0 0 calc(${arabicPercent}% - 5px);
    width: calc(${arabicPercent}% - 5px);
    text-align: center;
    font-style: italic;
    font-family: '${arabicFont}', sans-serif;
    color: #475569;
  }
  
  .bilingual-content {
    display: flex;
    gap: 15px;
    margin-bottom: 12px;
    align-items: flex-start;
    width: 100%;
  }
  .bilingual-content .content-left {
    flex: 0 0 calc(${englishPercent}% - 8px);
    width: calc(${englishPercent}% - 8px);
    font-size: ${basePt}pt;
    line-height: 1.6;
    text-align: left;
    font-family: '${englishFont}', sans-serif;
    min-width: 0;
    word-wrap: break-word;
  }
  .bilingual-content .content-right {
    flex: 0 0 calc(${arabicPercent}% - 8px);
    width: calc(${arabicPercent}% - 8px);
    font-size: ${basePt}pt;
    line-height: 1.6;
    text-align: right;
    font-family: '${arabicFont}', sans-serif;
    min-width: 0;
    word-wrap: break-word;
  }
  .bilingual-content h3 { font-size: ${basePt + 0.5}pt; font-weight: 700; margin-bottom: 6px; }
  .bilingual-content p { margin-bottom: 6px; }

  /* Page Footer inner elements - Signature & Seal Area (overrides for fonts) */
  .page-footer .footer-section {
    font-size: ${basePt - 2}pt;
  }
  .page-footer .footer-left {
    font-family: '${englishFont}', sans-serif;
  }
  .page-footer .footer-right {
    font-family: '${arabicFont}', sans-serif;
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
`
}

// For backward compatibility, export a default style
export const moaStyles = generateMoaStyles()
