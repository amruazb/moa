import { LLCNewMOAContext, pageFooter } from '../types'

export function page22(ctx: LLCNewMOAContext, pageNum: number = 22): string {
  const { company } = ctx

  return `
    <div class="page">
      <div class="page-content">

      <!-- Content will be added here -->

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
