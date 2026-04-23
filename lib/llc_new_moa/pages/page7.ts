import { LLCNewMOAContext, pageFooter } from '../types'

export function page7(ctx: LLCNewMOAContext, pageNum: number = 7): string {
  const { company, activities } = ctx

  // Split activities: page 7 shows everything before "Project Management Services"
  const splitIdx = activities.findIndex(a => a.nameEn.toLowerCase().includes('project management'))
  const page7Acts = splitIdx >= 0 ? activities.slice(0, splitIdx) : activities

  // Generate activities list
  const activitiesListEn = page7Acts.map(a => `<p>➢ ${a.nameEn}</p>`).join('\n          ')
  const activitiesListAr = page7Acts.map(a => `<p>➢ ${a.nameAr}</p>`).join('\n          ')

  return `
    <div class="page">
      <div class="page-content">

      <!-- Article 4: Increase & Reduction in Share Capital -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">ARTICLE 4</h3>
          <h4 class="bold">INCREASE & REDUCTION IN SHARE CAPITAL</h4>
          <p><strong>4-1</strong> The Company may increase or reduce its capital pursuant to a Special Resolution of the General Assembly.</p>
          <p><strong>4-2</strong> Subject to the approval of the relevant competent authorities, a reduction in the capital of the Company shall be effected in the manner deemed suitable and useful to the Company and in accordance with the provisions of this Memorandum and the Commercial Companies Law.</p>
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة 4</h3>
          <h4 class="bold">زيادة وتخفيض رأس المال</h4>
          <p><strong>4-1</strong> يجوز للشركة زيادة أو تخفيض رأسمالها بموجب قرار خاص من الجمعية العمومية.</p>
          <p><strong>4-2</strong> رهناً بموافقة السلطات المختصة ذات الصلة، يتم تخفيض رأس مال الشركة بالطريقة التي تعتبر مناسبة ومفيدة للشركة ووفقاً لأحكام هذا العقد وقانون الشركات التجارية.</p>
        </div>
      </div>

      <!-- Article 5: Form and Nationality of the Company -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">ARTICLE 5</h3>
          <h4 class="bold">FORM AND NATIONALITY OF THE COMPANY</h4>
          <p>The Partners have agreed that the Company shall continue to be a limited liability company in the Emirate of Abu Dhabi, and is governed by the provisions of this Memorandum and the provisions of the laws and regulations applicable in the UAE and the Emirate of Abu Dhabi, including Commercial Companies Law.</p>
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة 5</h3>
          <h4 class="bold">شكل الشركة وجنسيتها</h4>
          <p>اتفق الشركاء على أن تستمر الشركة كشركة ذات مسؤولية محدودة في إمارة أبوظبي، وتخضع لأحكام هذا العقد وأحكام القوانين واللوائح المعمول بها في دولة الإمارات العربية المتحدة وإمارة أبوظبي، بما في ذلك قانون الشركات التجارية.</p>
        </div>
      </div>

      <!-- Article 6: Objective of the Company -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">ARTICLE 6</h3>
          <h4 class="bold">The objective of the company is:</h4>
          ${activitiesListEn}
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة 6</h3>
          <h4 class="bold">الغرض من تأسيس الشركة هو:</h4>
          ${activitiesListAr}
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
