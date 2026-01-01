import { FontSettings, FONT_SIZES } from '@/store/formattingStore'

export const getBaseFontSize = (size: FontSettings['baseFontSize']) => {
  return FONT_SIZES.find(s => s.value === size)?.basePt || 9
}

export const generateMoaStyles = (settings?: FontSettings): string => {
  const englishFont = settings?.englishFont || 'Noto Sans'
  const arabicFont = settings?.arabicFont || 'Noto Sans Arabic'
  const basePt = getBaseFontSize(settings?.baseFontSize || 'medium')
  const boldEdited = settings?.boldEditedFields ?? true
  const columnRatio = settings?.columnRatio ?? 0.5
  
  // Convert ratio to percentage for CSS
  const englishPercent = Math.round(columnRatio * 100)
  const arabicPercent = 100 - englishPercent
  
  // Font imports for Google Fonts
  const fontImports = `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;600;700&family=Amiri:wght@400;700&family=Cairo:wght@400;600;700&family=Tajawal:wght@400;500;700&family=Scheherazade+New:wght@400;700&family=Noto+Naskh+Arabic:wght@400;700&display=swap');
  `
  
  return `
  ${fontImports}
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  /* A4 Paper: 210mm x 297mm - Print margins */
  @page {
    size: A4;
    margin: 10mm 10mm 10mm 10mm;
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
    min-height: 297mm;
    padding: 12mm 10mm 15mm 10mm;
    position: relative;
    border-bottom: 1px solid #e0e0e0;
    background: #fff;
  }
  .page + .page { page-break-before: always; }
  
  /* Print Styles */
  @media print {
    html, body { 
      background: #fff !important; 
      padding: 0 !important; 
      margin: 0 !important;
      width: 100% !important;
      height: auto !important;
    }
    .doc { 
      box-shadow: none !important; 
      width: 100% !important; 
      max-width: 100% !important;
      margin: 0 !important;
    }
    .page { 
      border-bottom: none !important; 
      min-height: auto !important;
      height: auto !important;
      padding: 5mm 5mm 8mm 5mm !important; /* Tighter padding for print */
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      page-break-after: always;
      page-break-inside: avoid;
    }
    .page:last-child {
      page-break-after: auto;
    }
    .page-num { display: none !important; } /* Hide page numbers - browser adds them */
    
    /* Ensure content doesn't overflow */
    .bilingual, .article-pair, .grid {
      width: 100% !important;
      max-width: 100% !important;
    }
    .block {
      overflow: hidden !important;
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
    padding: 6px 8px;
    border-radius: 3px;
    background: #fff;
    font-size: ${basePt - 1}pt;
    line-height: 1.5;
    min-width: 0;
  }
  .block h3 { font-size: ${basePt - 0.5}pt; font-weight: 700; margin-bottom: 4px; }
  .block p { margin-bottom: 4px; word-wrap: break-word; }
  .block ol, .block ul { padding-left: 12px; margin: 4px 0; }
  .block.rtl ol, .block.rtl ul { padding-right: 12px; padding-left: 0; }
  .block li { margin-bottom: 2px; }
  
  /* Article Pair Grid - Dynamic column ratio */
  .article-pair {
    display: flex;
    gap: 10px;
    margin-bottom: 6px;
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
  .list { padding-left: 12px; font-size: ${basePt - 1}pt; line-height: 1.5; }
  .list li { margin-bottom: 2px; }
  
  table { width: 100%; border-collapse: collapse; margin-top: 6px; font-size: ${basePt - 1.5}pt; }
  th, td { border: 1px solid #c9c9c9; padding: 3px 5px; text-align: center; }
  th { background: #f0f0f0; }
  
  /* LTR & RTL Font Families */
  .ltr { font-family: '${englishFont}', sans-serif; }
  .rtl { direction: rtl; font-family: '${arabicFont}', sans-serif; }
  .page-num { position: absolute; bottom: 8mm; right: 10mm; font-size: ${basePt - 1}pt; color: #6b7280; }
  strong.underline { text-decoration: underline; }
  
  /* Avoid page breaks inside elements */
  .article-pair, .card, .block, table { page-break-inside: avoid; }
  
  /* Bilingual Two-Column Layout (matching sample MOA format) */
  .bilingual-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    width: 100%;
  }
  .bilingual-header .header-left {
    flex: 0 0 calc(${englishPercent}% - 5px);
    width: calc(${englishPercent}% - 5px);
    text-align: center;
    font-family: '${englishFont}', sans-serif;
  }
  .bilingual-header .header-right {
    flex: 0 0 calc(${arabicPercent}% - 5px);
    width: calc(${arabicPercent}% - 5px);
    text-align: center;
    font-family: '${arabicFont}', sans-serif;
  }
  .bilingual-header h1 { font-size: ${basePt + 3}pt; font-weight: 700; margin-bottom: 4px; }
  .bilingual-header h2 { font-size: ${basePt + 1}pt; font-weight: 600; margin-bottom: 3px; }
  .bilingual-header h3 { font-size: ${basePt}pt; font-weight: 600; }
  
  .law-reference {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    font-size: ${basePt - 1}pt;
    width: 100%;
  }
  .law-reference .law-left {
    flex: 0 0 calc(${englishPercent}% - 5px);
    width: calc(${englishPercent}% - 5px);
    text-align: center;
    font-style: italic;
    font-family: '${englishFont}', sans-serif;
  }
  .law-reference .law-right {
    flex: 0 0 calc(${arabicPercent}% - 5px);
    width: calc(${arabicPercent}% - 5px);
    text-align: center;
    font-style: italic;
    font-family: '${arabicFont}', sans-serif;
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
`
}

// For backward compatibility, export a default style
export const moaStyles = generateMoaStyles()
