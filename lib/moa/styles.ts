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
  
  /* A4 Paper: 210mm x 297mm - Print margins */
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
  
  .doc {
    width: 210mm;
    max-width: 210mm;
    margin: 0 auto;
    background: #fff;
    box-shadow: 0 18px 42px rgba(0,0,0,0.08);
  }
  
  .page {
    width: 210mm;
    min-height: 297mm; /* Minimum A4 height */
    /* height: auto on screen - let content determine height */
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #e0e0e0;
    background: #fff;
    box-sizing: border-box;
    margin-bottom: 20px; /* Visual separation between pages on screen */
    position: relative;
  }
  .page:last-child { margin-bottom: 0; }
  
  /* Page content wrapper - flexible area above footer */
  .page-content {
    flex: 1; /* Take remaining space */
    padding: 10mm 10mm 5mm 10mm;
    box-sizing: border-box;
  }
  
  /* Page footer - fixed 2-inch (51mm) height */
  .page-footer {
    flex-shrink: 0; /* Don't shrink */
  }
  
  /* Print Styles - Allow natural content flow with proper pagination */
  @media print {
    html, body { 
      background: #fff !important; 
      padding: 0 !important; 
      margin: 0 !important;
      width: 210mm !important;
    }
    .doc { 
      box-shadow: none !important; 
      width: 210mm !important; 
      max-width: 210mm !important;
      margin: 0 !important;
    }
    
    /* Pages flow naturally - browser handles pagination */
    .page { 
      border-bottom: none !important; 
      width: 210mm !important;
      max-width: 210mm !important;
      min-height: auto !important;
      height: auto !important;
      margin: 0 !important;
      padding-bottom: 51mm !important; /* Ensure footer space at bottom */
      page-break-after: always !important;
      box-sizing: border-box !important;
      display: block !important;
      position: relative !important;
    }
    .page:last-child {
      page-break-after: auto !important;
    }
    
    /* Content flows naturally */
    .page-content {
      padding: 10mm 10mm 5mm 10mm !important;
    }
    
    /* Keep article pairs together when possible */
    .article-pair {
      page-break-inside: avoid !important;
    }
    
    /* Avoid breaking inside individual blocks */
    .block {
      page-break-inside: avoid !important;
    }
    
    /* Section bars should keep with following content */
    .section-bar {
      page-break-after: avoid !important;
    }
    
    .page-num { display: block !important; }
    
    /* Footer at bottom of each printed page */
    .page-footer {
      position: fixed !important;
      bottom: 0 !important;
      left: 0 !important;
      right: 0 !important;
      height: 51mm !important;
      background: #fff !important;
      break-inside: avoid !important;
    }
    
    /* Ensure content doesn't overflow horizontally */
    .bilingual, .article-pair, .grid {
      width: 100% !important;
      max-width: 100% !important;
    }
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

  /* Page Footer - Signature & Seal Area - Fixed 2 inches (51mm) */
  .page-footer {
    height: 51mm;
    min-height: 51mm;
    max-height: 51mm;
    padding: 3mm 10mm 10mm 10mm;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-top: 1px solid #ccc;
    background: #fff;
    box-sizing: border-box;
  }
  .page-footer .footer-left {
    flex: 1;
    text-align: left;
    font-size: ${basePt - 2}pt;
    font-family: '${englishFont}', sans-serif;
  }
  .page-footer .footer-center {
    flex: 1;
    text-align: center;
    font-size: ${basePt - 2}pt;
  }
  .page-footer .footer-right {
    flex: 1;
    text-align: right;
    font-size: ${basePt - 2}pt;
    font-family: '${arabicFont}', sans-serif;
    direction: rtl;
  }
  .page-footer .signature-line {
    border-bottom: 1px solid #333;
    width: 120px;
    display: inline-block;
    margin-bottom: 3px;
  }
  .page-footer .footer-label {
    display: block;
    margin-top: 2px;
    color: #666;
  }
  .page-footer .page-num {
    position: absolute;
    bottom: 10mm;
    right: 10mm;
    font-size: ${basePt - 1}pt;
    color: #6b7280;
  }
`
}

// For backward compatibility, export a default style
export const moaStyles = generateMoaStyles()
