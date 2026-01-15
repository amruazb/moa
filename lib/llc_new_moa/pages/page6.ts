import { LLCNewMOAContext, pageFooter } from '../types'

export function page6(ctx: LLCNewMOAContext, pageNum: number = 6): string {
  const { company, activities } = ctx

  // Generate activities list HTML
  const activitiesListEn = activities.map(a => `<li>${a.nameEn}</li>`).join('\n          ')
  const activitiesListAr = activities.map(a => `<li>${a.nameAr}</li>`).join('\n          ')

  return `
    <div class="page">
      <div class="page-content">
      
      <!-- Article 4 -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">ARTICLE 4</h3>
          <h4 class="bold underline">NAME OF THE COMPANY</h4>
          <p>4-1 The name of the Company shall continue to be <span class="edited">${company.name}</span>.</p>
          <p>4-2 The name of the Company may be amended, changed or substituted as per the terms of this Memorandum and after obtaining the approval of the competent authorities.</p>
          <p>4-3 The Company shall mention its name, form, capital and the location of its head office in all its documents, agreements and correspondence.</p>
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة 4</h3>
          <h4 class="bold underline">اسم الشركة</h4>
          <p>4-1 يظل اسم الشركة هو <span class="edited">${company.nameAr}</span>.</p>
          <p>4-2 يجوز تعديل الاسم التجاري أو تغييره أو استبداله وفقاً لأحكام هذا العقد وبعد الحصول على موافقة السلطات المختصة.</p>
          <p>4-3 يجب على الشركة أن تذكر في جميع مستنداتها ورسائل عقودها اسمها، وشكلها، ورأس مالها، وموقع مكتبها الرئيسي.</p>
        </div>
      </div>
      
      <!-- Article 5 -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">ARTICLE 5</h3>
          <h4 class="bold underline">OBJECTS OF THE COMPANY</h4>
          <p>5-1 The principal objects of the Company shall be to carry out the activities of:</p>
          <ul>
          ${activitiesListEn}
          </ul>
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة 5</h3>
          <h4 class="bold underline">أغراض الشركة</h4>
          <p>5-1 الأغراض الرئيسية التي تسعى الشركة لتحقيقها هي القيام بأنشطة:</p>
          <ul>
          ${activitiesListAr}
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
      
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
