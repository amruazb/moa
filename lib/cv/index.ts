import { CvContext } from './types'
import { generateCvStyles } from './styles'
import { renderCvPage } from './pages'
import { FontSettings } from '@/store/formattingStore'

export function generateCv(ctx: CvContext, settings?: FontSettings): string {
  const styles = generateCvStyles(settings)

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CV - ${ctx.fullName}</title>
        <style>${styles}</style>
      </head>
      <body>
        <div class="doc">
          ${renderCvPage(ctx)}
        </div>
      </body>
    </html>
  `
}

export * from './types'
export * from './sampleData'
export * from './styles'
