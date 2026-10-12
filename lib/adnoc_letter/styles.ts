import { FontSettings } from '@/store/formattingStore'

export function generateAdnocLetterStyles(settings?: FontSettings): string {
  const defaultFontFamily = settings?.fontFamily || 'Arial, sans-serif'
  const defaultFontSize = settings?.fontSize || '16px'

  return `
    :root {
      --primary-font: ${defaultFontFamily};
      --base-font-size: ${defaultFontSize};
    }
    
    * {
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      padding: 0;
      background: #f0f0f0;
      display: flex;
      justify-content: center;
      font-family: var(--primary-font);
      font-size: var(--base-font-size);
      color: #000;
    }
    
    .doc {
      background: white;
      width: 210mm;
      min-height: 297mm;
      padding: 25mm 25mm;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      margin: 20px auto;
      direction: rtl;
      line-height: 1.8;
    }

    @media print {
      body {
        background: none;
      }
      .doc {
        margin: 0;
        box-shadow: none;
        width: 100%;
        padding: 15mm 20mm;
      }
    }

    .header-date {
      text-align: right;
      font-weight: bold;
      margin-bottom: 40px;
      font-size: 1.1em;
    }

    .salutation {
      font-weight: bold;
      margin-bottom: 30px;
      font-size: 1.1em;
    }
      
    .salutation .row {
      display: flex;
      justify-content: space-between;
    }

    .subject {
      text-align: center;
      font-weight: bold;
      text-decoration: underline;
      font-size: 1.3em;
      margin: 50px 0;
    }

    .body-text {
      text-align: justify;
      margin-bottom: 50px;
      font-size: 1.2em;
      line-height: 2.2;
    }
    
    .body-text span.bold {
      font-weight: bold;
    }

    .footer {
      margin-top: 60px;
      text-align: center;
      font-weight: bold;
      font-size: 1.2em;
      line-height: 1.8;
    }

    .signature-section {
      margin-top: 60px;
      text-align: center;
      font-size: 1.2em;
    }
      
    .signature-section .name {
      font-weight: bold;
    }
    
    .signature-section .line {
      display: inline-block;
      width: 250px;
      border-bottom: 1px solid #000;
      margin-right: 10px;
    }
  `
}
