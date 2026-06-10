import { DamanLetterContext } from './types'
import { generateDamanLetterStyles } from './styles'
import { page1 } from './pages'
import { FontSettings } from '@/store/formattingStore'

export function generateDamanLetter(ctx: DamanLetterContext, settings?: FontSettings): string {
  const styles = generateDamanLetterStyles(settings)

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Daman Declaration - ${ctx.companyName}</title>
        <style>${styles}</style>
      </head>
      <body>
        <div class="doc">
          ${page1(ctx, 1)}
        </div>
      </body>
    </html>
  `
}

export * from './types'
export * from './sampleData'
export * from './styles'
export * from './wordGenerator'
