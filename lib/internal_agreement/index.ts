import { InternalAgreementContext } from './types'
import { generateInternalAgreementStyles } from './styles'
import { page1, page2, page3, page4 } from './pages'
import { FontSettings } from '@/store/formattingStore'

export function generateInternalAgreement(
  ctx: InternalAgreementContext,
  settings?: FontSettings,
): string {
  const styles = generateInternalAgreementStyles(settings)
  const totalPages = 4

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Internal Shareholding Agreement - ${ctx.companyName}</title>
        <style>${styles}</style>
      </head>
      <body>
        <div class="doc">
          ${page1(ctx, 1, totalPages)}
          ${page2(ctx, 2, totalPages)}
          ${page3(ctx, 3, totalPages)}
          ${page4(ctx, 4, totalPages)}
        </div>
      </body>
    </html>
  `
}

export type { InternalAgreementContext, InternalAgreementData, InternalParty } from './types'
export { extractInternalAgreementContext } from './types'
export { sampleInternalAgreementData } from './sampleData'
export { generateInternalAgreementStyles } from './styles'
export type { PaymentMethod, YardLeaseContext, YardLeaseData, YardLeasePerson } from './yardLease'
export { extractYardLeaseContext, sampleYardLeaseNas, generateYardLease } from './yardLease'
export type { InternalAgreementSample } from './samples'
export { INTERNAL_AGREEMENT_SAMPLES } from './samples'
