import { TerminationLetterContext, extractTerminationLetterContext } from './types'
import { generateTerminationLetterStyles } from './styles'
import { page1 } from './pages'
import { FontSettings } from '@/store/formattingStore'

export function generateTerminationLetter(ctx: TerminationLetterContext, settings?: FontSettings): string {
    const styles = generateTerminationLetterStyles(settings)

    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Termination Letter - ${ctx.employee.name}</title>
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
