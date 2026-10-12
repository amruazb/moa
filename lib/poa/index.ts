// POA Document Generator
// Main entry point for generating Power of Attorney HTML document

import { POAData, extractPOAContext, poaPageFooter } from './types'
import { generatePOAStyles } from './styles'
import { FontSettings } from '@/store/formattingStore'
import { page1FlowBlocks } from './pages/page1'
import { contentFlowBlocks } from './pages/dynamicPages'
import { poaPaginateScript } from './paginateClient'

function footerTemplate(isLast: boolean): string {
  return poaPageFooter(0, isLast).replace(
    '<span class="page-num">0</span>',
    '<span class="page-num">__PAGE__</span>'
  )
}

export function generatePOAHTML(data: POAData, fontSettings?: FontSettings): string {
  const ctx = extractPOAContext(data)
  const styles = generatePOAStyles(fontSettings)
  const blocks = [...page1FlowBlocks(ctx), ...contentFlowBlocks(ctx)]
    .map((html) => `<div class="flow-block">${html}</div>`)
    .join('\n')

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
  <div id="flow-measure" class="page page-1">
    <div class="page-content">
      ${blocks}
    </div>
  </div>
  <div class="doc" id="poa-doc"></div>
  ${poaPaginateScript(footerTemplate(false), footerTemplate(true))}
</body>
</html>
`.trim()
}

// Re-export types for convenience
export * from './types'
