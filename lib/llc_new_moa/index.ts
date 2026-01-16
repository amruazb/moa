import { LLCNewMOAContext, LLCNewMOAData, extractLLCNewMOAContext } from './types'
import { generateMoaStyles, getBaseFontSize } from './styles'
import { FontSettings } from '@/store/formattingStore'
import * as pages from './pages'

// Page generator type
type PageGenerator = (ctx: LLCNewMOAContext, pageNum: number) => string

// All page generators in order
const pageGenerators: PageGenerator[] = [
    pages.page1,
    pages.page2,
    pages.page3,
    pages.page4,
    pages.page5,
    pages.page6,
    pages.page7,
    pages.page8,
    pages.page9,
    pages.page10,
    pages.page11,
    pages.page12,
    pages.page13,
    pages.page14,
    pages.page15,
    pages.page16,
    pages.page17,
    pages.page18,
    pages.page19,
    pages.page20,
    pages.page21,
    pages.page22,
    pages.page23,
    pages.page24,
    pages.page25
]

export function generateLLCNewMOA(data: LLCNewMOAData, fontSettings?: FontSettings): string {
    const ctx = extractLLCNewMOAContext(data)

    // Generate all pages
    const pagesHtml = pageGenerators
        .map((generator, index) => generator(ctx, index + 1))
        .join('\n')

    const styles = generateMoaStyles(fontSettings)

    return `
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${ctx.company.name} - Memorandum of Association</title>
    <style>
        ${styles}
        
        /* Additional styles for signature section */
        .signature-section {
            margin-top: 40px;
        }
        
        .signature-block {
            margin-bottom: 40px;
            text-align: center;
        }
        
        .signature-label {
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .company-name {
            margin-bottom: 5px;
        }
        
        .rep-name {
            margin-bottom: 20px;
        }
        
        .signature-line-container {
            display: flex;
            justify-content: center;
        }
        
        .signature-line-long {
            display: inline-block;
            width: 200px;
            border-bottom: 1px solid #000;
            height: 40px;
        }
        
        /* Capital table styles */
        .capital-table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            font-size: ${getBaseFontSize(fontSettings?.baseFontSize || 'medium') + 1}pt;
        }
        
        .capital-table th,
        .capital-table td {
            border: 1px solid #333;
            padding: 8px 5px;
            text-align: center;
        }
        
        .capital-table th {
            background-color: #f0f0f0;
            font-weight: bold;
        }
        
        .capital-table .total-row {
            background-color: #f8f8f8;
            font-weight: bold;
        }
    </style>
</head>
<body>
    ${pagesHtml}
</body>
</html>`
}

// Export types and utilities
export type { LLCNewMOAContext, LLCNewMOAData } from './types'
export { extractLLCNewMOAContext } from './types'
export { defaultActivities } from './types'
