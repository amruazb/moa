import { LLCAmendmentMOAData, transformToContext } from './types'
import { generateLLCAmendmentMoaStyles } from './styles'
import { FontSettings } from '@/store/formattingStore'
import { page1 } from './pages/page1'
import { page2 } from './pages/page2'
import { page3 } from './pages/page3'
import { page4 } from './pages/page4'
import { page6 } from './pages/page6'
import { page7 } from './pages/page7'
import { page8 } from './pages/page8'
import { page9 } from './pages/page9'

export function generateLLCAmendmentMOA(
    data: LLCAmendmentMOAData,
    settings?: FontSettings
): string {
    const ctx = transformToContext(data)

    // Extract header font sizes from settings
    const headerSizes = settings ? {
        enTitle: settings.headerEnTitle,
        enSubtitle: settings.headerEnSubtitle,
        enCompany: settings.headerEnCompany,
        arTitle: settings.headerArTitle,
        arSubtitle: settings.headerArSubtitle,
        arCompany: settings.headerArCompany,
    } : undefined

    // Generate all pages
    const pages = [
        page1(ctx, 1, headerSizes),
        page2(ctx, 2),
        page3(ctx, 3),
        page4(ctx, 4),
        page6(ctx, 5),  // Renumbered from 6 to 5
        page7(ctx, 6),  // Renumbered from 7 to 6
        page8(ctx, 7),
        page9(ctx, 8),  // Signature page (last page)
    ]

    // Generate styles with formatting settings
    const customStyles = generateLLCAmendmentMoaStyles(settings)

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LLC Amendment MOA - ${ctx.company.name}</title>
    <style>
        ${customStyles}
    </style>
</head>
<body>
    ${pages.join('\n')}
</body>
</html>
    `.trim()
}

// Export page functions for individual access if needed
export {
    page1,
    page2,
    page3,
    page4,
    page6,
    page7,
    page8,
    page9,
}

// Export types for external use
export type { LLCAmendmentMOAData, LLCAmendmentMOAContext } from './types'
