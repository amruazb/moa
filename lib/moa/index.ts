import { DocumentData } from '@/store/documentStore'
import { FontSettings } from '@/store/formattingStore'
import { extractContext } from './types'
import { generateMoaStyles } from './styles'
import * as pages from './pages'

export function generateMOAHTML(data: DocumentData, formattingSettings?: FontSettings): string {
  const ctx = extractContext(data)
  const styles = generateMoaStyles(formattingSettings)

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
    ${pages.page1(ctx)}
    ${pages.page2(ctx)}
    ${pages.page3(ctx)}
    ${pages.page4(ctx)}
    ${pages.page5(ctx)}
    ${pages.page6(ctx)}
    ${pages.page7(ctx)}
    ${pages.page8(ctx)}
    ${pages.page9(ctx)}
    ${pages.page10(ctx)}
    ${pages.page11(ctx)}
    ${pages.page12(ctx)}
    ${pages.page13(ctx)}
  </div>
</body>
</html>
`.trim()
}

// Re-export types for convenience
export * from './types'
