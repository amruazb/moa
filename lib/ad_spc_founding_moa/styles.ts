/** Fixed bilingual clause-box styles for the Abu Dhabi founding MOA. */
export function adSpcFoundingStyles(): string {
  return `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  @page { size: A4 portrait; margin: 0; }

  body {
    font-family: 'Noto Sans', 'DejaVu Sans', sans-serif;
    color: #111;
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .edited { font-weight: 700; }

  .doc { width: 210mm; margin: 0 auto; }

  .page {
    width: 210mm;
    height: 297mm;
    display: flex;
    flex-direction: column;
    background: #fff;
    page-break-after: always;
    break-after: page;
    overflow: hidden;
    position: relative;
  }
  .page:last-child { page-break-after: auto; break-after: auto; }

  .page-content {
    flex: 1 1 auto;
    min-height: 0;
    padding: 11mm 11mm 2mm 11mm;
    display: flex;
    flex-direction: column;
    gap: 7px;
    overflow: hidden;
  }

  .bilingual-header {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    padding: 10px 12px;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border: 2px solid #1e3a5f;
    border-radius: 6px;
    gap: 10px;
  }
  .bilingual-header .header-left,
  .bilingual-header .header-right {
    flex: 1;
    text-align: center;
    min-width: 0;
  }
  .bilingual-header h1 { font-size: 14pt; line-height: 1.25; color: #1e3a5f; }
  .bilingual-header h2 { font-size: 11pt; font-weight: 600; margin-top: 3px; color: #1f2937; }
  .bilingual-header h3 { font-size: 10pt; font-weight: 700; margin-top: 4px; }
  .header-right { direction: rtl; font-family: 'Noto Naskh Arabic', 'Noto Sans Arabic', serif; }

  .law-reference {
    display: flex;
    gap: 10px;
    background: #e5e7eb;
    padding: 6px 10px;
    font-weight: 700;
    border-radius: 3px;
  }
  .law-reference .law-left { flex: 1; font-size: 9pt; line-height: 1.4; text-align: center; }
  .law-reference .law-right {
    flex: 1;
    font-size: 10.5pt;
    line-height: 1.5;
    text-align: center;
    direction: rtl;
    font-family: 'Noto Naskh Arabic', 'Noto Sans Arabic', serif;
  }

  .article-pair {
    display: flex;
    gap: 10px;
    align-items: stretch;
    width: 100%;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .block {
    flex: 1;
    min-width: 0;
    border: 1px solid #d0d0d0;
    padding: 10px 11px;
    border-radius: 3px;
    background: #fff;
    font-size: 11pt;
    line-height: 1.65;
    text-align: left;
    font-family: 'Noto Sans', 'DejaVu Sans', sans-serif;
  }
  .block.rtl {
    direction: rtl;
    font-family: 'Noto Naskh Arabic', 'Noto Sans Arabic', serif;
    font-size: 12pt;
    line-height: 1.75;
    text-align: right;
  }
  bdi.ltr {
    direction: ltr;
    unicode-bidi: isolate;
  }

  .block h3 {
    font-size: 12pt;
    font-weight: 700;
    background: #e5e7eb;
    color: #1f2937;
    padding: 5px 8px;
    margin: -10px -11px 8px -11px;
    text-align: left;
    line-height: 1.35;
  }
  .block.rtl h3 {
    font-size: 13pt;
    text-align: right;
    font-family: 'Noto Naskh Arabic', 'Noto Sans Arabic', serif;
  }

  .block p { margin-bottom: 6px; }
  .block p:last-child { margin-bottom: 0; }
  .block ul { margin: 4px 0 2px; padding-left: 16px; }
  .block.rtl ul { padding-left: 0; padding-right: 16px; }
  .block li { margin-bottom: 3px; }

  .page-footer {
    flex-shrink: 0;
    height: 7mm;
    padding: 0 12mm 2mm;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    font-size: 9pt;
    color: #4b5563;
    font-family: 'Noto Sans', sans-serif;
  }

  .signature-card-wrap {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 6px;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .signature-card {
    max-width: 460px;
    width: 100%;
    margin: 0 auto;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    padding: 12px 20px 14px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    text-align: center;
    font-size: 11pt;
    line-height: 1.5;
    font-family: 'Noto Sans', 'DejaVu Sans', sans-serif;
  }
  .signature-card .ar {
    direction: rtl;
    font-family: 'Noto Naskh Arabic', 'Noto Sans Arabic', serif;
    font-size: 12pt;
    line-height: 1.7;
  }
  .signature-card p { margin: 2px 0; }
  .sign-space { height: 92px; }
  .sign-line {
    border-top: 1px solid #000;
    width: 70%;
    margin: 0 auto 6px;
  }

  .page:first-child .page-content { padding-top: 6mm; gap: 3px; }
  .page:first-child .bilingual-header { padding: 6px 10px; }
  .page:first-child .bilingual-header h1 { font-size: 13pt; }
  .page:first-child .law-reference { padding: 3px 8px; }
  .page:first-child .block p { margin-bottom: 3px; }
  .page:first-child .block { padding: 7px 11px; line-height: 1.55; }
  .page:first-child .block.rtl { line-height: 1.65; }
  .page:first-child .block h3 { margin-top: -8px; }

  /* Last page is tightened only so the signature card stays with the closing clauses. */
  .page.last .page-content { gap: 4px; padding-top: 8mm; padding-bottom: 1mm; }
  .page.last .block { line-height: 1.48; padding: 6px 11px; }
  .page.last .block.rtl { line-height: 1.6; }
  .page.last .block h3 { margin-top: -6px; }
  .page.last .block p { margin-bottom: 4px; }
  .page.last .signature-card { padding: 8px 16px 10px; }
  `

}
