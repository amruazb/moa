import { LLCNewMOAContext, pageFooter } from '../types'

export function page25(ctx: LLCNewMOAContext, pageNum: number = 25): string {
  const { company } = ctx

  return `
    <div class="page">
      <div class="page-content">

      <!-- Content will be added here -->

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
