import { LLCNewMOAContext, pageFooter } from '../types'

export function page23(ctx: LLCNewMOAContext, pageNum: number = 23): string {
  const { company } = ctx

  return `
    <div class="page">
      <div class="page-content">

      <!-- Content will be added here -->

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
