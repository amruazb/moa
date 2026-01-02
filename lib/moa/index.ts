import { DocumentData } from '@/store/documentStore'
import { FontSettings } from '@/store/formattingStore'
import { extractContext } from './types'
import { generateMoaStyles } from './styles'
import * as pages from './pages'

export function generateMOAHTML(data: DocumentData, formattingSettings?: FontSettings): string {
  const ctx = extractContext(data)
  const styles = generateMoaStyles(formattingSettings)

  // Build pages array - each page function gets its position dynamically
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
  ]

  // Generate pages with dynamic page numbers (1-indexed)
  const totalPages = pageGenerators.length
  const pagesHTML = pageGenerators.map((pageFn, index) => {
    const pageNum = index + 1
    const isLastPage = pageNum === totalPages
    // For page8, pass isLastPage=true since it's the actual last content page
    if (pageFn === pages.page8) {
      return (pageFn as typeof pages.page8)(ctx, pageNum, isLastPage || pageNum === totalPages)
    }
    return pageFn(ctx, pageNum)
  }).join('\n')

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MOA - ${ctx.company.name}</title>
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
