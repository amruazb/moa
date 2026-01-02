import { MOAContext } from '../types'

export function page10(ctx: MOAContext): string {
  return `
    <div class="page">
      <div class="article-pair">
        <div class="block" style="min-height: 400px;">
          <h3 class="center">Notes / Additional Terms</h3>
          <p style="margin-top: 16px; color: #666;">This page is intentionally left for any additional notes, amendments, or official stamps required by the competent authority.</p>
        </div>
        <div class="block rtl" style="min-height: 400px;">
          <h3 class="center">ملاحظات / شروط إضافية</h3>
          <p style="margin-top: 16px; color: #666;">هذه الصفحة مخصصة لأي ملاحظات أو تعديلات أو أختام رسمية تطلبها السلطة المختصة.</p>
        </div>
      </div>
      <div class="page-num">10</div>
    </div>`
}
