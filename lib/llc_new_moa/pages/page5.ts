import { LLCNewMOAContext, pageFooter } from '../types'

export function page5(ctx: LLCNewMOAContext, pageNum: number = 5): string {
  const { company } = ctx

  return `
    <div class="page">
      <div class="page-content">

      <!-- Preface -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold underline">PREFACE:</h3>
          <p>The preamble and definitions mentioned above shall constitute an integral part of memorandum and shall be read and interpreted therewith.</p>
        </div>
        <div class="block rtl">
          <h3 class="bold underline">التمهيد:</h3>
          <p>تعتبر المقدمة والتعريفات المذكورة اعلاه جزءا لايتجزأ من هذا العقد ويقرأ ويفسر معه.</p>
        </div>
      </div>

      <!-- Article 1: Name of the Company -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">ARTICLE 1</h3>
          <h4 class="bold">NAME OF THE COMPANY</h4>
          <p><strong>1-1</strong> The name of the Company shall continue to be <span class="edited">${company.name}</span></p>
          <p><strong>1-2</strong> The name of the Company may be amended, changed or substituted as per the terms of this Memorandum and after obtaining the approval of the competent authorities.</p>
          <p><strong>1-3</strong> The Company shall mention its name, form, capital and the location of its head office in all its documents, agreements and correspondence.</p>
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة 1</h3>
          <h4 class="bold">اسم الشركة</h4>
          <p><strong>1-1</strong> يستمر اسم الشركة كما هو <span class="edited">${company.nameAr}</span></p>
          <p><strong>1-2</strong> يجوز تعديل اسم الشركة أو تغييره أو استبداله وفقاً لشروط هذا العقد وبعد الحصول على موافقة السلطات المختصة.</p>
          <p><strong>1-3</strong> تذكر الشركة اسمها وشكلها ورأسمالها وموقع مقرها الرئيسي في جميع مستنداتها واتفاقياتها ومراسلاتها.</p>
        </div>
      </div>

      <!-- Article 2: Principal Place of Business -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">ARTICLE 2</h3>
          <h4 class="bold">PRINCIPAL PLACE OF BUSINESS</h4>
          <p>The head office of the Company shall continue to be in the Emirate of <span class="edited">${company.emirate}</span>. The Company may establish branch offices, Subsidiaries and/or agencies within and outside the UAE.</p>
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة 2</h3>
          <h4 class="bold">المقر الرئيسي للأعمال</h4>
          <p>يستمر المقر الرئيسي للشركة في إمارة <span class="edited">${company.emirateAr}</span>. ويجوز للشركة إنشاء مكاتب فرعية وشركات تابعة و/أو وكالات داخل وخارج دولة الإمارات العربية المتحدة.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
