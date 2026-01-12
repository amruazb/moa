// POA Document Generator
// Main entry point for generating Power of Attorney HTML document

import { POAData, extractPOAContext } from './types'
import { generatePOAStyles } from './styles'
import { FontSettings } from '@/store/formattingStore'
import * as pages from './pages'

export function generatePOAHTML(data: POAData, fontSettings?: FontSettings): string {
  const ctx = extractPOAContext(data)
  const styles = generatePOAStyles(fontSettings)

  // Build pages array
  const pageGenerators = [
    pages.page1,
    pages.page2,
    pages.page3,
    pages.page4,
  ]

  // Generate pages with dynamic page numbers (1-indexed)
  const pagesHTML = pageGenerators.map((pageFn, index) => {
    const pageNum = index + 1
    return pageFn(ctx, pageNum)
  }).join('\n')

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
