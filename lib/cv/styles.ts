import { FontSettings } from '@/store/formattingStore'

export function generateCvStyles(settings?: FontSettings): string {
  const fontFamily = settings?.fontFamily || "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
  const fontSize = settings?.fontSize || '11pt'

  return `
    :root {
      --primary-font: ${fontFamily};
      --base-font-size: ${fontSize};
      --accent: #1e3a5f;
      --accent-light: #2c5282;
      --text: #1a1a1a;
      --text-muted: #4a5568;
      --border: #e2e8f0;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      color-adjust: exact;
    }

    html {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    body {
      margin: 0;
      padding: 0;
      background: #e8ecf0;
      display: flex;
      justify-content: center;
      font-family: var(--primary-font);
      font-size: var(--base-font-size);
      color: var(--text);
      line-height: 1.5;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .doc {
      background: #ffffff;
      width: 210mm;
      min-height: 277mm;
      box-shadow: 0 2px 12px rgba(0,0,0,0.12);
      margin: 20px auto;
      display: table;
      table-layout: fixed;
      border-collapse: collapse;
    }

    @page {
      size: A4 portrait;
      margin: 10mm;
    }

    @media print {
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        background: white !important;
        width: auto !important;
        height: auto !important;
      }

      body {
        display: block;
      }

      .doc {
        margin: 0 auto !important;
        box-shadow: none !important;
        width: 210mm !important;
        min-height: 277mm !important;
        height: auto !important;
        page-break-inside: avoid;
      }

      .sidebar {
        background-color: #1e3a5f !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      .skill-list li::before,
      .lang-list li::before {
        background: rgba(255,255,255,0.6) !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }

    /* Sidebar */
    .sidebar {
      display: table-cell;
      width: 72mm;
      min-width: 72mm;
      max-width: 72mm;
      background-color: #1e3a5f;
      color: #ffffff;
      padding: 22px 18px;
      vertical-align: top;
    }

    .sidebar-section {
      margin-bottom: 16px;
    }

    .sidebar-section:last-child {
      margin-bottom: 0;
    }

    .sidebar-title {
      font-size: 9pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      border-bottom: 1px solid rgba(255,255,255,0.35);
      padding-bottom: 6px;
      margin-bottom: 12px;
      color: rgba(255,255,255,0.9);
    }

    .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 10px;
      font-size: 9.5pt;
      line-height: 1.45;
      color: rgba(255,255,255,0.92);
    }

    .contact-icon {
      flex-shrink: 0;
      width: 14px;
      opacity: 0.8;
      margin-top: 2px;
    }

    .skill-list, .lang-list {
      list-style: none;
    }

    .skill-list li, .lang-list li {
      font-size: 9.5pt;
      padding: 4px 0;
      padding-left: 12px;
      position: relative;
      color: rgba(255,255,255,0.92);
      line-height: 1.4;
    }

    .skill-list li::before, .lang-list li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 10px;
      width: 5px;
      height: 5px;
      background: rgba(255,255,255,0.6);
      border-radius: 50%;
    }

    /* Main content */
    .main {
      display: table-cell;
      vertical-align: top;
      padding: 24px 24px 22px 24px;
    }

    .header {
      margin-bottom: 18px;
      padding-bottom: 14px;
      border-bottom: 2px solid #1e3a5f;
    }

    .header h1 {
      font-size: 22pt;
      font-weight: 700;
      color: #1e3a5f;
      letter-spacing: -0.5px;
      line-height: 1.15;
      margin-bottom: 6px;
    }

    .header .job-title {
      font-size: 12pt;
      font-weight: 500;
      color: #2c5282;
      letter-spacing: 0.3px;
    }

    .section {
      margin-bottom: 16px;
    }

    .section:last-child {
      margin-bottom: 0;
    }

    .section-title {
      font-size: 11pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #1e3a5f;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 5px;
      margin-bottom: 14px;
    }

    .summary {
      font-size: 10pt;
      color: var(--text-muted);
      line-height: 1.65;
      text-align: justify;
    }

    .edu-item, .exp-item {
      margin-bottom: 12px;
    }

    .edu-item:last-child, .exp-item:last-child {
      margin-bottom: 0;
    }

    .edu-header, .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
      margin-bottom: 3px;
    }

    .edu-qual, .exp-title {
      font-size: 10.5pt;
      font-weight: 700;
      color: var(--text);
    }

    .edu-year, .exp-period {
      font-size: 9pt;
      color: var(--text-muted);
      white-space: nowrap;
      flex-shrink: 0;
    }

    .edu-inst, .exp-org {
      font-size: 9.5pt;
      color: #2c5282;
      font-weight: 500;
      margin-bottom: 6px;
    }

    .exp-desc {
      font-size: 9.5pt;
      color: var(--text-muted);
      line-height: 1.6;
      text-align: justify;
    }
  `
}
