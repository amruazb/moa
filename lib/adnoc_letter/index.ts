import { AdnocLetterContext } from './types'
import { generateAdnocLetterStyles } from './styles'
import { page1 } from './pages'
import { FontSettings } from '@/store/formattingStore'

export function generateAdnocLetter(ctx: AdnocLetterContext, settings?: FontSettings): string {
  const styles = generateAdnocLetterStyles(settings)

  return `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ADNOC Declaration - ${ctx.name}</title>
        <style>${styles}</style>
      </head>
      <body>
        <div class="doc">
          ${page1(ctx)}
        </div>
      </body>
    </html>
  `
}

export * from './types'
export * from './sampleData'
export * from './styles'
