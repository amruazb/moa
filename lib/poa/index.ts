// POA Document Generator
// Main entry point for generating Power of Attorney HTML document

import { POAData, extractPOAContext } from './types'
import { generatePOAStyles } from './styles'
import { FontSettings } from '@/store/formattingStore'
import * as pages from './pages'

export function generatePOAHTML(data: POAData, fontSettings?: FontSettings): string {
  const ctx = extractPOAContext(data)
  const styles = generatePOAStyles(fontSettings)

  const page1Html = pages.page1(ctx, 1)
  const dynamicPagesHtml = pages.generateDynamicPages(ctx, 2)
  const pagesHTML = page1Html + '\n' + dynamicPagesHtml

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>POA - ${ctx.license.companyName}</title>
  <style>${styles}</style>
</head>
<body>
  <div class="doc">
    ${pagesHTML}
  </div>
</body>
</html>
`.trim()
}

// Re-export types for convenience
export * from './types'
