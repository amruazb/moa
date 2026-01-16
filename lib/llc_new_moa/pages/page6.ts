import { LLCNewMOAContext, pageFooter } from '../types'

export function page6(ctx: LLCNewMOAContext, pageNum: number = 6): string {
  const { company, activities } = ctx

  // Generate activities list HTML (Keeping first 4 for Page 6)
  const activitiesListEn = activities.slice(0, 4).map(a => `<li>${a.nameEn}</li>`).join('\n          ')
  const activitiesListAr = activities.slice(0, 4).map(a => `<li>${a.nameAr}</li>`).join('\n          ')

  return `
    <div class="page">
      <div class="page-content">
      
      <!-- Article 3 -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">ARTICLE 3</h3>
          <h4 class="bold underline">FORM AND NATIONALITY OF THE COMPANY</h4>
          <p>The Partners have agreed that the Company shall continue to be a limited liability company in the Emirate of <span class="edited">${company.emirate}</span>, and is governed by the provisions of this Memorandum and the provisions of the laws and regulations applicable in the UAE and the Emirate of Abu Dhabi, including Commercial Companies Law.</p>
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة 3</h3>
          <h4 class="bold underline">الشكل القانوني وجنسية الشركة</h4>
          <p>اتفق الشريكان على أن تستمر الشركة كشركة ذات مسؤولية محدودة في إمارة <span class="edited">${company.emirateAr}</span>، وتخضع لأحكام هذا العقد وأحكام القوانين واللوائح المعمول بها في الإمارات العربية المتحدة وإمارة أبوظبي، بما في ذلك قانون الشركات التجارية.</p>
        </div>
      </div>
      
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
      
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
