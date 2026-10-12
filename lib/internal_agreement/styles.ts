import { FontSettings } from '@/store/formattingStore'
import { generateMoaStyles } from '@/lib/spc_moa/styles'

export function generateInternalAgreementStyles(settings?: FontSettings): string {
  return `
    ${generateMoaStyles(settings)}

    .share-table-wrap {
      width: 100%;
      margin: 6px 0 12px;
    }

    .share-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8.5pt;
    }

    .share-table th,
    .share-table td {
      border: 1px solid #334155;
      padding: 5px 6px;
      vertical-align: middle;
    }

    .share-table th {
      background: #1e3a5f;
      color: #fff;
      font-weight: 700;
    }

    .share-table td.num,
    .share-table th.num {
      text-align: center;
      white-space: nowrap;
    }

    .share-table tfoot td {
      font-weight: 700;
      background: #f1f5f9;
    }

    .signature-grid {
      display: flex;
      gap: 6mm;
      margin-top: 8mm;
    }

    .signature-card {
      flex: 1;
      border: 1px solid #1e3a5f;
      padding: 4mm 3mm 5mm;
      min-height: 78mm;
    }

    .signature-card .party-label {
      font-weight: 700;
      font-size: 8.5pt;
      color: #1e3a5f;
      margin-bottom: 2mm;
    }

    .signature-card .party-name {
      font-weight: 700;
      font-size: 8pt;
      line-height: 1.35;
      margin-bottom: 1.5mm;
    }

    .signature-card .meta {
      font-size: 7.5pt;
      line-height: 1.45;
      margin-bottom: 3mm;
    }

    .signature-card .sign-space {
      height: 20mm;
    }

    .signature-card .sign-space-date {
      height: 12mm;
    }

    .signature-card .sign-line {
      border-bottom: 1px solid #111;
      margin: 0 0 2mm;
    }

    .signature-card .sign-label {
      font-size: 7.5pt;
      color: #334155;
    }

    .stamp-box {
      margin-top: 7mm;
      border: 1px dashed #64748b;
      padding: 5mm;
      text-align: center;
      font-size: 8.5pt;
      color: #334155;
    }

    .article-pair.tight p {
      margin-bottom: 3px;
    }
  `
}
