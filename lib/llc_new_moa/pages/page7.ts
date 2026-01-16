import { LLCNewMOAContext, pageFooter } from '../types'

export function page7(ctx: LLCNewMOAContext, pageNum: number = 7): string {
  const { activities } = ctx

  // Generate the remaining activities list (item 5 and 6)
  const remainingActivitiesEn = activities.slice(4).map(a => `<li>${a.nameEn}</li>`).join('\n          ')
  const remainingActivitiesAr = activities.slice(4).map(a => `<li>${a.nameAr}</li>`).join('\n          ')

  return `
    <div class="page">
      <div class="page-content">
      
      <!-- Article 5 continued - remaining activities -->
      <div class="article-pair">
        <div class="block">
          <ul>
          ${remainingActivitiesEn}
          </ul>
        </div>
        <div class="block rtl">
          <ul>
          ${remainingActivitiesAr}
          </ul>
        </div>
      </div>
      
      <div class="article-pair">
        <div class="block">
          <p>5-2 The Company has the right in exercising its activities:</p>
          <p>(a) to use Company's funds to invest in any economical activities and fields related to the Company's activities, and have the right to participate, form joint ventures and have an interest of whatsoever nature with any other Person inside or outside the UAE whether by way of joint venture or otherwise in any type of business and to participate in their capital, and to own trademarks, patents, copyrights, industrial designs, and any other intellectual property rights the Company deems necessary for its business;</p>
          <p>(b) to acquire and/or possess and/or sell, and/or transfer and/or assign companies, sole establishments and other legal entities related to the Company's objectives and to create Subsidiaries and branches in and/or outside the UAE after having obtained the necessary authorizations from the competent authorities;</p>
        </div>
        <div class="block rtl">
          <p>5-2 يحق للشركة في سبيل ممارسة أنشطتها:</p>
          <p>(أ) استخدام أموال الشركة للاستثمار في أي أنشطة ومجالات اقتصادية تتعلق بأنشطة الشركة، ولها الحق في المشاركة وتأسيس مشاريع مشتركة والحصول على أي مصلحة من أي نوع مع أي شخص آخر داخل الإمارات أو خارجها سواء عن طريق مشروع مشترك أو غير ذلك في أي نوع من الأعمال والمشاركة في رأس مالها، وامتلاك العلامات التجارية وبراءات الاختراع وحقوق التأليف والنشر والتصاميم الصناعية وجميع حقوق الملكية الفكرية الأخرى التي تراها الشركة ضرورية لأعمالها؛</p>
          <p>(ب) الاستحواذ و/أو امتلاك و/أو بيع و/أو نقل و/أو التنازل عن شركات ومنشآت فردية وكيانات قانونية أخرى تتعلق بأهداف الشركة وإنشاء شركات تابعة وفروع داخل و/أو خارج الإمارات بعد الحصول على التصاريح اللازمة من السلطات المختصة؛</p>
        </div>
      </div>
      
      <!-- Article 5 continued - clause (c) only, (d) moves to next page -->
      <div class="article-pair">
        <div class="block">
          <p>(c) to act as an agent for the companies, establishments international organizations and other legal entities in relation to the Company's objectives and to represent the same in the UAE and abroad;</p>
        </div>
        <div class="block rtl">
          <p>(ج) العمل كوكيل للشركات والمنشآت والمنظمات الدولية والكيانات القانونية الأخرى فيما يتعلق بأهداف الشركة وتمثيلها في الإمارات والخارج؛</p>
        </div>
      </div>
      
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
