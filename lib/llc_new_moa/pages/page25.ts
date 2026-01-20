import { LLCNewMOAContext, pageFooter } from '../types'

export function page24(ctx: LLCNewMOAContext, pageNum: number = 24): string {
  const { company } = ctx

  return `
    <div class="page">
      <div class="page-content">

      <!-- Content will be added here -->

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
