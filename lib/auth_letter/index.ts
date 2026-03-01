import { AuthLetterContext, extractAuthLetterContext } from './types'
import { generateAuthLetterStyles } from './styles'
import { page1 } from './pages'
import { FontSettings } from '@/store/formattingStore'

export function generateAuthLetter(ctx: AuthLetterContext, settings?: FontSettings): string {
  const styles = generateAuthLetterStyles(settings)

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Authorization Letter - ${ctx.employee.name}</title>
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
