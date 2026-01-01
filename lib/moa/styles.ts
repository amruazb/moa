export const moaStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap');
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  /* A4 Paper: 210mm x 297mm - Print margins */
  @page {
    size: A4;
    margin: 10mm 10mm 10mm 10mm; /* Reduced margins for print */
  }
  
  body {
    font-family: 'Noto Sans', 'Noto Sans Arabic', sans-serif;
    font-size: 9pt;
    color: #111;
    background: #f8f8f8;
    padding: 20px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
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
    padding: 12mm 10mm 15mm 10mm; /* Adjusted margins */
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
  .title h1 { font-size: 13pt; font-weight: 700; line-height: 1.3; }
  .title h2 { font-size: 10pt; font-weight: 700; margin-top: 3px; }
  .subtitle { font-size: 9pt; font-weight: 600; margin-top: 4px; }
  
  /* Text Utilities */
  .center { text-align: center; }
  .underline { text-decoration: underline; }
  .bold { font-weight: 700; }
  .italic { font-style: italic; }
  
  /* Text Size Classes */
  .text-xs { font-size: 7pt; }
  .text-sm { font-size: 8pt; }
  .text-md { font-size: 9pt; }
  .text-lg { font-size: 10pt; }
  .text-xl { font-size: 11pt; }
  
  /* Letter Spacing */
  .tracking-normal { letter-spacing: normal; }
  .tracking-wide { letter-spacing: 0.025em; }
  .tracking-wider { letter-spacing: 0.05em; }
  
  /* Bilingual Layout */
  .bilingual { display: flex; gap: 10px; align-items: stretch; }
  .bilingual > .block { flex: 1; display: flex; flex-direction: column; }
  
  /* Block Styles */
  .block {
    border: 1px solid #d0d0d0;
    padding: 6px 8px;
    border-radius: 3px;
    background: #fff;
    font-size: 8pt;
    line-height: 1.45;
  }
  .block h3 { font-size: 8.5pt; font-weight: 700; margin-bottom: 4px; }
  .block p { margin-bottom: 4px; }
  .block ol, .block ul { padding-left: 12px; margin: 4px 0; }
  .block.rtl ol, .block.rtl ul { padding-right: 12px; padding-left: 0; }
  .block li { margin-bottom: 2px; }
  
  /* Article Pair Grid */
  .article-pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 6px;
    align-items: start;
  }
  .article-pair > div { min-height: 100%; }
  
  /* Grid & Cards */
  .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .card { border: 1px solid #d7d7d7; background: #fafafa; padding: 6px 8px; border-radius: 3px; }
  .heading { font-weight: 700; font-size: 9pt; margin-bottom: 6px; display: flex; justify-content: space-between; }
  
  /* Row Layout */
  .row { display: flex; justify-content: space-between; gap: 8px; padding: 2px 0; font-size: 8pt; }
  .row .label { font-weight: 600; color: #333; min-width: 100px; }
  .row .value { flex: 1; text-align: left; }
  .row.rtl { direction: rtl; text-align: right; font-family: 'Noto Sans Arabic', sans-serif; }
  
  /* Section & Table */
  .section-bar { background: #e5e7eb; color: #111827; padding: 4px 8px; font-weight: 700; font-size: 8pt; margin: 10px 0 8px; display: flex; justify-content: space-between; }
  .list { padding-left: 12px; font-size: 8pt; line-height: 1.5; }
  .list li { margin-bottom: 2px; }
  
  table { width: 100%; border-collapse: collapse; margin-top: 6px; font-size: 7.5pt; }
  th, td { border: 1px solid #c9c9c9; padding: 3px 5px; text-align: center; }
  th { background: #f0f0f0; }
  
  /* RTL & Page Number */
  .rtl { direction: rtl; font-family: 'Noto Sans Arabic', sans-serif; }
  .page-num { position: absolute; bottom: 8mm; right: 10mm; font-size: 8pt; color: #6b7280; }
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
  }
  .bilingual-header .header-left,
  .bilingual-header .header-right {
    flex: 1;
    text-align: center;
  }
  .bilingual-header h1 { font-size: 12pt; font-weight: 700; margin-bottom: 4px; }
  .bilingual-header h2 { font-size: 10pt; font-weight: 600; margin-bottom: 3px; }
  .bilingual-header h3 { font-size: 9pt; font-weight: 600; }
  
  .law-reference {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    font-size: 8pt;
  }
  .law-reference .law-left,
  .law-reference .law-right {
    flex: 1;
    text-align: center;
    font-style: italic;
  }
  
  .bilingual-content {
    display: flex;
    gap: 20px;
    margin-bottom: 12px;
    align-items: flex-start;
  }
  .bilingual-content .content-left,
  .bilingual-content .content-right {
    flex: 1;
    font-size: 9pt;
    line-height: 1.6;
  }
  .bilingual-content .content-left { text-align: left; }
  .bilingual-content .content-right { text-align: right; }
  .bilingual-content h3 { font-size: 9.5pt; font-weight: 700; margin-bottom: 6px; }
  .bilingual-content p { margin-bottom: 6px; }
`
