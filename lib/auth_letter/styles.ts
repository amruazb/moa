// Authorization Letter Document Styles
import { FontSettings, FONT_SIZES } from '@/store/formattingStore'

export const getBaseFontSize = (size: FontSettings['baseFontSize']) => {
  return FONT_SIZES.find(s => s.value === size)?.basePt || 9
}

export function generateAuthLetterStyles(settings?: FontSettings): string {
  const englishFont = settings?.englishFont || 'Noto Sans'
  const arabicFont = settings?.arabicFont || 'Arabic Transparent'
  const englishPt = getBaseFontSize(settings?.englishFontSize || settings?.baseFontSize || 'medium')
  const arabicPt = getBaseFontSize(settings?.arabicFontSize || settings?.baseFontSize || 'medium')
  const basePt = englishPt
  const boldEdited = settings?.boldEditedFields ?? true
  const columnRatio = settings?.columnRatio ?? 0.5
  const pageMargin = settings?.pageMargin ?? 15

  const englishPercent = Math.round(columnRatio * 100)
  const arabicPercent = 100 - englishPercent

  return `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap');

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

    .edited { font-weight: ${boldEdited ? '700' : '400'}; }

    .doc {
      width: 210mm;
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 18px 42px rgba(0,0,0,0.08);
    }

    .page {
      width: 210mm;
      height: 297mm;
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
      padding: 25mm ${pageMargin}mm 0 ${pageMargin}mm;
      text-align: justify;
      display: flex;
      flex-direction: column;
    }

    .page-footer {
      height: 25mm;
      padding: 0 ${pageMargin}mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .footer-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: ${basePt - 1}pt;
    }

    .footer-left { align-items: flex-start; }
    .footer-right { align-items: flex-end; }

    .signature-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2mm;
    }

    .footer-label {
      color: #555;
      font-size: ${basePt - 2}pt;
    }

    .title-pair {
      display: flex;
      justify-content: space-between;
      margin-bottom: 25px;
      border-bottom: 2px solid #1e3a5f;
      padding-bottom: 10px;
    }

    .title-en, .title-ar {
      width: 48%;
      font-size: ${basePt + 4}pt;
      font-weight: 700;
      color: #1e3a5f;
      text-transform: uppercase;
    }

    .title-ar { text-align: right; direction: rtl; }

    .content-pair {
      display: grid;
      grid-template-columns: calc(${englishPercent}% - 10px) calc(${arabicPercent}% - 10px);
      gap: 20px;
      margin-bottom: 20px;
    }

    .ltr { font-family: '${englishFont}', sans-serif; }
    .rtl { direction: rtl; font-family: '${arabicFont}', sans-serif; text-align: justify; }

    .date-row {
        margin-bottom: 20px;
        font-weight: 600;
    }

    .salutation {
        margin-bottom: 15px;
        font-weight: 600;
    }

    .body-text {
        line-height: 1.6;
        margin-bottom: 15px;
    }

    .closing {
        margin-top: 30px;
        font-weight: 600;
    }

    @media print {
      body { background: #fff; padding: 0; }
      .doc { box-shadow: none; width: 210mm; }
      .page { margin: 0; border: none; page-break-after: always; }
    }
  `
}
