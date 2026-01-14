// LLC to LLC SPC Conversion Document Generator
// Main entry point for generating conversion contract HTML document

import { LLCToSPCData, extractLLCToSPCContext } from './types'
import { generateMoaStyles } from './styles'
import { FontSettings } from '@/store/formattingStore'
import { PageBuilder } from './pageBuilder'
import { allChunks } from './chunks'

// Keep legacy pages import for backward compatibility
import * as pages from './pages'

export function generateLLCToSPCHTML(data: LLCToSPCData, fontSettings?: FontSettings, useDynamicPaging: boolean = false): string {
  const ctx = extractLLCToSPCContext(data)
  const styles = generateMoaStyles(fontSettings)

  let pagesHTML: string

  if (useDynamicPaging) {
    // Use new continuous flow mode with CSS-based page breaks
    // Content flows naturally and browser/PDF handles pagination
    const builder = new PageBuilder()
    pagesHTML = builder.buildContinuousFlow(allChunks, ctx)
  } else {
    // Legacy: Use fixed page functions
    const pageGenerators = [
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
    ]

    // Generate pages with dynamic page numbers (1-indexed)
    pagesHTML = pageGenerators.map((pageFn, index) => {
      const pageNum = index + 1
      return pageFn(ctx, pageNum)
    }).join('\n')
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LLC to SPC Conversion - ${ctx.license.companyName}</title>
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

// Export PageBuilder for external use
export { PageBuilder } from './pageBuilder'
export type { ContentChunk } from './pageBuilder'

