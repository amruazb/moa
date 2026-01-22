import { LLCAmendmentMOAData, transformToContext } from './types'
import { styles } from './styles'
import { page1 } from './pages/page1'
import { page2 } from './pages/page2'
// Import additional pages as they are created
// import { page3 } from './pages/page3'
// import { page4 } from './pages/page4'
// ... etc

export interface FormattingSettings {
    fontSize: number
    lineHeight: number
    marginTop: number
    marginBottom: number
    marginLeft: number
    marginRight: number
}

export function generateLLCAmendmentMOA(
    data: LLCAmendmentMOAData, 
    settings: FormattingSettings
): string {
    const ctx = transformToContext(data)
    
    // Generate all pages
    const pages = [
        page1(ctx, 1),
        page2(ctx, 2),
        // Add more pages as they are created
        // page3(ctx, 3),
        // page4(ctx, 4),
        // ... etc
    ]

    // Apply formatting settings to styles
    const customStyles = styles.replace(
        'font-size: 12pt;',
        `font-size: ${settings.fontSize}pt;`
    ).replace(
        'line-height: 1.4;',
        `line-height: ${settings.lineHeight};`
    ).replace(
        'margin: 1in;',
        `margin: ${settings.marginTop}in ${settings.marginRight}in ${settings.marginBottom}in ${settings.marginLeft}in;`
    )

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LLC Amendment MOA - ${ctx.company.name}</title>
    ${customStyles}
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
    // Export additional pages as they are created
    // page3,
    // page4,
    // ... etc
}

// Export types for external use
export type { LLCAmendmentMOAData, LLCAmendmentMOAContext } from './types'
