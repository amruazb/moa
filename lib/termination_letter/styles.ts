// Termination Letter Document Styles
import { FontSettings, FONT_SIZES } from '@/store/formattingStore'

export const getBaseFontSize = (size: FontSettings['baseFontSize']) => {
    return FONT_SIZES.find(s => s.value === size)?.basePt || 9
}

export function generateTerminationLetterStyles(settings?: FontSettings): string {
    const englishFont = settings?.englishFont || 'Noto Sans'
    const englishPt = getBaseFontSize(settings?.englishFontSize || settings?.baseFontSize || 'medium')
    const basePt = englishPt
    const boldEdited = settings?.boldEditedFields ?? true
    const pageMargin = settings?.pageMargin ?? 20

    return `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    @page {
      size: A4 portrait;
      margin: 0;
    }

    body {
      font-family: '${englishFont}', sans-serif;
      font-size: ${basePt}pt;
      color: #111;
      background: #f8f8f8;
      padding: 20px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .edited { font-weight: ${boldEdited ? '700' : '400'}; }

    .doc {
      width: 210mm;
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 18px 42px rgba(0,0,0,0.08);
    }

    .page {
      width: 210mm;
      min-height: 297mm;
      display: flex;
      flex-direction: column;
      background: #fff;
      margin-bottom: 40px;
      position: relative;
      overflow: hidden;
      border: 1px solid #ccc;
    }

    .page-content {
      flex: 1;
      padding: 25mm ${pageMargin}mm 20mm ${pageMargin}mm;
      display: flex;
      flex-direction: column;
    }

    .letter-title {
      font-size: ${basePt + 4}pt;
      font-weight: 700;
      color: #1e3a5f;
      text-transform: uppercase;
      text-align: center;
      margin-bottom: 10px;
      padding-bottom: 10px;
      border-bottom: 2px solid #1e3a5f;
    }

    .date-row {
      margin-top: 20px;
      margin-bottom: 20px;
      font-size: ${basePt}pt;
    }

    .to-block {
      margin-bottom: 20px;
      line-height: 1.8;
    }

    .to-block .label {
      font-weight: 700;
      font-size: ${basePt}pt;
    }

    .to-block .detail-row {
      display: flex;
      gap: 4px;
    }

    .to-block .detail-label {
      font-weight: 600;
      min-width: 110px;
    }

    .salutation {
      margin-bottom: 20px;
      font-size: ${basePt}pt;
    }

    .body-para {
      line-height: 1.7;
      margin-bottom: 14px;
      text-align: justify;
      font-size: ${basePt}pt;
    }

    .closing-block {
      margin-top: 40px;
      line-height: 1.8;
    }

    .closing-block .sincerely {
      font-size: ${basePt}pt;
      margin-bottom: 50px;
    }

    .closing-block .company-name {
      font-weight: 700;
      font-size: ${basePt}pt;
      border-top: 1px solid #333;
      display: inline-block;
      padding-top: 4px;
    }

    .closing-block .auth-label {
      font-size: ${basePt - 1}pt;
      color: #555;
    }

    @media print {
      body { background: #fff; padding: 0; }
      .doc { box-shadow: none; width: 210mm; }
      .page { margin: 0; border: none; page-break-after: always; }
    }
  `
}
