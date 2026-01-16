// Objectives/Activities article chunk
// Chapter I: General Provisions including company objectives

import { ContentChunk } from '../pageBuilder'
import { LLCToSPCContext } from '../types'

// ========================================
// CHAPTER I: General Provisions
// ========================================

export const chapter1HeaderChunk: ContentChunk = {
  id: 'chapter-1',
  type: 'chapter',
  estimatedHeight: 25,
  keepWithNext: true,
  content: () => `
      <!-- Chapter I: General Provisions -->
      <div class="article-pair">
        <div class="block chapter">
          <h3 class="underline center">CHAPTER I</h3>
          <h3 class="center">General Provisions</h3>
        </div>
        <div class="block rtl chapter">
          <h3 class="underline center">الباب الأول</h3>
          <h3 class="center">أحكام عامة</h3>
        </div>
      </div>`
}

/** Article: Company Objectives/Activities */
export const objectivesArticleChunk: ContentChunk = {
  id: 'objectives-article',
  type: 'article',
  estimatedHeight: 65,
  content: (ctx: LLCToSPCContext) => {
    const { activities } = ctx
    
    // Generate activities list HTML
    const activitiesListEn = activities.map(a => `<li class="edited">${a.nameEn}</li>`).join('\n          ')
    const activitiesListAr = activities.map(a => `<li class="edited">${a.nameAr}</li>`).join('\n          ')

    return `
      <!-- Article: Objectives of the Company -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Objectives of the Company</h3>
          <p><strong>The objective of the company is:</strong></p>
          <ul class="list">
          ${activitiesListEn}
          </ul>
          <p>The Company may not engage in any activity other than the activities specified above without obtaining the relevant approval from the competent authorities.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">أغراض الشركة</h3>
          <p><strong>الغرض من تأسيس الشركة هو:</strong></p>
          <ul class="list">
          ${activitiesListAr}
          </ul>
          <p>لا يجوز للشركة ممارسة أي نشاط بخلاف الأنشطة المحددة أعلاه دون الحصول على الموافقة ذات الصلة من الجهات المختصة.</p>
        </div>
      </div>`
  }
}

// Export objectives chunks
export const objectivesChunks: ContentChunk[] = [
  chapter1HeaderChunk,
  objectivesArticleChunk
]

